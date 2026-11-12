// Sends the self-check result from /pruefpunkte and /checklist by email.
//
//   POST /api/pruefpunkte  { code, email, area, consent, website }
//
// Two mails per request, both through Resend, the provider api/feedback.js
// already uses:
//   1. to the reader: their score and the full list, built from
//      public/pruefpunkte-text.js (the same text the page renders and
//      scripts/pruefpunkte-reply.js prints). NOTHING the reader typed goes into
//      this mail, only our fixed text and their score. Otherwise anyone could
//      use our domain to send their own words to any address.
//   2. a copy to us (PRUEFPUNKTE_COPY_TO, default info@): address, answers,
//      the area note, consent. That is how the lead reaches us.
//
// FAILS CLOSED. Without RESEND_API_KEY and PRUEFPUNKTE_FROM (a sender on a
// domain verified at Resend) it sends nothing and answers 503, and the page
// falls back to opening the reader's own mail client. It never falls back to
// Resend's sandbox sender, which can only reach the account owner.
// The submission is written to the function log either way, so a lead is
// never lost silently.

const { reply, build, parse } = require('../public/pruefpunkte-text.js');

const clean = (v, cap) =>
  typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, cap) : '';
const esc = s =>
  String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Plain text to HTML: escaped, line breaks kept, our own https links clickable.
const toHtml = text =>
  '<div style="font:15px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#1A1A1A;white-space:pre-wrap">' +
  esc(text).replace(/https:\/\/[^\s<]+/g, u => `<a href="${u}" style="color:#1B4D3E">${u}</a>`) +
  '</div>';

const EMAIL = /^[^\s@<>"(),;:]{1,64}@[A-Za-z0-9.-]{1,190}\.[A-Za-z]{2,24}$/;

async function send(key, payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`resend ${r.status}: ${await r.text()}`);
  return r.json();
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method not allowed' });
  }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'bad payload' });

  // Honeypot: real people never fill this.
  if (clean(body.website, 50)) return res.status(200).json({ ok: true, delivered: true });

  const code = clean(body.code, 20);
  const email = clean(body.email, 254);
  const area = clean(body.area, 500);
  const consent = body.consent === true;

  try { parse(code); } catch { return res.status(400).json({ ok: false, error: 'bad code' }); }
  if (!EMAIL.test(email)) return res.status(400).json({ ok: false, error: 'bad email' });

  const r = build(code);
  const de = r.lang === 'de';
  const copyText = [
    de ? 'Prüfpunkte-Check, Ergebnis per E-Mail angefordert' : 'Checklist self-check, result requested by email',
    `${r.x}/${r.y}`,
    `Adresse:    ${email}`,
    `Sprache:    ${r.lang}`,
    `Offen:      ${r.open.map(p => p.name).join(', ') || '-'}`,
    `Fläche:     ${area || '(nicht angegeben)'}`,
    `Einwilligung weitere Kontaktaufnahme: ${consent ? 'JA' : 'nein'}`,
    `Code:       ${code}`,
  ].join('\n');

  const key = process.env.RESEND_API_KEY;
  const from = process.env.PRUEFPUNKTE_FROM;
  const copyTo = process.env.PRUEFPUNKTE_COPY_TO || 'info@averiumdynamics.com';

  console.log('[pruefpunkte] submission\n' + copyText);

  if (!key || !from) {
    console.log('[pruefpunkte] not configured (RESEND_API_KEY or PRUEFPUNKTE_FROM missing); nothing sent');
    return res.status(503).json({ ok: false, delivered: false, reason: 'not-configured' });
  }

  const mail = reply(code);
  try {
    await send(key, {
      from, to: [email], reply_to: 'info@averiumdynamics.com',
      subject: mail.subject, text: mail.body, html: toHtml(mail.body),
    });
  } catch (err) {
    console.error('[pruefpunkte] reader mail failed', err.message);
    return res.status(502).json({ ok: false, delivered: false, reason: 'send-failed' });
  }

  // The copy to us must not turn a delivered result into an error for the
  // reader. If it fails, the submission is already in the log above.
  try {
    await send(key, {
      from, to: [copyTo], reply_to: email,
      subject: `${de ? 'Prüfpunkte' : 'Checklist'}: ${r.x}/${r.y}, ${email}${consent ? ' [Einwilligung]' : ''}`,
      text: copyText, html: toHtml(copyText),
    });
  } catch (err) {
    console.error('[pruefpunkte] copy to us failed; lead is in the log above', err.message);
  }

  return res.status(200).json({ ok: true, delivered: true });
};

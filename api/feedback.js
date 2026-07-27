// Receives crew feedback from /sizeup.html and emails it.
//
// Delivery: set RESEND_API_KEY in the Vercel project env to turn on email.
// Without it the endpoint still accepts submissions and writes them to the
// Vercel function log, so nothing is silently lost while the key is missing.
// FEEDBACK_TO overrides the destination address.

const MAX = { text: 4000, short: 200, items: 40 };

const clean = (v, cap) =>
  typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, cap) : '';

const esc = s =>
  String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'bad payload' });
  }

  // Honeypot: real people never fill this, bots usually do.
  if (clean(body.website, 50)) return res.status(200).json({ ok: true });

  const verdict = clean(body.verdict, 20);
  const missing = clean(body.missing, MAX.text);
  const role    = clean(body.role, MAX.short);
  const wanted  = Array.isArray(body.wanted)
    ? body.wanted.slice(0, MAX.items).map(v => clean(v, MAX.short)).filter(Boolean)
    : [];
  const ctx     = body.context && typeof body.context === 'object' ? body.context : {};

  if (!verdict && !missing && !wanted.length) {
    return res.status(400).json({ ok: false, error: 'empty feedback' });
  }

  const lines = [
    `Useful?      ${verdict || '(not answered)'}`,
    `Role/brigade ${role || '(not given)'}`,
    '',
    'Wants us to add:',
    ...(wanted.length ? wanted.map(w => `  - ${w}`) : ['  (nothing ticked)']),
    '',
    'One thing they would add:',
    missing ? `  ${missing}` : '  (not answered)',
    '',
    'Looking at:',
    `  ${ctx.lat ?? '?'}, ${ctx.lon ?? '?'}`,
    `  slope ${ctx.slope ?? '?'}, faces ${ctx.aspect ?? '?'}, fire runs ${ctx.upslope ?? '?'}`,
    `  wind ${ctx.wind ?? '?'}`,
  ];
  const text = lines.join('\n');

  const to  = process.env.FEEDBACK_TO || 'leosafia4@gmail.com';
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.log('[sizeup-feedback] no RESEND_API_KEY set; logging only\n' + text);
    return res.status(200).json({ ok: true, delivered: false });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.FEEDBACK_FROM || 'Pyrognosis Size-Up <onboarding@resend.dev>',
        to: [to],
        subject: `Size-Up feedback: ${verdict || 'no verdict'}${role ? ' — ' + role : ''}`,
        text,
        html: `<pre style="font:14px/1.5 ui-monospace,Menlo,Consolas,monospace">${esc(text)}</pre>`,
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('[sizeup-feedback] resend failed', r.status, detail);
      // Still logged above the fold so the response is never lost.
      console.log('[sizeup-feedback] undelivered submission\n' + text);
      return res.status(200).json({ ok: true, delivered: false });
    }
    return res.status(200).json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[sizeup-feedback] send threw', err);
    console.log('[sizeup-feedback] undelivered submission\n' + text);
    return res.status(200).json({ ok: true, delivered: false });
  }
};

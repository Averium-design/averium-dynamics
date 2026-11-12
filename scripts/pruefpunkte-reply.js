#!/usr/bin/env node
/**
 * Prints the reply to a Prüfpunkte / checklist result mail.
 *
 *   node scripts/pruefpunkte-reply.js "de:1d2y3u4n5u"
 *
 * The argument is the "Code:" line at the end of the mail a reader sends from
 * /pruefpunkte or /checklist. All text lives in public/pruefpunkte-text.js,
 * which the two pages load too, so the page and the reply cannot drift.
 *
 * Why a manual reply at all: on 2026-11-12 the site had no sender verified for
 * mail to third parties (Resend domain not verified, Formspree delivers only to
 * us), so the page opens the reader's own mail client to info@ and the reply is
 * sent by hand from there.
 */
const { reply } = require('../public/pruefpunkte-text.js');

try {
  const r = reply(process.argv[2]);
  process.stdout.write('Subject: ' + r.subject + '\n\n' + r.body + '\n');
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

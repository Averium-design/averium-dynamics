#!/usr/bin/env node
/**
 * Fails if any source file contains an invisible or exotic character.
 *
 *   node scripts/check-invisible.js
 *
 * These arrive by paste — from Word, from a browser selection, from a chat
 * window — and none of them show up in a diff or in an editor. They are worth
 * catching because of what they break, not because of where they came from:
 *
 *   - a zero-width space inside a word makes that word unsearchable and
 *     un-greppable, so "Muritz" stops matching "Mu<ZWSP>ritz"
 *   - a no-break or narrow-no-break space inside a German compound stops the
 *     line wrapping where it should, and overflows on a phone
 *   - a soft hyphen renders as nothing and copies as something
 *   - bidi controls can reorder how a line DISPLAYS without changing what it
 *     says, so a reviewer and the parser disagree about the same file
 *
 * Runs on the sources, not on build output: public/sizeup*.html are generated
 * from scripts/sizeup.src.html, so cleaning the copies would be undone by the
 * next build.
 *
 * Add a character here rather than to a local ignore list — if one of these is
 * ever genuinely wanted, write it as an HTML entity so it is visible to whoever
 * reads the file next.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

/* Files worth checking: everything hand-written that ships. Generated output
   and dependencies are excluded — the first is covered by its source, the
   second is not ours to police. */
const TARGETS = [
  'public/blog/helicopter-air-tanker-fire-engine-drone.html',
  'public/blog/loeschhubschrauber-loeschflugzeug-tankloeschfahrzeug-drohne.html',
  'scripts/sizeup.src.html',
  'scripts/build-sizeup.js',
  'src/App.js',
  'src/Imprint.js',
  'src/Privacy.js',
  'src/index.js',
  'src/index.css',
  'public/index.html',
  'api/sizeup-data.js',
  'vercel.json',
  'tailwind.config.js',
];

/* codepoint -> name. Everything here is either invisible when rendered or
   looks identical to a character that is not it. */
const SUSPECT = {
  0x00a0: 'NO-BREAK SPACE',
  0x00ad: 'SOFT HYPHEN',
  0x180e: 'MONGOLIAN VOWEL SEPARATOR',
  0x2000: 'EN QUAD', 0x2001: 'EM QUAD',
  0x2002: 'EN SPACE', 0x2003: 'EM SPACE',
  0x2004: 'THREE-PER-EM SPACE', 0x2005: 'FOUR-PER-EM SPACE',
  0x2006: 'SIX-PER-EM SPACE', 0x2007: 'FIGURE SPACE',
  0x2008: 'PUNCTUATION SPACE', 0x2009: 'THIN SPACE',
  0x200a: 'HAIR SPACE',
  0x200b: 'ZERO WIDTH SPACE',
  0x200c: 'ZERO WIDTH NON-JOINER',
  0x200d: 'ZERO WIDTH JOINER',
  0x200e: 'LEFT-TO-RIGHT MARK', 0x200f: 'RIGHT-TO-LEFT MARK',
  0x202a: 'LRE', 0x202b: 'RLE', 0x202c: 'PDF', 0x202d: 'LRO', 0x202e: 'RLO',
  0x202f: 'NARROW NO-BREAK SPACE',
  0x205f: 'MEDIUM MATHEMATICAL SPACE',
  0x2060: 'WORD JOINER',
  0x2066: 'LRI', 0x2067: 'RLI', 0x2068: 'FSI', 0x2069: 'PDI',
  0x3000: 'IDEOGRAPHIC SPACE',
  0xfeff: 'BOM / ZERO WIDTH NO-BREAK SPACE',
  0xfffc: 'OBJECT REPLACEMENT CHARACTER',
  0xfffd: 'REPLACEMENT CHARACTER (mojibake — a decode already went wrong)',
};

/* U+E0000-E007F. These have no rendering and no legitimate use in a web page. */
const isTagChar = cp => cp >= 0xe0000 && cp <= 0xe007f;
/* Unassigned/private-use planes that occasionally carry payloads. */
const isPrivateUse = cp => (cp >= 0xe000 && cp <= 0xf8ff) ||
                           (cp >= 0xf0000 && cp <= 0xffffd) ||
                           (cp >= 0x100000 && cp <= 0x10fffd);

const hex = cp => 'U+' + cp.toString(16).toUpperCase().padStart(4, '0');

let findings = 0;
let missing = 0;

for (const rel of TARGETS) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.log(`  ?  ${rel} — not found, skipped`);
    missing++;
    continue;
  }
  const text = fs.readFileSync(abs, 'utf8');
  const lines = text.split('\n');
  const hits = [];

  lines.forEach((line, i) => {
    /* Iterate by code point, not by UTF-16 unit, so astral characters are
       read as one thing and surrogate halves are never reported separately. */
    let col = 0;
    for (const ch of line) {
      col++;
      const cp = ch.codePointAt(0);
      let name = SUSPECT[cp];
      if (!name && isTagChar(cp)) name = 'TAG CHARACTER';
      if (!name && isPrivateUse(cp)) name = 'PRIVATE USE';
      if (name) hits.push({ line: i + 1, col, cp, name, context: line.trim().slice(0, 60) });
    }
  });

  if (hits.length) {
    console.log(`\n  FAIL  ${rel}`);
    for (const h of hits) {
      console.log(`        ${rel}:${h.line}:${h.col}  ${hex(h.cp)}  ${h.name}`);
      console.log(`        └─ ${h.context}`);
    }
    findings += hits.length;
  } else {
    console.log(`  ok    ${rel}`);
  }
}

console.log('');
if (missing) {
  console.log(`${missing} target(s) missing — update TARGETS in this file if a path moved.`);
}
if (findings) {
  console.error(`${findings} invisible or exotic character(s) found. Nothing was changed; ` +
                `fix them at the source above.`);
  process.exit(1);
}
console.log(`Clean: ${TARGETS.length - missing} file(s), no invisible characters.`);

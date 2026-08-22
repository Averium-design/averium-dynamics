#!/usr/bin/env node
/**
 * Builds responsive derivatives of the blog photographs.
 *
 *   npm i -D sharp && node scripts/build-images.js
 *
 * sharp is deliberately NOT a dependency in package.json. It ships prebuilt
 * platform binaries, and adding it would make every Vercel build install them
 * to produce files that are already committed. Install it when you need to
 * regenerate, then remove it again.
 *
 * WHY THIS EXISTS
 * The article layout is .wrap{max-width:56rem;padding:0 1.5rem}, so a figure is
 * 848 CSS px at most, ever. The originals are 1250-1600px wide and were served
 * whole to every visitor, phones included: 1.13 MB of photographs on a page
 * whose readers are fire crews on bad signal. That is the same argument that
 * put a system font stack on the Size-Up.
 *
 * WIDTHS
 * 424 / 848 / 1272 - 0.5x, 1x and 1.5x of the display box. Nothing is upscaled:
 * a width larger than the source is skipped, so a 1250px original stops at 848.
 * 2x (1696) is deliberately absent - no source is that wide, and generating it
 * would mean upscaling, which costs bytes and adds no detail.
 *
 * FORMATS
 * AVIF, WebP and JPEG at every width. The <picture> element lets the browser
 * take the first type it understands, so AVIF goes to browsers that support it
 * and the JPEG set still resizes for everyone else. og-card.jpg is skipped: it
 * is consumed by link-preview scrapers at a fixed 1200x630 and must stay one
 * file at one URL.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIR = path.resolve(__dirname, '..', 'public', 'blog', 'img');
const WIDTHS = [424, 848, 1272];
const SKIP = new Set(['og-card.jpg']); // fixed-size social card, not part of the layout

// Quality chosen per format, not shared: AVIF holds up far lower than JPEG does.
const OPTS = {
  avif: { quality: 50 },
  webp: { quality: 72 },
  jpeg: { quality: 78, mozjpeg: true },
};

async function main() {
  const sources = fs.readdirSync(DIR)
    .filter(f => /\.jpg$/i.test(f) && !/-\d+w\./.test(f) && !SKIP.has(f))
    .sort();

  if (!sources.length) throw new Error('build-images: no source photographs found in ' + DIR);

  let before = 0, generated = 0;
  const report = [];

  for (const file of sources) {
    const src = path.join(DIR, file);
    const stem = file.replace(/\.jpg$/i, '');
    const meta = await sharp(src).metadata();
    before += fs.statSync(src).size;

    const row = { file, source: `${meta.width}x${meta.height}`, out: {} };

    for (const w of WIDTHS) {
      if (w > meta.width) continue; // never upscale
      for (const [fmt, ext] of [['avif', 'avif'], ['webp', 'webp'], ['jpeg', 'jpg']]) {
        const dest = path.join(DIR, `${stem}-${w}w.${ext}`);
        await sharp(src).resize({ width: w, withoutEnlargement: true })[fmt](OPTS[fmt]).toFile(dest);
        row.out[`${w}w.${ext}`] = fs.statSync(dest).size;
        generated++;
      }
    }
    report.push(row);
  }

  for (const r of report) {
    console.log(`${r.file}  (source ${r.source})`);
    for (const [k, v] of Object.entries(r.out)) {
      console.log(`   ${k.padEnd(12)} ${String(v).padStart(8)} bytes`);
    }
  }

  const mobile = report.reduce((n, r) => n + (r.out['424w.avif'] || 0), 0);
  console.log(`\n${generated} files generated from ${report.length} photographs.`);
  console.log(`Originals total          ${before} bytes`);
  console.log(`A phone taking 424w AVIF ${mobile} bytes  (${(100 - (mobile / before) * 100).toFixed(1)}% less)`);
  console.log('\nThe markup is not written by this script. Each <img> needs its <picture>');
  console.log('block updated by hand in both article files if a width or format changes.');
}

main().catch(e => { console.error(e.message); process.exit(1); });

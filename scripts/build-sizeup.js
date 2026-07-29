#!/usr/bin/env node
/**
 * Builds the two Size-Up pages from one source.
 *
 *   scripts/sizeup.src.html  ->  public/sizeup.html      (English,  /sizeup)
 *                            ->  public/sizeup-de.html   (German,   /sizeup-de)
 *
 * Two pages rather than one page with a toggle, so a link carries its own language:
 * whoever it gets forwarded to sees the version it was sent as. Generated rather than
 * hand-maintained, because two hand-edited copies drift — that already happened once
 * with the hardcoded fallbacks behind the data-i18n elements.
 *
 * Run after ANY edit to the source:   node scripts/build-sizeup.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'scripts', 'sizeup.src.html');
const SITE = 'https://www.averiumdynamics.com';

const PAGES = {
  en: {
    out: 'sizeup.html',
    url: `${SITE}/sizeup`,
    image: `${SITE}/sizeup-preview.jpg`,
    locale: 'en_GB',
    altLocale: 'de_DE',
    title: 'Pyrognosis — Fire Size-Up',
    ogTitle: 'Fire Size-Up — see the ground before you arrive',
    ogDesc:
      'Drop a pin on a fire and read the hillside: how steep, which way it will run, ' +
      'the wind, and your nearest fire stations. Built by Averium Dynamics, Berlin.',
    desc:
      'See the ground before you arrive: how steep it is, which way the fire will run, ' +
      'the wind, and your nearest fire stations. From Averium Dynamics.',
    imgAlt:
      'The Fire Size-Up tool showing a hillside near Cazorla with slope, wind and fire direction.',
  },
  de: {
    out: 'sizeup-de.html',
    url: `${SITE}/sizeup-de`,
    image: `${SITE}/sizeup-preview-de.jpg`,
    locale: 'de_DE',
    altLocale: 'en_GB',
    title: 'Pyrognosis — Lagebeurteilung',
    ogTitle: 'Lagebeurteilung — das Gelände kennen, bevor Sie eintreffen',
    ogDesc:
      'Markieren Sie ein Feuer auf der Karte und lesen Sie den Hang: Steilheit, Laufrichtung, ' +
      'Wind und die nächstgelegenen Feuerwachen. Entwickelt von Averium Dynamics, Berlin.',
    desc:
      'Das Gelände kennen, bevor Sie eintreffen: Steilheit, Laufrichtung des Feuers, Wind ' +
      'und die nächstgelegenen Feuerwachen. Von Averium Dynamics.',
    imgAlt:
      'Die Lagebeurteilung zeigt einen Hang bei Cazorla mit Steilheit, Wind und Laufrichtung des Feuers.',
  },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Replace the content of a meta tag matched by its name/property, failing loudly if the
// tag is missing — a silently skipped substitution is exactly how the two copies drifted.
function setMeta(html, attr, key, value, label) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`build-sizeup: could not find <meta ${attr}="${key}"> (${label})`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function build(lang) {
  const p = PAGES[lang];
  let html = fs.readFileSync(SRC, 'utf8');

  // 1. The language the script runs in.
  const langRe = /let LANG = '(?:en|de)'; \/\/ BUILD:LANG/;
  if (!langRe.test(html)) throw new Error('build-sizeup: BUILD:LANG marker not found');
  html = html.replace(langRe, `let LANG = '${lang}'; // BUILD:LANG`);

  // 2. Document language.
  html = html.replace(/^<html lang="[a-z-]+">/m, `<html lang="${lang}">`);

  // 3. Title.
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);

  // 4. Link preview — a German recipient must not get an English card.
  html = setMeta(html, 'name', 'description', p.desc, lang);
  html = setMeta(html, 'property', 'og:title', p.ogTitle, lang);
  html = setMeta(html, 'property', 'og:description', p.ogDesc, lang);
  html = setMeta(html, 'property', 'og:url', p.url, lang);
  html = setMeta(html, 'property', 'og:image', p.image, lang);
  html = setMeta(html, 'property', 'og:image:alt', p.imgAlt, lang);
  html = setMeta(html, 'property', 'og:locale', p.locale, lang);
  html = setMeta(html, 'property', 'og:locale:alternate', p.altLocale, lang);
  html = setMeta(html, 'name', 'twitter:title', p.ogTitle, lang);
  html = setMeta(html, 'name', 'twitter:description', p.ogDesc, lang);
  html = setMeta(html, 'name', 'twitter:image', p.image, lang);

  // 5. Canonical, plus hreflang so each page points at its counterpart.
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\/>/,
    `<link rel="canonical" href="${p.url}"/>\n` +
    `<link rel="alternate" hreflang="en" href="${PAGES.en.url}"/>\n` +
    `<link rel="alternate" hreflang="de" href="${PAGES.de.url}"/>`
  );

  // 6. Mark the active side of the EN/DE control.
  html = html
    .replace(/<a href="\/sizeup" data-lang="en"[^>]*>/, `<a href="/sizeup" data-lang="en"${lang === 'en' ? ' class="on"' : ''}>`)
    .replace(/<a href="\/sizeup-de" data-lang="de"[^>]*>/, `<a href="/sizeup-de" data-lang="de"${lang === 'de' ? ' class="on"' : ''}>`);

  const dest = path.join(ROOT, 'public', p.out);
  fs.writeFileSync(dest, html, 'utf8');
  return { dest, bytes: Buffer.byteLength(html), lang };
}

const results = Object.keys(PAGES).map(build);
for (const r of results) {
  console.log(`${r.lang.toUpperCase()}  ->  public/${path.basename(r.dest)}  ${r.bytes} bytes`);
}
console.log('\nSource of truth: scripts/sizeup.src.html — never edit public/sizeup*.html by hand.');

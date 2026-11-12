# Pre-publish checklist for a Field Note

Every line here represents something that has already shipped broken on this
site. Work through it before the publish merge, not after.

## Writing

- [ ] "Not X. It is Y." used **at most twice**, and only where the shape belongs
      to a speaker or the disclaimer is the point. Count them.
- [ ] Sections are unequal in length, because the subjects are.
- [ ] Some paragraphs merely carry information and do not land a punch.
- [ ] Figure captions describe the picture. At most one or two do more, and the
      set does not read as one voice.
- [ ] No caveat boxes repeating per section.
- [ ] Every number has a source, or the piece says why there is none.
- [ ] Any claim that failed checking was **dropped, not softened**.
- [ ] Corrections against our own argument are stated in the text.
- [ ] Paraphrased quotes are labelled as paraphrased; translated ones say so.
- [ ] The disclosure that Averium develops firefighting drones is present.
- [ ] Sources block: each source named, linked, dated, and says which fact it
      supports.

## Both languages

- [ ] German edited to match the English, not translated afresh.
- [ ] Same byline date on both, and `article:published_time` agrees.
- [ ] Same reading-time figure on both.
- [ ] Image sets identical across the two.
- [ ] Language link is at the top of the page (site header), not the sources block.

## Head

- [ ] `<title>` ≤ ~60 characters, query front-loaded.
- [ ] `<meta name="description">` **≤ 160 characters.** Measure it as UTF-8 from
      the file — a shell pipe miscounts umlauts.
- [ ] `canonical` points at this page.
- [ ] `hreflang` en + de + x-default, on **both** pages, each listing itself.
- [ ] OG and Twitter tags complete, `og:image` 1200×630 and it exists.
- [ ] `robots` is `index, follow`.

## Structured data

- [ ] JSON-LD parses. Paste it somewhere and parse it — do not eyeball it.
- [ ] `datePublished` and `dateModified` are right.
- [ ] `citation` lists the real sources.
- [ ] BreadcrumbList: Averium Dynamics → Field Notes → this article, and the
      visible crumb matches it.
- [ ] `author`/`publisher` `@id` is byte-identical to `public/index.html`.
- [ ] **Nothing in the schema that is not visible on the page.**

## Images

- [ ] Every photograph is actually the thing it claims to be — right equipment,
      right country, not colour-graded into somewhere else.
- [ ] No caption excuses its own photograph.
- [ ] `node scripts/build-images.js` run; `<picture>` blocks written with
      `sizes="(min-width: 896px) 848px, calc(100vw - 3rem)"`.
- [ ] Nothing upscaled — a source narrower than a width has no such variant and
      the srcset does not list it.
- [ ] Real alt text on all, in the page's language.
- [ ] `width`/`height` on every `<img>` so the layout cannot shift.
- [ ] First figure: `fetchpriority="high"`, not lazy. All others lazy.
- [ ] Every photographer credited, licence linked, with a file mapping.

## Wiring

- [ ] Both rewrites added to `vercel.json`, above the `/(.*)` catch-all.
- [ ] Both URLs in `public/sitemap.xml` with three `xhtml:link` alternates and a
      real `lastmod`.
- [ ] Both added to the `posts` array in `src/Blog.js`.
- [ ] New hand-written files added to `TARGETS` in `scripts/check-invisible.js`
      — the list is hardcoded, so a new file is unchecked until you add it.

## Verify before merging

- [ ] `npm run check` clean.
- [ ] `npm run build` succeeds.
- [ ] Served locally and **looked at, at 1080px AND 375px**: no sideways scroll,
      the table scrolls inside its own box, its caption is outside that box, the
      headline is not five lines on mobile, text width equals image width.
- [ ] Tap targets on any standalone link are not just the line box: at least
      24×24 CSS px (WCAG 2.2 AA), aim for 48×48. See the `seo` skill's thresholds.

## Verify after deploying

- [ ] **Load the page and read the browser tab.** `/blog` has inherited the
      homepage's title twice.
- [ ] Check **content**, never a status code — `vercel.json` rewrites everything
      to `/`, so a missing page returns the homepage with HTTP 200.
- [ ] Both language pages, and the link between them, in a browser.
- [ ] The sitemap serves as `application/xml` and contains the new URLs.
- [ ] If anything non-ASCII changed, confirm zero replacement characters on the
      rendered page.

## Finally

- [ ] `SESSION_LOG.md` appended on `docs/session-log`: done, decided and why,
      broke, still open. Reversals say they are reversals.
- [ ] Link previews reshot **against production** if the page they show changed
      — a local server has no `api/sizeup-data`, so a local screenshot of the
      Size-Up shows an error card.

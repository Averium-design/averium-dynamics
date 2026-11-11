---
name: field-notes
description: How to write, build and publish a Field Notes article for Averium Dynamics, in English and German. Use when writing a new blog post or article, editing an existing one, drafting article copy, or when asked to make writing not read as AI-generated. Carries the house voice, the factual discipline, the bilingual rules and the full pre-publish checklist.
---

# Writing a Field Note

Two pieces exist so far, each in two languages: the Müritz piece (2026-08-18)
and the munitions-contaminated land piece (2026-11-12).
Everything below was learned by getting it wrong first. `SESSION_LOG.md` on
`docs/session-log` has the incidents; this is the distilled rule.

For the technical/indexing side see the **`seo`** skill. This one is about the
writing and the article's own build. They overlap deliberately at the checklist.

## What a Field Note is

A write-up of a **real fire that actually happened**, and of the equipment sent
to it — **or of the rules that govern how such a fire may be fought**, read from
the rule texts themselves rather than from how they are usually quoted. A fire
piece names the place, the dates and the sources; a rules piece names the rule,
its edition or date, and who issued it. Either way, nothing unnamed. Widened on
2026-11-12 for the munitions piece, rather than opening a second category. The
reader is a district fire
officer, a forestry manager or someone in an environmental authority — a
professional who will know immediately if you are bluffing.

The house test: **dull where the facts are dull.** If a section has nothing to
say, it is short. Do not manufacture significance.

We sell wildfire prediction and suppression. That makes every article a piece
with an interest in its own conclusion, which is why the disclosure rule below
is not optional.

## The voice, and the tells that break it

The first draft of article one was rejected as obviously machine-written. The
tells were **structural**, not vocabulary — you cannot fix this by swapping
words:

- **"Not X. It is Y."** Negation then correction. This is the single most
  recognisable machine-writing signature. Article one used it six times in
  2,000 words; it was cut to two. **Cap it at two per article**, and only where
  the shape belongs to the person speaking or where the disclaimer is the point.
- **Every paragraph landing a punch.** Real writing has paragraphs that merely
  carry information. Let some of them be flat.
- **Sections of equal length.** Real subjects are unequal. The drone section is
  shorter than the fire engine section because there is less to say.
- **Templated per-section caveat boxes.** One caveat where a caveat is needed,
  written as a sentence.
- **Aphoristic figure captions.** Article one had a set of captions that all
  landed the same way and read as one voice. Three were rewritten as plain
  description and a fourth dropped. **Captions describe the picture.** Only one
  or two in a piece should do more.
- **Inter as the body face.** It is the default of most generated sites. These
  articles are Lora 600 headlines + DM Sans body, deliberately diverging from
  the rest of the site. See "Typography" below before touching it.

Read the draft asking "which sentence would a person not have bothered to
write?" — and delete it.

## Factual discipline

This is the part that makes the writing worth trusting.

- **A claim that does not survive checking gets dropped, not softened.** Three
  went from article one's brief: the Müritz fire was July 2026 not August; the
  1,000 m munitions clearance bound ground crews, not aircraft; and no
  defensible duration for the fire could be sourced.
- **State the correction in the text.** Article one says outright that the
  helicopters were *not* grounded and flew 316 sorties, because the easy version
  of the argument would have implied otherwise. Correcting yourself in public is
  worth more than the point you gave up.
- **No number you cannot source.** Article one gives **no euro figures at all**
  and says so, because no defensible cost-per-flight-hour for German
  firefighting aircraft could be found. Write "no figure given, for the reason
  above" rather than estimating.
- **Label paraphrased quotes as paraphrased.** Both quotes in article one are
  from interviews and say so; the German notes when one is translated.
- **Disclose the interest.** Article one ends: "Averium Dynamics develops
  firefighting drones. The limits set out in the drone section are the ones that
  constrain that work." Keep this in every piece.
- **Sources are named, linked and dated** in a Sources block, each one saying
  which fact it supports.
- **Never assert a path, number or date you have not checked in this session.**

## What earns citations and links

In priority order, from what actually changed these pages:

1. **A comparison table.** A retrieval system extracts a real `<table>` far more
   reliably than the same facts spread over six prose sections, and a reader
   deciding what to send wants the shape of the answer before 1,300 words of it.
   Article one names five criteria and then answers them across four sections;
   the table puts them side by side and **adds no claim the prose does not make**.
   Use `<th scope>`, wrap it per the checklist, caption it outside the scroll box.
2. **Claims that survive being lifted out of context.** One sentence, one fact,
   no back-reference. A passage that needs the paragraph above it will be quoted
   wrongly or not at all.
3. **Named, linked, dated sources.**
4. **The disclosure.** It is why the piece reads as reporting rather than a
   brochure.
5. **Structured data.** Not a ranking factor — it tells an answer engine who
   published this and when.

## Length and shape

Article one: ~1,365 words English, ~1,283 German, six minutes, one `h1` and
eight `h2`, seven photographs plus the comparison table. That is a working
target, not a quota. Headings should
read as the questions a reader would ask, because those are the passages that get
extracted.

Open with the specific event, not with context. Article one opens on a date, a
place and a number of hectares.

## Bilingual rules

One piece in two languages, not two articles.

- **The German is edited to match, not translated afresh.** When the English
  changes, edit the German to match the change.
- **Same byline date on both.** A reversal already happened here: the German
  was published as 19 August, then changed to 18 to match the English, and
  `article:published_time` with it.
- **Same reading time figure** for both, even though the word counts differ —
  German runs slower per word than its lower count implies.
- **The image sets stay identical.** A checklist will flag reuse across pages;
  these are one article in two languages, declared by hreflang, and a reader
  never sees both. Do not make one language poorer to satisfy a rule aimed at a
  different problem.
- **The language link belongs in the byline**, not the sources block — telling
  readers at the bottom which languages exist tells them after they have given up.
- **hreflang must list every language including itself, plus x-default**, in the
  page AND in the sitemap. A set where one side omits the other is discarded whole.
- `/blog` is currently **English only**, so the German article's up-link goes to
  an English index. Known; a German index is a separate decision.

## Typography

Do not change these without deciding the same thing for `src/index.css`:

- **Lora 600 for headlines, DM Sans for body.** Chosen off a specimen sheet of
  seven faces rendered on the real headline at real sizes. Comparing faces at the
  same pixel size compares x-heights, not character — build a specimen sheet and
  pick from pictures, not from font names.
- Sizes are **optically corrected for Lora**: h1 3.375rem desktop / 2.0625rem
  mobile, h2 1.9rem / 1.5rem. The mobile step exists because at 2.375rem the
  English headline ran to five lines.
- **The prose has NO max-width and must not get one.** The photographs set the
  width of this layout; a narrower text column reads as broken beside them. A
  serif body with a 37rem measure was tried and reverted the same day.
- The wordmark and the CTA h3 stay **Space Grotesk** — that is what still ties
  these pages to the homepage.
- A font change alters the measure and the line count. **Serve `public/` locally
  and look at 1080px and 375px.** A 99-character measure and a five-line mobile
  headline were both caught that way and neither was visible in a diff.

## Photographs

- **The picture must be the thing it claims to be.** Removed so far: a US pumper
  beside a US ambulance on a road with yellow centre lines; a PZL W-3 running a
  rescue hoist, which is not firefighting; colour-graded Mediterranean scrub
  standing in for Germany; and an agricultural sprayer over a flooded field
  captioned as a drone in the one section that argues for our own airframe. That
  last one was deleted rather than swapped, and its section now runs without a
  figure.
- **A caption that has to excuse the photograph means the wrong photograph.**
- Keep frames whole. Update `width`/`height`; do not crop to fit.
- Alt text describes what is in the frame, in the article's language.
- Credits: every photographer named, licence linked. The name-to-file mapping
  lives in `references/photo-credits.md` — add a row in the same commit as a
  new image, and write "unknown" rather than guess.
- Run `node scripts/build-images.js` (see the `seo` skill; `sharp` is not a
  project dependency) and use the `<picture>` markup with
  `sizes="(min-width: 896px) 848px, calc(100vw - 3rem)"`. Never upscale.

## Building a new article

1. Write `public/blog/<english-slug>.html` and `public/blog/<german-slug>.html`.
   These are **hand-written static HTML**, not generated — unlike the Size-Up.
   Copy an existing article as the skeleton; it carries the head, the CSS, the
   crumb, the byline and the footer.
2. Add **both** rewrites to `vercel.json`, above the `/(.*)` catch-all.
3. Add both to `public/sitemap.xml` with the three `xhtml:link` alternates.
4. Add the pair to the `posts` array in `src/Blog.js`.
5. Update the JSON-LD: `datePublished`, `dateModified`, `image`, `citation`,
   `wordCount`, and the BreadcrumbList's last item. `author` and `publisher`
   reference `https://www.averiumdynamics.com/#organization` — keep that string
   byte-identical.
6. Generate the images, write the `<picture>` blocks.
7. An OG card at 1200×630. The current one is a crop of a photograph inside the
   article, which is a known stopgap — do better if you can.

## Before you publish

Run `references/checklist.md` in this skill. It is short and every line on it
represents something that has already shipped broken.

## Publishing

Branch, one work commit with a real explanation in the body, then a `--no-ff`
publish merge to `main`. Never commit to `main` directly. Vercel deploys on push.
After deploy, **check the live page's content** — `vercel.json` rewrites
everything to `/`, so a status code proves nothing.

Then append to `SESSION_LOG.md` on `docs/session-log`: what was done, what was
decided and why, what broke, what is still open. If a decision reverses an
earlier one, say so and say why.

## Still open, so article two does not inherit them blind

- `og-card.jpg` is a crop of `fire-front-night.jpg`, a photograph already inside
  the article. Fixing it needs an image we do not have.
- **The byline is the organisation, not a person.** A named author with real
  credentials is the stronger authority signal and we have them — it is an
  unmade decision, not an oversight. Schema must change with the visible byline.
- The mapping in `references/photo-credits.md` is reconstructed for article
  one, and two of its rows (`fire-engine.jpg`, `helicopter.jpg`) can only say
  "royber99 or benerott". Article one's credit line also still names viya0414,
  whose picture was deleted.
- Two pieces now exist. Two is where topical authority starts becoming possible
  at all.

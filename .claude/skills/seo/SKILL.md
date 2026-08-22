---
name: seo
description: The SEO and answer-engine method for the Averium Dynamics site. Use when adding or editing a page, a blog article, metadata, structured data, robots.txt or the sitemap, or when asked to make something findable, rank better, or get cited by AI search. Records what was tested and what was rejected, so neither gets rediscovered.
---

# SEO and answer-engine optimisation for this site

Decisions live in `SESSION_LOG.md` on `docs/session-log`. This file is the
method: what to do, in what order, and what has already been ruled out.

## What this site is optimising for

Averium Dynamics sells BioSphereX — a closed-loop predict, suppress, contain
wildfire system — to fire agencies, districts and environmental authorities,
mostly German and EU. Pyrognosis is the prediction layer. The funnel is
article → the free Size-Up tool → contact.

Nobody searches for the company by name yet. Traffic has to come from
informational queries and from being quoted in AI answers. That makes the
articles the product surface, and citation the channel. Optimise for **being
quoted accurately**, not for ranking a brand term nobody types.

## Order of work. Do not skip to the bottom.

1. **Can it be found at all?** A page nothing links to and no sitemap declares
   is invisible however good its markup is. Check `grep -rln <slug> src/` and
   the sitemap before touching anything else.
2. **Can a machine read what it is?** Title, description, canonical, hreflang,
   then structured data.
3. **Can a passage be extracted from it?** Headings that match questions,
   tables, and claims that stand alone in one sentence.
4. **Is there a reason to trust it?** Named sources, dates, a disclosure when
   we have an interest, and a byline.

## Rules with teeth

- **`vercel.json` ends with `/(.*)` -> `/`.** Any file that does not exist
  answers with the React app at HTTP 200 and `content-type: text/html`. This is
  how `/robots.txt` and `/sitemap.xml` were both "present" and both broken
  until 2026-08-22. **Never verify by status code. Check the content type and
  the first line of the body.**
- **Files in `public/` are served ahead of the rewrites.** That is the fix for
  anything that must be a real file.
- **Never `Disallow` a URL that carries `noindex`.** The crawler has to fetch
  the page to read the tag. Blocking it leaves the page indexable-by-rumour:
  reachable by link, never re-checked, impossible to remove.
- **Never list a `noindex` URL in the sitemap.** Asking for indexing in one
  place and refusing it in another discredits the whole file. `/sizeup` and
  `/sizeup-de` are currently `noindex, nofollow, noarchive` — which also means
  they cannot pass a link to anything.
- **`lastmod` must be a real date.** A sitemap that claims today on every crawl
  is treated as noise.
- **Every hreflang set must list every language including itself.** A set where
  one side omits the other is discarded whole. It is declared twice on purpose,
  in the pages and in the sitemap.
- **Schema may only describe what is visible on the page.** Google's rule, not
  a preference. If the byline says the organisation, `author` is the
  organisation. Changing one means changing the other.
- **The Organization node is defined once**, in `public/index.html`, and
  referenced by `@id` from the articles. Keep
  `https://www.averiumdynamics.com/#organization` byte-identical everywhere.
- **The two Size-Up pages are generated.** Edit `scripts/sizeup.src.html` and
  run `node scripts/build-sizeup.js`.
- **Run `npm run check` before committing.** It catches invisible characters
  that make a word un-greppable and never show in a diff.

## What actually earns a citation

Ranked by what changed the pages here, not by what a guide claims:

1. **A table.** A retrieval system extracts a table far more reliably than the
   same facts spread over six prose sections. Use a real `<table>` with
   `<th scope>`; never a layout that looks like one.
2. **Claims that survive being lifted out of context.** One sentence, one
   fact, no back-reference. A passage that needs the paragraph above it to make
   sense will be quoted wrongly or not at all.
3. **Named, linked, dated sources.** This site's articles cite the Nordkurier,
   the Bundeswehr and the national park by name and link. Keep that.
4. **A disclosure when we have an interest.** The blog says outright that
   Averium develops firefighting drones and that the limits named in the drone
   section constrain that work. It costs nothing and it is why the piece reads
   as reporting.
5. **Structured data.** It is **not** a ranking factor — Google has said so.
   It tells an answer engine who published a page and when.

## Ruled out. Do not re-raise without new evidence.

- **`llms.txt`** — 97% of them are never fetched by an AI crawler across
  137,000 domains of server logs, and Google stated in June 2026 that it has no
  effect on Search or AI Overviews either way. Rejected 2026-08-22.
- **FAQ schema for rich results** — restricted to government and health sites.
  A real question-and-answer section in the HTML is worth more than the markup.
- **Keyword-editing the prose.** These articles were deliberately rewritten to
  remove machine-writing tells. Keyword density would undo that for nothing;
  it is not how retrieval works.
- **Migrating off create-react-app.** Real problem, wrong size for an SEO task.

## Before you say it is done

Serve `public/` locally and open the page at **1080px and 375px**. A `<caption>`
inside a horizontally scrolling box is invisible on a phone and looks perfect in
a diff. Then check the deployed URL, by content.

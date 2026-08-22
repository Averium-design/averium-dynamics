# Averium Dynamics — Session Log
Read this file at the START of every session. Append at the END.

## How to use this file
- Newest entry at the top, directly under "Sessions"
- One entry per session, dated
- Record: what was done, what was decided and why, what broke, what is
  still open
- Do NOT record: plans, speculation, or anything not actually finished
- If a decision reverses an earlier one, say so and say why

## Standing context
- Averium Dynamics UG, Berlin. Wildfire detection and suppression.
- Website repo: C:\Users\safia\averium-dynamics
- Platform repo: C:\Users\safia\pyrognosis. Production is the `prodserver`
  remote, leo@46.225.110.213:/home/leo/pyrognosis (pyrognosis-prod-01).
  The deployed branch is `fix/ors-base-from-env`, NOT main and NOT a branch
  called prod-main. Verified 2026-08-18: server HEAD -> refs/heads/fix/ors-base-from-env
  at 6edfe57; prodserver/main (d6b12c7) sits 6 commits behind it.
  `git fetch prodserver` before recording anything about production.
- Never commit to main or to the deployed branch directly. Branch, then show
  the diff.
- Never assert a file path, line number, count or test result that has
  not been verified in the current session.
- If an instruction and the server disagree, the server wins. Verify repo
  facts against prodserver, not against what anyone remembers, and say so
  when the two differ.
- Open-Meteo fail-closed is DEPLOYED (tip of fix/ors-base-from-env,
  6edfe57). It was on the open-blocker list until 2026-08-18 and should
  not be re-raised.
- The website reaches Open-Meteo ONLY through api/sizeup-data.js, which holds
  OPEN_METEO_API_KEY (Vercel project env, Production and Preview) and calls
  customer-api.open-meteo.com. The free API is non-commercial and this site
  may not use it. The function fails closed on a missing or rejected key: no
  key means no reading, never a fallback to the free endpoint.
- The two Size-Up pages are GENERATED. Edit scripts/sizeup.src.html and run
  `node scripts/build-sizeup.js`. Never edit public/sizeup.html or
  public/sizeup-de.html by hand.
- Anything this site tells a crew about distance or nearest help is a number
  they may act on. Check it against the source before shipping it.
- vercel.json ends with `/(.*)` -> `/`, so NOTHING on this site can return a
  404. A deleted image, a mistyped article URL or a dead link all return the
  homepage with HTTP 200. Do not use a status code to check that something
  shipped or that something is gone; check the content.
- This is a create-react-app SPA with one `<title>` in index.html for every
  route. Any new React route must set its own document.title, or it silently
  inherits the homepage's. Load the page and read the tab before calling it
  done.
- The two blog articles use Lora for headlines and DM Sans for body while the
  rest of the site is on Inter. Deliberate (2026-08-21); there is a comment in
  each file saying so. Do not "fix" it back without deciding the same thing for
  src/index.css. The prose has NO max-width and must not get one: the
  photographs set the width of that layout, and a narrower text column reads as
  broken next to them.
- A font swap changes the measure and the line count. Serve public/ locally and
  check it at 1080px AND 375px before pushing; both a 99-character measure and a
  five-line mobile headline were caught that way this session and neither was
  visible in a diff.
- When a type choice is being judged by eye, build a specimen sheet and let the
  person pick from pictures. Three rounds were spent picking from font names and
  none of them stuck; one specimen sheet settled it.
- The English and German Size-Up both open on the Müritz. Cazorla is where the
  read was validated, not where the tool should open.
- The Size-Up link previews are screenshots and go stale silently. If the
  default pin, the panel copy or the icons change, public/sizeup-preview.jpg and
  sizeup-preview-de.jpg have to be reshot AGAINST PRODUCTION — the reading comes
  from api/sizeup-data and a local server has no such function, so a local
  screenshot shows an error card.
- Emoji on this site are not one decision. Map markers are functional and stay;
  emoji standing in for interface icons are decoration and go.
- `public/robots.txt` and `public/sitemap.xml` are real files, and they have to
  stay that way. Files in public/ are served ahead of the vercel.json rewrites;
  delete one and that URL silently starts answering with the React app at HTTP
  200 again. Never `Disallow` a page that carries `noindex` — a crawler has to
  fetch the page to read the tag.
- The Organization node is defined once, in `public/index.html`, and both blog
  articles reference it by `@id`. The string
  `https://www.averiumdynamics.com/#organization` must be byte-identical in all
  three files or the references dangle.
- Schema may only describe what is visible on the page — that is Google's rule,
  not a preference. The articles' `author` is the organisation because the
  visible byline says the organisation. Change one and you change both.
- A `<caption>` inside a horizontally scrolling container gets clipped. Captions
  belong outside the scroll box.
- DNS for averiumdynamics.com stays at Namecheap BasicDNS
  (`dns1/dns2.registrar-servers.com`). Do NOT move nameservers to Vercel: the
  domain carries live Zoho mail (3 MX, SPF, a Zoho verification TXT, `_dmarc`)
  and `A pyrognosis 46.225.110.213`, the production platform server. Changing
  nameservers drops every record not recreated by hand.
- The apex is `A @ 216.198.79.1` (Vercel) and is added to the Vercel project
  with a 308 to www. Both `averiumdynamics.com` and `www.averiumdynamics.com`
  are separate entries there and both must stay.
- Windows `nslookup` cannot query CAA and returns the A record instead, which
  reads as "no CAA record" whether or not one exists. Query CAA over
  DNS-over-HTTPS.
- `/sizeup` and `/sizeup-de` are `index, follow` since 2026-08-22 and are in
  the sitemap. If either goes back to `noindex`, remove it from the sitemap in
  the SAME commit. Every load costs an Open-Meteo call against a paid key.
- In `build-sizeup.js`, anything that differs by language lives in `PAGES`, not
  in `sizeup.src.html`. That now includes the JSON-LD.

## Sessions

### 2026-08-22

**The two files every SEO check assumes exist did not exist, and both returned
HTTP 200.** `/robots.txt` and `/sitemap.xml` were each answered with 842 bytes
of the React app at `content-type: text/html`, because `vercel.json` ends with
`/(.*)` -> `/` and there was no file to match first. This is the failure the
standing note about status codes describes, found in the wild: every automated
check that asks "does the site have a robots.txt" gets 200 and passes. Files in
`public/` are served ahead of the rewrites, so a real file is the whole fix.
Verified live after deploy by content type and content, not by status:
`text/plain`, 1,553 bytes for robots.txt and `application/xml`, 2,943 bytes with
three `<loc>` entries for the sitemap.

**robots.txt disallows nothing, and one case is deliberate.** `/sizeup` and
`/sizeup-de` carry `noindex` in a meta tag on the page. A crawler must be
allowed to fetch a page to read that tag, so a `Disallow` here would leave them
indexable-by-rumour: reachable by link, never re-checked, impossible to remove.
There is a comment in the file saying so. The AI crawlers are named
individually rather than left to the wildcard; the effect is identical and the
point is that the decision is on the record with a date.

**The sitemap omits four URLs on purpose.** `/sizeup` and `/sizeup-de` are
noindex, and asking for indexing in one place while refusing it in another is a
contradiction that costs trust in the whole file. `/imprint` and `/privacy` are
React routes that still serve the homepage's title and description, so listing
them would declare near-duplicates.

**No llms.txt, on the evidence.** Server logs across 137,000 domains show 97%
of llms.txt files are never fetched by an AI crawler, and Google stated in June
2026 that the file has no effect on Search or AI Overviews either way. It was
considered and rejected rather than overlooked; it should not be re-raised
without new evidence.

**Structured data is not a ranking factor, and was added anyway.** Google has
said so directly. It is here because an answer engine reads it to work out who
published a page and when, and because these two articles are the pages most
likely to be quoted by one. Both articles now carry Article, WebPage,
BreadcrumbList and a shared Organization node, with `datePublished`,
`dateModified`, `inLanguage`, the images and the four sources the pieces
already cite. The homepage got the Organization node they point at by `@id`,
plus the canonical and the Open Graph set it never had. The `@id` string
`https://www.averiumdynamics.com/#organization` has to stay byte-identical
across all three files or the references dangle; there is a comment in each.

**Author is the organisation, not a person, and that is a held decision rather
than an oversight.** Google requires that schema describe only what is visible
on the page, and the visible byline reads "Averium Dynamics UG, Berlin". A
named human author is the stronger authority signal and we have real
credentials to put behind it, but who gets the byline on a published article is
not a decision to make silently. Both would have to change together.

**The comparison table is the one change a reader will see.** The article
already says "Any comparison worth reading states its criteria" and names five,
then answers them across four prose sections without ever putting them side by
side. The table does that and adds nothing: every cell restates a sentence from
the sections below it, and the two cost cells read "no figure given, for the
reason above" because the piece deliberately gives no euro figures. It is a
real `<table>` for two readers — someone who wants the shape of the answer
before 1,300 words of it, and a retrieval system, which extracts a table far
more reliably than the same facts spread over six sections.

**It was wrong at 375px, and only looking at it showed that.** The page did not
scroll sideways and the table scrolled inside its own box, both correct — but
the `<caption>` was inside that scrolling box too, so it was cut off at the
right edge and unreadable on a phone. Moved to a `<figcaption>` outside the
scroll container, which also matches the figure/figcaption idiom the article
already uses for photographs, with a line that appears under 700px telling the
reader the table scrolls. At 1080px the table is 848px, the same width as the
photographs, which is what this layout is measured against. The German table is
written from the German article's own wording, not translated from the English
one.

**Verified after deploy on the live pages**, not locally: both JSON-LD blocks
parse, the graph resolves to the five expected node types, `dateModified` is
today, six table rows are present in both languages, and the homepage carries
its canonical and Organization node.

Three commits and a publish merge: `20aa044`, `fcb3744`, `7635923` /
`9b7ee97`.

**Still open, and two of them are the ones that matter most.**
- ~~Nothing on this site links to either article.~~ **Closed the same day** -
  see the addendum below.
- ~~`https://averiumdynamics.com` times out.~~ **Fixed the same day** - see
  the addendum below.
- ~~Whether `/sizeup` should stay `noindex, nofollow`.~~ **Decided and shipped
  the same day** - see the addendum below.
- `og-card.jpg` is still a crop of a photograph inside the article, unchanged.
- The homepage still ships an empty `<div id="root">` to crawlers. Metadata now
  carries the meaning; the rendering strategy is untouched.

**Field Notes is back, and that reverses eb7258d from the day before.** Leo's
decision, taken once the consequence was on the table: both articles had been
reachable only by direct URL since 21 August, and the sitemap added this morning
declares them but cannot substitute for a link. The Size-Up pages could not
carry that link either - they are `nofollow`.

Restored rather than rewritten. `src/Blog.js` is the file as it stood at
`eb7258d^`, and the `App.js` change is that commit's own diff applied in
reverse: the import, the nav link, the footer link and the `/blog` route, 25
lines, nothing else. The invisible-character check that shipped in the same
commit is untouched. The original removal recorded no reason, which is why it
was restored intact rather than reconstructed.

**The title fix from the 21st survived, and was checked by loading the page
rather than by trusting the build.** `/blog` reads "Field Notes - Averium
Dynamics" on the live site, and returning to `/` restores both the homepage
title and its description. This route inherited the homepage's title twice
before, on 19 and 21 August, and the build passed both times.

**`check-invisible.js` had a hardcoded TARGETS list, so three shipping files
were unchecked**: `src/Blog.js`, and this morning's `public/robots.txt` and
`public/sitemap.xml`. Added. 13 files to 16, all clean. Any new hand-written
file is invisible to that check until someone edits the list - worth knowing
before trusting a "clean" result.

`/blog` is in the sitemap. It ships no server-rendered text, being a React
route; its worth is that it links to both articles from a page the nav links to.

**Unchanged, and it limits this.** The nav is `hidden md:flex` with no
hamburger, so at 375px the nav link is not rendered at all and mobile readers
reach the blog through the footer link only. Verified at both widths. A
hamburger is a design decision, not a fix, and was not made here.

Verified live: `/blog` returns its own title and description, and both article
links from it resolve to the right pages with the comparison table present.
`74b1902` / `e2fc0ec`.

**The apex now works over HTTPS, and it was never a certificate problem.** The
bare domain pointed at `162.255.119.98`, which identified itself as
`X-Served-By: Namecheap URL Forward` / `Server: namecheap-nginx`. That service
listens on port 80 only - port 443 timed out, no listener - so no certificate
could exist for it however long anyone waited. The live certificate covered
`CN=www.averiumdynamics.com` alone, which was the tell that the apex had never
been added to the Vercel project at all.

Fixed in two places, neither of them this repo. In Vercel, `averiumdynamics.com`
was added to the project as a second domain with a 308 redirect to
`www.averiumdynamics.com`. At Namecheap, the URL Redirect Record on `@` was
deleted and replaced with `A @ 216.198.79.1`, the value from the project's own
domain card. Vercel then issued the certificate itself.

**The shortcut that was deliberately not taken: moving nameservers to Vercel.**
It is the obvious fix and it would have broken company email. The domain carries
live Zoho mail - three MX records, an SPF record and a Zoho verification TXT -
plus `_dmarc`, and an `A pyrognosis 46.225.110.213` record pointing at the
production platform server. Moving nameservers drops everything not manually
recreated. DNS stays at Namecheap BasicDNS; one record changed.

Checked before the change and clear: no CAA records exist on the domain, which
is the usual silent blocker for Let's Encrypt issuance. Windows `nslookup`
cannot query CAA and answers with the A record instead, which reads as "no CAA"
whether or not one exists - it was checked over DNS-over-HTTPS instead.

Verified after: `A 216.198.79.1` on two independent resolvers; a Let's Encrypt
certificate whose subject is `CN=averiumdynamics.com`, valid 22 Aug to 20 Nov
2026; `https://averiumdynamics.com` returning 308 to
`https://www.averiumdynamics.com/` and a 200; a real browser loading the bare
domain with no certificate warning; and MX, SPF, the Zoho TXT and the
`pyrognosis` A record all still present afterwards.

One thing improved that was not the goal. The old Namecheap forward sent
visitors to `http://www...`, so even the path that worked was an insecure hop.
The redirect is now HTTPS end to end.

**The Size-Up is indexable, in both languages.** Leo's decision. It was
`noindex, nofollow, noarchive` for as long as it was only sent to crews we had
briefed; it is a public page now, linked from both articles, and it is the best
entry point the site has - a free tool that needs no login, works anywhere and
answers a question people actually search for.

Both languages rather than one. A `noindex` page inside an hreflang set breaks
the pairing, so indexing English and not German would have been worse than
leaving both out.

Changed at the source per the standing rule - `scripts/sizeup.src.html` and
`scripts/build-sizeup.js`, then `node scripts/build-sizeup.js`. The two
`public/sizeup*.html` files are generated and were not edited by hand.

Added while there: `x-default` on the hreflang set, matching the articles, and
`WebApplication` JSON-LD naming the tool, its language, that it is free, and
the four things it reports. That object is generated per language from a new
`PAGES` entry in the build script rather than kept in the source, because every
value in it differs by language and a second hand-kept copy is how these two
pages drifted before.

**The four `featureList` entries were checked against the rendered page rather
than assumed.** "How steep", "Fire will run", the wind readout and the
nearest-station list are all visible text. Schema describing what a page does
not show is spam under Google's rules, and a feature list is the easiest place
on this site to slip into it.

`robots.txt` and `sitemap.xml` both stated in writing that these pages were
noindex. Corrected in the same commit rather than left contradicting the pages
they describe. The sitemap is 6 URLs now. The rule that produced that paragraph
is kept and restated: never `Disallow` a page carrying `noindex`.

**The tool itself was checked, not just its metadata.** The source file was
edited, so the live page was loaded after deploy: 15 map tiles rendered, the
station markers are there, the reading card populates, and no error card. Title
and `lang` correct on both.

**One follow-up the skill file caused.** The SEO skill still said these pages
were noindex. That edit failed on an em dash and the failure was not caught
before the push, so for one commit a file whose entire job is to stop the next
session rediscovering things asserted the opposite of what had just shipped.
Corrected in `82158d8`. The lesson is narrow and worth keeping: when a fact
changes, the files that *describe* the fact are part of the change, and a
scripted edit that fails silently is worse than no edit.

**Worth knowing before traffic arrives.** Every load of this page calls
`api/sizeup-data`, which holds a paid Open-Meteo key. Indexing attaches a cost
to visits that direct links never generated at this volume. Nobody has put a
ceiling on that.

`8a1e9d5` / `765ae69`, and `82158d8` for the skill correction.

**Recorded late, from the commits.** Two commit pairs from 21 August never
reached this file, because the entry above them was written at 12:45 and both
landed afterwards:
- `eb7258d` / `82759b7`, 14:30 — added `scripts/check-invisible.js`, wired to
  `npm run check`, which fails on zero-width spaces, no-break and narrow
  no-break spaces, soft hyphens, bidi controls and U+FFFD in the hand-written
  sources. **It also deleted the Field Notes index**: `src/Blog.js`, the `/blog`
  route, the nav link and the footer link. That reverses what the 2026-08-21
  entry records as shipped, including the `document.title` fix written up there
  in detail, and no reason was recorded. The articles themselves were untouched.
- `c019338` / `6dcf7af`, 15:04 — homepage Unsplash images sized to the boxes
  they render in. 27.24 MB to 3.19 MB. Recorded here because it was also a
  quality fix, not only a weight one: the HELIOS card had been aliasing into
  moire from browser-side downscaling of a 4,000px contour photograph.

### 2026-08-21

**The two field notes were measured against a 30-point checklist for
AI-generated sites, and three of the six categories did not hold up.** Colour,
layout and interaction passed as they stood: no gradients, no card grid, no
scroll-reveals, one base colour and one accent. Images, prose rhythm and one
typography item did not.

**The drone photograph was the wrong picture, and its own caption said so.** It
was an agricultural sprayer over a flooded field, sitting in the one section
that describes what we build, captioned "Same idea, different job." Removed from
both languages and `public/blog/img/drone-in-flight.jpg` deleted from the repo,
rather than swapped for another stock photograph that is also not a firefighting
drone. The drone section now runs without a figure and is the only section that
does, which also breaks the heading-then-figure rhythm every other section had.
Seven figures and six captions on each article, counted on the live page after
deploy.

**The prose leaned on one construction six times in 2,000 words.** Negation then
correction: "The limit is not the vehicle. It is the last few kilometres."
"Start with what a drone cannot do." "The drone was not the better tool." That
shape is the most recognisable machine-writing signature there is, and at six
uses it had stopped being a device. Cut to two: the paraphrased quote, where it
belongs to the person speaking, and "a drone does not replace a helicopter",
where the disclaimer is the point. Three figcaptions went from aphorism to plain
description and a fourth was dropped, so the set no longer reads as one voice.
The German was edited to match, not translated afresh.

**The EN and DE image sets were deliberately left identical.** The checklist
flags image reuse across pages, but these are one article in two languages,
declared as translations by hreflang. A reader never sees both. Desynchronising
them would have meant making one language poorer to satisfy a rule aimed at a
different problem.

**Nothing on the site linked to the blog.** `grep -rln blog src/` returned
nothing: both articles had been reachable only by direct URL since publication.
Added `src/Blog.js` as a Field Notes index, a `/blog` route, and links in the
nav and the footer. The articles stay static HTML behind the vercel.json
rewrites and are linked with plain anchors, not `<Link>`.

**That index shipped with the homepage's title, and only opening it in a browser
showed it.** This is a create-react-app SPA: one `index.html` with one `<title>`
for every route, so `/blog` inherited "Averium Dynamics - Wildfire Prevention".
The build passed, the page rendered, the links resolved, and it was still wrong.
Same failure mode as /sizeup-de on 2026-08-19, caught earlier this time only
because the page was actually loaded. Blog.js now sets `document.title` and the
meta description in an effect and restores both on unmount; verified by
navigating to /blog and back.

**The type on the articles changed four times, and the last change was the
right one.** Inter is the default body face of most generated sites and was the
last typography tell. It is set site-wide in `tailwind.config.js` and
`src/index.css`, so the choice was between restyling the whole marketing site
and letting the blog diverge. Blog-only was chosen deliberately, against the
recommendation in the room, on the grounds that the articles are the pages that
get read closely and the site-wide question is a separate decision.

The route there was wrong twice, both times by me, and both times only visible
on the page rather than in the diff:

1. **DM Sans.** Correct and invisible. It fixed the tell and changed nothing a
   reader could see, which was the entire point of making the change.
2. **Source Serif 4 as the BODY, with the text column capped at 37rem.**
   Reverted the same afternoon. It read as a printed document rather than a
   field note, and the cap — added because the serif measured 99 characters a
   line at the full width — made the text visibly narrower than the
   photographs. The measure argument was right in the abstract and wrong for a
   layout whose photographs set the width. **Do not reintroduce a max-width on
   the prose.**
3. **Instrument Serif as the HEADLINE.** Rejected as too display-y and
   fashionable for the subject.
4. **Lora at 600 for headlines, DM Sans for body, full width.** Shipped.

The lesson under all of it: the character belongs in the headline, not spread
over the whole page, and a type change nobody can see is not a type change.
The fourth attempt was chosen off a specimen sheet of seven faces rendered on
the real headline at real sizes, with per-face optical correction — comparing
faces at the same pixel size compares x-heights, not character. Picking from
pictures took one round trip and settled what three rounds of picking from font
names had not.

Sizes are optically corrected for Lora: h1 3.375rem desktop and 2.0625rem
mobile, h2 1.9rem and 1.5rem. The mobile step came out of checking it — at
2.375rem the English headline ran to five lines before the reader saw anything
else. The German is still five lines, but its title is 85 characters against
the English 62, so that is the title and not the face.

Headings and the wordmark: the wordmark in the header and footer, and the CTA
h3, stay Space Grotesk. That is what still ties these pages to the homepage.

Verified on both live articles at 1080px and 375px: Lora rendering at 600 with
no faked bold, body DM Sans, text width equal to image width, no horizontal
scroll, no overflow from the long German compounds.

**The English Size-Up opened on a Spanish mountain, and had since it shipped.**
Reported from the live site. /sizeup opened on the Sierra de Cazorla by design,
because that is where the read was validated — but an English-speaking district
officer landed at 1105 m in Andalusia with three Spanish brigades listed as
their nearest help, on a tool linked from an English article about a German
fire, built by a Berlin company. Validation is a reason to trust the numbers,
not a reason to open there. START_EN is now the same Müritz coordinate as
START_DE, kept as two constants so they can diverge again deliberately rather
than by accident. Everything Spain-flavoured that hung off the default went with
it: the coordinate examples in the placeholder and the error message, the
feedback role placeholder, the two HTML placeholders that flash before the
script runs, and the og:image:alt. The baked Spanish stations stay — they are
real fallback entries and the tool works anywhere; only the comment calling them
"the default pin" was wrong. Edited scripts/sizeup.src.html and ran the build,
per the standing rule. Verified live: /sizeup opens at 53.37200, 12.85700, 79 m,
and lists Qualzow and Blankenförde at 4.6 km.

**The Size-Up was measured against the same checklist and scored higher than the
articles**, at roughly 93. It loads no webfont at all — a system stack, which is
the right call for a tool used on bad signal and which makes the checklist's main
typography tell inapplicable. No gradients, no box-shadows, 44px minimum touch
targets and a 16px input to stop iOS zooming, and stat labels in plain English
("How steep", "Fire will run") rather than Slope and Aspect. Its one real failure
was emoji as icons, and the four were not the same thing. The 🔥 and 🚒 used as MAP
MARKERS were kept: they are functional, they read at a glance on a phone at a
roadside, and an SVG pin would cost legibility to satisfy a checklist row. The
other two were decoration on controls with a real job and were replaced with
inline Lucide SVG — locate-fixed for the location button, and pointer for the
"you have just been called to a wildfire" card, whose job is "tap the map", so
the icon now says tap rather than showing an engine the sentence already
described. Both inherit currentColor and are aria-hidden; the busy-state pulse
still works because it animates opacity, and is still off under
prefers-reduced-motion.

**The English link preview had shown a Spanish mountain since 28 July, and the
default change made it contradict its own page.** public/sizeup-preview.jpg was
a Cazorla screenshot, so anyone forwarding /sizeup by mail or WhatsApp pasted a
card showing 1105 m in Andalusia for a tool that now opens in Mecklenburg. The
German preview had been regenerated on the 19th; only English was stale.
Regenerated against PRODUCTION, not a local build — the reading card comes from
api/sizeup-data, which does not exist on a static local server, so a local shot
would have read "could not read this spot". Taken after the icon deploy so the
new SVG is in it. Framed to match the German one rather than inventing a second
treatment: full 1200x630, reading populated, tap-prompt dismissed. 208 KB
against the German 209 KB. The URL is unchanged, so anything holding the old
card will serve Spain until it re-scrapes.

Nine changes, each a work commit and a publish merge: `32bf932`/`dba8084`,
`50bfbad`/`e2bc0f4`, `d24dee9`/`2352fc1`, `4f73aa7`/`622e415`,
`0507d9a`/`9971973`, `6368e2a`/`eb85e47`, `548d184`/`1978ad6`,
`d8d479f`/`8e80326`, `5184e40`/`128bd8f`.

**Still open.** `og-card.jpg` is still a 1200x630 crop of `fire-front-night.jpg`,
a photograph already inside the article; fixing it needs an image we do not
have. The Pixabay credit line names seven photographers and one of them may be
the one whose picture was removed, but there is no name-to-file mapping to check
it against, so the line was left alone rather than guessed at. The site-wide
Inter question is deferred, not settled. The nav is `hidden md:flex` with no
hamburger, so the Field Notes link is desktop-only and mobile readers reach the
blog through the footer.

### 2026-08-19

**A German version of the field note was published, and then the thing it points
at turned out to be broken.** The article carries a call to action for
/sizeup-de. Nobody had opened /sizeup-de in German before sending readers to it.
It opened on the Sierra de Cazorla and told its reader, in German, to tap
somewhere in Spain, and its link-preview image was a screenshot of Cazorla at 24
degrees and 1105 m. The article went live at about 15:45 and the audit that
found this ran afterwards, because the instruction to hold publication until the
audit arrived after the merge had already been pushed. **The lesson is the
ordering, not the defect: a page that sends traffic somewhere is not finished
until someone has used the destination the way its reader will.**

**The Size-Up named help further away than the help that exists. Twice.**
1. The Overpass query said `out center 20`, which returns an arbitrary twenty
   stations inside the 40 km radius, not the nearest twenty. The distance sort
   that followed was honest; its input was not. At the Müritz coordinate,
   production reported the nearest brigade at 18 km while Qualzow and
   Blankenförde sat at 4.6 km. Raised to 200. Cost 0.2 s on a timed live
   comparison, 1.7 s against 1.5 s. It affected every location, not only German
   ones: the English page at Cazorla now surfaces a CEDEFO at 0.9 km that it
   never used to show.
2. When Overpass fails, and it failed on the first live load after deploy, the
   list falls back to baked data. That list did not contain the two brigades at
   4.6 km either. Eleven Mecklenburgische Seenplatte stations were added across
   the day, and there are 30 baked entries now. Verified by ranking the baked
   list from three different pins rather than by eye.

**Open-Meteo was being used outside its licence, from the browser.** Their free
API is non-commercial, and their terms name "integrating our service into
commercial products or promotional activities" as commercial use. The page
called api.open-meteo.com directly, with no key, on every pin drop. A key alone
could not fix it, because a key in public HTML is a key anyone can read, so
api/sizeup-data.js now sits in between. It builds the upstream query itself
rather than forwarding one, holds the key server-side, and fails closed on a
missing or rejected key with no path back to the free endpoint. Verified after
deploy by recording every request the browser makes on the live German page: two
calls to /api/sizeup-data, zero to open-meteo.com, and the key absent from the
rendered HTML. Vercel returned X-Vercel-Cache HIT on a repeat weather request,
so the caching is working rather than merely configured.

**Attribution that the licences ask for by name was missing.** The sources line
said only "measured from satellites"; it now names the Copernicus DEM (GLO-90)
via Open-Meteo, in both languages. Still missing: OpenTopoMap's required string
includes an OpenStreetMap credit that we drop.

**The elevation data was never the problem.** Checked at the provider rather
than assumed: Open-Meteo's elevation API is Copernicus DEM 2021 GLO-90 at 90 m,
documented as available worldwide. A real call for a point in the
Müritz-Nationalpark returned nine plausible elevations. Germany is covered, and
this was a defaults-and-licensing problem throughout, not a data problem.

**Three photographs were replaced.** The fire engine was a US pumper beside a US
ambulance on a road with yellow centre-line markings; it is now a German MAN and
a smaller unit stopped on a sandy track behind Feuerwehr-Sperrzone tape. The
helicopter was a PZL W-3 running a rescue hoist over an alpine meadow, which is
not firefighting at all; it is now a machine carrying a bucket on a long line,
and that machine is marked BUNDESHEER, so Austrian rather than German, which no
caption claims otherwise. The crew shot was colour-graded Mediterranean scrub;
it is now Feuerwehr Partenstein working a hose line over a smouldering forest
floor. Frames were kept whole and the width and height attributes updated,
rather than the photographs cropped to fit. Credits: LindaJM, NetHawk and ELG21
out, royber99 and benerott in, fish96 now covering two images.

**Decisions, and one reversal.** The German byline was published as 19 August,
the day it went out, then changed to 18 August to match the English page,
because it is one piece in two languages rather than two articles, and
article:published_time was changed with it. That reverses a decision taken the
same morning, and it was made knowing it edits a date already published.
Reading time is six minutes, counted from 1365 English and 1283 German words at
220 to 240 words a minute, not the five that was suggested; the same figure
serves both languages because German runs slower per word than its lower count
implies. The language link moved from the sources block to the byline, because
telling readers at the bottom which languages exist tells them after they have
given up. Two details now read more precisely in both languages than the first
draft did, both verified at the Nordkurier: the Käflingsbergturm, and the
Katasteramt des Landkreises.

**Closed from yesterday's open list.** The photograph licence question, which
was in fact already closed by a commit that landed after yesterday's entry was
written.

**Open:**
- The Open-Meteo key was pasted into a chat message. Treat it as exposed:
  rotate it in the Open-Meteo dashboard, update the Vercel variable, redeploy.
- The night fire photograph is still tropical hills across a reservoir, and it
  is the source of the 1200x630 OG card, so replacing it means recutting that
  card for both languages.
- The drone photograph is still an agricultural sprayer over rice paddies. It
  is the section carrying the argument, and it should be our own airframe.
- Esri World Imagery tiles are called with no API key. Esri basemaps normally
  require an account. Their terms page could not be retrieved, so this is
  unverified rather than settled either way.
- The aspect card prints a direction and a dryness note at a 1 degree slope,
  where aspect is DEM noise. It should be suppressed below about 5 degrees.
- The English Size-Up call to action still says "any location in Spain for this
  test", which is untrue for the English page as well.
- OpenTopoMap attribution is incomplete, as above.
- pyrognosis tenant/algeria is 9 commits ahead of origin and exists on one
  laptop only. Unrelated to today, unchanged since 31 July.

### 2026-08-18

**This file was created this session.** Before today neither repo had a rolling
session log; pyrognosis had HANDOFF.md, this repo had nothing. Searched both
repos and their git history for a deleted one first — there had never been one.
Two loose handoffs were found in C:\Users\safia\Downloads, outside version
control.

**The production pointer was wrong three times, and each correction came from
the server, not from a description.**
1. "prod-main" — no branch of that name has ever existed in pyrognosis.
2. "prodserver/main" — the `prodserver` remote was not configured at all. Only
   a stale `refs/remotes/prodserver/main` survived from a removed remote, so
   it could not be fetched and would have answered stale forever.
3. Remote re-added and fetched. The server's HEAD points at
   `refs/heads/fix/ors-base-from-env` (6edfe57), and `prodserver/main`
   (d6b12c7) is **six commits behind what is actually running**. Anyone
   verifying against prodserver/main would have concluded the Open-Meteo
   fail-closed work was not deployed. It is.
Standing context now records the evidence and the date, not just the
conclusion. The rule "if an instruction and the server disagree, the server
wins" was added because of this.

**Line endings were pinned, and it turned out to be hiding real work.**
`app.py` was pure LF on origin/main and fully CRLF on the production branch,
committed from a Windows checkout: a +1137/-1129 diff carrying 8 real lines.
No .gitattributes existed on any branch. Added `* text=auto` (not `eol=lf` —
that would force LF into Windows working trees for no benefit to the problem),
plus `eol=lf` for .sh/.service/.socket/.timer because CRLF breaks those on the
server with an error that never mentions line endings.

Renormalising origin/main touched nine CSVs and no Python. Renormalising the
production branch touched six files and dropped the merge diff from
21,087/1,591 to 19,609/113. Two changes had been invisible inside that noise:
an `except OpenMeteoLicenceError: raise` in app.py without which a revoked key
draws a smoke plume from hardcoded wind values, and the removal of the last
Open-Meteo bypass in the tree in scripts/live_features.py, which had been
silently selecting the free non-commercial endpoint when no key was present.

**First blog post written, then rewritten.** Three claims from the brief did
not survive checking and were dropped rather than softened: the Müritz fire was
July 2026 not August; the 1,000 m munitions clearance bound the ground crews,
not aircraft — the Bundeswehr flew 316 CH-53 sorties over it; and no duration
for the fire could be sourced. The article now states the helicopter
correction itself rather than leaving a reader to catch it. No euro figures
anywhere: no defensible per-flight-hour cost could be found, and the piece says
so. First draft was rejected as obviously AI-written and rewritten — the tells
were structural (a repeated "not X. Y." construction, templated per-section
caveat boxes, equal-length sections, every paragraph landing a punch).

**Nothing was merged into main in either repo.** Five branches pushed:
averium-dynamics `content/blog-vergleich`, `docs/session-log`; pyrognosis
`docs/session-handoffs`, `chore/normalise-line-endings`,
`merge/ors-base-from-env`. The Downloads originals were deleted only after the
pushed remote hashes were verified equal to the local commits.

**Open:**
- `data/openmeteo_client.py` diverges between `merge/ors-base-from-env` and
  `tenant/algeria` — two implementations of the same fail-closed fix, different
  blobs. Whichever merges second silently decides what production runs. Needs a
  decision before either lands.
- `merge/ors-base-from-env` carries the whole Algeria tenant, including the
  provisioner that commit 7397875 explicitly staged but did not run, under a
  branch name that describes one of its seven commits.
- The two blog photographs have no confirmed source or licence. The page says
  only that they are stock and not ours. A credit line is wanted.
- The blog OG card is a crop of a stock photo, pending a purpose-made
  1200x630 card.
- `/sizeup-de` is still noindex and was deliberately left that way; the article
  links to the English `/sizeup`.

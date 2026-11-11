# Photograph credits: which file is whose

Every photograph in `public/blog/img/` mapped to its photographer and source,
so a credit line can be checked against the files instead of trusted. Add a row
in the same commit as a new image. Licence for all rows: Pixabay Content
Licence (https://pixabay.com/service/license-summary/).

"How established" says how sure each row is. **Unknown means unknown** — do
not fill a gap by guessing from the subject of the picture.

## Field Note 2 — munitions-contaminated land (2026-11-12)

| File | Photographer | Pixabay ID / title | How established |
|---|---|---|---|
| `charred-clearing.jpg` | ojkumena | 2370996, "The Forest Fell" (listed as "Charred forest clearing with smoke") | Supplied and verified by Leo, 2026-11-12. CDN URL: `cdn.pixabay.com/photo/2017/06/04/12/55/the-forest-fell-2370996_1280.jpg` |
| `fire-trucks-forest.jpg` | rico_loeb | 1345264, "Row of fire trucks near forest" | Supplied and verified by Leo, 2026-11-12. CDN URL: `cdn.pixabay.com/photo/2016/04/22/07/21/fire-1345264_1280.jpg` |
| `og-munitions.jpg` | rico_loeb | crop of 1345264 | 1200x630 centre crop of `fire-trucks-forest.jpg` |

`charred-clearing.jpg` is the **same Pixabay photograph** as
`smouldering-ground.jpg` in Field Note 1, downloaded again at 1280px. Kept as a
separate file so either article can change its picture without moving the
other's.

## Field Note 1 — helicopter, air tanker, fire engine, drone (2026-08-18)

Reconstructed 2026-11-12 from commit messages and the history of the credit
line. The page itself never carried a per-file mapping.

| File | Photographer | Pixabay ID / title | How established |
|---|---|---|---|
| `smouldering-ground.jpg` | ojkumena | 2370996, "The Forest Fell" | 0aa90f4 added it as the lead image of burnt ground; f8bbcdf credited the two images of that commit by ID, and the other is a fire front. Title and subject agree. |
| `fire-front-night.jpg` | sippakorn | 4755030, "Wildfire Bushfire Fire" | The other image credited in f8bbcdf. |
| `crew-on-the-ground.jpg` | fish96 | 6706674, "Fire Field Firefighter" | a3231c8: "a firefighter beating out a field fire by hand", credited to fish96 in the same commit. |
| `air-tanker.jpg` | magocarlosyo | unknown | f3ad26c added only this image and added magocarlosyo to the credit line. |
| `crew-at-the-edge.jpg` | fish96 | unknown | 43df176 replaced it with the Feuerwehr Partenstein picture and says fish96 "now covers two images". |
| `fire-engine.jpg` | royber99 **or** benerott | unknown | 43df176 replaced this and `helicopter.jpg` together and added both names. Which is which is not recorded. |
| `helicopter.jpg` | benerott **or** royber99 | unknown | As above. |
| `og-card.jpg` | sippakorn | crop of 4755030 | 1200x630 crop of `fire-front-night.jpg` (0aa90f4). |

**Open:** the credit line on Field Note 1 still names **viya0414**, whose
picture (`drone-in-flight.jpg`, "Plant Protection Drone", 3802183) was deleted
in 32bf932 on 2026-08-21. Every current file there is accounted for without
that name. Not changed here: that article was out of scope for the second
Field Note.

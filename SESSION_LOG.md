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

## Sessions

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

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

## Sessions

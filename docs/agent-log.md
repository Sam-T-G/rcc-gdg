# Agent log

Shared handoff log for anyone (human or agent) working in this repo. Newest entry first. Each entry: date, who, what changed, what is open. Keep entries short; link to files instead of pasting them.

## Open questions

Remove a line once it is answered and note the answer in that day's entry.

- The Fall 2026 program shifted a week on 2026-09-17; the session cards and the club calendar still show the old dates. Which dates are right?

<!-- newest entry below: add "## YYYY-MM-DD · Name (via Claude Code)" here and end it with a blank line -->

## 2026-10-07 · Sam (via Claude Code)

**Changed:**

- Merged the open work into `main` (PR #3, which carried PR #1 and the landing page from PR #2) and changed branch protection: no PR required, force-pushes and deletion still blocked.
- Added the shared coworking kit from the ExplorAI decks repo: `scripts/sync.sh`, `scripts/context.sh`, `scripts/hooks/`, `scripts/install-bridge.sh`, the `.claude/` settings and handoff skill, `scripts/coworking.conf`, and `scripts/push-check.sh` (runs `scripts/check.sh` on exactly what is committed).
- Added live review: `deck-kit/review.js` (the `C` panel and the `?view=review` board), speaker labels in `presenter.js` (presenter view, remote, run sheet, handoff cue), `scripts/review.mjs` for agents, and the bake step in `scripts/publish-deck.sh`. All three decks load it.
- `CLAUDE.md`, `CONTRIBUTING.md`, maintenance rule 8, `MAINTAINERS.md`, and the decision log now describe working on `main`.

**Decided:** Sam: one review passcode for all three clubs, shared out of band; collaborators work on `main` directly.

**Next:** republish the 10-08 deck after the meeting so the live link has the review panel. Collaborators: run `scripts/install-bridge.sh` once if you start Claude outside the repo, and `node scripts/review.mjs login`.


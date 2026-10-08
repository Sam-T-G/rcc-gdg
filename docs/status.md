# Status

Where everything stands right now. `/handoff` rewrites this file in place (it is a snapshot, not a log). History and reasons go in [agent-log.md](agent-log.md). Slide counts, last changes, and open review comments are computed by `scripts/context.sh`, so they are not repeated here.

Last updated: 2026-10-07 by Sam.

## Decks

| Date | Deck | State | Next / blocking |
|---|---|---|---|
| 2026-09-24 | First meeting (`semesters/2026-fall/decks/2026-09-24-first-meeting.html`) | Presented | None. Live at `/decks/first-meeting/`. |
| 2026-10-01 | LinkedIn and your resume (`2026-10-01-linkedin-and-resume.html`) | Presented | None. Live at `/decks/linkedin-and-resume/`. |
| 2026-10-08 | STAR stories and vibe coding (`2026-10-08-story-and-vibe-coding.html`) | Live | Presenting 2026-10-08. The live copy predates `review.js`; republish to get the review panel on the live link. |

## Standing facts

- Meetings: Thursdays 2:30 to 3:30 pm, BLCIS A-210.
- Live decks: `https://sam-t-g.github.io/rcc-gdg/decks/<slug>/`, published from `main` with `scripts/publish-deck.sh` (the `gh-pages` branch). The landing page is `https://sam-t-g.github.io/rcc-gdg/`.
- Collaborators push to `main` through `scripts/sync.sh push` (since 2026-10-07; see the decision log). Branch protection blocks force-pushes and deletion only.
- Review: `C` in a deck, `?view=review` for the whole deck, `node scripts/review.mjs` for agents. The passcode is shared by the club officers out of band and lives in `~/.config/rcc-review/key`.
- Presenter tools: `S` presenter view, `M` phone or tablet remote, `?view=runsheet` (`deck-kit/README.md`).

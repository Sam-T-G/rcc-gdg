# Status

Where everything stands right now. `/handoff` rewrites this file in place (it is a snapshot, not a log). History and reasons go in [agent-log.md](agent-log.md). Slide counts, last changes, and open review comments are computed by `scripts/context.sh`, so they are not repeated here.

Last updated: 2026-10-08 by Sam.

## Decks

| Date | Deck | State | Next / blocking |
|---|---|---|---|
| 2026-09-24 | First meeting (`semesters/2026-fall/decks/2026-09-24-first-meeting.html`) | Presented | None. Live at `/decks/first-meeting/`. |
| 2026-10-01 | LinkedIn and your resume (`2026-10-01-linkedin-and-resume.html`) | Presented | None. Live at `/decks/linkedin-and-resume/`. |
| 2026-10-08 | STAR stories and vibe coding (`2026-10-08-story-and-vibe-coding.html`) | Live | Presenting 2026-10-08. Republished 2026-10-08 at noon from `26ba256`, with the four hackathon slides before the ask. |

## Standing facts

- Meetings: Thursdays 2:30 to 3:30 pm, BLCIS A-210.
- Live decks: `https://sam-t-g.github.io/rcc-gdg/decks/<slug>/`, published from `main` with `scripts/publish-deck.sh` (the `gh-pages` branch). The landing page is `https://sam-t-g.github.io/rcc-gdg/`.
- Collaborators push to `main` through `scripts/sync.sh push` (since 2026-10-07; see the decision log). Branch protection blocks force-pushes and deletion only.
- Review: `A` in a deck to annotate, `I` for the notes inbox, `?view=review` for the board, `node scripts/review.mjs` for agents. Google sign-in, limited to each club's member list on the relay. Decks published before 2026-10-08 still run the older passcode panel (`C`) until they are republished.
- Presenter tools: `S` presenter view, `M` phone or tablet remote, `?view=runsheet` (`deck-kit/README.md`).

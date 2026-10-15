# Status

Where everything stands right now. `/handoff` rewrites this file in place (it is a snapshot, not a log). History and reasons go in [agent-log.md](agent-log.md). Slide counts, last changes, and open review comments are computed by `scripts/context.sh`, so they are not repeated here.

Last updated: 2026-10-14 by Sam.

## Decks

| Date | Deck | State | Next / blocking |
|---|---|---|---|
| 2026-09-24 | First meeting (`semesters/2026-fall/decks/2026-09-24-first-meeting.html`) | Presented | None. Live at `/decks/first-meeting/`. |
| 2026-10-01 | LinkedIn and your resume (`2026-10-01-linkedin-and-resume.html`) | Presented | None. Live at `/decks/linkedin-and-resume/`. |
| 2026-10-08 | STAR stories and vibe coding (`2026-10-08-story-and-vibe-coding.html`) | Presented | None. Live at `/decks/story-and-vibe-coding/`. No meeting notes or attendance filed. |
| 2026-10-15 | Invent a product, no code (`2026-10-15-invent-a-product.html`) | Built, not published | Reworked 2026-10-14: 16 slides, 144 of 144 checks, tips and challenge checks drip in on each phase's clock. Publish on Sam's go-ahead, all three together: the deck (`scripts/publish-deck.sh ... invent-a-product --push`), the group companion its slide 5 QR points at (`scripts/publish-page.sh .../cheatsheet.html guides/invent-a-product --push`; one phone per group, builds the STAR pitch, saves on the phone only), and the organizers' challenge cards (`.../challenges.html guides/invent-a-product/challenges --push`). Print a few worksheets as a backup for groups without a working phone (`2026-10-15-invent-a-product-media/worksheet.pdf`, two pages, 100%). Not on Bevy yet. |

## Standing facts

- Meetings: Thursdays 2:30 to 3:30 pm, BLCIS A-210.
- Live decks: `https://sam-t-g.github.io/rcc-gdg/decks/<slug>/`, published from `main` with `scripts/publish-deck.sh` (the `gh-pages` branch). Pages that go with a deck (a group companion, organizers' cards) publish to `guides/<slug>/` with `scripts/publish-page.sh`. The landing page is `https://sam-t-g.github.io/rcc-gdg/`.
- Collaborators push to `main` through `scripts/sync.sh push` (since 2026-10-07; see the decision log). Branch protection blocks force-pushes and deletion only.
- Review: `A` in a deck to annotate, `I` for the notes inbox, `?view=review` for the board, `node scripts/review.mjs` for agents. Google sign-in, limited to each club's member list on the relay.
- Presenter tools: `S` presenter view, `M` phone or tablet remote, `?view=runsheet` (`deck-kit/README.md`).

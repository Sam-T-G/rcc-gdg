# Status

Where everything stands right now. `/handoff` rewrites this file in place (it is a snapshot, not a log). History and reasons go in [agent-log.md](agent-log.md). Slide counts, last changes, and open review comments are computed by `scripts/context.sh`, so they are not repeated here.

Last updated: 2026-10-29 by Sam.

## Decks

| Date | Deck | State | Next / blocking |
|---|---|---|---|
| 2026-09-24 | First meeting (`semesters/2026-fall/decks/2026-09-24-first-meeting.html`) | Presented | None. Live at `/decks/first-meeting/`. |
| 2026-10-01 | LinkedIn and your resume (`2026-10-01-linkedin-and-resume.html`) | Presented | None. Live at `/decks/linkedin-and-resume/`. |
| 2026-10-08 | STAR stories and vibe coding (`2026-10-08-story-and-vibe-coding.html`) | Presented | None. Live at `/decks/story-and-vibe-coding/`. No meeting notes or attendance filed. |
| 2026-10-15 | Invent a product, no code (`2026-10-15-invent-a-product.html`) | Presented from the local file; cheat sheet live | Reworked 2026-10-14: 16 slides, 144 of 144 checks, tips and challenge checks drip in on each phase's clock. The cheat sheet its slide 5 QR points at is live at `https://sam-t-g.github.io/rcc-gdg/guides/invent-a-product/` (published 2026-10-15 during the meeting, gh-pages `84137d8`). Not published yet: the deck (`scripts/publish-deck.sh ... invent-a-product --push`) and the organizers' challenge cards (`scripts/publish-page.sh .../challenges.html guides/invent-a-product/challenges --push`). Print one worksheet per group (`2026-10-15-invent-a-product-media/worksheet.pdf`, two pages, 100%). Not on Bevy yet. |
| 2026-10-29 | Build something with AI (`2026-10-29-build-with-ai.html`) | Rebuilt, not published | 21 slides on the new opt-in expressive layer, 158 of 158 checks. One app in three teams (Check-in, Live slides, Professor view; two leads fold to two), seat priority lists, a Google Doc per team plus a Help board (QRs on slide 11), moving between teams, the 45 minutes as a strip. The app is rcc-live-lecture (its `docs/meeting-1029.md` is the run of show). Waiting on Sam: share the four docs as anyone-with-link edit; add `http://localhost:5173` to the OAuth client's origins; invite the leads (Convex team + repo); which lead takes which part; Gus video or live; check the four "What Gus does" lines; does it replace "What You Are Owed". |

## Standing facts

- Meetings: Thursdays 2:30 to 3:30 pm, BLCIS A-210.
- Live decks: `https://sam-t-g.github.io/rcc-gdg/decks/<slug>/`, published from `main` with `scripts/publish-deck.sh` (the `gh-pages` branch). Pages that go with a deck (a cheat sheet, organizers' cards) publish to `guides/<slug>/` with `scripts/publish-page.sh`. The landing page is `https://sam-t-g.github.io/rcc-gdg/`.
- Collaborators push to `main` through `scripts/sync.sh push` (since 2026-10-07; see the decision log). Branch protection blocks force-pushes and deletion only.
- Review: `A` in a deck to annotate, `I` for the notes inbox, `?view=review` for the board, `node scripts/review.mjs` for agents. Google sign-in, limited to each club's member list on the relay.
- Expressive layer (opt-in): `data-expressive` + `deck-kit/expressive/`; rules in motion.md §5.13 and presentation.md §13.14. Scene lab with every scene: `scratch/expressive-lab/` (gitignored, local only).
- A visual on every slide where possible, with a real internet photo first (presentation.md §13.15). Cover, statement, figure, clock, rail, and hero slides are exempt.
- Presenter tools: `S` presenter view, `M` phone or tablet remote, `?view=runsheet` (`deck-kit/README.md`).

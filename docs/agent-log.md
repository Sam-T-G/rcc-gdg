# Agent log

Shared handoff log for anyone (human or agent) working in this repo. Newest entry first. Each entry: date, who, what changed, what is open. Keep entries short; link to files instead of pasting them.

## Open questions

Remove a line once it is answered and note the answer in that day's entry.

- The Fall 2026 program shifted a week on 2026-09-17; the session cards and the club calendar still show the old dates. Which dates are right?
- Who invited the club to NASA SUITS and NASA Space Apps Temecula, and what did they ask for? The 10-08 slides say only "we were invited" (`[TBD]` in the notes). SUITS proposals are due 2026-10-22 and need a faculty advisor who can go to Houston.

<!-- newest entry below: add "## YYYY-MM-DD · Name (via Claude Code)" here and end it with a blank line -->

## 2026-10-08 · Sam (via Claude Code)

**Changed:**

- `deck-kit/check.mjs`: Chrome launches with a mock keychain, so the deck check never touches the macOS Keychain (`b35424c`).
- 10-08 deck: four hackathon slides before the ask (overview of logos, LA Hacks AI Hackathon, NASA SUITS, NASA Space Apps Temecula), each with the event's own art and a decoded QR code; sources in the notes (`5155a9e`). `deck-kit/deck.css`: a QR in a photo slide's text column is smaller with its label beside it. The ACM 10-08 deck got the same three events (rcc-acm branch `2026-10-01-deck`, `5ca9f63`).
- `deck-kit/presenter.js` (a parallel session, review v2): the presenter view's review notes moved from the Now column to the right column under the bridge (`26ba256`).
- Republished the 10-08 deck at noon from `26ba256` with the hackathon slides and review v2 (218 of 218 checks). The ACM 10-08 deck is live with the same slides (published from rcc-acm `e857a20`'s changes).
- Hook pinning (`551801f`): every hook runs a copy you approved in `~/.config/rcc-coworking/`. A pull that changes `scripts/hooks/`, `sync.sh`, `context.sh`, `review.mjs`, `coworking.conf`, `install-bridge.sh`, or `.claude/` stops with `SYNC HELD` until a person approves the diff in a terminal (`~/.config/rcc-coworking/approve <repo>`). Raw `git pull`, `merge`, and `rebase` are blocked. The same kit is in rcc-acm and pcolee/explorAI.
- `deck-kit/check.mjs`: typed keys are one keyDown with text, with no native key codes (`39621a5`); tests for the presenter notes and the v2 annotate bar and board.
- Review v2 (`9f90de0`): `review.js` loads the relay client (`A`, `I`, `?view=review`, Google sign-in for club members); `scripts/review.mjs` uses the v2 API with an agent token. Republished `first-meeting` and `linkedin-and-resume` on it. The relay's v1 passcode review is retired, and its data was test data only. The passcode in `~/.config/rcc-review/key` is no longer used.

**Issues:** Until each person runs `scripts/install-bridge.sh` once in a terminal, hooks in this repo print a one-line notice and do not run. Cole's next pull will show `SYNC HELD` for the kit change; she approves it in a terminal.

**Next:** add the club officers' emails to the relay member lists (`node admin.mjs add gdg <email> <name>` in deck-relay). Cole is on all three.

## 2026-10-07 · Sam (via Claude Code)

**Changed:**

- Merged the open work into `main` (PR #3, which carried PR #1 and the landing page from PR #2) and changed branch protection: no PR required, force-pushes and deletion still blocked.
- Added the shared coworking kit from the ExplorAI decks repo: `scripts/sync.sh`, `scripts/context.sh`, `scripts/hooks/`, `scripts/install-bridge.sh`, the `.claude/` settings and handoff skill, `scripts/coworking.conf`, and `scripts/push-check.sh` (runs `scripts/check.sh` on exactly what is committed).
- Added live review: `deck-kit/review.js` (the `C` panel and the `?view=review` board), speaker labels in `presenter.js` (presenter view, remote, run sheet, handoff cue), `scripts/review.mjs` for agents, and the bake step in `scripts/publish-deck.sh`. All three decks load it.
- `CLAUDE.md`, `CONTRIBUTING.md`, maintenance rule 8, `MAINTAINERS.md`, and the decision log now describe working on `main`.

- `scripts/hooks/bridge.sh` (shared kit fix, all three repos): a shell command is judged by the folder it runs in (a leading `cd`, or `git -C`), not the session's last folder. Installed the GDG bridge on Sam's machine next to the ExplorAI one.
- `deck-kit/review.js`: the panel's board link is set in code, because `publish-deck.sh` refused a bundle carrying a literal local `href`. Then republished the 10-08 deck (196 of 196 checks); the live link has the review panel.

**Decided:** Sam: one review passcode for all three clubs, shared out of band; collaborators work on `main` directly.

**Next:** republish the 10-08 deck after the meeting so the live link has the review panel. Collaborators: run `scripts/install-bridge.sh` once if you start Claude outside the repo, and `node scripts/review.mjs login`.

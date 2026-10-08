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

**Issues:** `scripts/review.mjs` has an uncommitted draft of v2 (agent tokens, inbox with source lines, claim, watch). It targets the review v2 relay, which is not on any deck yet. It is a draft, paused at Sam's request; do not commit or rely on it until it is tested.

**Next:** finish review v2 (a freeze in the two-person browser test after an idle reconnect), then roll it out to the decks.

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

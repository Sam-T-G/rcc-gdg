# Agent log

Shared handoff log for anyone (human or agent) working in this repo. Newest entry first. Each entry: date, who, what changed, what is open. Keep entries short; link to files instead of pasting them.

## Open questions

Remove a line once it is answered and note the answer in that day's entry.

- The Fall 2026 program shifted a week on 2026-09-17; the session cards and the club calendar still show the old dates. Which dates are right?
- Who invited the club to NASA SUITS and NASA Space Apps Temecula, and what did they ask for? The 10-08 slides say only "we were invited" (`[TBD]` in the notes). SUITS proposals are due 2026-10-22 and need a faculty advisor who can go to Houston.

<!-- newest entry below: add "## YYYY-MM-DD · Name (via Claude Code)" here and end it with a blank line -->

## 2026-10-14 · Sam (via Claude Code)

**Changed:**

- 10-15 deck reworked on Sam's review (`488dcee`): 16 slides, 144 of 144 checks, not published. Less up-front teaching: each work phase is one card slide with its clock, and every press adds the next tip or challenge check while the clock keeps running (checked with real key presses). New: a challenge-check round, a five-minute STAR pitch plan, and a QR on slide 5 to the cheat sheet. The worked-example, problem-board, idea-push, product-card, and Space Apps slides are gone; that content is in the notes and the cheat sheet.
- `2026-10-15-invent-a-product-media/cheatsheet.html`: the cheat sheet behind the slide 5 QR. A second review asked for more polish and it became an interactive group companion (`14b0375`); a third asked for no app at all, only the slides' information to glance at, so it is now six cards with each work slide's lines in order, built on `tokens.css`, no script. `challenges.html`: organizers' challenge cards by kind of idea (an app, connects two groups, uses data, a rule, a physical thing, a service, money), with a draw button. `qr-cheatsheet.svg` decodes to `https://sam-t-g.github.io/rcc-gdg/guides/invent-a-product/`. Worksheet page 2 follows build it, the challenge check, and STAR.
- `scripts/publish-page.sh` (`9f7dac5`): publishes a standalone page to `gh-pages` at `<path>/`, replacing only that `index.html`.
- `deck-kit/check.mjs` (`940d64f`): the presenter test looked for a slide by `.beats` items only, so a deck whose presses are all card lines crashed it; it now counts every `data-beat`.
- The 10-15 calendar event carries the new block and both page links.

**Decided:** Sam: tips and challenge checks drip in while groups work; organizers pose challenges table by table; the hour ends with STAR pitch prep; students get a cheat sheet by QR early in the deck: concise, the same information as the slides, for a quick glance, at the decks' level of polish, and not an interactive app (Sam, third review, same day). Sam: no "who pays" anywhere, because it constrains the idea before it has a form; STAR's R is "What's different for them after?". Then every line on the slides, cheat sheet, and worksheet was rewritten to leave the problem and the fix open (no assumed app, product, business, money, gatekeeper, or outcome; e.g. "The school says no" became "Who could block it? Then what?"); the organizers' challenge cards stay specific on purpose, since an organizer picks the card that fits a group's idea.

- `f043a9a`: slide 5's QR renders whole as a tour figure (a landscape frame had cropped its top and bottom rows); it decodes from the slide screenshot.

**Issues:** The slide 5 QR points at a page that is not live until `publish-page.sh ... --push` runs. rcc-acm's `check.mjs` has the same `.beats`-only lookup.

**Next:** on Sam's go-ahead, publish the deck, the cheat sheet, and the challenge cards together, then scan the slide 5 QR with a phone.

## 2026-10-13 · Sam (via Claude Code)

**Changed:**

- New 10-15 deck, `semesters/2026-fall/decks/2026-10-15-invent-a-product.html` (`07912c4`, `12791d2`): 20 slides, 160 of 160 checks, not published. A no-code product brainstorm for the whole hour: the parking question, an aerial lot photo (CC BY 2.0), "the fix depends on the why", then groups of four list what annoyed them this week (problem board as backup), answer four questions, write `___ can't ___ because ___`, run Crazy 8s, fill a five-line product card, pitch in 60 seconds, and vote. Ask: ask one person who has your problem if they'd use your idea. Space Apps Temecula reused from the 10-08 deck. Run of show by the clock is in the file's header.
- `2026-10-15-invent-a-product-media/`: the photo and its credit, a drawn Crazy 8s example sheet (eight parking ideas, three of them apps), and a two-page group worksheet (`worksheet.html`, exported to `worksheet.pdf`, US Letter) that matches the dig-in and product card slides word for word.
- The 10-15 event on the GDG calendar is now "GDG · Invent a Product (no code)" with the new block, materials, and paths.

**Decided:** Sam: 10-15 is this ideation activity for the full hour, replacing Anatomy of an Ask (that card is unscheduled). Problems come from each group's own list first, the board second. It ends in pitches and a room vote. No follow-up on the 10-08 "bring your app" ask.

**Issues:**

- `deck-kit/deck.js` splits words on any whitespace, `&nbsp;` included, so a non-breaking space cannot hold two words together on a slide. The 10-15 deck writes "9:00" instead. Shared kit, so a fix goes to rcc-acm too.
- The ask slide's lockup renders small (Sam's open review note on the 10-01 deck, slide 33); it is the kit's `ask` layout, so every deck has it. Not changed.
- No meeting notes or attendance filed for 09-24, 10-01, or 10-08 (`semesters/2026-fall/meetings/` has only the 09-03 prep); goal 1 is measured by those notes. Bevy post-event reports for 09-24 and 10-01 are overdue (Google reminders 2026-10-08 and 2026-10-11), 10-08 was never a Bevy event, and 10-15 is not published there yet.
- The relay's GDG member list has one member, so officers other than Sam and Cole cannot review decks yet.

**Next:** Sam reviews the 10-15 deck (the cover headline and copy are first drafts), then publishes it and prints one worksheet per group before Thursday 2:25.

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

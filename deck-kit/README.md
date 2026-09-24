# Deck kit

How the club makes slide decks. A weekly deck starts from one command that fills the blank from the session card; the slides are plain HTML with two attributes each, and the kit supplies the stage, the rail, the motion, the timers, room mode, and a check that walks the deck with real key presses.

The design language this implements is [presentation.md](../docs/04-brand/design-system/presentation.md) (§13), with motion from [motion.md](../docs/04-brand/design-system/motion.md) (§5). Where the kit and those files disagree, the files win and the kit has a bug.

| File | What it is |
|---|---|
| [weekly.html](weekly.html) | The blank weekly meeting deck. `scripts/new-deck.sh` fills it from a session card; do not copy it by hand. A template under maintenance rule 3 |
| [example.html](example.html) | A finished deck for Voice week 1, built only from copy the club already uses. Open it in a browser to see every archetype; start an event deck from it |
| [deck.css](deck.css) | The stylesheet. Tokens copied from `tokens.css` (the check fails if they drift), the stage, and the ten archetypes |
| [deck.js](deck.js) | The engine. No build step, no dependencies beyond GSAP, which is optional |
| [check.mjs](check.mjs) | Checks a deck against §13.9 and walks it in five modes. Headless Chrome, no npm install |
| [bundle.mjs](bundle.mjs) | Makes one self-contained HTML file from a deck, for a USB stick, an email, or an upload |

## Make a weekly deck

```sh
scripts/new-deck.sh 2026-fall 2026-09-24
```

The script reads the session card for that date and the sessions index, writes `semesters/2026-fall/sessions/2026-09-24-hostile-room-deck.html` from `weekly.html`, and prints how many fill markers it left. It fills what the card and the index already know: the title, the arc, slot, and week, the ledger line, the room line, the countdown start time, the receipt, and every session of the semester for the rail slide with this week marked. It refuses to overwrite a deck that exists, and it stops if the date has no row in the index, because the index is the source of truth. Then:

1. **Fill the markers.** `grep -n "fill:"` lists them, about twenty. Each says what goes there, and where the card has the words it quotes them, so nothing is re-typed from memory: the Ask, the rung, the warm rep prompt when it was not set in bold.
2. **Read the five movement openers aloud** (§13.2). If they are not an argument, no slide will fix it.
3. **Run the check**: `node deck-kit/check.mjs semesters/2026-fall/sessions/2026-09-24-hostile-room-deck.html`. It refuses a deck with a marker or a template token left in it, then checks everything else.

Room mode (`5`) holds the five slides Law 2 allows, already marked `data-room`: dates and asks, the warm rep, the card, live fire, the ask. In the first week of an arc the semester slide earns the room instead; move `data-room` from the dates slide to it. To put the mechanics on the wall instead of the card, move `data-room` from the card slide to the beats slide. Delete any full-deck slide the session does not need, keeping one slide between the cover and the semester slide (§13.4).

An event deck (no slide cap, §13.1) starts from `example.html` instead: copy it beside its event folder, fix the relative paths to `deck-kit/` and `assets/` for that depth, and replace the slides. Every slide is a `<section class="slide">` with a `data-kind` (one of the ten archetypes) and a `data-move` (one of the five movements, never out of order). The ledger line along the top comes from `data-ledger` on `<main class="deck">`, and `data-arc` on `<html>` sets where the cover's Step rises (Voice 25%, Ask 50%, Evidence 75%).

## What makes it repeatable

The kit follows the rules the repo's markdown templates already follow, because those rules survived an officer handoff:

- **An example is not a template.** `example.html` is finished; `weekly.html` is blank. A person starting from a finished deck deletes, and deletes unevenly; a person starting from a blank fills. They were one file until 2026-09-23.
- **Facts are generated; judgment is marked.** Anything a source of truth already knows is written by the script. Anything that needs a person is a fill comment (an HTML comment starting `fill:`), the same marker the markdown templates use, carrying the card's own words where there are any.
- **One source of truth, enforced.** The rail slide is built from the sessions index, and a date with no row there stops the script. The deck never carries a fact the card does not.
- **The script owns the plumbing.** Relative paths, `data-arc`, the ledger line, the countdown time: a person following instructions gets one of them wrong, and the script does not. It refuses to overwrite and runs on the stock macOS bash with no install.
- **The check enforces the contract.** `check.mjs` fails a deck that still has a fill marker or a template token, the way `scripts/check.sh --strict` fails a markdown file that still has one, so an unfilled deck cannot reach the wall by accident.
- **Defaults encode the rules.** The blank ships the five room slides the meeting algorithm allows, already marked, mapped onto the block's phases with its timers, and in the order the design language requires. The common case needs no decisions beyond the copy.
- **Changing the blank is a decision.** `weekly.html` is a template under maintenance rule 3: change it in one place, log it, leave existing decks alone.
- **A tool on top calls the script.** If a Claude skill or an MCP server ever generates decks, it runs `new-deck.sh` and fills the markers. The logic stays in the repo, where it keeps working when the tool is gone.

## The ten archetypes

Each one is shown working in the template, with a comment above it saying what it needs.

| `data-kind` | Markup the kit reads |
|---|---|
| `cover` | `.cover__lockup` images, `.eyebrow`, `h1`, `.sub`, an empty `.cover__step`, and `.notice` with the independence sentence. Optional `data-starts="14:30"` shows a countdown in the last half hour before the start |
| `statement` | Optional `.eyebrow`, an `h2` of fourteen words or fewer, optional `.sub` |
| `contrast` | `h2`, then `.contrast` holding two `div`s (`.is-weak`, `.is-strong`), each a `.label` and a `p`. Put `data-beat` on the second to reveal it on a press |
| `beats` | `h2`, then `ol.beats` with up to four `li data-beat`, each `<span class="body">` text with an optional `.detail` |
| `card` | `h2`, a `.card` with a `.label` and `ol.card__lines`, and a `.card__side`. Add `data-timer` and `data-clock-slot` to put a clock beside it |
| `compress` | `h2`, then `ol.versions.compress-src` with two to four `li`, each one version of the sentence, with `data-label` ("20 seconds") and `data-why` (the caption). A leading number in the label counts |
| `figure` | `p.figure` holding `.figure__num` with `data-from` and `data-to`, and `.figure__unit`. Source the number in the notes |
| `clock` | `data-timer` in seconds on the slide. Supply a `.clock` block to write your own hint line, or let the kit build one |
| `rail` | `h2`, then `ol.rung-src` with one `li` per session, named as the sessions index names it (`new-deck.sh` writes this list): `data-arc` (`hook`, `voice`, `ask`, `evidence`), `data-receipt` where there is one, and `aria-current="step"` on this week. The default style climbs; `data-style="ledger"` on the slide sets it as stepped columns instead. Never the second slide |
| `ask` | `.ask__main` (`.eyebrow`, `h2`, `.sub`, `.ask__meta`), an `a.qr` with an inline QR SVG, and `.ask__foot` with the notice and the lockup |

Speaker notes go in `<aside class="notes">` inside any slide and show with `N`.

## Running it

Open the file in Chrome. The keys are in [presentation.md §13.7](../docs/04-brand/design-system/presentation.md): arrows or a clicker to move, `T` and `R` for the clock, `5` for room mode, `N` for notes, `F` for fullscreen, `?` for all of them. On a phone, or with `?stack` on the URL, the deck is a scrolling stack for reading. Printing to PDF gives one 1920 x 1080 page per slide with every beat showing.

**Offline:** GSAP and the fonts come from CDNs. Without a network the deck still runs, with CSS-only motion and the fallback face; line breaks can move, so walk it once offline before relying on it (§13.9).

## Checking it

```sh
node deck-kit/check.mjs semesters/2026-fall/sessions/2026-09-24-hostile-room-deck.html --shots /tmp/deck-shots
```

It needs Node 22 and Google Chrome, nothing else. It fails first on any fill marker or template token the scaffold left, then on anything in §13.9 item 1, and then walks the deck with real key presses with motion on, with reduced motion, with GSAP blocked, with no script, and at phone width. The walk checks that the cover's Step is caught mid-move as it lies down (an animation, not a jump), that six presses faster than any transition land exactly six steps on, that room mode is all cuts, and that `T` really starts the clock. `--shots` saves a screenshot per step.

The check brings the headless tab to the front on purpose. Without that, headless Chrome marks the page hidden after the first real key event, stops producing frames, and every tween freezes until the next press fast-forwards it, so a walk passes with no animation having run.

## Sharing it

```sh
node deck-kit/bundle.mjs path/to/deck.html
```

This writes `deck.bundle.html` beside the source with the stylesheet, engine, and images inlined. It is build output and `.gitignore` skips it; commit the source deck.

Add `--artifact` to shape the file for a claude.ai artifact link: the host supplies its own page wrapper, so the bundler drops the document tags, puts the title first, and leaves the theme to the viewer (their dark choice gets the deck's dark palette and the stacked dark lockup). Fullscreen may be refused inside the artifact viewer; the deck says so and keeps running.

## How the engine works

Three decisions, so the next person can change it without breaking it.

- **Every transition ends in `applyState(slide, beat)`**, which sets the whole deck from nothing. Animation is laid over a state machine, so it can never leave the deck in a state the machine does not know about. A press during a transition lands it first, then moves.
- **The cover's Step lies down on one value.** The Step is a path of five numbers that interpolate to a flat line at the rail's bar, then the named segments fade in over it, so the opening move is a pure function of `t` and reverses exactly.
- **Durations and curves are read from the CSS tokens at runtime**, and the cubic-bézier curves are solved in JavaScript, so GSAP and the CSS fallback run the same curves and reduced motion reaches both.

To add an archetype: add it to presentation.md §13.5 first, then to `KINDS` in `check.mjs`, then give it CSS and, if it moves, a `make…` function in `deck.js` with a `render(p)` that is a pure function of `p`.

---

**Last updated: 2026-09-23.**

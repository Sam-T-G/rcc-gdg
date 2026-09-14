# Landing page - Fall 2026

The club's public web page for this semester, live at <https://sam-t-g.github.io/rcc-gdg/>. The Club Rush table QR code points here, so the URL has to keep working after the fair. This folder is the source; GitHub Pages serves a build of it from the `gh-pages` branch.

| File | What it is |
|---|---|
| `index.html` | The page: headline, the semester as a green staircase, when and where, one button, over an ambient Step field on a canvas. Styles come from `tokens.css`; the page layer marks the few rules `tokens.css` does not ship yet as PROPOSED |
| `favicon.svg` | The Step mark, green on light and light green on dark |
| `apple-touch-icon.png` | The Step on the page surface, 180 x 180, for home-screen bookmarks |
| `og.png` | The share card shown when the link is pasted into Discord or a bio: headline, meeting time, and the staircase, 1200 x 630, no logo ([components.md §8.6](../../../docs/04-brand/design-system/components.md)) |
| `qr-code.svg` | QR code for the page URL, error correction Q, four-module quiet zone. Scales to any print size |
| `qr-code-print.png` | The same code with the URL printed beneath, 900 x 1050 at 300 dpi: 3 in wide on paper. Not published to the site |

## Publish a change

From the repo root, on a branch whose changes to this folder are committed:

```sh
scripts/publish-site.sh 2026-fall          # build to site/ and stop; open site/index.html to check
scripts/publish-site.sh 2026-fall --push   # build and commit the result to gh-pages
```

GitHub Pages picks up the push within a minute or two. The build copies this folder, `docs/04-brand/design-system/tokens.css`, and the horizontal logo, and refuses to build if the independence sentence is missing or altered.

## What the page keeps current on its own

The "First up" line under the meeting time names the next session, chosen by script from today's date in Riverside using the session list in the `semester-data` block at the bottom of `index.html`. With JavaScript off, it shows the state as of the last edit. Add `?now=2026-11-20T09:00` to the URL to see the page as it will look on a given date.

Change the session list here when a session moves, and change the matching card in [sessions/](../sessions/README.md) first.

## Rules this page follows

- **Light only.** The horizontal lockup exists only as a light file and the logo may not be recolored, so the page ignores a dark system theme rather than swapping in the stacked lockup.
- **One idea per block, one button.** The staircase carries the semester: the three arcs as three treads, each label on its own step, drawn once on load.
- **The ambient field** is the Step field ([accessibility.md §2.3](../../../docs/04-brand/design-system/accessibility.md)) on one `<canvas>` inside `<main>`: lanes of small Step marks that draw in, rise, and breathe. It never runs behind the logo. Green only, peak alpha 0.10, one mark per lane so marks never stack; grey text over a mark measures 5.72:1 at worst, and marks fade to 30% within 32 px of any text block. Measured peak on screen: 0.094. It costs about 5 to 7 ms of script per second and pauses when the hero is off screen.
- **GSAP 3.15.0** drives the field (ticker and tweens), loaded from cdnjs with a pinned version and an SRI hash that matches cdnjs's published one. It is used under the [GSAP standard license](https://gsap.com/standard-license) and is not vendored into this repo. Reduced motion, or GSAP failing to load, draws one still frame; the rest of the page never depends on it.
- The independence sentence sits in the footer. The page is under two phone screens, so the second placement in [bright-lines.md §1.4](../../../docs/04-brand/design-system/bright-lines.md) does not apply; add it under the header if the page grows past three.
- No officer names and no photos of people ([privacy-and-public-repo-policy.md](../../../docs/01-governance/privacy-and-public-repo-policy.md)).
- No icons and no callouts, because the design system names two icon sets and two callout sets and neither question is settled.
- Checked 2026-09-14 at 320, 390, 768, 1024, 1280, and 1440 px, with the system theme set to light and to dark: horizontal lockup at every size, no horizontal scroll, every text pair at 5.18:1 or better, no tap target under 44 px, zero axe-core 4.10.2 violations, skip link first in tab order, complete with JavaScript off, legible under forced colors, staircase labels 8 px above their treads. The field was checked moving, still under reduced motion, and still with cdnjs blocked, with no console errors in any case.

## Not in this folder

- Table signs and handouts that carry the QR code: [assets.md §10.6](../../../docs/04-brand/design-system/assets.md). Print the code at 1 in or larger.
- Next semester's page: copy this folder into the next `semesters/<term>/landing-page/`, replace the session list and copy, and publish with that term.

Last reviewed: 2026-09-14. Owner: `LEAD`.

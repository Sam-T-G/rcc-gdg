# Landing page - Fall 2026

The club's public web page for this semester, live at <https://sam-t-g.github.io/rcc-gdg/>. The Club Rush table QR code points here, so the URL has to keep working after the fair. This folder is the source; GitHub Pages serves a build of it from the `gh-pages` branch.

| File | What it is |
|---|---|
| `index.html` | The page: an opening headline, then one pinned scroll scene where the semester's staircase draws itself while the Voice chapter cuts an example answer from 20 to 12 to 8 seconds, then Ask and Evidence, then the next session and the Discord button. Styles come from `tokens.css`; rules it does not ship are marked PROPOSED |
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

The landing block ("Your first step", the date, the session title) names the next session, chosen by script from today's date in Riverside using the session list in the `semester-data` block at the bottom of `index.html`. With JavaScript off, it shows the state as of the last edit.

Change the session list here when a session moves, and change the matching card in [sessions/](../sessions/README.md) first.

## Rules this page follows

- **Light only.** The horizontal lockup exists only as a light file and the logo may not be recolored, so the page ignores a dark system theme rather than swapping in the stacked lockup.
- **One scroll scene carries the semester.** GSAP 3.15.0 and ScrollTrigger pin the stage and scrub one timeline: the Step staircase draws across the screen, the chapters hand off by opacity (so a screen reader still reads all three), and during Voice the example answer is cut in step with the scroll. Every state is computed from scroll position, so scrolling back rebuilds the sentence exactly.
- **The example answer is labelled as an example.** Its three rounds are also written out in a list that screen readers read and that shows on its own for reduced motion or when scripts fail.
- **GSAP loads from cdnjs**, pinned, with the SRI hashes cdnjs publishes, under the [GSAP standard license](https://gsap.com/standard-license), not vendored into this repo. Without it, or with reduced motion, the page is a static stack of the same content.
- **The independence sentence appears twice:** at the bottom of the opening screen, because the page runs past three screens with the logo above the fold, and in the footer ([bright-lines.md §1.4](../../../docs/04-brand/design-system/bright-lines.md)).
- No officer names and no photos of people ([privacy-and-public-repo-policy.md](../../../docs/01-governance/privacy-and-public-repo-policy.md)). No icons and no callouts.
- Checked 2026-09-14. At 320, 390, 768, and 1280 px with the system theme light and dark: horizontal lockup everywhere, no horizontal scroll, every text pair 5.18:1 or better, no tap target under 44 px, zero axe-core 4.10.2 violations, skip link first. Through the scroll scene at 390 x 844, 375 x 667, 1024 x 768, and 1440 x 900: the answer matches the written rounds word for word at 20, 12, and 8, the chapters hand off in order, scrolling back rebuilds the full answer, and the drawn staircase never crosses text. Static fallback checked with reduced motion and with cdnjs blocked.

## Not in this folder

- Table signs and handouts that carry the QR code: [assets.md §10.6](../../../docs/04-brand/design-system/assets.md). Print the code at 1 in or larger.
- Next semester's page: copy this folder into the next `semesters/<term>/landing-page/`, replace the session list and copy, and publish with that term.

Last reviewed: 2026-09-14. Owner: `LEAD`.

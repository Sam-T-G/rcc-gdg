# Landing page - Fall 2026

The club's public web page for this semester, live at <https://sam-t-g.github.io/rcc-gdg/>. The Club Rush table QR code points here, so the URL has to keep working after the fair. This folder is the source; GitHub Pages serves a build of it from the `gh-pages` branch.

| File | What it is |
|---|---|
| `index.html` | The page. Styles come from `tokens.css`; the page layer at the top marks the few rules `tokens.css` does not ship yet as PROPOSED |
| `favicon.svg` | The Step mark, green on light and light green on dark |
| `apple-touch-icon.png` | The Step on the page surface, 180 x 180, for home-screen bookmarks |
| `og.png` | The share card shown when the link is pasted into Discord or a bio, 1200 x 630, no logo ([components.md §8.6](../../../docs/04-brand/design-system/components.md)) |
| `qr-code.svg` | QR code for the page URL, error correction Q, four-module quiet zone. Scales to any print size |
| `qr-code-print.png` | The same code with the URL printed beneath, 900 x 1050 at 300 dpi: 3 in wide on paper. Not published to the site |

## Publish a change

From the repo root, on a branch whose changes to this folder are committed:

```sh
scripts/publish-site.sh 2026-fall          # build to site/ and stop; open site/index.html to check
scripts/publish-site.sh 2026-fall --push   # build and commit the result to gh-pages
```

GitHub Pages picks up the push within a minute or two. The build copies this folder, `docs/04-brand/design-system/tokens.css`, and the two logo files it uses, and refuses to build if the independence sentence is missing or altered.

## What the page keeps current on its own

The hero line, the current arc, and the three sessions under "Coming up" are chosen by script from today's date in Riverside, using the session list in the `semester-data` block at the bottom of `index.html`. With JavaScript off, the page shows the state as of the last edit. Add `?now=2026-11-20T09:00` to the URL to see the page as it will look on a given date.

Change the session list here when a session moves, and change the matching card in [sessions/](../sessions/README.md) first.

## Rules this page follows

- The independence sentence appears twice: under the header, because the page runs past three phone screens with the logo above the fold, and in the footer ([bright-lines.md §1.4](../../../docs/04-brand/design-system/bright-lines.md)).
- No officer names and no photos of people ([privacy-and-public-repo-policy.md](../../../docs/01-governance/privacy-and-public-repo-policy.md)).
- No icons and no callouts, because the design system names two icon sets and two callout sets and neither question is settled.
- Checked 2026-09-14 at 320, 390, 768, and 1280 px in light and dark: no horizontal scroll, every text pair at 5.18:1 or better, no tap target under 44 px, zero axe-core 4.10.2 violations, skip link first in tab order, complete with JavaScript off, legible under forced colors.

## Not in this folder

- Table signs and handouts that carry the QR code: [assets.md §10.6](../../../docs/04-brand/design-system/assets.md). Print the code at 1 in or larger.
- Next semester's page: copy this folder into the next `semesters/<term>/landing-page/`, replace the session list and copy, and publish with that term.

Last reviewed: 2026-09-14. Owner: `LEAD`.

# 11. Before you publish

Run this on any public artifact. Any failure in 1 through 6 stops the publish.

## Brand

1. Does anything here carry the logo? If yes, is the independence sentence on the artifact, verbatim, as selectable body text, at body size, at full contrast?
2. Could a reasonable visitor think Google made this, endorsed it, or funded it?
3. Is a Google or Gemini product mark, name, screenshot, or gradient doing visual work that our own design should be doing?
4. Are all four core hues present in one composition, or three of them at similar weight? Does green cover at least 70% of the non-neutral area?
5. Has the logo been altered in any way on the §1.5 list, including the ones that do not feel like alterations: a white knockout, a scroll animation, a rounded tile, a stretched aspect ratio?
6. Is anything on the page a Google product name used as design furniture?

## Accessibility

1. Every text pair measured, not estimated, against §2.5. Anything not in that table gets measured before it ships.
2. Tab through the whole page. Is focus visible on every stop, including inside cards that clip their media?
3. Is any meaning carried by color alone? Links underlined, arcs labeled, diagram series double-encoded?
4. Turn on reduced motion. Does every state change still happen and every movement stop?
5. Resize to 320px. Does the page body scroll horizontally anywhere?
6. Does every image have alt text that names what is happening, and explicit width and height?

## Craft

1. One `h1`. No skipped levels. Sentence case throughout.
2. A complete introductory sentence before every list and table.
3. At most three callouts, none adjacent, each passing the three-part admission test.
4. Every column of numbers set in tabular figures.
5. Prose capped at `--rcc-measure-prose`, even inside a wide container.
6. Last-updated date present and actually current.
7. Nothing at rest is using elevation 4.
8. Does the page look considered on GitHub with no CSS at all?

---

## 12. Open items, with owners

| # | Item | Owner | Blocks |
|---|---|---|---|
| 1 | `brand.md` typography correction: Google Sans Mono → Google Sans Code, plus a note that the variable font's 400–700 range covers weight 500 | `LEAD` | Any build |
| 2 | `guest-speaker.md:55` independence line: verbatim or the sanctioned spoken paraphrase | `LEAD` | Next guest event |
| 3 | Horizontal dark logo from the brand guide Drive folder | `LEAD` | Any dark-theme club site |
| 4 | Independence-sentence slot in `templates/announcement.md` | Secretary | Next announcement |
| 5 | Logo clear space and minimum size from the brand guide deck (both current values are our stopgap, not sourced) | `LEAD` | Print and signage |
| 6 | Lucide license verification, recorded in `brand.md` | Whoever builds the site | Icon adoption |
| 7 | `check.sh`: session-card clock validation, and the logo-plus-disclaimer check | `LEAD` | Not blocking |
| 8 | Dark elevation alphas and container tint chroma, tested on the A-210 projector | Whoever builds the site | Demo Day page |
| 9 | `GRAD: -25` on dark, checked on a real screen | Whoever builds the site | Not blocking |
| 10 | `ss02` time colon: rendered and compared | Whoever builds the site | Not blocking |
| 11 | `size-adjust` on the fallback face, measured on real platforms | Whoever builds the site | Not blocking |
| 12 | Inline code `0.9375em`, checked against real body copy | Whoever builds the site | Not blocking |
| 13 | Does Google Sans Code carry the E000–E006 logo ligatures? (The blanket `font-variant-ligatures: none` covers it either way) | Whoever builds the site | Not blocking |
| 14 | The three Google Sans license contradictions, unresolved as of 2026-08-31. Recheck before any self-hosted binary, print vendor, or merch run | `LEAD` | Print and merch |
| 15 | Reconcile against the GDG On Campus Brand Guide deck, which nobody on the club side has opened. It lists halftone and pastel variants that may conflict with the container tones here | `LEAD` | Semester start |
| 16 | GitHub's dark canvas `#0d1117`, current as of 2026-08-31. If it changes, re-run the dual-mode table in §2.7 | `LEAD` | Semester start |

---

**Last updated: 2026-08-31.** Reviewed at each semester start alongside `docs/04-brand/brand.md`. Changes that alter a rule go in `docs/01-governance/decision-log.md`.

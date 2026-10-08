# 11. Before you publish

Run this on any public artifact. Any failure in 1 through 6 stops the publish.

## Brand

1. Does anything here carry the logo? If yes, is the independence sentence on the artifact, verbatim, as selectable body text, at body size, at full contrast?
2. Could a reasonable visitor think Google made this, endorsed it, or funded it?
3. Is a Google or Gemini product mark, name, screenshot, or gradient doing visual work that our own design should be doing?
4. Does any arrangement of the four core hues read as a Google mark (one letterform, a dot ring, a rounded tile, a four-dot or conic loader, four equal shapes in logo order)? On a web page, doc, or deck, does green cover at least 70% of the non-neutral area, not counting the lockup? ([foundations.md §2.3](foundations.md), rewritten 2026-09-21)
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
3. At most two callouts, none adjacent, each passing the three-part admission test ([documents.md §3.2](documents.md)).
4. Every column of numbers set in tabular figures.
5. Prose capped at `--rcc-measure-prose`, even inside a wide container.
6. Last-updated date present and actually current.
7. Nothing at rest is using elevation 4.
8. Does the page look considered on GitHub with no CSS at all?

## Motion

1. Point at everything that moves and say what it means. Anything whose answer is "it makes it feel alive" comes out ([motion.md §5.6](motion.md)).
2. Block the CDN and reload. Is the static or CSS-only version complete, with every state the animation would have passed through either present or resolved?
3. Does anything that moves automatically for more than five seconds have a pause control (WCAG 2.2.2)?
4. A deck also runs `node deck-kit/check.mjs <deck>` and the rest of [presentation.md §13.9](presentation.md).

## Social and print

A post, a story, a share card, a slide deck, or a print piece also runs the export checks in [assets.md §10.9](assets.md): exact pixel size, the safe zone for its surface, 44 px minimum type on the 1080 master, custom alt text, and the independence sentence in the caption when the logo is in the image.

---

## 12. Open items, with owners

| # | Item | Owner | Blocks |
|---|---|---|---|
| 1 | ~~`brand.md` typography correction~~ | `LEAD` | Resolved: Google Sans Mono to Google Sans Code landed in `brand.md` on 2026-08-31; the note that the variable font's 400 to 700 range covers the system's weight 500 was added 2026-09-23 |
| 2 | `guest-speaker.md:55` independence line: verbatim or the sanctioned spoken paraphrase | `LEAD` | Next guest event |
| 3 | Horizontal dark logo from the brand guide Drive folder | `LEAD` | Any dark-theme club site |
| 4 | Independence-sentence slot in `templates/announcement.md` | Secretary | Next announcement |
| 5 | Logo clear space and minimum size from the brand guide deck (both current values are our stopgap, not sourced) | `LEAD` | Print and signage |
| 6 | Phosphor license verification: read the LICENSE in the vendored release and record the set, version, and license in `brand.md`. Was Lucide until 2026-09-21; the same item is `visual-voice.md` V3 | Whoever builds the site | Icon adoption |
| 7 | `check.sh`: session-card clock validation, and the logo-plus-disclaimer check for pages (`deck-kit/check.mjs` has done it for decks since 2026-09-21) | `LEAD` | Not blocking |
| 8 | Dark elevation alphas and container tint chroma, tested on the A-210 projector | Whoever builds the site | Demo Day page |
| 9 | `GRAD: -25` on dark, checked on a real screen | Whoever builds the site | Not blocking |
| 10 | `ss02` time colon: rendered and compared | Whoever builds the site | Not blocking |
| 11 | `size-adjust` on the fallback face, measured on real platforms | Whoever builds the site | Not blocking |
| 12 | Inline code `0.9375em`, checked against real body copy | Whoever builds the site | Not blocking |
| 13 | Does Google Sans Code carry the E000–E006 logo ligatures? (The blanket `font-variant-ligatures: none` covers it either way) | Whoever builds the site | Not blocking |
| 14 | The three Google Sans license contradictions, unresolved as of 2026-08-31. Recheck before any self-hosted binary, print vendor, or merch run | `LEAD` | Print and merch |
| 15 | Reconcile against the GDG On Campus Brand Guide deck, which nobody on the club side has opened. It lists halftone and pastel variants that may conflict with the container tones here | `LEAD` | Semester start |
| 16 | GitHub's dark canvas `#0d1117`, current as of 2026-08-31. If it changes, re-run the dual-mode table in §2.7 | `LEAD` | Semester start |
| 17 | Instagram handle in `links.md`, and the Bevy event cover size read off the upload dialog into `assets.md` §10.4 | Secretary | First Instagram post |
| 18 | `assets/templates/`: one SVG per export size in `assets.md`, text nodes and the Step only | Whoever builds the site | First event post made from a template |
| 19 | ~~The third callout slot is mapped two ways~~ | `LEAD` | Resolved 2026-09-21: Note, Warning, Receipt (`[!IMPORTANT]` with a bold `Receipt:` lead-in), per `components.md` §7.7. `documents.md` §3.2 now matches, and its Caution meaning folded into Warning, which already covered "cannot be undone" |
| 20 | ~~The icon set is named two ways~~ | Whoever builds the site | Resolved 2026-09-21: Phosphor, which had the worked licensing position. It lives in `visual-voice.md` §9.5; Phosphor's LICENSE is still unread (§9.8 V3) |
| 21 | ~~§9 is cited and not written~~ | `LEAD` | Resolved 2026-09-21: [visual-voice.md](visual-voice.md) carries §9.1 to §9.8, including the ledger line and the rung rail |
| 22 | Type minimums and safe zones in `assets.md` §10.3, checked on a real phone; slide minimums in §10.5, checked on the A-210 projector | Whoever makes the first post | First event post |

---

**Last updated: 2026-09-23.** Reviewed at each semester start alongside `docs/04-brand/brand.md`. Changes that alter a rule go in `docs/01-governance/decision-log.md`.

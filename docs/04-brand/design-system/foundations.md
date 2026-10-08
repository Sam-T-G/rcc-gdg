# Foundations

Color, typography, space, grid, shape, and elevation. Every value here resolves to a custom property in [tokens.css](tokens.css). Nothing else in the system names a raw color or size. Motion was §5 of this file until 2026-09-21 and now has its own, [motion.md](motion.md); the section numbers did not change.

## 2. Foundations: color

## 2.1 What is licensed and what is derived

Licensed, from `brand.md` citing the GDG On Campus Brand Guide. Measured this session:

| Name | Hex | CIE L\* | OKLCh hue | On `#f7faf8` | On `#121412` | Ink `#1e201e` on it |
|---|---|---|---|---|---|---|
| Blue 500 | `#4285f4` | 56.6 | 260.0 | 3.39:1 | 5.19:1 | 4.60:1 |
| Green 500 | `#34a853` | 61.1 | 148.5 | 2.91:1 | 6.06:1 | 5.37:1 |
| Yellow 600 | `#f9ab00` | 75.6 | 76.0 | 1.84:1 | 9.57:1 | 8.48:1 |
| Red 500 | `#ea4335` | 53.8 | 29.1 | 3.73:1 | 4.72:1 | 4.18:1 |

Read that as one sentence: **the licensed palette is a dark-mode palette.** None of the four clears 4.5:1 as text on a light page and green fails even the 3:1 graphic floor there. That is why the light theme runs on derived tones and the licensed hexes are reserved for the logo, for two named fills, and as hue anchors.

Everything else in this system is derived by the club: a tone step on one of those four hues, or a near-neutral tinted toward the lead hue. No derived color is more saturated than the licensed color it comes from.

## 2.2 The two sanctioned fills

Three of the four hold 4.5:1 with our ink (`#1e201e`): yellow at 8.48, green at 5.37, blue at 4.60. **Only two ship as tokens.**

- `--rcc-fill-yellow: #f9ab00`
- `--rcc-fill-green: #34a853`

Blue is excluded on purpose. It clears the ratio and it is Google's action color across Store, Cloud, and Workspace, so a fill token invites the one mistake that makes a club page read as a Google property fastest. Red is excluded because it fails the ratio at 4.18.

The earlier drafts shipped all four as `:root` custom properties. That made the mark the shortest path in the file for anyone who opens DevTools. Deleted.

## 2.3 Which color leads

**Green leads.** `#34a853` is the primary hue. The negative case, in order of weight: blue is Google's action color and not using it is the cheapest available separation; red is the error convention and spending it as the lead makes the system fight a convention every reader already has; yellow measures 1.84:1 on the light surface and cannot be text, a hairline, or an icon there at any size; green has the widest contrast headroom of the four.

The positive case, which the drafts omitted and the next officer team needs: this is a program about getting a sentence out of your mouth, asking for something, and showing the receipt. Green is the color of the go state and of the thing that grew, and it is the only one of the four whose meaning is about proceeding rather than stopping, warning, or linking. That is what the semester is.

This is a judgment call, not something the brand guide ranks. The mechanics work with any of the four as lead: swap the hue feeding `--rcc-primary` and re-run the audit. Blue is the defensible alternative and costs the club its clearest point of separation.

**One job each.**

| Color | Role | Job | Never |
|---|---|---|---|
| Green | `primary` | Links, buttons, active state, focus ring. The color the club is recognized by. | n/a |
| Blue | `secondary` | Cross-references out to another doc or session. That is the whole job. | Adjacent to green in the same component. |
| Red | `error` | Errors, destructive actions, and failure paths in a diagram. Semantic. | Decoration, headings, accents, callouts, prose. |
| Yellow | `highlight` | The "live now" and "changed" marker, and the warning callout. Small areas, always as a fill under dark text. | As a text color or a bare mark on any surface. |

**Three checks that keep it off Google**, all verifiable by looking at a page. Rewritten 2026-09-21 to match the 2026-09-16 decision that deleted "the club owns no four-color object" ([decision log](../../01-governance/decision-log.md)); the earlier wording failed against the club's own lockup and the Club Rush flyers.

1. **No arrangement of the four reads as a Google mark.** Not on one letterform, a dot ring, a rounded-square tile, a four-dot or conic loader, or as four equal shapes in logo order ([bright-lines.md §1.3](bright-lines.md)). The four together are allowed as a labeled device on print and promotional pieces: the Club Rush flyers run them as four bars, each under its own word, and that is the reference.
2. **No single interface component uses more than two**, and a row of components never cycles through them ([components.md §7.1](components.md)). This covers web pages, docs, and decks. The labeled print device in check 1 is not a component.
3. **On web pages, docs, and decks, green covers at least 70% of the non-neutral area**, not counting the GDG lockup, which is licensed art and four-color by construction. A page that is a spread of four colors at similar weight has failed regardless of hex. Print and promotional pieces using the device in check 1 are exempt, and green still leads them through the headline accent or the Step.

Check 3's exemptions are a judgment call made in the 2026-09-21 cleanup, the smallest change that stops the rule failing against the logo and the flyers. Tightening or dropping it is a decision-log entry.

The Fall 2026 arcs (Voice, Ask, Evidence) get no hue. §9.2 gives them a form instead. A three-arc hue system breaks all three checks at once and puts a 1.84:1 yellow on a chip label.

## 2.4 How the ramps were derived

Reproducible, so a future officer can regenerate rather than guess. Tone is CIE L\*. Hue and chroma come from OKLCh, which holds hue steady across lightness better than LCh(ab), particularly for blue. Each ramp holds its source hue, solves for the OKLab lightness landing on the target CIE L\*, and takes the largest in-gamut chroma under an envelope that peaks at mid tones and tapers to zero at both ends (0.42 of source chroma at T10, 0.62 at T20, 0.80 at T30, 1.00 from T40 to T60, 0.62 at T80, 0.38 at T90, 0.28 at T94, 0.20 at T96). Without the taper the deep tones clip to gamut-edge primaries and the light tones go neon.

Tone deltas are a reasoning aid: 40 points is about 3:1, 50 points is about 4.5:1. Every pair in §2.5 was measured, not estimated.

**The neutral ramp, and the one place the drafts undersold themselves.** Neutrals are tinted toward the lead hue at 148.5. Ink and page surfaces run at OKLCh chroma `0.005`, which reads as grey. **Container fills run at `0.012`**, which is where the tint becomes a decision a reader can see. The earlier draft set everything to 0.005 and argued in the same paragraph both that the tint stops a page reading as an unstyled template and that it is low enough to read as grey. Both cannot be true at once. At 0.012 a card reads as faintly green paper against a near-white ground, which is the club's cheapest and most durable signature.

The container chroma of 0.012 is a judgment call tuned against generated output. Look at it on the A-210 projector before Demo Day; a lecture-hall projector flattens low-chroma tints.

Outlines run at `0.012` as well, so a boundary carries the same cast as the fill it bounds.

## 2.5 Contrast audit

Recomputed this session from the shipped hexes. 4.5:1 is the floor for body text; 3.0:1 for large text (24px, or 18.66px bold) and for non-text elements that carry meaning.

**Light.** 31 pairs, all pass.

| Foreground | Background | Values | Ratio | Min |
|---|---|---|---|---|
| `on-surface` | `surface` | `#1e201e` on `#f7faf8` | 15.61 | 4.5 |
| `on-surface-variant` | `surface` | `#575a58` on `#f7faf8` | 6.64 | 4.5 |
| `on-surface` | `surface-container-highest` | `#1e201e` on `#dde5de` | 12.76 | 4.5 |
| `on-surface-variant` | `surface-container-highest` | `#575a58` on `#dde5de` | 5.43 | 4.5 |
| `on-surface` | `surface-container-lowest` | `#1e201e` on `#ffffff` | 16.40 | 4.5 |
| `on-surface-variant` | `surface-container-lowest` | `#575a58` on `#ffffff` | 6.98 | 4.5 |
| `primary` | `surface` | `#00732d` on `#f7faf8` | 5.73 | 4.5 |
| `primary` | `surface-container-highest` | `#00732d` on `#dde5de` | 4.68 | 4.5 |
| `primary` | `surface-container-lowest` | `#00732d` on `#ffffff` | 6.02 | 4.5 |
| `on-primary` | `primary` | `#ffffff` on `#00732d` | 6.02 | 4.5 |
| `on-primary-container` | `primary-container` | `#003a13` on `#cff1d3` | 10.64 | 4.5 |
| `secondary` | `surface` | `#1b5eca` on `#f7faf8` | 5.71 | 4.5 |
| `secondary` | `surface-container-highest` | `#1b5eca` on `#dde5de` | **4.67** | 4.5 |
| `on-secondary` | `secondary` | `#ffffff` on `#1b5eca` | 6.00 | 4.5 |
| `on-secondary-container` | `secondary-container` | `#092e69` on `#dbe9ff` | 10.65 | 4.5 |
| `error` | `surface` | `#c5150f` on `#f7faf8` | 5.73 | 4.5 |
| `error` | `surface-container-highest` | `#c5150f` on `#dde5de` | 4.68 | 4.5 |
| `on-error` | `error` | `#ffffff` on `#c5150f` | 6.02 | 4.5 |
| `on-error-container` | `error-container` | `#6f0604` on `#ffeae6` | 10.66 | 4.5 |
| `on-highlight` | `highlight` | `#392300` on `#e09f2e` | 6.48 | 4.5 |
| `on-highlight-container` | `highlight-container` | `#4f3400` on `#ffe5c0` | 9.44 | 4.5 |
| `code-on-surface` | `code-surface` | `#2f312f` on `#eef6ef` | 11.91 | 4.5 |
| `inverse-on-surface` | `inverse-surface` | `#f1f4f2` on `#2c312c` | 11.98 | 4.5 |
| `inverse-primary` | `inverse-surface` | `#96d6a0` on `#2c312c` | 7.85 | 4.5 |
| `outline` | `surface` | `#727873` on `#f7faf8` | 4.30 | 3.0 |
| `outline` | `surface-container-highest` | `#727873` on `#dde5de` | 3.51 | 3.0 |
| `outline` | `surface-container-lowest` | `#727873` on `#ffffff` | 4.52 | 3.0 |
| `focus-ring` | `surface` | `#00732d` on `#f7faf8` | 5.73 | 3.0 |
| `focus-ring` | `surface-container` | `#00732d` on `#e8f0e9` | 5.18 | 3.0 |
| `focus-ring` | `surface-container-highest` | `#00732d` on `#dde5de` | 4.68 | 3.0 |
| `focus-ring` | `surface-container-lowest` | `#00732d` on `#ffffff` | 6.02 | 3.0 |

**Dark.** 31 pairs, all pass.

| Foreground | Background | Values | Ratio | Min |
|---|---|---|---|---|
| `on-surface` | `surface` | `#e6e9e6` on `#121412` | 15.13 | 4.5 |
| `on-surface-variant` | `surface` | `#b9bcba` on `#121412` | 9.67 | 4.5 |
| `on-surface` | `surface-container-highest` | `#e6e9e6` on `#313731` | 9.97 | 4.5 |
| `on-surface-variant` | `surface-container-highest` | `#b9bcba` on `#313731` | 6.37 | 4.5 |
| `on-surface` | `surface-container-lowest` | `#e6e9e6` on `#0b0f0b` | 15.78 | 4.5 |
| `on-surface-variant` | `surface-container-lowest` | `#b9bcba` on `#0b0f0b` | 10.08 | 4.5 |
| `primary` | `surface` | `#96d6a0` on `#121412` | 10.95 | 4.5 |
| `primary` | `surface-container-highest` | `#96d6a0` on `#313731` | 7.22 | 4.5 |
| `primary` | `surface-container-lowest` | `#96d6a0` on `#0b0f0b` | 11.42 | 4.5 |
| `on-primary` | `primary` | `#003410` on `#96d6a0` | 8.29 | 4.5 |
| `on-primary-container` | `primary-container` | `#c6eccb` on `#00531e` | 7.21 | 4.5 |
| `secondary` | `surface` | `#a6c8ff` on `#121412` | 10.87 | 4.5 |
| `secondary` | `surface-container-highest` | `#a6c8ff` on `#313731` | 7.16 | 4.5 |
| `on-secondary` | `secondary` | `#092e69` on `#a6c8ff` | 7.67 | 4.5 |
| `on-secondary-container` | `secondary-container` | `#d2e3ff` on `#104394` | 7.18 | 4.5 |
| `error` | `surface` | `#ffb3a8` on `#121412` | 10.81 | 4.5 |
| `error` | `surface-container-highest` | `#ffb3a8` on `#313731` | 7.13 | 4.5 |
| `on-error` | `error` | `#660604` on `#ffb3a8` | 7.70 | 4.5 |
| `on-error-container` | `error-container` | `#ffdbd4` on `#910906` | 7.27 | 4.5 |
| `on-highlight` | `highlight` | `#392300` on `#e7ae58` | 7.49 | 4.5 |
| `on-highlight-container` | `highlight-container` | `#fcdeb5` on `#624000` | 7.22 | 4.5 |
| `code-on-surface` | `code-surface` | `#dadedb` on `#1b211c` | 12.06 | 4.5 |
| `inverse-on-surface` | `inverse-surface` | `#2f312f` on `#dde5de` | 10.20 | 4.5 |
| `inverse-primary` | `inverse-surface` | `#006928` on `#dde5de` | **5.35** | 4.5 |
| `outline` | `surface` | `#919791` on `#121412` | 6.20 | 3.0 |
| `outline` | `surface-container-highest` | `#919791` on `#313731` | 4.09 | 3.0 |
| `outline` | `surface-container-lowest` | `#919791` on `#0b0f0b` | 6.47 | 3.0 |
| `focus-ring` | `surface` | `#96d6a0` on `#121412` | 10.95 | 3.0 |
| `focus-ring` | `surface-container` | `#96d6a0` on `#1b211c` | 9.70 | 3.0 |
| `focus-ring` | `surface-container-highest` | `#96d6a0` on `#313731` | 7.22 | 3.0 |
| `focus-ring` | `surface-container-lowest` | `#96d6a0` on `#0b0f0b` | 11.42 | 3.0 |

### Numbers to watch

- **The tightest pass in the system is `secondary` on `surface-container-highest` in light, at 4.67:1.** Nothing sanctions a lighter-inverted surface below that in light mode. If someone adds one, cross-reference links stop passing on it.
- **`--rcc-surface-dim` is deleted.** It measured `#d7dad8`, against which `primary`, `secondary`, and `error` all landed at about 4.27:1. It was a shipped token no rule used, and the earlier draft's claim that nothing deeper than `surface-container-highest` existed in light was false while it shipped.
- **`outline-variant` is 1.44:1 on the light surface and 2.00:1 on the dark surface.** That is deliberate and below 3:1. It is a divider and a decorative edge. It must never be the only thing defining the boundary of a control or of a status container. Use `outline` for that.
- **Container fills are invisible on their own.** `primary-container` is 1.16:1 against the light page ground, `error-container` 1.10:1, and every container sits near 1.99:1 in dark. **Any container that carries status (a callout, an error field, a live marker) pairs with a 1px `--rcc-outline` hairline.** The fill is a tint, and the hairline is the boundary that meets 1.4.11.
- **`--rcc-highlight` is a fill, never a mark.** As a bare shape on the light surface it measures 2.18:1. The live-now marker is always a labeled chip with `--rcc-on-highlight` text at 6.48:1, so the meaning is carried by words and the color is decoration. A bare yellow dot or bar is not a sanctioned use in light mode.
- **A link is not distinguishable by color alone.** `primary` against body ink measures 2.73:1 in light and 1.38:1 in dark, both below the 3:1 that SC 1.4.1 needs for color-only distinction. Every in-prose link carries an underline (§3.7).

### The surface ladder

Adjacent steps sit at 1.043:1 to 1.181:1. They are meant to be barely perceptible: enough to read an edge without drawing a line. `surface` to `surface-container-highest` is 1.22:1 in light and 1.52:1 in dark. Depth is tone difference first, and tone survives dark mode, a classroom projector, and a printer in a way `box-shadow` does not.

## 2.6 Rules

**Do** use `primary` for the action the reader is meant to take. **Do not** use `secondary` to mean "slightly less important action." Blue means "this points somewhere else." A lower-emphasis action is an outlined or text `primary` button.

**Do** use `highlight` as a fill behind dark text. **Do not** set text in `highlight`, and do not draw a bare highlight-colored mark on a light surface.

**Do** use `error` for failure and destruction. **Do not** use red for a heading, a callout, a chart series, or an accent. It is the one color here with a fixed meaning and spending it elsewhere costs the meaning.

**Do** put white cards (`surface-container-lowest`) on the tinted page ground (`surface`). The tint is what lets the card read as lifted without a shadow.

**Do** derive a new color by picking a tone on one of the four hues and measuring it. **Do not** introduce a fifth hue. This answers the `brand.md` line "Club-specific accent colors, if any: [TBD]": the club does not add one.

**Caution:** every `*-container` role is a fill and never a text color. `#cff1d3` as text on `#f7faf8` is 1.16:1.

## 2.7 Color in the markdown docs

**On GitHub**, the club's CSS does not apply. Color reaches those pages only through committed images and diagrams, so the rule there constrains assets rather than tokens.

**As standalone HTML**, the tokens apply directly.

There is a hard arithmetic limit worth publishing. GitHub's light canvas is `#ffffff` and its dark canvas is `#0d1117` (current as of 2026-08-31; if GitHub changes it, re-run this table). **No single color clears 4.5:1 against both.** An exhaustive sRGB search this session puts the true ceiling of `min(CR vs #ffffff, CR vs #0d1117)` at **4.350:1**, near `#de12b1`. So:

- **Text inside artwork** cannot be one fixed color. Either ship two files behind a `<picture>` with `prefers-color-scheme` (§8.7 has the markup), or put the text in the markdown beside the image, which is cheaper and makes it searchable.
- **Strokes, fills, and marks** need 3:1, which one color can hold on both. Use these dual-mode tones, each recomputed this session at CIE L\*≈51 on its hue:

| Role in a diagram | Hex | On `#ffffff` | On `#0d1117` |
|---|---|---|---|
| Lead / primary mark | `#008c39` | 4.37:1 | 4.33:1 |
| Cross-reference mark | `#3376e3` | 4.34:1 | 4.36:1 |
| Highlight mark | `#a36f00` | 4.35:1 | 4.35:1 |
| Neutral rule / connector | `#777a77` | 4.34:1 | 4.36:1 |
| Failure path only | `#e13a2d` | 4.33:1 | 4.37:1 |

Never encode meaning in color alone in a diagram. Pair it with a label, a shape, or a dash pattern, and let a dashed stroke mean one thing across every diagram the club draws.

## 2.8 The logo ligature trap

Google Sans ships the Google logo as glyphs. `liga` is on by default and maps the literal strings `Glogo`, `ologo`, `glogo`, `llogo`, `elogo`, `Gsuper`, and `Googlelogo` to private-use codepoints E000 through E006, with `calt` sequences `[Gg]oogle_logo` and `google_G_logo`. Ordinary prose containing "Google" triggers none of it; the triggers are specific camelCase and underscored tokens.

The realistic trigger is a code sample. So the system sets `font-variant-ligatures: none` on `code, kbd, samp, pre` by default, which covers both `liga` and `calt`. No code sample needs ligatures, and reproducing the Google wordmark is trademark use no matter how it got on the page.

**Open item:** nobody has checked whether Google Sans Code carries the same E000–E006 ligature table. The blanket rule above covers it either way.

## 2.9 Judgment calls in this section

- Green as the lead. The brand guide does not rank the four.
- The container tint chroma of 0.012 and the surface chroma of 0.005, tuned by eye against generated output. Tone targets and every contrast number are computed.
- `#0d1117` as GitHub's dark canvas, current as of 2026-08-31.
- Nobody on the club side has seen the brand guide deck. The four hexes come from `brand.md`, which notes the deck also lists halftone and pastel variants. If those are prescribed for specific uses they may conflict with the container tones here, and this section should be reconciled against the deck.

---

## 3. Foundations: typography

## 3.1 The license answer

Checked 2026-08-31 against the Google Fonts catalog metadata endpoint, the CSS2 API, `google/fonts`, `googlefonts/googlesans`, and the `name` and `fvar` tables of the served WOFF2 files.

| Family | In catalog | Binary copyright (name ID 0) | License URL (ID 14) | Web-embeddable |
|---|---|---|---|---|
| **Google Sans** | Yes, 2025-12-09 | Copyright 2025 The Google Sans Project Authors | `openfontlicense.org` | **Yes** |
| **Google Sans Code** | Yes, 2025-02-26 | Copyright 2026 The Google Sans Code Project Authors | `openfontlicense.org` | **Yes** |
| Google Sans Flex | Yes, 2025-11-12 | not inspected | not inspected | Out, see below |
| **Google Sans Mono** | No | Copyright 2024 Google LLC. All Rights Reserved. | none | **No** |
| Google Sans Text | No | Copyright 2015 Google LLC. All Rights Reserved. | none | No |
| Product Sans | No | served CSS carries `fonts.google.com/license/googlerestricted` | n/a | No |

**Google Sans Mono is out and Google Sans Code replaces it ([checklist.md](checklist.md) item 1).** Mono has no catalog entry, no public repo, no license file, and an All-Rights-Reserved binary with no license record. The CSS2 API will serve it if asked; serving is not licensing. The brand guide is a slide deck describing what Google hands chapters, not a font license. Code is in `google/fonts` at `ofl/googlesanscode/` with `license: "OFL"` in `METADATA.pb`, has a live upstream repo, and carries the OFL URL in its binary. Same lineage, same licensor, and it is the code face Google itself now ships.

**Three unresolved contradictions in Google's own paper trail**, stated rather than smoothed over: `googlefonts/googlesans/metadata/METADATA.pb` still reads `license: "GOOGLE_RESTRICTED"` and `visibility: "INTERNAL"` while the README, `OFL.txt`, the catalog, and the binary all say OFL; there is no `ofl/googlesans` directory in `google/fonts` even though the family is in the catalog; and `googlefonts/googlesans/OFL.txt` opens with a copyright line naming a different project whose repo 404s. Our read is that the METADATA lines are stale leftovers from the internal-only era. That is not provable from outside.

**So the delivery decision is: link the Fonts API, do not self-host Google Sans.** The club cannot point at a license for a binary it would be redistributing, and the API costs one preconnect. Self-hosting is fine for the substitute stack, whose license lives in `google/fonts`. This reverses the earlier compliance draft, which required self-hosting and forbade the API; that row is rewritten in §1.3. Recheck before any print vendor or merch run, where the sanctioned route is the brand guide's own templates anyway.

**Google Sans Flex is out** despite being in the catalog: its upstream repo 404s and its license file lives inside a different project's repo.

**Trademark is a separate question from license.** `TRADEMARKS.txt` restricts the *words* "Google" and "Google Sans" as marks and forbids incorporating them into a company name, product name, domain, or social profile without permission. It does not restrict setting the club's own text in the typeface, which is ordinary OFL use. Setting "GDG on Campus Riverside City College" in Google Sans on a poster is text. Drawing a club logotype out of Google Sans letterforms is where `brand.md`'s "imitate Google's visual identity" rule bites. The club already has logo files. Type never becomes the mark.

## 3.2 The optical seam, and how it is set

Google Sans exposes an `opsz` axis with a range of exactly 17 to 18. Per the upstream README, the min optical size design is the drawing named "Google Sans Text" and the max is "Google Sans". Two separately drawn designs, one file, one axis value apart. That is the brand-face-versus-text-face split available for free, and it is one of the three things that make a club page recognizable (§9.1).

**Set it with `font-optical-sizing: auto` and nothing else.** The UA then maps `opsz` to the used font size, clamped to the axis range, so a 40px headline gets the display drawing and 17px body gets the text drawing with no hard-coded axis anywhere. The earlier draft pinned `"opsz" 18` and `"opsz" 17` in `font-variation-settings`, which broke the substitute stack (Inter's `opsz` runs 14 to 32, so a 57px fallback headline would have rendered pinned near the minimum) and created an inheritance trap, because `font-variation-settings` is a single replaced value and any child setting one axis drops the rest.

**`font-variation-settings` is set exactly once, on `body`, and only for `GRAD`.** Per spec, `font-optical-sizing: auto` still applies as long as `opsz` is not named explicitly. One declaration, inherited, nothing to drop.

`GRAD` changes apparent stroke weight without changing advance widths, so nothing reflows and no line breaks move. Light text on a dark ground blooms and reads heavier. `--rcc-grad: -25` on dark is a starting point, not a measurement. Look at `body-lg` on `--rcc-surface` and adjust.

The `MONO` axis declaration from the earlier draft is deleted. It was asserted and never verified, and the URL never named it, which by the section's own rule made it a silent no-op.

Verified: the served `latin` Google Sans WOFF2 carries `fvar` axes `opsz 17–18 (default 18)`, `wght 400–700 (default 400)`, `GRAD -50–200 (default 0)`. Naming `GRAD,opsz,wght` in the URL returns 70,696 bytes on latin; requesting `wght` alone returns 35,852 and pins the other two out. The URL selects which axes ship, not how far they run.

## 3.3 Weights

Google Sans ships `wght 400–700` with true italics. Three weights are in the system.

| Token | Value | Job |
|---|---|---|
| `--rcc-weight-body` | 400 | Running text. Everything that is a sentence. |
| `--rcc-weight-strong` | 500 | Every heading, label, and button. |
| `--rcc-weight-loud` | 700 | Reserved. One use per page at most, and the emphasized tier. |

600 exists in the font and is out of the system. The difference between 500 and 600 will not survive a handoff between officers. Hierarchy is carried by size, space, face, and color. Every heading is 500 and the reader tells them apart by size and by the seam.

**`font-synthesis: weight`**, not `none`. Weight 500 carries every heading, label, and button; `system-ui`, `-apple-system`, and `Segoe UI` do not all ship a real 500, and with synthesis fully off those headings render at 400 during the swap window and look unstyled rather than broken. Allowing weight synthesis and forbidding style synthesis gives a fallback heading that still reads as a heading and still makes a missing italic fail visibly.

`brand.md` grants "Google Sans (Regular, Bold)". The variable font's continuous 400–700 range covers 500. Note this in `brand.md` alongside B1 rather than leaving the reader to wonder.

**Emphasized tier.** A parallel set at identical sizes, one weight step heavier: 400 goes to 500, 500 goes to 700. Sizes and leading never change, so switching a card to emphasized cannot reflow a layout. Use it for the live session, a selected filter, an unread item, the Demo Day row. Two or three per page and it stops signalling anything.

## 3.4 The scale

Fifteen roles. Ordering is strictly monotonic at every viewport width, which the earlier draft's mix of fluid and fixed roles was not: at 390px its `headline-md` rendered larger than its `headline-lg`, and four roles collapsed into two sizes.

Fluid roles interpolate between a 360px and a 1440px viewport. Fixed roles never move; the reading size should not change when the window does, and the hierarchy should flatten on a phone rather than shrink proportionally.

| Role | Size | Line height | Tracking | Weight | Face |
|---|---|---|---|---|---|
| `display-lg` | 36 → 57px fluid | 1.05 | −0.02em | 500 | brand |
| `display-sm` | 28 → 40px fluid | 1.12 | −0.015em | 500 | brand |
| `headline-lg` | 24 → 32px fluid | 1.25 | −0.01em | 500 | brand |
| `headline-sm` | 20 → 24px fluid | 1.30 | −0.005em | 500 | brand |
| `title-lg` | 18px | 24px | 0 | 500 | text |
| `title-sm` | 15px | 20px | +0.005em | 500 | text |
| `body-lg` | 17px | 28px | +0.005em | 400 | text |
| `body-md` | 15px | 24px | +0.008em | 400 | text |
| `body-sm` | 13px | 20px | +0.01em | 400 | text |
| `label-lg` | 15px | 20px | +0.01em | 500 | text |
| `label-md` | 13px | 16px | +0.015em | 500 | text |
| `label-sm` | 11px | 16px | +0.06em | 500 | text, uppercase |
| `code-lg` | 15px | 24px | 0 | 400 | code |
| `code-md` | 14px | 24px | 0 | 400 | code |
| `code-sm` | 13px | 20px | +0.02em | 500 | code |

At a 390px viewport the fluid roles compute to 36.6 / 28.3 / 24.2 / 20.1, above `title-lg` at 18 and `title-md`'s slot at 17. At 1440px they reach 57 / 40 / 32 / 24. Ordering holds at both ends and everywhere between.

**The seam.** The scale is not generated from a modular ratio and does not pretend to be. Steps run about 1.42 at the display end and settle to roughly 1.11 to 1.20 through headline and title, then take one deliberate jump from `title-lg` (18px) down to `body-lg` (17px) where weight and tracking change instead of size. Around 20px the brand drawing hands off to the text drawing and the tracking flips sign. Publishing that seam matters more than publishing a ratio, and §9.1 makes it a visible feature rather than an artifact.

Body is anchored at 17px, not 16px. Judgment call: these documents get read on a phone and projected in A-210 on Thursday afternoons, and 17px holds up in both.

**Line heights.** Display through headline run 1.05 to 1.30, tighter as size grows. Body and label run 1.5 to 1.65. Fixed roles are set in rem so leading lands on a 4px grid and text stacks against components without drift; fluid roles use a unitless ratio and land off-grid between the clamp ends, which is invisible because display type rarely meets a component edge.

**Tracking** is a function of size and flips sign around 20px: negative above, zero at `title-lg`, positive below, up to +0.06em on the uppercase `label-sm`. Setting tracking to 0 everywhere is the single most common reason student work looks flat.

## 3.5 Measure

| Token | Value | Use |
|---|---|---|
| `--rcc-measure-prose` | `68ch` | Doc bodies, playbooks, session descriptions. About 620px at `body-lg`. |
| `--rcc-measure-narrow` | `46ch` | Captions, callout bodies, sidebars, table cells. |
| `--rcc-measure-display` | `20ch` | Headlines. Caps the line by character count so a hero headline wraps to two or three lines at every viewport. |

Keep prose between 45ch and 75ch. Above 75ch the eye loses the line return; below 45ch the rag gets ugly. Measure is capped independently of the layout grid: a section can be 1200px wide and its prose still 68ch. Every heading role gets `--rcc-measure-display` whether it arrives as a class or as an `h1` through `h4` element, so a heading looks the same coming from markdown as from hand-written markup.

## 3.6 Details set once

**Tabular figures.** The served latin subset carries `tnum` (verified in its GSUB list alongside `calt`, `ccmp`, `frac`, `liga`, `lnum`, `locl`, `numr`, `pnum`, `pref`, `ss02`). Default figures are proportional. Turn on `font-variant-numeric: tabular-nums` for anything in a column or anything that changes: budget tables, attendance counts, the 14-session schedule, the phase clock on a Demo Day page.

**The time colon.** `USAGE.md` documents stylistic set `ss02` as "Colon design for use in time displays", and the tag is present in the served latin subset. Every session card says "2:30 to 3:30 PM". The feature ships; nobody has rendered it. Look at "2:30" with and without before relying on it.

Small caps are not available. `smcp` and `c2sc` are documented in `USAGE.md` and are not in the served latin subset. Do not design anything that depends on them.

**Italics.** True italics ship at 400, 500, 600, and 700. Use them.

**Do not** use `-webkit-font-smoothing: antialiased` to thin text on dark backgrounds. It affects macOS only and makes type inconsistent across platforms. `GRAD` is the tool built for this and it works everywhere the variable font does.

## 3.7 Links

`primary` against body ink is 2.73:1 in light and 1.38:1 in dark, both below the 3:1 that color-alone distinction requires. **Every link inside prose carries an underline**, at `text-underline-offset: 0.15em` and `text-decoration-thickness: from-font`. Standalone navigation links and button-styled links are exempt, because there the surrounding context is not prose and the affordance is the shape.

## 3.8 Substitute stack

Two reasons to have one even though Google Sans is licensed and embeddable: the paper trail has three unresolved contradictions, and there are contexts the GDG grant does not obviously reach (a print vendor, merch, anything co-branded with the college where Google marks are forbidden outright).

**Inter, both slots.** OFL, in the catalog, not a brand font, and it carries an `opsz` axis running 14 to 32 with `wght` 100 to 900. That axis is why it is the right substitute: `font-optical-sizing: auto` does the whole optical-size job on its own, continuously rather than across a two-point switch. One family, one file.

**Code slot: JetBrains Mono.** OFL, in the catalog, variable `wght` 100–800 with true italics.

Figtree is a reasonable second option for the brand slot if the club later wants more display character, and it is **not** in the shipped fallback stack. The earlier draft listed it ahead of Inter, which silently made option two the default for anyone who happened to have it installed.

**Roboto is deliberately not recommended.** It is the obvious open relative and it is the wrong answer: Roboto plus a Google blue plus a card grid reads as stock Android.

Verified working: `https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&display=swap`

## 3.9 Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,GRAD,opsz,wght@0,-50..200,17..18,400..700;1,-50..200,17..18,400..700&family=Google+Sans+Code:ital,wght@0,400..700;1,400..700&display=swap">
```

Verified 2026-08-31: HTTP 200, 33,908 bytes, **72 `@font-face` blocks**. That is 72 blocks total across both families and both styles, because Google Fonts splits each face by `unicode-range`. A Latin page downloads two files, not seventy-two.

Name every axis you intend to set. `&subset=latin` is ignored on css2. `display=swap` so text renders in the fallback immediately.

**Open item:** the fallback face metrics differ from Google Sans, so text shifts when the webfont lands. `size-adjust` on an `@font-face` fallback fixes it, and the correct value has to be measured against the real fallback on the real platforms. Left as a TODO rather than invented.

## 3.10 Open items

- `ss02` time colon: tag confirmed present, appearance not verified.
- `GRAD: -25` on dark: a starting point, not a measurement.
- Inline code at `0.9375em`: Google Sans Code's x-height against Google Sans has not been compared.
- `size-adjust` on the fallback.
- Does Google Sans Code carry the E000–E006 ligature table?
- The three Google Sans license contradictions, unresolved as of 2026-08-31.

---

## 4. Foundations: space, grid, shape, elevation

## 4.1 Space

**Base unit 4px, preferred step 8px, named by multiplier.** `--rcc-space-6` is 6 × 4px = 24px.

Two things make 4px right. The type scale's fixed line heights are all 4px multiples, so a text block and a box beside it stack without half-pixel drift. And 4px is fine enough to handle real sub-8 cases (icon-to-label gaps, chip padding) without anyone inventing a 5px, while 8px is coarse enough that most layout decisions have one obvious answer.

Multiplier naming extends without renaming anything. T-shirt sizes run out the moment you need a step between two of them.

The compliance draft's "Space 100 = 8dp" and the components draft's "`space-200` = 16px" are both retired. One scale, `--rcc-space-N` = N × 4px.

The scale is deliberately incomplete: fourteen steps, not thirty-two. Add a step when a real component needs one.

| Token | Value | Typical job |
|---|---|---|
| `--rcc-space-0` | 0 | Reset |
| `--rcc-space-0-5` | 2px | Optical nudge only. Never layout. |
| `--rcc-space-1` | 4px | Chip inner padding, tight icon gap |
| `--rcc-space-2` | 8px | Label to control, table cell padding |
| `--rcc-space-3` | 12px | Row padding in dense lists |
| `--rcc-space-4` | 16px | Paragraph flow, narrowest page margin, control padding |
| `--rcc-space-5` | 20px | Controls that need to clear an icon |
| `--rcc-space-6` | 24px | Card padding, grid gutter, block separation |
| `--rcc-space-8` | 32px | Feature card padding, space above h3 |
| `--rcc-space-10` | 40px | Large card padding |
| `--rcc-space-12` | 48px | Space above h2, desktop page margin |
| `--rcc-space-16` | 64px | Inside hero blocks |
| `--rcc-space-20` | 80px | Desktop section padding |
| `--rcc-space-30` | 120px | Page bands |

**Padding, then gap, then margin.** Spacing lives on the parent container. A card carrying its own outer margin cannot be reused in a grid, a stack, and a sidebar without three overrides. The one sanctioned exception is prose flow between siblings, where `li + li` and `p + p` margins are the correct tool and are applied from a `--rcc-flow-*` token so the value stays in one place.

**Positions are logical.** `inline-start` / `inline-end`, `block-start` / `block-end`. Free today, and the whole difference if the club ever publishes in a right-to-left script.

**Section rhythm has its own tokens.** The space between two sections is not made of component spacing. These three are the only fluid tokens in the system, because nothing aligns across a section gap so intermediate drift is invisible. Everything structural steps at breakpoints and stays on the grid.

**Prose rhythm is 2:1, above to below, at every heading level.** One ratio does all the sectioning work, which is why a well-set doc needs no rules, boxes, or background changes to mark a section boundary. §9.1 makes this the club's only sectioning device.

**Density: two settings.** Default for cards, event pages, and prose. Compact for the schedule table, the session list, and the roster. Compact changes *what appears* and not only the row height: at compact, a session card drops its description and keeps title, date, arc, and room.

**Density is a user setting and never a viewport consequence.** Binding it to a breakpoint would make content disappear on phones, which is a content-parity failure. `data-density="compact"` is set by a control, not a media query.

## 4.2 Grid

**Three breakpoints: 600px, 1024px, 1440px. Columns 4, 8, 12.**

The breakpoint numbers are a judgment call. The surveyed Google properties do not agree with each other (425/767/1024/1600 on one, 600/768/1024/1280/1440/1920 on another, 600/1024/1440 on a third). Three is the smallest ladder covering phone, small laptop or tablet, and desktop, and 600/1024/1440 has the most overlap. Pick three; do not add a fourth.

The column counts are not a judgment call. 4 / 8 / 12 share divisors, so a span of 4 is full width at 4 columns, half at 8, and a third at 12. One number, correct at every tier, no breakpoint override. Halves and quarters come free everywhere. **Thirds exist only at 12 columns**, which is worth knowing before designing a three-up card row: it collapses to two-up at 8 and stacks at 4.

| Tier | Columns | Gutter | Page margin |
|---|---|---|---|
| base (<600px) | 4 | 16px | 16px |
| ≥600px | 8 | 24px | 32px |
| ≥1024px | 12 | 24px | 48px |

The gutter holds at 24px across both larger tiers rather than growing. Card padding is also 24px, so the gap between two cards and the gap inside one card agree and a row reads as one rhythm. The column width absorbs the extra viewport, which is the right answer: wider screens should get wider content, not wider air.

**Containers, chosen by what is inside them.**

| Token | Value | Use |
|---|---|---|
| `--rcc-container-prose` | 640px | Body copy. Session recaps, playbook prose. |
| `--rcc-container-doc` | 896px | A document that also carries tables, code, and figures. |
| `--rcc-container-content` | 1200px | Card grids, event pages, the Demo Day project wall. |
| `--rcc-container-wide` | 1440px | Hero media and full-bleed bands. |

The container's `max-width` measures the **content**, with page margin added on top. This requires `box-sizing: border-box`, which the reset at the top of [tokens.css](tokens.css) ships. Without it the padding lands outside the max-width and the column band is wrong.

**Control sizing.** The visible control is 40px; the hit area is 48px minimum. Two tokens, and every button, checkbox, and icon link clears the touch minimum without anyone thinking about it.

## 4.3 Shape

Seven steps, indexed by roundness rather than by component size.

| Token | Value | Use |
|---|---|---|
| `--rcc-radius-none` | 0 | Full-bleed media, table cells, dividers |
| `--rcc-radius-xs` | 4px | Inline code, tags, smallest chips |
| `--rcc-radius-sm` | 8px | Inputs, code blocks, compact list cards |
| `--rcc-radius-md` | 12px | Standard card in a grid |
| `--rcc-radius-lg` | 16px | Feature card, framed screenshot, callout |
| `--rcc-radius-xl` | 24px | Hero media, large panels, page-level containers |
| `--rcc-radius-full` | 9999px | Actions and avatars only |

There is no `radius-2xl`. The components draft referenced one and mapped it to 24px, which put every radius reference in that section one step off the scale that shipped. Everything now resolves against this ladder.

Material's scale runs ten steps to 48dp. Seven, capping at 24px, is a trim. The 28/32/48dp steps read most immediately as current Material, and a club site using them beside a GDG logo starts to look like a Google product. **Stated honestly: the trim is subtractive and it is not by itself an identity.** §9.1 carries the identity; this is hygiene.

**Full round means you can press it.** Buttons, pills, pressable chips, avatars. Everything else uses the rectangular ladder. That single distinction does more affordance work than any hover state. If a container is fully rounded it reads as a control and someone will click it.

**Radius grows with footprint.** An 8px radius on a 640px panel looks like a rendering artifact; a 24px radius on a 32px chip looks like a bubble.

**The radius numbers are spacing numbers.** 4, 8, 12, 16, 24 all appear in the spacing scale, so corners and gaps agree automatically and there is one fewer scale to remember.

**Nesting math, two subtractions.** Inner radius equals outer radius minus the padding between them: a 24px card with 8px of padding around an inner panel gives that panel 16px. And inner radius equals outer radius minus the border width: an 8px container with a 1px border wants 7px inside. The earlier draft stated both rules correctly and then got its only worked example wrong (12px outer minus 8px inlay is 4px, `--rcc-radius-xs`, not 8px). `tokens.css` has it right.

**Asymmetric corners are first-class.** A card docked to a section boundary rounds only its free corners. Do not round a corner that has nothing on the other side of it.

**Radius is a spatial property.** When it animates it runs on the spatial track, never on effects.

## 4.4 Elevation

Five levels. Four are allowed at rest.

| Level | Depth cue | At rest | Use |
|---|---|---|---|
| 0 | Tone only | Yes | Page surface, section bands, a card on a tinted ground |
| 1 | Tone + shadow | Yes | Card separating from a same-tone ground; sticky header once scrolled |
| 2 | Tone + shadow | Yes | Dropdown, popover, filter panel |
| 3 | Tone + shadow | Yes | Dialog, modal sheet |
| 4 | Shadow | **No** | Interaction only: drag, and a genuine lift |

The compliance draft mandated a six-step dp ladder (0/1/3/6/8/12dp). That is Material's dp elevation model, which this system rejects. **Depth is tone first.** The dp ladder is struck.

**Tone before shadow.** Separation comes from a step on the surface container ladder. If tone alone will not carry it, add a 1px `--rcc-outline-variant` hairline. Shadow has exactly two jobs: protecting an element that sits over busy or patterned content, and signalling interaction. If two boxes need to look different and neither floats over anything, that is a tone or a hairline problem.

**The recipe is two layers and the ink is not black.** A tight key shadow for contact plus a wider ambient shadow for distance, tinted with the same ink as the text (`--rcc-elevation-ink: 30 32 30`, which is `#1e201e`). Pure black shadows go grey and muddy when they stack.

**`--rcc-elevation-0` is a zero-alpha shadow, not `none`.** `none` does not interpolate with a shadow list, so a transition from level 0 snaps instead of animating. The earlier draft had exactly that bug on its only animated component.

**Card hover goes to level 1, not level 4.** Spending the top of a five-level ladder on the most common hover in the system flattens the whole range, and a shadow with no `transform` reads as a pop rather than a lift.

**Dark is a separate answer, not an inversion.** Step the tone first: on a dark ground a shadow has almost nothing to darken, so move up one surface container role. Pair every floating dark surface with a hairline. When a shadow is genuinely needed (dialogs, dragged items), swap the ink to true black and raise the alpha. The dark alphas below (0.44 key, 0.24 ambient) are chosen, not measured. **Verify them on the A-210 projector before Demo Day**; a lecture-hall projector flattens anything under about 0.3 to nothing.

## 4.5 Sourced against chosen

Read from Google's shipped code or documentation, surveyed 2026-08-31: the 4px base with an 8px preference and line heights on 4px multiples; padding before gap before margin; logical position naming; section rhythm as its own token (48→80px on the event surfaces, 88→120px on the developer community pages); 2:1 heading space, measured at 48/24 for h2 and 32/16 for h3 on the developer documentation; the 4/8/12 column ladder; prose measure capped independently at 600px on Cloud marketing and 656px on the developer documentation article column; a 40px visible control inside a 48px hit area; full-round for actions with rectangular surfaces; reusing one numeric scale for spacing and radius; tone before shadow; the two-layer tinted shadow at 0.30 key and 0.15 ambient; shadow on light and a tone step on dark; inner radius compensated for a border (8px outer against 7px inner on the documentation tab component); asymmetric radii for docked panels; two densities where density changes content rather than only padding.

Chosen here and open to argument: the breakpoints 600/1024/1440; holding the gutter at 24px across both larger tiers; page margins 16/32/48; the four container widths and 640px for prose; seven radius steps capping at 24px; five elevation levels; every dark-mode alpha; the three `clamp()` rhythm ranges.

---

## 5. Foundations: motion

Moved to [motion.md](motion.md) on 2026-09-21 and expanded from five sections to twelve: the four registers, the ambient rule, choreography, scrubbed motion, the transition vocabulary, a performance budget, and motion accessibility beyond the reduced-motion preference. Every `§5.x` citation still resolves there. Icons, which were §5.5, are now [visual-voice.md §9.5](visual-voice.md).

---

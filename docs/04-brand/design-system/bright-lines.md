# 1. Purpose and the bright lines

## 1.1 What this is for and what outranks it

This document is how a GDG on Campus RCC artifact is built: event pages, session pages, recap pages, the Demo Day page, a club site, and the markdown docs that the club actually runs on. It covers both renderings of a doc, on GitHub with no stylesheet and as a standalone HTML build.

When two things disagree, the higher line wins.

1. Google's Brand Resource Center third-party guidance and the GDG On Campus Brand Guide.
2. `docs/04-brand/brand.md`, the club's applied reading of those two, which carries a last-checked date.
3. This design language.
4. **The surface survey**: the club's observation notes on what Google shipped on `material3`, `design-google`, `gemini-ai`, `antigravity`, `pixel-android`, `cloud-enterprise`, `workspace`, `io-events`, `developers`, `typography`, `color-theming`, `motion`, `dataviz-diagrams`, and `docs-editorial`, read on **2026-08-31**. Observation is not permission. "Google does it" is never the reason a club artifact does it.

Every measured claim taken from the survey is pinned to that date. Google's product identity moves, so the survey and this document get a fresh pass each fall.

## 1.2 The line: method, not chrome

Method is how a decision gets made: scale, rhythm, elevation logic, motion curves, density, how technical content is argued on a page. Chrome is what Google ships on top: product marks, brand gradients, product photography treatment, product UI. Method is public engineering practice the club is free to learn from. Chrome is identity, and reusing it makes the club look like a Google property, which is the one outcome the program license forbids.

## 1.3 Take this, not that

| Area | Take (method) | Do not take (chrome) |
|---|---|---|
| Type roles | A semantic scale with size, leading, tracking, and weight bound to a role name, and a brand-face-to-text-face optical split so the system can reface without touching a component. | The names "Material Design", "Material 3", "M3", "Material You" for our system, the Material wordmark, or the `m3.material.io` doc-site furniture (its nav, section iconography, callout set). |
| Typefaces | Google Sans and **Google Sans Code**, licensed to the chapter through the GDG On Campus Brand Guide. See §1.6. | Product Sans in any form. Google Sans Mono, which the chapter has no license for (§3.1). And never fire the Google-logo ligatures baked into Google Sans (§2.8). |
| Font delivery | Link the Google Fonts CSS2 API for catalog families. Self-host only a family with an OFL file in the `google/fonts` repo. This reverses the earlier draft; §3.1 carries the reasoning. | Hotlinking Google's asset hosts for media (`storage.googleapis.com/gd-prod/...`). That is the actual chrome problem. Serving a font from `fonts.googleapis.com` is not. |
| Optical type | Tracking that flips sign at the display-to-text boundary and leading that tightens as size grows. The typography section owns the numbers; do not restate them elsewhere. | A six-axis variable display setup pinned to Google's corporate face as a marketing voice. |
| Spacing | A 4px base with multiplier naming, and padding before gap before margin so spacing lives on the parent. | Google's shipped token namespaces as ours: `md.sys.*`, `--devsite-*`, `--gfd-*`, `.glue-*`. A ported token file reads as lifted code even after every value changes. |
| Layout | The 4 / 8 / 12 responsive column ladder, page gutter and section rhythm as single tokens, prose measure capped independently of the layout grid. | The DevSite three-pane docs shell, the Store's sticky buy bar, the Cloud console header cluster, the two-tier product header with a Google account affordance. |
| Color | Seed and derive rather than hand-pick. The role grammar (`surface` / `on-surface` / `primary` / `on-primary` / `container` / `outline`). Tone deltas as a reasoning aid, measurement as the gate. | The M3 baseline theme as a package: `#6750a4` plus its tonal palette plus Roboto plus Material Symbols plus default radii. Any one is a legitimate technical choice. All together they render as stock Google. |
| Our four colors | Blue 500 `#4285f4`, Green 500 `#34a853`, Yellow 600 `#f9ab00`, Red 500 `#ea4335`, as licensed, used as ramp anchors and as two sanctioned large fills. | Any arrangement reading as a Google lockup: the four on one letterform, on a dot ring, on a rounded-square tile, as a four-dot or conic loader. Three of our four hexes are Google's own product-icon hexes, so arrangement carries the entire load. |
| Accent | One lead hue against a tinted neutral ramp, spent sparingly. | Google's product blues as our action color. Described, not listed: the Workspace, Store, DevSite, and Google-for-Developers action blues are all in the 210 to 220 hue band at high chroma. Do not sample them. |
| Gradients | The construction rule, if a gradient is ever needed: opaque leading edge starting about a third in, diffuse tail ending before 100%, applied as one named token override. | The Gemini gradient. Described, not listed: blue through cyan through violet to warm red on a pill now reads as one specific Google product, not as "AI". Our system ships no gradient. |
| Depth | Surface-tint ladders and 1px hairlines derived from the ink at low alpha, ahead of stacked shadows. Tone first, one reserved interaction level. | A dp shadow ladder as the depth model. Also: the Sign in with Google button chrome used as a general palette. It is product chrome for one Google flow. |
| Shape | A roundness-indexed corner scale and the optical nesting rule (inner radius equals outer radius minus the padding between them). | The Pixel camera-bar silhouette and Google hardware forms as decoration. That full-width pill is the deliberate identifying feature of the industrial design and is recognizable black-on-black. |
| Motion | The two-track split: spatial may overshoot, effects never do. Three tiers for controls and a narrative tier for decks and scenes (§5.2). Enter slower than exit. Spatial roughly twice the effects duration at the same tier. | A four-color conic ring or four-dot sweep as a loading state, and a pulsing "thinking" treatment. |
| Reduced motion | The `prefers-reduced-motion` block, which the two-track split makes trivial: zero the spatial durations, leave effects alone. §5.4 ships it. Across the surveyed Google properties it appeared on two of nine. | The omission. |
| Icons | Stroke icons on a 24 grid, one base glyph plus a consistent modifier for a variant, one locked weight everywhere. §9.5 names the set. | Material Symbols or Google Symbols as our icon identity, Google Cloud product icon ZIPs, the Gemini spark, the Android robot head, and the `{}` / `<>` event glyphs from Google's community pages. |
| Imagery | One locked aspect ratio across a browse grid, native ratios in article bodies, explicit width and height, lazy below the fold, poster-first video, alt text that names the interaction and doubles as the art brief. §9.3 says what our pictures are actually of. | Google product screenshots, Pixel and Store photography treatment, and any mock that could pass for a Google product surface. |
| Diagrams | A three-weight stroke ladder with each weight given a fixed job, open chevron arrowheads with `markerUnits="strokeWidth"`, stencils named by role. Three hues plus neutral, never four (§2.7). | Google Cloud product icons, Cloud product names as diagram labels, and the Cloud logo lockup that ships inside their published architecture SVGs. |
| Charts | Cap categorical hues at three, get further series from lightness steps inside a hue, neutral grey for out of scope, legend carries the numbers with a total row, one reserved meaning for a dashed outline. | The Google four used together as a categorical set. It works for Google and only for Google. |
| Docs | Sentence case everywhere. Heading grammar that encodes section type. A closed callout set with a written scarcity rule. The list-versus-table rule. Horizontal-rule-only tables. A complete sentence before every list and table. A last-updated stamp. | The DevSite chrome (top bar, breadcrumb rail, book nav, thumb-rating widget, Google footer link boxes). |
| Copy | Verb-first CTAs that name the action. One sentence of what plus one of how. Formats that publish their own length and capacity. | Copy borrowing Google's institutional authority: first-person-as-Google, Google's own numbers, customer logo walls, analyst reports. |
| Names | Our own names for our own things. | Google product names as design furniture. Program names (GDG, GDG on Campus, DevFest, Build with AI, I/O Extended) are a separate case: we run those events and may use the names under the program's own rules, with the program's templates, never restyled into our identity. |
| Merch | The swag templates in the brand guide deck. Copy the template; do not redraw it. | Google marks on club-made shirts, mugs, stickers, or posters outside those templates. |
| Domains and handles | `rcc-gdg`, and "GDG on Campus @ RCC" as a casual short form in headings and chat. | Any Google mark inside the club's name, domain, or social handle. `TRADEMARKS.txt` in the Google Sans repo states the marks may not be incorporated into a company name, product name, domain name, or social profile without permission. Avoid "GDG@RCC" and "Google RCC" in official material. |

## 1.4 The independence sentence

### The text

> GDG on Campus Riverside City College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.

Verbatim. Do not paraphrase, shorten, split into two sentences, or swap the semicolon. Copy it from `README.md`, `docs/00-charter/mission.md`, `docs/00-charter/constitution.md`, `docs/04-brand/brand.md`, or the standard Bevy block in `docs/03-playbooks/bevy-event-publishing.md`.

**One sanctioned exception, spoken delivery.** A host reading the sentence aloud at 0:00 may say: *"We're an independent group. Our activities and opinions aren't Google's."* This is the only approved paraphrase, it exists because the written sentence does not survive being spoken, and it applies to speech only. Fix `guest-speaker.md:55` to carry either the verbatim sentence or this exact wording ([checklist.md](checklist.md) item 2).

### Where it goes

Required on anything public that carries the logo. One placement per artifact, at that artifact's front door. The one exception is small-format print, which routes the sentence to the surfaces it points at instead; the row below says why.

| Surface | Placement |
|---|---|
| Web page (event, session, recap, Demo Day, club site) | Footer, always, above any credits or license line. **Plus** a second placement in or directly under the header block on any landing page where the logo sits above the fold and the page runs longer than about three screens. That is the case where "front door" and "footer" stop being the same place. |
| Markdown doc on GitHub | One plain paragraph directly after the H1 and any logo image, before the first section. `README.md` already does this. |
| Standalone HTML build of a doc | Same paragraph after the H1, plus the footer placement. |
| Slide deck | Title slide and final slide. |
| **Poster, flyer, table sign** | **Not on the piece** (decided 2026-09-16). The sentence sits instead on every surface the piece points at: the landing page, both above the fold and in the footer, and the Bevy block. A flyer has room for the sentence only at caption size, which "How it is set" below forbids, so the piece was failing this section either way. Whoever prints one is responsible for the linked surface carrying it. |
| Signage, large format | Bottom of the piece, legible at the distance the piece is read from. The brand guide's signage template sets the size. Large format holds body-size type, so the exception above does not reach it. |
| Bevy event description | Already in the standard block. Do not edit that block. |
| **Social profile bio** | Required whenever the avatar is a GDG logo file. The avatar carries the mark on every post the account makes, permanently, so the bio is the only durable placement. |
| **Social post caption** | When the image carries the logo. Judgment call: caption rather than burned into the image, because burned-in text is neither selectable nor screen-readable. |
| **Link-preview image (`og:image`)** | An `og:image` carrying the logo is a public artifact rendered outside the page footer. Either keep the logo off the share card (§8.6 gives a share card that needs no logo) or put the sentence on the page it links to, above the fold. |
| **GitHub repo social preview** | Same problem as the avatar. Keep the logo off it, or the repo `README.md` first paragraph carries the sentence, which it already does. |
| **Recorded session** | Video description, and on the bumper card if the logo appears there. |
| **`templates/announcement.md`** | A required field in the template ([checklist.md](checklist.md) item 4), so the writer is prompted rather than trusted to remember. |
| Spoken, at an event | Host says it at 0:00, using the verbatim sentence or the sanctioned spoken paraphrase above. |

### How it is set

Real selectable text, never inside an image, a collapsed `<details>`, a tooltip, or a hover state. Body role type at normal body size, not a caption size. `--rcc-on-surface-variant` is the color floor and it must clear 4.5:1 against its background; **measure it, do not estimate it.** The 50-point tone gap heuristic gives 4.484:1 in the worst case, which is below 4.5, so it is a reasoning aid and not a guarantee. (The 40-point / 3:1 version does hold; worst case 3.17:1.) No motion on it, and never revealed by scroll or interaction.

### Where it is not required

Internal working docs with no logo and no standalone publication: meeting notes, run sheets, retros, the semester folders. The repo is public, so these are readable, but the repo's front door is `README.md` and that carries the sentence. Putting it on all sixty-odd markdown files would dilute it.

**This rule is forward-looking and does not authorize removals.** `semesters/2026-fall/budget.md:16` and `semesters/2026-spring/budget.md:16` already carry a variant of the sentence. Leave them.

## 1.5 The logo

### Files

| File | Use |
|---|---|
| `assets/gdg-on-campus-horizontal-light.svg` | Default. README, slides, banners, page headers, light backgrounds. |
| `assets/gdg-on-campus-stacked-light.svg` | Square or narrow spaces on light backgrounds. |
| `assets/gdg-on-campus-stacked-dark.svg` | Same, on dark backgrounds. |
| `assets/gdg-rcc-logo.png` | Blocked. `brand.md` marks this [TBD] pending a naming-rule review. Keep it off anything public until that review lands in the decision log. |

**Interim dark rule ([checklist.md](checklist.md) item 3).** There is no horizontal dark variant. Until one is pulled from the brand guide's Drive folder, a dark-theme header uses `gdg-on-campus-stacked-dark.svg` in the horizontal slot and accepts the taller lockup. Do not put the light file on a dark ground, and do not invert, recolor, or knock out any file. Those are alterations.

### The four-color rule, corrected twice

The first draft called the logo "the one place the four appear together". The second draft called that false on a fill count that found only `#4285f4` and black, and built a rule on the count: the club owns no four-color object. The count and the rule were both wrong, and the 2026-09-14 audit found the error.

The fills that were counted belong to wrapper paths at `fill-opacity="0.0"`. Each logo file is an SVG wrapper around a raster PNG, 1920 x 390 in the horizontal lockup and 960 x 1330 in the stacked ones. Rendered, the mark is red, blue, green, and yellow chevrons beside a black wordmark. **The club's own lockup is a four-color object and always was**, so the first draft was right.

The quartet is therefore not barred. What is barred is what the rule was reaching for, and the table in 1.3 already names it: any arrangement reading as a Google lockup. The Club Rush flyers (decided 2026-09-16) run all four as a row of bars under four short labels, which reads as a color device rather than as a mark.

Two consequences. The logo is raster, so it cannot be recolored by CSS in any case, and the "do not alter" list below is enforced by the file format as much as by this document. And the three checks in `foundations.md` 2.3 encoded the deleted rule and failed against both the lockup and the flyers; **they were rewritten on 2026-09-21** to bar only arrangements that read as a Google mark, and to measure green's 70% on web pages, docs, and decks without counting the lockup. `checklist.md` Brand 4 was rewritten with them.

### What "do not alter" covers

- Distorting the aspect ratio. An SVG with a `viewBox` and default `preserveAspectRatio` letterboxes rather than stretching, so the rule that actually prevents distortion is: never change `preserveAspectRatio`, and in CSS set `width` or `height` with the other at `auto`.
- Recoloring, including single-color, white knockout, and black knockout.
- Adding a shadow, glow, outline, stroke, or gradient fill.
- Rotating, skewing, or applying perspective.
- Cropping, or using a fragment of the mark as an icon, bullet, or favicon glyph.
- Placing it in a rounded-square tile, a circle, or any container that turns it into an app icon.
- Masking it or filling it from a gradient field.
- Animating it, including a fade-in on scroll that scales or moves it.
- Redrawing it, tracing it, or building a club graphic that quotes its geometry.

### Placement

Flat surface color only. Not over photography, a gradient, or a pattern, until the brand guide's own background rule is checked and recorded in `brand.md`.

Clear space and minimum size: **[TBD, from the GDG On Campus Brand Guide deck].** Interim stopgap, our judgment and not sourced: clear space on all four sides equal to the cap height of the "G", minimum rendered height 24px on screen for the horizontal lockup. Replace both the next time someone opens the deck.

Never lock it up with a Google product logo. For ASRCC co-branding (required at any event ASRCC funds), keep the two marks visually separate at their own optical weights; a composite is a new mark.

## 1.6 Where our license overrides the survey

Three places the survey says "do not" and the program license says yes. Resolve them here and do not relitigate per artifact.

**Google Sans.** Eight of nine surveyed surfaces list it as do-not-copy on the reasoning that it is Google's corporate face. That reasoning binds an unaffiliated club. We are a chapter in the GDG on Campus program and the brand guide names it as the program's font. Verified 2026-08-31 against the Fonts catalog, the CSS2 API, `google/fonts`, `googlefonts/googlesans`, and the shipped WOFF2 name table: Google Sans entered the catalog 2025-12-09, the binary's name ID 0 reads "Copyright 2025 The Google Sans Project Authors" and name ID 14 carries the OFL URL. Two constraints still bind: the logo ligatures must never fire, and Product Sans is out.

**The four core colors.** The brand guide licenses them to the chapter. Three of the four are hexes read directly out of Google's product icons; only our yellow differs (`#f9ab00` against Google's `#fbbc04`). Use them as ramp anchors and as the two sanctioned fills in §2.2. Never assemble them.

**The GDG marks.** The survey puts GDG, GDG on Campus, and DevFest under do-not-copy with the note that a club may say it is a chapter if it is one and follows the program's rules. We are, and we do.

Everything else on the do-not-copy list stands.

## 1.7 When it is genuinely unclear

Take the conservative path for this artifact, then resolve it: check `brand.md`, then the brand guide deck and the Brand Resource Center third-party guidance (both linked in `docs/04-brand/links.md`), then accept that the answer has to come from Google. Record the outcome in `brand.md` with a date, and log it in `docs/01-governance/decision-log.md` if a rule changed. Google updates the `goo.gle` short links in place, so the deck can change without the URL changing. Re-check each semester start.

---

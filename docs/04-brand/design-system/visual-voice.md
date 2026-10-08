# 9. Visual voice

What makes a page the club's rather than a de-branded Material template. Everything in §2 through §8 is hygiene that any competent system would arrive at; this is the part that is a choice.

Written 2026-09-21. It was cited from [bright-lines.md](bright-lines.md), [foundations.md](foundations.md), [components.md](components.md), and `tokens.css` from the day the system was adopted and no file carried it, which is [checklist.md](checklist.md) open item 21. Two sections here moved out of [accessibility.md](accessibility.md) Part 2 rather than being written fresh: §9.5 was its 2.1 and §9.6 was its 2.4. That file keeps the accessibility rules that point at them.

## 9.1 The three tells

A reader should be able to identify a club page from across a room, with the logo cropped off. Three things do that, and every one of them is free.

**The seam.** Google Sans exposes an `opsz` axis with a range of exactly 17 to 18, and those two values are two separately drawn designs: the display drawing and the text drawing ([foundations.md §3.2](foundations.md)). The type scale crosses that boundary at `title-lg`, 18px, where tracking also flips from negative to positive. So a heading and the paragraph under it are set in visibly different drawings of the same face, and the changeover is at a fixed, published size rather than wherever a designer happened to put it.

Most systems hide their seam or do not have one. Publish it. A page with one 24px headline and one 17px paragraph is already carrying the identity before anything else has been decided.

**The rhythm.** Heading space is 2:1, above to below, at every level ([foundations.md §4.1](foundations.md)). One ratio does all of the sectioning work, which is why a club document needs no rules, no boxes, no background bands, and no colored section headers. This is the club's only sectioning device and the rule is exclusive: if a section boundary is not legible from the space alone, the fix is the writing, not a divider.

The one sanctioned exception is the Step rule (§9.6), used at major boundaries and never more than once per screen.

**The Step.** One stroke that runs, rises, and runs, with a round outer corner and a sharp inner one (§9.6). It is the only drawn mark the club owns and it is parameterized, so one construction covers a favicon, a section divider, a semester map, and a deck's cover.

**The quiet fourth.** Container fills run at OKLCh chroma 0.012 against page surfaces at 0.005, so a card reads as faintly green paper on a near-white ground ([foundations.md §2.4](foundations.md)). Nobody names it and everybody sees it. It is the cheapest signature in the system and the first thing a lazy port drops.

## 9.2 The rung rail

The semester as one object, readable before a single paragraph. It is what [components.md §8.1](components.md) puts directly under the home page hero and what §8.5 puts on the Demo Day page with Demo Day as this week, and it is the deck kit's `rail` slide ([presentation.md §13.5](presentation.md)).

It exists because of a decision in [foundations.md §2.3](foundations.md): the three arcs get no hue. A three-color arc system would put a 1.84:1 yellow on a chip label and turn every session page into a spread of Google colors. The arcs get a form instead, and this is the form.

**Every session is named.** That is the rule the first version broke. It drew one unlabeled tick per session and encoded the slot (install, pressure, transfer, ship) in the tick's height; on review (2026-09-21) it read as a comb with jitter, and the height difference was information nobody could see. It was replaced by the two styles below, which were chosen from three working concepts.

### Climb, the default

The Step at poster scale: one tread per part of the semester (the hooks, then each arc), rising left to right.

- **Treads are as wide as their sessions**, three units at least, so a two-session hooks tread still fits its names. The rise between treads is up to 130px at slide scale, and the stroke is 22px with the Step's round outer corners.
- **Each part is named above the end of its tread** in the display face, and **each session is named under its tread**, one per line, wrapped to the tread's width so a long name never runs into the next flight.
- **This week** is marked three ways, so no single cue carries it: a ring sitting on the tread at the session's position, a `THIS WEEK` ledger label, and the name in bold `--rcc-primary`.
- **Progress is drawn, not colored in.** The Step behind this week is `--rcc-primary`; the rest is `--rcc-outline-variant`. Past sessions are named in `--rcc-on-surface-variant`.
- **A receipt week ends in a green dot**, explained by a one-line legend: "Receipt week: you leave with proof." Every arc's last session has one; so can a hook.
- **The camera.** On a slide, the drawing opens close on this week, at 2.3 times, and pulls back to the whole climb while the travelled Step draws. The heading rises as it settles. Reduced motion shows the whole climb at once.

### Ledger

The same data set as type. Each part of the semester is a column of its numbered sessions (H1 and H2 for hooks, then 1 onward), and each column sits 80px higher than the one before, so the column heads make the staircase. One Step rule runs under the heads and rises at each gap. This week is a solid `--rcc-primary` band with the number and name in `--rcc-on-primary`, bold. Receipt weeks end in the same green dot, with the same legend. Use it when legibility from the back of the room matters more than the moment; it is the easier of the two to read cold.

### Rules

- **The drawing never carries meaning alone.** It is built from a list of the sessions in the markup, and that list is the text equivalent a screen reader gets. The drawing is `aria-hidden`.
- **Data comes from the sessions index**, never from memory. `new-deck.sh` copies the names verbatim; they are the titles of works and keep the card's capitalization ([documents.md §2](documents.md), exception 1).
- **Once per page**, at full width, and never inside a card. It is the only place the sessions appear as a graphic.
- **The deck's progress rail is a different object.** It shows where a single deck is, in five named segments ([presentation.md §13.4](presentation.md)); this shows where the semester is. Do not draw one to look like the other.

### Responsive

Below 600px the treads do not fit side by side with legible names. On a web page the climb then rotates to vertical, treads rising up the page with names beside them, and the ledger becomes a single column. Do not shrink the horizontal version. In the deck kit's phone stack the slide is scaled whole, like every other slide.

## 9.3 What our pictures are of

The club has no illustrator and will not have one next semester. So the answer is not "keep it simple", it is that **no freehand illustration exists in this system**. Four sanctioned image types. The first three are made by editing text; the fourth is fetched, never drawn.

**1. Type as the image.** The default hero for every event page, session page, and social card: the title set at a display role on a flat surface role, the Step rule beneath it, the date and room in a label role. No picture at all. This is the highest-quality output the club can reliably produce, because it is the type system doing its job.

**2. Diagrams, not drawings.** Mermaid in fenced code blocks, which GitHub renders natively and the HTML build can render too. Use it for the arc map, session flows, the Demo Day run of show, the officer handoff chain. It is text, so it diffs in a pull request and survives an officer transition. Stroke weights and arrowheads follow §9.4. Every diagram gets alt text and a text equivalent.

**3. Photographs of the room, not of faces.** The default shot list is the room from the back over shoulders toward the screen, hands on keyboards and markers, the whiteboard, the agenda on the wall, the check-in table. Those need no consent and carry the pages perfectly well. The club's own event photos and short clips with identifiable people (the Google I/O 2026 set on the first-meeting deck) go public only with everyone's consent, metadata stripped, and credited to the club in words. Identifiable portraits are the exception and they run through the consent machinery in [accessibility.md](accessibility.md) Part 2, which stays there because it is a policy procedure and not a drawing decision.

**4. Openly licensed reference photos of things** (added 2026-09-24, Sam). When a slide or page names something a person could photograph, a tool, an object, a place, a piece of hardware, it may show a real photo of it: CC0, public domain, CC BY, or CC BY-SA only, fetched with `deck-kit/fetch-image.mjs`, which strips the metadata, sizes it, and writes the credit. The credit stays on the slide as a link, in the ledger face at 32px or larger. No text ever sits on a photo; on a deck it is the `photo` archetype ([presentation.md §13.5](presentation.md)), which sets the words beside it. Never people or faces, never Google product or marketing imagery, never anything NC or ND. The rules for agents are in `deck-kit/CLAUDE.md`.

**The Step field is retired.** The 2026-08-31 draft named a third type: a low-contrast tiled pattern of the Step behind heroes and on the Demo Day page. It was dropped on 2026-09-21. A tiled repeat contradicts the Step's own first rule of use, once per screen (§9.6), and the one the landing page tried in September 2026 was rejected on sight. Photographs of the room took its slot; [assets.md §10.2](assets.md) was corrected on 2026-09-23.

**Template contract.** One SVG template per export size in `assets/templates/`, sized by [assets.md](assets.md). Each template holds text nodes with placeholder strings, the Step, and nothing else. An officer opens it in a text editor, changes the strings, and exports. No drawing tool, no design decisions, no way to break the grid. The author picks meaning and the system picks measurements, which is the same discipline that makes the markdown docs survivable.

**Never used:** clip art, 3D blob renders, gradient meshes, hand-drawn doodle borders, isometric illustration packs, stock photography of generic people at laptops, AI-generated images of people, and anything with the soft rounded optimistic character of Google's AI illustration style. The last one is the specific trap, because it is the most imitated look on the internet right now and copying it lands the club inside the forbidden zone by accident. The club teaches evidence and asking; fabricating its own audience contradicts the curriculum.

## 9.4 The diagram stroke ladder

Three weights, each with a fixed job, so a reader learns the vocabulary once. Values are for a diagram drawn at a 960-unit reference width and scale with it.

| Weight | Value | Job |
|---|---|---|
| Heavy | 3 | The subject: the path being explained, the boundary of the thing that matters |
| Standard | 2 | Ordinary connections, box outlines, everything unremarkable |
| Hairline | 1 | Grid, axis, alignment guide, anything that is furniture |

**Arrowheads are open chevrons**, two strokes meeting at a point, never a filled triangle. Set `markerUnits="strokeWidth"` so an arrowhead on a heavy line is proportionally heavier and the ladder survives at the arrow. A filled triangle at two weights reads as two different arrow types rather than as one arrow at two weights.

**Joins and caps match the Step**: `stroke-linejoin="round"`, `stroke-linecap="butt"`. The round outer corner is the club's tell and a diagram that uses miter joins does not look like it came from here.

**A dashed stroke means exactly one thing across every diagram the club draws**, and that thing is "not yet true": a planned step, an unconfirmed date, a proposed path. Pick nothing else for it. `stroke-dasharray="8 6"` at standard weight.

**Color.** Three hues plus neutral, never four ([bright-lines.md §1.3](bright-lines.md)). In a doc that renders on both GitHub themes, use the dual-mode tones in [foundations.md §2.7](foundations.md), which hold 3:1 on both canvases. Meaning is never in the color alone: pair it with a label, a shape, or the dash.

**Stencils are named by role, not by product.** "Source", "check", "receipt", "room". Never a Google Cloud product icon and never a product name as a label.

## 9.5 Icons

Moved here from `accessibility.md` §2.1 on 2026-09-21, which also resolves the contradiction with the old `foundations.md` §5.5: that section named Lucide with an unverified license while this one named Phosphor with a worked licensing position. **Phosphor wins.** See [checklist.md](checklist.md) open item 20.

**Set: Phosphor Icons.** MIT licensed, drawn on a 256-unit grid, six weights. Verify the LICENSE file in the release you vendor before shipping; do not take the license on this document's word or on a blog post's.

**Weight: Bold, one weight, everywhere.** Icons on these pages live at 20 and 24px next to 14 to 16px body text, and get projected onto a lab wall and read on a phone in a bright room. Bold holds up in both. One weight is also the only rule a rotating officer team can follow correctly. If a specific icon reads too heavy at 40px or larger, that is the moment to make a documented exception in `brand.md`, not to start mixing freely.

**Why not Material Symbols.** It is openly licensed and technically available, so this is not a legal call. It is that Material Symbols silhouettes are one of the strongest signals of Google authorship in existence. A page using Material Symbols, a tonal Material palette, and Material corner radii reads as a Google property regardless of what the wordmark says. The club is taking Google's method, and an icon set is chrome. This is the single cheapest place to buy back a distinct identity.

**Licensing position, stated plainly:**

- Vendor the SVGs the club actually uses into `assets/icons/`. Do not hotlink a CDN, do not ship a webfont of the whole set, do not pull from `fonts.googleapis.com` for anything.
- Commit the upstream `LICENSE` file alongside them at `assets/icons/LICENSE`.
- Add a one-line attribution row to [brand.md](../brand.md) naming the set, the version, and the license.
- Icons are never modified beyond color and size. If a needed icon does not exist in the set, use a word instead of drawing one.

**Usage rules:**

- An icon never appears alone as the only label for an action unless it has an `aria-label` and a tooltip.
- Icons are `currentColor`, always. They inherit the text color and therefore inherit dark mode and forced-colors for free.
- Meaningful icons need 3:1 against their background. Decorative ones do not, but hold them to 3:1 anyway so they survive a projector and a grayscale print.
- One icon per row maximum. Icons on both the left and the right of an agenda row is noise.
- Stroke icons agree with the diagram ladder in §9.4, so one drawing logic covers both. Phosphor Bold is a stroke-derived drawing at a weight that survives projection.

## 9.6 The signature device: the Step

Moved here from `accessibility.md` §2.4 on 2026-09-21. Three lines were added in the move and are marked where they sit: the motion-language bullet under "Why it is worth having", the rung rail counting as a screen's Step, and the deck's semester slide in the Staircase's uses. It is one geometric construction, it costs nothing to produce, and it does real work in the information architecture instead of sitting in a corner.

**The form.** A single stroke that runs horizontally, rises through two right angles, and continues horizontally at a higher level. One stroke weight throughout. Fill none. **The outer corner of the turn is round; the inner corner is sharp.**

That asymmetry is the whole identity. It happens automatically from `stroke-linejoin="round"` on a stroked path, because a round join rounds the outside of a turn and leaves the inside as a hard intersection. It costs one attribute and it is the tell that separates an authored mark from a shape somebody found.

**The Mark, fixed geometry, for the favicon and the lockup:**

```html
<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
  <path d="M3 19.5H12V4.5H21"
        fill="none" stroke="currentColor" stroke-width="3"
        stroke-linecap="butt" stroke-linejoin="round"/>
</svg>
```

- Stroke weight is 3 of 24, which is 12.5% of the box. That ratio is the constant. At a 16px favicon it renders 2px; at a 480px banner it renders 60px.
- Runs are 9 units each, the rise is 15 units, the turn is centered at x=12. Symmetric, which is what a favicon needs.
- `stroke-linecap="butt"` keeps the ends flat, so the round corner is the only soft point in the mark and reads as deliberate.

**The Rule, variable geometry, which is what gives pages identity.** The same construction stretched to a container's full width and used as the divider under section headings. Its one variable is where the rise sits, and `tokens.css` ships the CSS. The rise position encodes the curriculum:

| Arc | `--rcc-step-arc` |
| --- | --- |
| Voice | `25%` |
| Ask | `50%` |
| Evidence | `75%` |
| Neutral (club pages, footer, non-session content) | `12%` |

Set it once on the page's root element and every rule on the page carries the arc. Someone who has read three session pages will recognize which arc a page belongs to before reading the heading. Nothing else in the system does that, and it costs one line of CSS per page.

**The Staircase, for banners and the semester landing.** Three rises instead of one, which reads as the three arcs of the semester, and which §9.2 turns into the rung rail:

```html
<svg viewBox="0 0 32 24" aria-hidden="true" focusable="false">
  <path d="M2 21H11V13.5H21V6H30"
        fill="none" stroke="currentColor" stroke-width="3"
        stroke-linecap="butt" stroke-linejoin="round"/>
</svg>
```

Used at large sizes only: the semester landing hero, the repo banner, the Demo Day page, the deck's semester slide. Never in chrome.

**Why this is derived from nothing Google owns.**

- It is not a spark or star of any point count, so it cannot be mistaken for the Gemini mark, whose construction Google Design describes as the negative space of four adjoining circles.
- It is not a robot head, a dot, a chevron, a bracket, or a globe, which is the entire I/O glyph vocabulary.
- It is **monochrome by construction** and uses `currentColor`. It has no color meaning at all, so it can never read as the blue, red, yellow, green sequence.
- It uses no gradient. The gradient-field technique is the strongest current Google identity signal, and the club is not going near it.
- Material's shape language is filled rounded rectangles with uniform corner treatment. The Step is an unfilled stroke with one round corner and one sharp one. It is a deliberate counter-move against the system it sits next to.

Checked for collision against the Gemini spark, the four-dot Assistant mark, the Google G, the Google for Developers lockup, and the GDG on Campus lockup. It collides with none of them.

**Why it is worth having.**

- **One variable does real work.** `--step-x` turns one drawing into a semester's worth of page-specific art, which is the one genuinely transferable idea from Google's event design: parameterize a single construction instead of drawing new assets. The club gets the benefit with a CSS custom property instead of a mesh gradient.
- **It survives the whole range.** 16px favicon to a printed banner, because the stroke is a percentage of the box.
- **It survives every theme.** `currentColor` means light, dark, forced-colors, and a grayscale print all work without a second asset.
- **A student can build it.** One `<path>` and two pseudo-elements. Nobody has to open a drawing tool, which is the constraint that actually determines whether a design system survives an officer transition.
- **It is semantically honest.** A soft-skills curriculum whose premise is that you get better one session at a time gets a mark that is literally one step up. The reasoning is legible without a paragraph explaining it.
- **It is already the motion language.** Run, rise, run is a movement before it is a drawing, which is why content in this system arrives by rising through a mask rather than fading ([motion.md §5.7](motion.md)).

**Rules of use, and these matter more than the geometry:**

- **The Step is never the club's logo and never replaces the GDG on Campus lockup.** It is a page device. Where both appear, they are separated by at least the height of the lockup, and they never sit in a shared box, a shared color field, or any arrangement that could read as one combined mark. Locking a club-made mark to a Google mark is the forbidden move.
- **Once per screen.** Repetition kills it. One Step in the hero, one Rule per major section boundary, never both in the same block. The rung rail counts as the screen's Step.
- **It never carries meaning alone.** The arc name is always in text next to it. A rise at 25% versus 50% is invisible to a lot of people (WCAG 1.4.1).
- **It is decorative in the accessibility tree.** `aria-hidden="true" focusable="false"` on every inline SVG instance. `focusable="false"` matters: some assistive tech puts SVGs in the tab order without it.
- **Contrast:** decorative, so no minimum applies, but hold it to 3:1 against its surface anyway. It should survive a projector in a bright lab and a photocopied flyer.
- **Favicon:** ship an SVG favicon with an embedded `@media (prefers-color-scheme: dark)` block so the stroke flips, and a 32px PNG fallback with a solid container square. SVG favicon and in-SVG media query support varies by browser and version. Mark this `[unverified]` until someone opens it in Safari, Chrome, and Firefox.
- **Merchandise:** the Step alone on a shirt or sticker is fine, because it is the club's own mark. The GDG logo on merchandise is forbidden by the brand guidance. Do not put them on the same object.

## 9.7 The ledger line

The club's one uppercase treatment, and the voice of metadata. [components.md](components.md) sets seat chips, the "On this page" rail, hero eyebrows, and the date lines on event and recap pages in it; the Cold Open deck and the deck kit use it for every eyebrow, label, ledger, and counter.

| Property | Value |
|---|---|
| Face | The code face (`--rcc-font-code`), weight 500 |
| Case and tracking | Uppercase, +0.08em |
| Figures | `font-variant-numeric: tabular-nums lining-nums` |
| Ligatures | Off, like every code-face element ([foundations.md §2.8](foundations.md)) |
| Color | `--rcc-on-surface-variant`; the lead variant, used for an eyebrow, is `--rcc-primary` |
| Size | `code-sm`, 13px on a 20px line, shipped as `.rcc-ledger` in `tokens.css`; `h5` and `h6` take the same treatment at `label-lg` and `label-md`. 32px on a 1920 slide, 44px on the 1080 Instagram master |

**Its job is tokens, not sentences.** A date, a room, an arc and slot, a seat, a counter. If the text has a verb in it, it is not a ledger line. It is never more than one line, never a link, and never the only place a piece of information appears.

**Why the code face.** It reads as an entry in a log, which is what metadata is, and it is the one place the code face appears outside code, so it cannot be mistaken for body text at any size. Uppercase is reserved for it for the same reason.

The 13px size and the +0.08em tracking (`--rcc-track-ledger`) have shipped in `tokens.css` since 2026-08-31 and have not been read on a phone in daylight (V5). The deck sizes were read off the Cold Open deck.

## 9.8 Open items

| # | Open item | Blocks |
|---|---|---|
| V1 | The climb's 32px session names and the ledger's 34px rows have been read on a laptop, not the A-210 projector. | Demo Day page |
| V2 | The vertical climb and single-column ledger below 600px are specified and have not been drawn. | Club site home |
| V3 | Phosphor's LICENSE file has not been read by anyone on the club side, and no icons are vendored yet. | Icon adoption |
| V4 | `assets/templates/` does not exist. The template contract in §9.3 describes files nobody has made. | First event post made from a template |
| V5 | The ledger line at 13px on a web page has not been read on a phone in daylight. | Club site home |

---

**Last updated: 2026-09-24.**

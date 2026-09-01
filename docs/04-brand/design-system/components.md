# Components and page archetypes

Every component resolves against the tokens in [tokens.css](tokens.css). Nothing names a bare color. Every fill role has a paired foreground role, which is why a component drops into a light section, a dark section, or a re-themed event page without a variant.

## 7. Components

Every component below resolves against the tokens in §6. Nothing names a bare color. Every fill role has a paired foreground role, which is why a component drops into a light section, a dark section, or a re-themed event page without a variant.

## 7.1 Rules that apply to everything

**Depth is tone, then hairline, then shadow.** Separation comes from a step on the surface container ladder. If tone alone will not carry it, add a 1px `--rcc-outline-variant` hairline. Shadow is for an element over busy content and for interaction.

**One state layer, in the content's own color.** Hover 8%, focus and pressed 10%, table row hover 4%, dragged 16%. Because the layer takes the content's color, hover reads as more of what is already there and needs no per-theme tuning.

**Focus is a shadow plus a transparent outline.** The shadow gives the ring; the transparent `outline` is what forced-colors mode substitutes a system color into, because box-shadow is dropped there. `:focus-visible` only. A box-shadow ring is clipped by an ancestor with `overflow: hidden`, so any card that clips its media puts the ring on the card and not on an inner element.

**Visual size and hit size are separate.** A control may be 40px tall and look right; its target is 48px, extended with padding or a pseudo-element.

**Radius by footprint. Pills mean actions.** If a container is fully rounded it reads as a control and someone will click it.

**Nested corners get the subtraction.** Inner radius equals outer radius minus the padding between them.

**Every component works with no JavaScript.** Tab panels stay in the DOM with real headings. Disclosure widgets are `<details>`. Nothing carrying content hides behind a hover.

**Both renderings are first-class.** The markdown source is the artifact of record; the HTML page is a rendering of it. No component may depend on markup GitHub strips. Each component below carries a **GitHub form**. A component with no honest GitHub form does not go in a doc.

**One accent per component instance.** At most one of the four hues per instance, and never a row of components cycling through them.

The `--annotation` no-op custom property from the components draft is cut. Nothing consumed it, and a convention that is dropped by the second officer reads as inconsistency rather than as a system.

## 7.2 Buttons

Three treatments.

| Treatment | Fill | Ring | Use |
|---|---|---|---|
| Primary | `--rcc-primary` / `--rcc-on-primary` | none | One per view. The action the page exists for. |
| Secondary | transparent / `--rcc-on-surface` | `--rcc-outline` | Everything else that is a real action. |
| Text | transparent / `--rcc-primary` | none | Inline and tertiary. Never beside a Primary. |

**Anatomy.** Label, optional leading icon, optional trailing icon. Label is `label-lg` at line-height 1 so the box is a clean multiple. Icons are 20px in `md`, 24px in `lg`.

**Sizing.** Height 32 / 40 / 48. Horizontal padding 24px on the label side and 20px on any icon side. That 4px optical reduction is real: an icon fills its box more than a letterform does.

The Secondary ring is `box-shadow`, not `border`, so a Primary and a Secondary of the same height measure identically with no padding compensation.

**States.** Rest. Hover: state layer 8%, no lift and no color swap. Focus-visible: ring stacked outside the Secondary's 1px ring. Pressed: radius morphs from full to `--rcc-radius-sm` on the spatial-fast track, state layer 10%. Disabled: 38% opacity on a designed pair. Loading: label stays at reduced opacity with a spinner in the leading slot; the button never changes width.

**Press feedback is a shape change, not a dim.** Compressing the corner reads as physical, costs one rule, survives dark mode, and needs no second color token.

**GitHub form.** A link. Button labels are written to survive being a plain link: verb-first, naming the action. "Come to a session", not "Learn more".

## 7.3 Card

The generic container. Session card, facilitator card, and stat tile are specializations.

**Anatomy.** Optional media band flush to the top edge, then a content well: title, optional supporting line, optional metadata row, optional action row pinned to the bottom.

**Sizing.** `--rcc-radius-md` for a grid card, `--rcc-radius-lg` for a feature card, `--rcc-radius-xl` for a page-level container. Content well padding 16px on a list card, 24px on a feature card. Grid gap 24px. Media band is a fixed height on desktop with `object-fit: cover`; in a single-column mobile layout it goes to `height: auto`, because uniform card heights only exist to serve a grid.

**States.** Rest: `--rcc-surface-container-lowest` on the tinted ground, with an `--rcc-outline-variant` hairline. Hover: `--rcc-elevation-1` and a 2px lift. Focus-visible: ring on the whole card. Status (live, current, changed): the hairline goes to `--rcc-outline` and the card gains a labeled chip. The information hierarchy is identical in every state, so a live card and a resting card scan the same.

**Draw the hairline as an `::after` with `border-radius: inherit`, not as a `border`.** The media band can then bleed edge to edge under `overflow: hidden` while the hairline sits crisply on top.

**Whole-card click without nesting interactive elements.** An absolutely positioned transparent `<a>` at `inset: 0; z-index: 1` covers the card; real controls sit at `z-index: 9` above it.

**Responsive.** `container-type: inline-size`, so one component works in a 2-up and a 4-up with no size variants.

**GitHub form.** A level-3 heading, a one-line description, and a metadata line. A card grid becomes a table only when each row carries three or more pieces of data.

## 7.4 Session card

The club's signature component, and the one that has to be excellent in both renderings. Fourteen exist for Fall 2026 and they are the maintained copy of every meeting.

**Fixed section grammar. The order never varies.**

1. `H<n>` or `<n>` plus the session title (H1)
2. Front-matter table
3. In one sentence
4. Why this one
5. Materials
6. Phase rows, one per phase
7. Failure modes
8. Record

The grammar is the payload. GitHub generates heading anchors from headings, so a stable grammar makes `…/sessions/2026-10-08-send-it.md#failure-modes` a working deep link on every card forever, and a facilitator who has read one card can navigate any other by muscle memory.

**Front-matter table.** Two-column key-value. Fixed keys: Date, Arc and slot, Runs it, Backup, Also needed, Experience needed, Room, Receipt due, Rung named. A key with no value says `none` or `[TBD]` and never disappears, because a missing row and an empty row read the same to a facilitator scanning at 2:29 PM.

**On the web the card is a page, not a tile.** `--rcc-surface` article column on a `--rcc-surface-container` page ground, so the document reads as an object on a desk. Reading column caps at `--rcc-container-prose`. The 2:1 heading rhythm does all the sectioning with no rules and no boxes.

**Script block.** The read-aloud passages are their own block type. Left rule in `--rcc-primary` at 3px, `body-lg`, `--rcc-on-surface`, 16px inline-start padding. It is the one block a facilitator reads verbatim, so it stays at full body size while everything around it may compress. Markdown form is a blockquote, which is what the cards already use.

**States.** Upcoming, current, past. In markdown the state lives in the sessions index table and never in the card, so the card file is never edited to change state.

**GitHub form.** Native. Add a horizontal rule after the front-matter table so the fold on a phone lands after the table rather than mid-table.

## 7.5 Badges and chips

| Kind | Encodes | Interactive |
|---|---|---|
| Seat chip | `LEAD`, `FAC-A`, `NOTE`, `TIME` | No |
| Arc chip | Voice, Ask, Evidence | Yes, as a filter |
| Slot chip | install, pressure, transfer, ship | Yes, as a filter |
| Status badge | receipt due, room confirmed, `[TBD]` | No |

**Anatomy.** Optional 20px leading icon, label, optional trailing dismiss. Seat chips carry no icon and are set in the ledger line, because a seat is a token rather than a word.

**Sizing.** Height 28 inside a table cell or heading, 32 standalone, 40 as a filter control. Padding 6px / 16px. `--rcc-radius-full`. Label `label-md`.

**Arc and slot chips carry no hue.** Every chip in the set uses `--rcc-surface-container-high` with an `--rcc-outline` hairline, and the selected state fills with `--rcc-primary-container`. The arcs are told apart by their words and by the rung rail (§9.2).

**Filter chips are real form controls**: a visually hidden `<input type="checkbox">` with a `<label>`, so keyboard traversal and screen-reader announcement come free. Never a `<div>` with a click handler.

**A selected filter chip changes fill and ring together**, never fill alone.

**Elevation differs by ground.** On light, a chip carries a real two-layer shadow and a light fill. On dark, no shadow at all, and it separates by taking a lighter fill than the surface behind it. Shadow does nothing on a near-black surface and a value step does nothing on white.

**GitHub form.** Seat chips are inline code (`` `LEAD` ``), the one styled span GitHub gives for free, and the repo already does this. Arc and slot chips become plain words in the front-matter table. Status badges become a `[TBD]` marker or a task-list checkbox. Never shields.io images; they are network dependencies for text.

## 7.6 Tables

The club's densest surface. The calendar, the budget, the rotation, and the sessions index are all tables, read on phones.

**When to use one.** One piece of data per item is a list. Two related pieces is a description list. Three or more is a table. A one-column table is a list that has not been rewritten yet. Every table is preceded by a complete introductory sentence, not a fragment the table completes.

**Styling.** Horizontal rules only. Tinted header row on `--rcc-surface-container-high`, `label-lg` heads, sentence case, no terminal punctuation. Body cells at `body-md`, one step below the surrounding prose, with a single `--rcc-outline-variant` rule under each row. No vertical rules, no zebra striping, and no merged cells: a merged cell breaks screen-reader traversal and breaks in markdown.

**Sizing.** Cell padding 8px, deliberately tighter than the 16px prose rhythm so the table compresses into a distinct object. `<th scope="col">` on the header row, `<th scope="row">` on a first-column label.

**Numerals.** Every column of numbers, times, dollar amounts, or attendance counts is `tabular-nums`. Every number the club publishes changes.

**Wide table on a narrow screen.** Pin the first column with `position: sticky; inset-inline-start: 0` inside `.rcc-table-scroll`, and add a trailing spacer whose width equals the page margin. Without the spacer the last column scrolls flush against the viewport edge and looks clipped.

**States.** Rest, row hover (state layer 4%), sorted column (arrow glyph plus `aria-sort`), empty (one full-width cell with a sentence saying what would appear and what to do about it, never a blank table).

**GitHub form.** Native GFM. Sentence-case heads, no terminal punctuation, no merged cells, the introductory sentence, and the three-or-more rule all survive. Alignment colons only for right-aligning numeric columns.

## 7.7 Callouts

A closed set of three. Nothing else becomes a callout.

| Type | Meaning | Color | GFM alert |
|---|---|---|---|
| Note | Useful, not critical to the task at hand. | Neutral (`surface-container-high`) | `> [!NOTE]` |
| Warning | Do not do this, or it cannot be undone. Money, safety, privacy, a room booking, a destroyed set of index cards. | `highlight-container` | `> [!WARNING]` |
| Receipt | The artifact a member leaves the session holding. | `primary-container` | `> [!IMPORTANT]` with a bold `Receipt:` lead-in |

Note is neutral on purpose. It is the most common type, and making it neutral means a doc page carries at most two hues plus grey. Red is not a callout color: `error` stays a UI state so it keeps its meaning.

Receipt is the club's own type and it exists because the receipt is the semester's thesis. Four of the fourteen sessions promise one: a line you can say at Club Rush, a real message sent in the room, a booked appointment with someone who has power, three minutes in front of outsiders.

**Anatomy.** A 24px icon in a reserved leading column, a bold inline label ending in a colon, then the body on the same line. No separate title row. Padding is lopsided: 12px block, 20px inline-end, and an inline-start value equal to the gutter plus the icon column. Body at `body-md`.

**Every callout carries an `--rcc-outline` hairline**, because container fills measure 1.10:1 to 1.17:1 against the ground and a boundary that carries meaning needs 3:1.

**The admission test is the spec.** All three conditions must hold: the information is relevant but not necessary to the current task, the interruption does not obstruct the reader's progress, and the content does not flow from the sentence before it. Named non-uses: cross-references, prerequisites, procedural steps, and anything critical to succeeding. Most callout systems specify the appearance and let authors decide the usage, which is backwards.

**Scarcity is part of the spec.** Two callouts never sit adjacent. A page with more than three loses the distinctiveness that makes the tint mean anything. If a session card needs four warnings, they belong in Failure modes as prose.

**GitHub form.** GFM alerts render natively with their own icon and color, so all three survive. The set is capped at three to keep parity with what GitHub shows.

## 7.8 Navigation

**Header.** 36px content box with 12px block padding, background at about 85% alpha over `--rcc-surface` with `backdrop-filter: blur(5px)`. Left: the GDG on Campus lockup at a fixed pixel size, unaltered. Center or right: five section links maximum. Far right: one Primary button.

**Two link colors in one bar.** Navigational items (Sessions, Playbooks, Calendar) take `--rcc-on-surface-variant`. Transactional items (Join, Email us) take `--rcc-primary`. Priority is encoded in color, so the bar stays visually flat with no weight or size changes.

**Logo in two copies plus a forced-colors variant**, toggled by media query rather than script. Until B3 lands, dark uses the stacked file.

**Skip link.** First element in `<body>`, visually hidden until `:focus`, at which point it becomes a real centered Primary button.

**Side nav** (docs and playbooks). 260 to 270px fixed, filter input at 32px, nested collapsible lists. The scrolling list fades at its bottom edge with `mask-image` over a 64px zone rather than being hard-cropped, so a partially visible item reads as "more below".

**On this page rail.** Flat list of the H2 and H3 outline, set in the ledger line so it reads as furniture. Active item gains weight 500 and `--rcc-primary`.

**Dropdown panels lead with a sentence and an escape hatch**, never a bare link list. "Every session this semester, with the facilitator script." followed by "See all sessions". A truncated list always ends with the escape hatch.

**Named landmarks.** `aria-label` on every nav region: "Primary", "Section", "On this page", "Footer".

**Carry the active and hover state entirely on a pseudo-element** so the link's own box is never touched. Text then cannot shift by a subpixel between rest, hover, and current, which is the flicker that makes most nav bars feel cheap under the cursor.

**GitHub form.** The repo's existing pattern is correct: a relative-link table at the top of each README, breadcrumb links back to the parent, and every folder README listing its children with a one-line predicate sentence per entry.

## 7.9 Hero

**Anatomy, one column, nothing in the margins.** Eyebrow in the ledger line (arc name, date, or "Fall 2026"), H1, one-line subhead, a pair of buttons, an optional announcement pill. Five elements.

**Two buttons.** One self-serve, one that reaches a person: "Join the Discord" beside "Email an officer". One button leaves out half the audience; three has no primary action.

**The announcement pill** takes the slot where a third button would go and is styled as a message: pale tinted field, full radius, `label-md`, bolded lead-in, plain-weight explainer, small filled arrow at the end. It gives the page one "what's new" hook without a competing action.

**Sizing.** H1 at `display-sm` on mobile reaching `display-lg` at the widest breakpoint. The subhead does not scale. The subhead bolds its last clause only, and that clause carries the date or the ask: "Thursdays at 2:30 in A-210. **Demo Day is December 10.**"

**Media is optional and the default hero has none.** Type, the lockup, and two buttons on `--rcc-surface` is a finished hero. When there is a photo, the scrim is two-ended: dark at the top where the headline sits, clear across the middle two-thirds so the image reads, dark again at the bottom. A flat overlay protects the text by destroying the photograph.

**A hero carrying the logo obligates the page to carry the independence sentence.** The two are one unit.

**States: none.** The hero is static. Decorative glyphs are `aria-hidden="true"` with `alt=""` and hidden below the tablet breakpoint.

**GitHub form.** H1, one italic subhead line, a blank line, a short link row. The logo goes in with `<picture>` and a `prefers-color-scheme` `<source>`, which GitHub honors.

## 7.10 Footer

**Anatomy, in order.**

1. Three-door closer
2. Link columns: the repo, the Discord, the Bevy chapter page, the code of conduct
3. Required disclaimer block
4. Freshness stamp

**End every long page with the same three doors** rather than one CTA: **Come to a session** (Thursdays, 2:30, A-210), **Join the Discord**, **Read the playbooks**. One CTA loses whichever half of the audience is not in that posture right now.

**The disclaimer block is a required slot with a `required` flag, not optional copy.** Verbatim, at `body-md` in `--rcc-on-surface-variant`, inside `role="contentinfo"`, never inside a collapsed `<details>`. Where ASRCC funded the event, an ASRCC credit line sits directly above it.

**`scripts/check.sh` should fail any published page that references a logo asset and lacks this string.** Add that check.

**Freshness stamp.** Every page and every doc carries a last-updated date. Staleness is the reader's information, and a stale stamp is a maintenance ticket.

**GitHub form.** A horizontal rule, the three-door line, the disclaimer, and the date.

## 7.11 Code blocks

The club writes almost no code, and almost every block in the repo is a single shell command such as `scripts/new-meeting.sh 2026-fall YYYY-MM-DD`. The component is sized for that case.

**Sizing.** `min-height` 52px, `--rcc-radius-sm`, `--rcc-code-surface` fill, 1px `--rcc-outline-variant` ring. Padding `14px 48px 14px 16px`. The 48px inline-end exists so the absolutely positioned copy button can never overlap the command.

**Compute the top padding as `max(normal-padding, button-size)`.** Any container with an absolutely positioned control in a corner should do this, so the control cannot collide with the first line no matter how the block is configured. It generalizes to every card with a corner action.

**No-header variant** (the default here): the copy button moves to `top: 50%; transform: translateY(-50%)` so a single-line command sits optically centered.

**Copy button.** 32×32, transparent, `--rcc-radius-xs`, an icon glyph so it inherits color, `translate="no"`. The copyable string lives in a `data-clean-code` attribute on the container rather than being read off the highlighted DOM, so the clipboard never picks up markup.

**Wrapping.** `text-wrap: wrap` on a single-line command so it wraps rather than forcing the page into horizontal scroll. Multi-line blocks scroll inside their own `overflow-x: auto`.

**Ligatures are off** on every code element (§2.8).

**States.** Rest, hover, copied (glyph swaps to a check for the effects-slow duration; the button never changes width).

**GitHub form.** A fenced block with a language tag. GitHub supplies its own copy button at the top right, so the HTML rendering puts its copy affordance in the same place to avoid teaching two habits.

## 7.12 Timeline and agenda rows

The spine of every session card and the core of the Demo Day page. A row is one phase: `2:42 The Rep (18 min)`.

**Anatomy.** Fixed-width leading time column, phase name, duration chip, phase body. On the web the row is a grid with the time track at 5.5ch, wide enough for `12:00` plus a space so nothing reflows between a one-digit and two-digit hour. In markdown it is an H2 with the time and duration in the heading text, which is what the cards already do.

**Rows are separated by `:not(:last-child)::after`**, so the last row has no trailing line and there is no negative-margin hack to remove one.

**The clock is derived.** Every row's start equals the previous row's start plus its duration. In HTML the times are computed; in markdown they are written by hand, so **`scripts/check.sh` should verify that a session card's phase times are consistent with its durations and add up to sixty minutes.** A card whose clock does not add up is a bug and nothing currently catches it.

**States.** Past, current, next, over-running. Current is marked by the emphasized type tier and by the `--rcc-outline` hairline, never by a badge. The emphasized tier changes weight at identical size, so it cannot reflow the agenda while someone is reading it.

**Formats carry promises.** Every row on a public agenda states its length. Every slot states what it does: install, pressure, transfer, ship. A reader should be able to tell from the label alone whether they are about to be taught something or put on the spot.

**GitHub form.** Native. `## 2:42 The Rep (18 min)`, exactly as the Fall 2026 cards are written. The public agenda variant is a three-column table: Time, What, How long.

## 7.13 Facilitator cards

The privacy policy is load-bearing: a person's name appears only where written consent is on file, and otherwise the row reads `on file with advisor`. The no-name, no-photo state is the default state and it has to be designed.

**Anatomy.** Square avatar, name or seat token, role line, optional session count.

**Sizing.** `--rcc-radius-lg` container on `--rcc-surface-container`, 16px padding, avatar at `aspect-ratio: 1` with `object-fit: cover` and `--rcc-radius-md`, 16px below it, then the name at `title-lg` and the role at `body-md` in `--rcc-on-surface-variant`. The role steps down by color rather than by weight, so the two lines keep one optical texture.

**Photo source is square at two crops, 400×400 and 165×165.** Enforcing square at upload is what keeps the grid rhythm; cropping in CSS at render time does not.

**States.** Named-with-photo, named-without-photo, unnamed. The unnamed state shows the seat token in the avatar slot on `--rcc-primary-container`, with `Held by an officer, name on file with the advisor` as the role line. It is a complete card rather than a gap.

**No accent cycling.** The earlier draft assigned a hue per seat. Every facilitator card uses the same `--rcc-primary-container` avatar fill, because a row of cards cycling four hues is the composition §2.3 rules out. Seats are told apart by their tokens.

**GitHub form.** A table: Seat, Held by (role), Person, Runs, Backs up. `semesters/2026-fall/sessions/README.md` already has it and it is correct.

---

## 8. Page archetypes

Six pages cover everything the club ships this semester. Each names its container, its hero treatment, and its required blocks.

## 8.1 Club site home

`--rcc-container-content`. Hero with no media (§7.9). Then, in order: the rung rail at full width (§9.2), a three-up "next three sessions" card grid, one band with the three-door closer, footer with the disclaimer.

The rung rail directly under the hero is the move that makes the home page ours. It says what the semester is in one horizontal object, before a single paragraph.

## 8.2 Event page

`--rcc-container-doc`. Ledger line with the date and room, H1 with the event name, one-sentence subhead, two buttons (RSVP on Bevy, ask an officer). Then a Facts table (What, When, Where, Who should come, Bring, RSVP), the agenda as a three-column public table, the facilitator cards, and the footer.

The Facts table is the same field set as `templates/announcement.md`, so the page and the announcement never drift.

## 8.3 Session page

`--rcc-container-prose` article column on a `--rcc-surface-container` page ground. This is the session card rendered (§7.4), and the HTML must not diverge in section order or heading text from the markdown source. Phase rows, script blocks, and the Receipt callout do the work. No hero, no media.

## 8.4 Recap page

`--rcc-container-doc`. Ledger line with the date, H1 "What happened at [session]", one paragraph of what happened, then the receipt (what people left holding), then photos if consent is on file, then a link back to the session card and forward to the next session. Recaps are short by design: one screen plus images.

## 8.5 Demo Day page

`--rcc-container-content`, and it is the page the whole system is designed around.

Structure: hero with the date and the ask, the full rung rail with the terminal tick filled, a live agenda built from the timeline component with the current phase in the emphasized tier, a project wall as a card grid at `--rcc-col-third`, the three-door closer, and the footer with the disclaimer.

The live agenda is the only place in the system where content updates during a page view. Everything that changes uses `tabular-nums` and the emphasized tier, so nothing reflows while someone is reading.

## 8.6 Doc page (standalone HTML build of a markdown file)

`--rcc-container-doc`. Side nav on the left at desktop, "On this page" rail on the right above 1024px, article column in the middle. Elevation 0 throughout; a documentation page needs no shadows. Every heading level uses the 2:1 rhythm and there are no rules, boxes, or background bands inside the article.

Required blocks: H1, the independence sentence if the page carries a logo, the article, the last-updated stamp.

**Share card (`og:image`).** 1200×630, `--rcc-surface-container` ground, the ledger line at the top with the date, the page title in the brand face at `display-sm`, and nothing else. No logo, so no disclaimer obligation on the card itself. If someone insists on the logo, §1.4 applies.

## 8.7 The GitHub dark and light diagram problem

Ship both files behind `<picture>`. GitHub honors this in both themes with no script.

```html
<picture>
  <source media="(prefers-color-scheme: dark)"  srcset="assets/diagrams/arcs-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/diagrams/arcs-light.svg">
  <img alt="The three arcs across fourteen Thursdays, ending at Demo Day on December 10."
       src="assets/diagrams/arcs-light.svg" width="960" height="240">
</picture>
```

The alt text names what the diagram shows and doubles as the art brief. If the diagram carries only strokes and marks and no text, one file using the dual-mode tones in §2.7 is enough.

---

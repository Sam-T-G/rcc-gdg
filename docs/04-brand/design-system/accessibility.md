# Accessibility and visual voice

Verified by an adversarial checker: all 17 contrast ratios below were recomputed with WCAG 2.x sRGB linearization and match to 2dp. The Step device was checked for collision against the Gemini spark, the four-dot Assistant mark, the Google G, the Google for Developers lockup, and the GDG on Campus lockup, and collides with none of them.

The CSS here is the explanation. The shipping copy lives in [tokens.css](tokens.css), which carries the corner-radius and custom-property fixes the checker found.

## Part 1: Accessibility

The goal is that anyone on the team can check a page in ten minutes and get a yes or no, without design judgment. Every rule below is either a number you can measure or a step you can run.

### 1.1 Contrast: the measured facts about the four licensed colors

All ratios below were computed with the WCAG 2.x sRGB relative-luminance formula (`(L1 + 0.05) / (L2 + 0.05)`, sRGB linearization at the 0.03928 threshold). They are computed values, not quoted from Google, and they are reproducible: any of the tools in 1.9 returns the same number.

Ink `#1a1c1e` is used below as a stand-in near-black. The color section owns the real `on-surface` token; if its value differs, re-measure. Marked **derived** where I produced a hex myself.

| Foreground | Background | Ratio | Body text (4.5:1) | Large text / UI (3:1) |
| --- | --- | --- | --- | --- |
| Blue 500 `#4285f4` | white `#ffffff` | **3.56:1** | fail | pass |
| Green 500 `#34a853` | white | **3.06:1** | fail | pass (2% of margin) |
| Yellow 600 `#f9ab00` | white | **1.93:1** | fail | fail |
| Red 500 `#ea4335` | white | **3.92:1** | fail | pass |
| white | Blue 500 `#4285f4` | **3.56:1** | fail | pass |
| white | Green 500 `#34a853` | **3.06:1** | fail | pass |
| white | Red 500 `#ea4335` | **3.92:1** | fail | pass |
| ink `#1a1c1e` | Blue 500 `#4285f4` | **4.80:1** | pass | pass |
| ink `#1a1c1e` | Green 500 `#34a853` | **5.59:1** | pass | pass |
| ink `#1a1c1e` | Yellow 600 `#f9ab00` | **8.83:1** | pass | pass |
| ink `#1a1c1e` | Red 500 `#ea4335` | **4.36:1** | fail | pass |
| ink `#1a1c1e` | white | **17.09:1** | pass | pass |
| white | near-black `#131316` | **18.54:1** | pass | pass |
| Blue 500 `#4285f4` | near-black `#131316` | **5.20:1** | pass | pass |
| Green 500 `#34a853` | near-black `#131316` | **6.07:1** | pass | pass |
| Yellow 600 `#f9ab00` | near-black `#131316` | **9.58:1** | pass | pass |
| Red 500 `#ea4335` | near-black `#131316` | **4.73:1** | pass | pass |

Five rules follow directly from that table, and they are not negotiable:

1. **No brand color at 500/600 is a body-text color on white.** Best of the four is red at 3.92:1. If you need brand-colored body text or a brand-colored link on a light surface, the color section must supply a darkened role. Worked demonstration (**derived**, unverified against the shipped tokens): `#0f52bd` on white measures **7.09:1**, and white on `#0f52bd` is the same 7.09:1.
2. **Yellow 600 never carries text and never sits on white as a meaningful shape.** At 1.93:1 it fails even the 3:1 non-text threshold. Yellow is a fill that takes ink on top (8.83:1), or a dark-theme foreground (9.58:1). It is never a light-theme foreground.
3. **Filled brand buttons take ink labels, not white ones.** White on blue is 3.56:1 and fails body text. Ink on blue is 4.80:1 and passes. Same for green (5.59:1) and yellow (8.83:1).
4. **Red is never a fill behind body-size text at all.** White gives 3.92:1, ink gives 4.36:1. Neither clears 4.5:1. Red fills carry only large text (24px regular or 18.66px bold and up) or an icon.
5. **All four brand colors clear body contrast on the dark theme** (4.73:1 to 9.58:1 against `#131316`). Dark mode is the permissive case. Light mode is where things break, so check light first.

Design-time shortcut, so nobody has to open a tool for every decision: Google's Material Color Utilities documents that a 40-point tone gap guarantees at least 3:1 and a 50-point gap guarantees 4.5:1. The color section is built on tonal roles, so pairing a tone-40 role against a tone-90 or tone-98 role is safe by construction. Treat the shortcut as design-time only and measure before publishing anyway; the 40/50 rule is Google's claim about their own tone scale, and I did not independently verify it across hues.

### 1.2 What has to be measured, and what does not

- **4.5:1** for body text, and for any text under 24px regular or 18.66px bold.
- **3:1** for large text at or above 24px regular / 18.66px bold, and for non-text: icons that carry meaning, focus rings, form-field borders, chart marks, the state that distinguishes a selected badge from an unselected one.
- **No minimum** for purely decorative graphics, disabled controls, logotypes, and text inside a photograph.

The traps specific to this club's page set:

- The independence disclaimer required on every page carrying the GDG logo is **body text** and must measure 4.5:1. Do not set it in a light grey at 11px in the footer. It is a legal statement; it gets the same contrast floor as a paragraph.
- Session cards, badges, and stat tiles from the components section usually put a label on a tinted container. Measure the label against the container, not against the page.
- Text over event photography has an unmeasurable background. Never set text directly on a photo. Put it on a solid or near-solid scrim panel and measure against the scrim, or place it below the image entirely. The image scrim is a solid color for measurement purposes, and it must be opaque enough that the measurement holds at the lightest pixel in the crop.
- Code blocks: syntax highlighting is color-only by definition. Every token color in the code-block theme must clear 4.5:1 against the code surface. Comments in particular tend to fail.
- Dark theme is a second full pass, not an inversion you can assume works.

### 1.3 Focus indicators

Never `outline: none` without a replacement in the same rule. The one legitimate pattern is `:focus:not(:focus-visible) { outline: none }` paired with a `:focus-visible` rule that draws a real ring.

The specified indicator:

```css
:focus-visible {
  outline: 3px solid var(--color-on-surface);
  outline-offset: 2px;
  border-radius: inherit;
}
```

Why `on-surface` and not a brand color: the ring then measures **17.09:1** in light and **18.54:1** in dark against the page surface, it never collides with a brand-colored fill sitting underneath it, and it needs no per-component retuning. This clears WCAG 2.2 SC 1.4.11 (3:1 non-text) with a very wide margin, and it also meets the AAA SC 2.4.13 shape requirement: at least 2 CSS px thick, fully enclosing the control, 3:1 against adjacent colors.

Rules around it:

- The `outline-offset: 2px` gap shows the surface behind the control. That means the ring only ever needs one measurement, against the surface. If a control sits inside a tinted container, measure against the container.
- **No interactive control sits directly on a photograph.** The photo makes the ring's contrast unmeasurable. Give the control a solid fill first.
- Never remove focus from the skip link, from custom-styled checkboxes and radios, or from anything with `tabindex="0"`.
- SC 2.4.11 Focus Not Obscured is AA in WCAG 2.2: a focused control must not be fully hidden behind a sticky header or footer. If the nav is sticky, add `scroll-margin-top` equal to the nav height on every focusable element, or drop the stickiness on small screens.
- The ring is visible on the dark theme, on the light theme, and under Windows High Contrast Mode. Test the last one with Chrome DevTools rendering panel, "Emulate CSS forced-colors". Under forced colors, `outline` survives and `box-shadow` does not, which is the reason the ring is an outline.

### 1.4 Target sizes

WCAG 2.2 SC 2.5.8 (AA) requires a minimum target of **24 by 24 CSS px**, with an exception if the target has enough spacing that a 24px circle centered on it does not intersect another target's circle. Inline links inside a sentence are exempt.

Club floor, which is stricter than AA on purpose because these pages get used on phones at a club fair:

- **44 by 44 CSS px** for anything a person taps on a phone: nav items, the RSVP button, the Discord link, agenda-row links, footer social icons.
- **24 by 24** absolute minimum for dense desktop-only controls, and only with 24px of clear space.
- Pad the target, do not grow the icon. A 20px icon inside a 44px hit area is correct.
- Icon-only buttons need an accessible name: `aria-label="Open menu"` or visually hidden text. An icon-only button with no name is invisible to a screen reader.

### 1.5 Semantic structure, headings, landmarks

**One `h1` per page**, and it is the page's actual title. On an event page that is the event name, not the club name.

**Never skip a heading level.** `h2` to `h4` is a defect. This matters more than it sounds like it does: screen-reader users navigate long session pages by heading, and the heading tree is the table of contents. It also has to hold in the markdown docs, where GitHub builds the file's outline from the same tree.

Heading level is structure, not size. If an `h3` needs to look big, the type section has a role for that. Do not pick the level by how it looks.

**Landmarks on every HTML page:**

```html
<a class="skip-link" href="#main">Skip to main content</a>
<header>
  <nav aria-label="Main"> ... </nav>
</header>
<main id="main" tabindex="-1"> ... </main>
<footer> ... </footer>
```

- `tabindex="-1"` on `<main>` is required or the skip link will not move focus in Safari.
- If there are two `<nav>` elements on a page, each needs a distinct `aria-label` ("Main", "Session arcs", "Footer").
- Use `<ul>` for lists of things. The agenda is a list. The session grid is a list. Screen readers announce "list, 14 items", which is real information.
- Tables get `<th scope="col">` or `scope="row"`, and a `<caption>`. Never use a table for layout.
- `<time datetime="2026-12-10T14:30">` for every date and time on event pages.
- The independence disclaimer is real text in the footer. Not an image, not a background, not `title` attribute text.

### 1.6 Keyboard

- Tab order equals DOM order. Never use a positive `tabindex`. Never reorder with CSS `order` or `grid-area` in a way that separates visual order from DOM order for interactive content.
- Everything clickable is a `<button>` or an `<a href>`. A `<div onclick>` is not keyboard reachable and cannot be fixed with CSS.
- Whole-card links: put one `<a>` around the card title and stretch it with `::after { position: absolute; inset: 0 }`. Do not nest other links or buttons inside a clickable card; that creates an unreachable control.
- Disclosure widgets (a collapsible agenda, a FAQ): `<button aria-expanded="true|false" aria-controls="id">`. Escape closes. Focus returns to the trigger.
- No keyboard traps. If a dialog is ever added, focus moves into it, is trapped inside while open, and returns to the opener on close.
- Skip link:

```css
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: var(--space-200);
  top: var(--space-200);
  z-index: 100;
  /* solid surface fill, on-surface text, focus ring per 1.3 */
}
```

Do not use `display: none` or `visibility: hidden` to hide the skip link. Both remove it from the tab order, which defeats the point.

### 1.7 Alt text policy

The rule that decides every case: **alt text replaces the image for someone who cannot see it.** It is not a caption, not a filename, and not SEO.

| Case | Alt |
| --- | --- |
| GDG on Campus RCC logo, linked to the home page | `alt="GDG on Campus Riverside City College"`. The alt names the destination, because the accessible name of a link is what a screen reader announces. Never `alt="logo"`. |
| The same logo sitting next to the club name already in text | `alt=""`. Do not make a screen reader hear the name twice. |
| The Step device (Part 2) | `aria-hidden="true" focusable="false"` on the inline SVG, or `alt=""`. It is decorative and the arc name is always in text beside it. |
| A session-card thumbnail that is pure decoration | `alt=""` |
| A diagram (the three-arc map, a flow) | Short `alt` naming what it shows, plus the same content in text or a table nearby. A diagram whose information exists nowhere else in text is a defect. Mermaid diagrams in markdown need the same treatment. |
| A slide screenshot with text on it | The alt carries the slide's text. If it is more than about 150 characters, put it in the page body and use `alt=""`. |
| A QR code | The URL must appear as real text on the page. The alt says where it goes: `alt="QR code linking to the Fall 2026 RSVP form"`. A QR code with no text URL is unusable by half the audience. |
| Event photography | See below. |

**Alt text for event photography, which is where accessibility and the privacy policy meet.**

The privacy policy says members who are not officers are never named, and that anything beyond an officer's name and role needs its own consent. That constrains alt text directly:

- **Alt text never names an individual.** Not the speaker, not the members in frame. Write roles and counts: `alt="Two students at a whiteboard working through a session exercise in BLCIS A-210"`.
- **Alt text does not describe race, gender, body, or disability** unless it is the point of the image, which for this club it never is.
- Describe what is happening, not what is present. "Members practicing a two-minute pitch to a seated audience" beats "a group of people in a room".
- Aim for one sentence. If the photo needs a paragraph, it needs a caption too, and the caption is real text under the image.
- A caption and an alt should not be identical. If the caption already says it, `alt=""` and let the caption do the work.

### 1.8 The markdown docs, rendered on GitHub

GitHub strips `style` attributes and most inline HTML, so none of the CSS above reaches the repo view. What survives is structure, and structure is where the accessibility lives anyway.

- One `#` per file, at the top. Never skip a level. `markdownlint` rule **MD001** (heading-increment) catches this.
- Every image has alt text. `markdownlint` rule **MD045** (no-alt-text).
- No bare URLs as link text. `markdownlint` rule **MD034**. "See the privacy policy" with a real relative path, never "see here" or a raw URL.
- Tables get a real header row. GitHub renders the first row as `<th>` only if the delimiter row is present.
- Use GitHub's alert syntax (`> [!NOTE]`, `> [!WARNING]`) rather than bold-and-emoji. Alerts render with a text label, so the meaning survives without color.
- **Never encode status in color or emoji alone.** A green check next to a session is invisible in a screen reader announcement that reads "white heavy check mark". Write the word: `Status: confirmed`.
- Code fences always carry a language tag. Highlighting is color-only, so never write a code sample whose meaning depends on the highlight.

The same file published as standalone HTML gets the full treatment in 1.5. The markdown-to-HTML build must emit a single `h1`, `<main>`, and a skip link. If the build is a static-site generator, that belongs in the layout template, once.

### 1.9 Pre-publish verification procedure

Run this before any page goes public, and before the Demo Day page on 2026-12-10 in particular. About fifteen minutes for a page you have already checked once, forty-five for a new template.

**Step 1. Automated, in the browser (5 min).**

- **axe DevTools** (Deque, free browser extension). Run "Scan all of my page". Zero critical and zero serious issues is the bar. axe catches roughly a third of WCAG issues, so this is a floor, not a pass.
- **Lighthouse** accessibility category, built into Chrome DevTools. Same caveat: a 100 score is not a passing grade, it is the absence of the automatable failures.
- Optionally **WAVE** (WebAIM extension) as a second opinion; it renders errors in place, which is easier to act on.

**Step 2. Contrast, on the specific pairs (5 min).**

- Chrome DevTools color picker shows the ratio inline when you click any `color` swatch in the Styles pane. Use it on: body text, every button label, the disclaimer in the footer, badge labels, code-block comments, the focus ring, form-field borders.
- For a pair you cannot inspect (text over a scrim, a printed poster), use the **TPGi Colour Contrast Analyser** desktop app with its eyedropper, or the **WebAIM Contrast Checker** at webaim.org/resources/contrastchecker/ with the hex values.
- Repeat the whole step with the dark theme active. DevTools rendering panel, "Emulate prefers-color-scheme: dark".

**Step 3. Keyboard, hands off the mouse (3 min).**

- Load the page, press Tab once. The skip link must appear. Press Enter. Focus must land in `<main>`.
- Tab through the entire page. Every stop must be visible, in a sensible order, and never hidden behind the sticky nav.
- Activate every control with Enter and Space. Every collapsible opens and closes. Escape closes anything that opens.
- Tab past the last element. Focus should reach the browser chrome, not loop back into a trap.

**Step 4. Structure (2 min).**

- Chrome DevTools, Elements panel, Accessibility pane: check the computed name of every image, button, and link. Anything named "image", "button", or a filename is a defect.
- Firefox Accessibility Inspector has a "Check for issues" dropdown with contrast and text-label passes that catch different things than axe does.
- Validate the markup: **W3C Nu HTML Checker** at validator.w3.org/nu/. Duplicate IDs and unclosed tags break assistive tech in ways nothing else will report.

**Step 5. Reflow and zoom (2 min).**

- Set the viewport to **320 CSS px wide**. The page must be usable with vertical scrolling only, no horizontal scroll (WCAG 1.4.10 Reflow). Tables and code blocks are allowed to scroll horizontally inside their own container; the page body is not.
- Browser zoom to **200%** at 1280px. Nothing clipped, nothing overlapping (1.4.4).

**Step 6. Motion and preferences (1 min).**

- DevTools rendering panel, "Emulate prefers-reduced-motion: reduce". Every transition and animation the motion section defines must stop. Check that nothing becomes unusable because a transition was doing load-bearing work.
- "Emulate CSS forced-colors: active". Text readable, focus ring visible, no content lost.

**Step 7. Screen reader, once per template rather than once per page (10 min).**

- **VoiceOver** on macOS (Cmd-F5, free, already installed). Use rotor (`VO-U`) to list headings, then links, then landmarks. The heading list should read like a table of contents. The link list should make sense with no surrounding context.
- **NVDA** on Windows (free, nvaccess.org) if anyone on the team has a Windows machine. It behaves differently enough from VoiceOver to be worth one pass on the site's main template.

**Step 8. CI, so this does not depend on anyone remembering (setup once).**

- `markdownlint-cli2` over `docs/**/*.md` in a GitHub Action, with MD001, MD034, MD045 enabled. This protects the repo docs, which is most of what the club actually ships.
- `pa11y-ci` or `@axe-core/cli` over the built HTML in the same Action. Fail the PR on serious and critical.
- The privacy policy already references `scripts/check.sh` running before every PR. Add the markdown lint call there so it runs locally too, and so the accessibility check and the privacy check are one habit rather than two.

**Step 9. Two things a tool cannot check.** Read the page and confirm: no information is carried by color alone (WCAG 1.4.1), and no instruction refers to a control by shape or position alone ("the round button", "the box on the right").

---

## Part 2: Visual voice

### 2.1 Iconography

**Set: Phosphor Icons.** MIT licensed, drawn on a 256-unit grid, six weights. Verify the LICENSE file in the release you vendor before shipping; do not take the license on my word or on a blog post's.

**Weight: Bold, one weight, everywhere.** Icons on these pages live at 20 and 24px next to 14 to 16px body text, and get projected onto a lab wall and read on a phone in a bright room. Bold holds up in both. One weight is also the only rule a rotating officer team can follow correctly. If a specific icon reads too heavy at 40px or larger, that is the moment to make a documented exception in the brand doc, not to start mixing freely.

**Why not Material Symbols.** It is openly licensed and technically available, so this is not a legal call. It is that Material Symbols silhouettes are one of the strongest signals of Google authorship in existence. A page using Material Symbols, a tonal Material palette, and Material corner radii reads as a Google property regardless of what the wordmark says. The club is taking Google's method, and an icon set is chrome. This is the single cheapest place to buy back a distinct identity.

**Licensing position, stated plainly:**

- Vendor the SVGs the club actually uses into `assets/icons/`. Do not hotlink a CDN, do not ship a webfont of the whole set, do not pull from `fonts.googleapis.com` for anything.
- Commit the upstream `LICENSE` file alongside them at `assets/icons/LICENSE`.
- Add a one-line attribution row to `docs/04-brand/brand.md` naming the set, the version, and the license.
- Icons are never modified beyond color and size. If a needed icon does not exist in the set, use a word instead of drawing one.

**Usage rules:**

- An icon never appears alone as the only label for an action unless it has an `aria-label` and a tooltip.
- Icons are `currentColor`, always. They inherit the text color and therefore inherit dark mode and forced-colors for free.
- Meaningful icons need 3:1 against their background. Decorative ones do not, but hold them to 3:1 anyway so they survive a projector and a grayscale print.
- One icon per row maximum. Icons on both the left and the right of an agenda row is noise.

### 2.2 Imagery and photography

The club photographs students at events. The privacy policy in `docs/01-governance/privacy-and-public-repo-policy.md` already forbids photos of people without written consent in the repo, and routes photos of people to the shared drive. This section says how consent is captured and what happens to the rest, so the policy is operable rather than aspirational.

**Default shot list, which makes most of the consent problem disappear.** For public pages, shoot so that nobody is identifiable:

- The room from the back, over shoulders, toward the screen.
- Hands on keyboards, hands on a whiteboard marker, hands holding a name tent.
- The whiteboard, the slide, the agenda on the wall, the check-in table, the snacks.
- Wide room shots where faces are small and turned away.

These need no consent, go in `assets/` if under 1 MB, and carry the pages perfectly well. Identifiable portraits are the exception, not the default.

**How consent is captured.** Three layers, all of which produce something the club can point to later:

1. **Door signage.** A printed card at the entrance of BLCIS A-210 on any day photography is happening: what is being photographed, where it may be published (club web pages, the public GitHub repo, Instagram, ASRCC reports), and where to sit or stand to stay out of frame. Signage is notice, not consent. It does not authorize publishing an identifiable face.
2. **The opt-in slip, which is the actual consent.** A half-page paper slip at check-in, or a separate unticked checkbox on the RSVP form. It must state, in the person's own reading: the club's name, that photos may appear on public web pages and in a public GitHub repository that is permanently archived and indexable, that consent may be withdrawn at any time by messaging an officer, and it must capture a printed name, a signature or a form submission, and a date. It is a separate action from RSVPing. A pre-checked box is not consent, and neither is a Discord post.
3. **The badge sticker, which is how the photographer knows in the moment.** Anyone who signs the slip gets a colored dot on their name badge. **The photographer's rule: if a face is identifiable and there is no dot, that frame does not leave the drive.** Nobody has to remember names or cross-reference a list mid-event.

**Where the paperwork lives.** The signed slips and the form responses go to the club's shared Drive, never to the repo, because they carry names and signatures and the policy forbids both. What goes in the repo is what the policy already prescribes for officer names: a line in the semester's `handoff.md` under account and consent records, recording the date and the count. Reference published photos by filename, never by subject name.

**Before publication, check that the college does not already have a media release form.** RCC Student Activities very likely has one, and using the college's existing instrument is better than the club inventing one. Treat this as `[TBD: confirm with Student Activities whether an RCC media release form exists and supersedes the club slip]`. I have not verified this and the club should not ship the slip until someone asks.

**Minors.** RCC has dual-enrollment high school students. A person under 18 cannot give this consent themselves. Default rule: **if a subject may be under 18, no identifiable photo is published, period**, unless a guardian release has been obtained through the college's process. Do not attempt to assess age visually and do not build a workaround.

**What happens to photos without consent:**

- They live in a `restricted/` subfolder of the event's Drive folder, with sharing set to club officers only.
- They are used internally: a retro deck shown live, an ASRCC report presented in a meeting. They are never uploaded to the repo, never on a public page, never on Instagram, never in a slide deck that gets a public link.
- They are deleted at the end of the following semester unless someone has a stated reason to keep them. Retention is a liability, not an asset.

**Before any photo is published:**

- Strip EXIF, including GPS. `exiftool -all= photo.jpg` is one command and it is not optional; phone photos carry location.
- Confirm no faces without dots, no screens with visible personal data, no whiteboards with a phone number on them, no badges with legible full names.
- Confirm under 1 MB if it is going in the repo, per the policy.
- Write alt text per 1.7: no names, no demographic description.

**If a photo is published without consent, or consent is withdrawn:** unpublish the page immediately, then follow the maintainers' removal procedure already written in the privacy policy. Deleting the file in a new commit is not removal; it requires `git filter-repo`, a force push with branch protection temporarily lifted, a GitHub Support cache purge, everyone re-cloning, and a decision-log row that does not describe the data. That procedure is expensive, and its cost is exactly the argument for the badge-dot rule.

**Never used, on any surface:**

- Stock photography of generic people at laptops. It reads as a template and it is a lie about who is in the room.
- AI-generated images of people. The club teaches evidence and asking; fabricating its own audience contradicts that.
- Any Google product screenshot, Pixel photography treatment, or Google marketing imagery. That is the forbidden-imitation line.

### 2.3 Illustration, with no illustrator on the team

The club has no illustrator and will not have one next semester either. So the answer is not "keep it simple", it is **no freehand illustration exists in this system.** Three sanctioned image types, all of which are made by editing text.

**1. Type as the image.** The default hero for every event page, session page, and social card: the session title set at the type section's display role on a flat surface role, with the Step rule (2.4) beneath it and the date and room in the label role. No picture at all. This is the highest-quality output the club can reliably produce, because it is just the type system doing its job.

**2. Diagrams, not drawings.** Mermaid, in fenced code blocks. GitHub renders it natively in markdown, and the standalone HTML build can render it too. Use it for the three-arc map, session flows, the Demo Day run of show, the officer handoff chain. It is text, so it diffs in a PR, and it survives an officer transition. Every diagram gets alt text and a text equivalent per 1.7.

**3. The Step field.** A low-contrast background pattern generated from the signature device (2.4), used behind heroes and on the Demo Day page. It is CSS or a tiled SVG. Nobody draws anything.

**Template contract.** Ship one SVG template per export size in `assets/templates/`, sized by [assets.md](assets.md): the 3:4 Instagram feed master at 1080 x 1440 (Instagram's grid has shown 3:4 since January 2025, so the `1x1` this line used to name would be cropped 135 px off each side), the 9:16 story, the 1200 x 630 share card, 16:9 for slides and the projector, and 3:1 for the repo banner and page hero. Each template contains text nodes with placeholder strings, the Step, and nothing else. An officer opens it in a text editor, changes the strings, and exports. No drawing tool, no design decisions, no way to break the grid. This is the same discipline that makes the club's markdown docs survivable: the author picks meaning, the system picks measurements.

**Not used:** clip art, 3D blob renders, gradient meshes, hand-drawn doodle borders, isometric illustration packs, and anything with the soft rounded optimistic character of Google's AI illustration style. That last one is the specific trap: it is the most imitated look on the internet right now and copying it lands the club inside the forbidden zone by accident.

### 2.4 The signature device: the Step

This is the piece that makes the pages the club's own rather than a de-branded Material template. It is one geometric construction, it costs nothing to produce, and it does actual work in the information architecture instead of just sitting in a corner.

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

**The Rule, variable geometry, which is what gives pages identity.** The same construction stretched to a container's full width and used as the divider under section headings. Its one variable is where the rise sits:

```css
.rcc-step-rule {
  --step-x: var(--rcc-step-arc, 50%);  /* set --rcc-step-arc on :root, never here */
  --step-w: 2px;                       /* matches the components section hairline */
  --step-rise: 10px;                   /* one step from the space scale */
  position: relative;
  height: calc(var(--step-rise) + var(--step-w));
  color: var(--rcc-outline);            /* role from the color section */
}
.rcc-step-rule::before {                    /* low run, plus the riser */
  content: "";
  position: absolute; left: 0; bottom: 0;
  width: var(--step-x); height: 100%;
  border-bottom: var(--step-w) solid currentColor;
  border-right:  var(--step-w) solid currentColor;
  border-bottom-right-radius: calc(var(--step-w) / 2);   /* round OUTER only; see tokens.css */
}
.rcc-step-rule::after {                     /* high run */
  content: "";
  position: absolute; top: 0; right: 0;
  left: calc(var(--step-x) - var(--step-w));
  border-top: var(--step-w) solid currentColor;
}
```

The one-stroke-width overlap in `::after`'s `left` is intentional; it prevents a hairline gap at the joint. Verify in a browser at 1x and at 2x device pixel ratio before shipping.

**The rise position encodes the Fall 2026 curriculum.** One custom property, three values, no new artwork:

| Arc | `--step-x` |
| --- | --- |
| Voice | `25%` |
| Ask | `50%` |
| Evidence | `75%` |
| Neutral (club pages, footer, non-session content) | `12%` |

Set it once on the page's root element and every rule on the page carries the arc. Someone who has read three session pages will recognize which arc a page belongs to before reading the heading. Nothing else in the system does that, and it costs one line of CSS per page.

**The Staircase, for banners and the semester landing.** Three rises instead of one, which reads as the three arcs of the semester:

```html
<svg viewBox="0 0 32 24" aria-hidden="true" focusable="false">
  <path d="M2 21H11V13.5H21V6H30"
        fill="none" stroke="currentColor" stroke-width="3"
        stroke-linecap="butt" stroke-linejoin="round"/>
</svg>
```

Used at large sizes only: the semester landing hero, the repo banner, the Demo Day page. Never in chrome.

**Why this is derived from nothing Google owns.**

- It is not a spark or star of any point count, so it cannot be mistaken for the Gemini mark, whose construction Google Design describes as the negative space of four adjoining circles.
- It is not a robot head, a dot, a chevron, a bracket, or a globe, which is the entire I/O glyph vocabulary.
- It is **monochrome by construction** and uses `currentColor`. It has no color meaning at all, so it can never read as the blue/red/yellow/green sequence, which is the mistake that gets clubs into trouble no matter how the shapes are drawn.
- It uses no gradient. The gradient-field technique is the strongest current Google identity signal, and the club is not going near it.
- Material's shape language is filled rounded rectangles with uniform corner treatment. The Step is an unfilled stroke with one round corner and one sharp one. It is a deliberate counter-move against the system it sits next to.

**Why it is worth having.**

- **One variable does real work.** `--step-x` turns one drawing into a semester's worth of page-specific art, which is the one genuinely transferable idea from Google's event design: parameterize a single construction instead of drawing new assets. The club gets the benefit with a CSS custom property instead of a mesh gradient.
- **It survives the whole range.** 16px favicon to a printed banner, because the stroke is a percentage of the box.
- **It survives every theme.** `currentColor` means light, dark, forced-colors, and a grayscale print all work without a second asset.
- **A student can build it.** It is one `<path>` and two pseudo-elements. Nobody has to open a drawing tool, which is the constraint that actually determines whether a design system survives an officer transition.
- **It is semantically honest.** A soft-skills curriculum whose entire premise is that you get better one session at a time gets a mark that is literally one step up. The reasoning is legible without a paragraph explaining it.

**Rules of use, and these matter more than the geometry:**

- **The Step is never the club's logo and never replaces the GDG on Campus lockup.** It is a page device. Where both appear, they are separated by at least the height of the lockup, and they never sit in a shared box, a shared color field, or any arrangement that could read as one combined mark. Locking a club-made mark to a Google mark is the forbidden move.
- **Once per screen.** Repetition kills it. One Step in the hero, one Rule per major section boundary, never both in the same block.
- **It never carries meaning alone.** The arc name is always in text next to it. Shape alone cannot convey information (WCAG 1.4.1), and a rise at 25% versus 50% is invisible to a lot of people.
- **It is decorative in the accessibility tree.** `aria-hidden="true" focusable="false"` on every inline SVG instance. `focusable="false"` matters: older IE and some assistive tech put SVGs in the tab order without it.
- **Contrast:** decorative, so no minimum applies, but hold it to 3:1 against its surface anyway. It should survive a projector in a bright lab and a photocopied flyer.
- **Favicon:** ship an SVG favicon with an embedded `@media (prefers-color-scheme: dark)` block so the stroke flips, and a 32px PNG fallback with a solid container square. SVG favicon and in-SVG media query support varies by browser and version; check the browsers the club's audience actually uses and do not assume Safari behaves like Chrome. Mark this `[unverified]` until someone opens it in Safari, Chrome, and Firefox.
- **Merchandise:** the Step alone on a shirt or sticker is fine, because it is the club's own mark. The GDG logo on merchandise is forbidden by the brand guidance. Do not put them on the same object.

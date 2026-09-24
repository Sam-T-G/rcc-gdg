# Accessibility and photo consent

Verified by an adversarial checker: all 17 contrast ratios below were recomputed with WCAG 2.x sRGB linearization and match to 2dp.

The CSS here is the explanation. The shipping copy lives in [tokens.css](tokens.css), which carries the corner-radius and custom-property fixes the checker found.

## Part 1: Accessibility

The goal is that anyone on the team can check a page in ten minutes and get a yes or no, without design judgment. Every rule below is either a number you can measure or a step you can run.

### 1.1 Contrast: the measured facts about the four licensed colors

All ratios below were computed with the WCAG 2.x sRGB relative-luminance formula (`(L1 + 0.05) / (L2 + 0.05)`, sRGB linearization at the 0.03928 threshold). They are computed values, not quoted from Google, and they are reproducible: any of the tools in 1.9 returns the same number.

Ink `#1a1c1e` is used below as a stand-in near-black. The shipped ink is `#1e201e`, and every shipped pair was measured separately in [foundations.md §2.5](foundations.md); this table is the four licensed hexes as a baseline. Marked **derived** where the hex was produced here rather than licensed.

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

Design-time shortcut, so nobody has to open a tool for every decision: Google's Material Color Utilities documents that a 40-point tone gap guarantees at least 3:1 and a 50-point gap guarantees 4.5:1. The color section is built on tonal roles, so pairing a tone-40 role against a tone-90 or tone-98 role is safe by construction. Treat the shortcut as design-time only and measure before publishing anyway; the 40/50 rule is Google's claim about their own tone scale and has not been independently verified here across hues. [bright-lines.md §1.4](bright-lines.md) records the worst case: 50 points gives 4.484:1, which is under the floor.

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

The indicator, as `tokens.css` ships it:

```css
:focus-visible {
  outline: 3px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--rcc-focus-gap), 0 0 0 5px var(--rcc-focus-ring);
  border-radius: inherit;
}
```

The ring is `--rcc-focus-ring`, which is `--rcc-primary`: **5.73:1** against the light surface and **10.95:1** against the dark one ([foundations.md §2.5](foundations.md)). It sits outside a 2px gap in the surface color, so it is measured against the surface and never against the fill it happens to be around. It is 3px thick and fully encloses the control, which clears WCAG 2.2 SC 1.4.11 (3:1 non-text) and meets the AAA SC 2.4.13 shape requirement: at least 2 CSS px thick, fully enclosing, 3:1 against adjacent colors.

Why a box-shadow with a transparent outline rather than a solid outline: a box-shadow ring is clipped by an ancestor with `overflow: hidden`, so a card that clips its media puts the ring on the card and not on an inner element ([components.md §7.1](components.md)); and under Windows High Contrast Mode `box-shadow` is dropped while `outline` survives, so the transparent 3px outline is what forced-colors substitutes a system color into. An earlier draft of this section specified a solid `on-surface` outline at 17.09:1; `tokens.css` is what ships, and this section was corrected to it on 2026-09-23.

Rules around it:

- The `outline-offset: 2px` gap shows the surface behind the control. That means the ring only ever needs one measurement, against the surface. If a control sits inside a tinted container, measure against the container.
- **No interactive control sits directly on a photograph.** The photo makes the ring's contrast unmeasurable. Give the control a solid fill first.
- Never remove focus from the skip link, from custom-styled checkboxes and radios, or from anything with `tabindex="0"`.
- SC 2.4.11 Focus Not Obscured is AA in WCAG 2.2: a focused control must not be fully hidden behind a sticky header or footer. If the nav is sticky, add `scroll-margin-top` equal to the nav height on every focusable element, or drop the stickiness on small screens.
- The ring is visible on the dark theme, on the light theme, and under Windows High Contrast Mode. Test the last one with Chrome DevTools rendering panel, "Emulate CSS forced-colors"; the transparent outline is what carries the ring there.

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
- Tables get `<th scope="col">` or `scope="row"`. GFM has no `<caption>`, so the complete introducing sentence that [documents.md §3.3](documents.md) requires does the caption's job in both renderings. Never use a table for layout.
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
.rcc-skip {
  position: absolute;
  left: -9999px;
}
.rcc-skip:focus {
  left: var(--rcc-space-4);
  top: var(--rcc-space-4);
  z-index: 100;
  /* becomes a real Primary button; focus ring per 1.3 */
}
```

`tokens.css` does not ship this rule yet; the landing page carries its own copy.

Do not use `display: none` or `visibility: hidden` to hide the skip link. Both remove it from the tab order, which defeats the point.

### 1.7 Alt text policy

The rule that decides every case: **alt text replaces the image for someone who cannot see it.** It is not a caption, not a filename, and not SEO.

| Case | Alt |
| --- | --- |
| GDG on Campus RCC logo, linked to the home page | `alt="GDG on Campus Riverside City College"`. The alt names the destination, because the accessible name of a link is what a screen reader announces. Never `alt="logo"`. |
| The same logo sitting next to the club name already in text | `alt=""`. Do not make a screen reader hear the name twice. |
| The Step device ([visual-voice.md §9.6](visual-voice.md)) | `aria-hidden="true" focusable="false"` on the inline SVG, or `alt=""`. It is decorative and the arc name is always in text beside it. |
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

- `markdownlint-cli2` over every `.md` file already runs in the `docs-check` Action and in `scripts/check.sh` when it is installed locally, with MD001 and MD045 on (MD034 is off on purpose; see 1.8). This protects the repo docs, which is most of what the club actually ships.
- `pa11y-ci` or `@axe-core/cli` over the built HTML in the same Action, failing the PR on serious and critical, is not set up. The landing page is checked by hand with the harness in its `scratch/` folder instead.

**Step 9. Two things a tool cannot check.** Read the page and confirm: no information is carried by color alone (WCAG 1.4.1), and no instruction refers to a control by shape or position alone ("the round button", "the box on the right").

---

## Part 2: Visual voice

Most of what was here moved to [visual-voice.md](visual-voice.md) on 2026-09-21, when the §9 that three other files cite was finally written: iconography (was 2.1) is now §9.5, illustration (was 2.3) is §9.3, and the Step (was 2.4) is §9.6. The section numbers below are kept so existing links still land. What stays is the photography and consent procedure, because it is a policy with paperwork, not a drawing decision.

### 2.1 Iconography

Moved to [visual-voice.md §9.5](visual-voice.md). Phosphor, Bold, vendored SVGs with the upstream LICENSE committed beside them.

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

**Before publication, check that the college does not already have a media release form.** RCC Student Activities very likely has one, and using the college's existing instrument is better than the club inventing one. Treat this as `[TBD: confirm with Student Activities whether an RCC media release form exists and supersedes the club slip]`. It is unverified; do not ship the slip until someone asks.

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

Moved to [visual-voice.md §9.3](visual-voice.md): type as the image, diagrams instead of drawings, photographs of the room, and the template contract.

### 2.4 The signature device: the Step

Moved to [visual-voice.md §9.6](visual-voice.md), unchanged except for cross-references. The accessibility rules for it are the ones in the alt-text table above: decorative, `aria-hidden="true" focusable="false"`, never the only carrier of an arc's name, held to 3:1 against its surface anyway.

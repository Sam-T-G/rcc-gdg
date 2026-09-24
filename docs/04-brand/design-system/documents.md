# Design docs

The system for the club's written artifacts: playbooks, session cards, semester plans, event plans, and the HTML pages built from them. It covers what a document is made of, how it is structured, what markdown constructs are legal, and how a `.md` file becomes a styled page.

**Scope.** This section owns document structure and markdown legality. [components.md](components.md) owns what a callout, table, and code block *look like*; this section owns which ones exist and when an author is allowed to use one. [foundations.md](foundations.md) and [motion.md](motion.md) own every value. Nothing here restates a token value.

**Governing principle, and everything below follows from it:** *an author writes structure, never appearance.* GitHub strips `class`, `style`, `id`, and all CSS from markdown. Any convention that depends on an attribute an author types works in exactly one of the two renderers. So the converter derives styling from structure the author already had to write, and the author has no styling controls at all.

---

## 1. Anatomy of a club document

Google's technical-writing guidance is a document-shape system before it is a style system: one h1, sentence case, heading grammar that encodes section type, a closed callout set with an admission test, and a list-versus-table decision rule. That is what this anatomy is built from. What it deliberately does **not** take is Google's internal design-doc review structure (the security / privacy / i18n / storage sign-off sections described in *Software Engineering at Google*). A student club that ships a sign-off matrix it never fills in has built theater, and the survey flags reproducing that structure as club process as a thing not to take.

The blocks, in order. Blocks 1, 2, and 9 are required in every document. The rest appear when the document has that job.

| # | Block | What it is for | How it fails |
|---|---|---|---|
| 1 | **Title** (single h1) | Names the artifact. Sentence case. Matches the filename slug. | It is a category ("Playbook"), it is Title Case for no reason, or a second h1 appears further down |
| 2 | **Job line** (1 to 2 sentences, no heading, directly under the h1) | Tells a reader in one breath what this file does and who holds it. `meeting-algorithm.md` does this correctly: "How every weekly meeting is built. This file is the machine; the semester's session cards are what you feed it." | It becomes a preamble, it restates the title in longer words, or it pre-announces what the document will cover. Google's rule is blunt: "Don't pre-announce anything" |
| 3 | **Facts table** (two-column, empty header row) | The constants a reader needs before acting: owner seat, slot, room, inputs, status. The club already uses this on session cards and `meeting-algorithm.md`, and it is the house signature. Keep it. | It carries prose instead of values, it duplicates something the body says again, or a value is guessed instead of marked `[TBD]` |
| 4 | **The shape** (h2, noun phrase) | The thing itself, laid out as a table or a short list. "The block" and its clock table. A reader who stops here knows what they are looking at. | It is written as narrative when it is really a table of three or more facts per row |
| 5 | **The rules that bind it** (h2, noun phrase) | The constraints that do not bend. "The five laws." Short, numbered, each with its consequence stated. | More than about six, or a rule that is really a preference. A rule nobody would enforce weakens the ones you would |
| 6 | **The procedure** (h2, infinitive verb) | Ordered steps a person executes. "To schedule a semester:" | Conditions land after the instruction instead of before it. Google's sentence-level rule ("Put conditions before instructions, not after") has an outsized effect on whether a step gets executed correctly |
| 7 | **Failure modes** (h2, noun phrase) | Named ways this goes wrong and the specific correction. `meeting-algorithm.md`'s "Facilitator failure modes" is the model: symptom in bold, correction in one sentence. | Vague symptoms ("meetings feel flat"). A failure mode a facilitator cannot recognize in the room is a paragraph, not a tool |
| 8 | **Boundary** (h2, noun phrase) | What this document does not cover, and where that lives. The sessions README's "Not in this folder" is the model. | Missing. Without it every reader who wants the adjacent thing either asks or duplicates it |
| 9 | **Maintenance footer** | `Last reviewed: YYYY-MM-DD. Owner: SEAT.` A stale date is a bug, not a cosmetic issue. Put a review date on anything the club publishes | Missing, or updated by a bot so it means nothing |

Two anatomy rules that are worth stating as rules:

**Single source.** A fact lives in exactly one file. Every other file links to it. The club already enforces this and says so out loud in the sessions README: "Cards are the input; the block, the five laws, the critique protocol, and the ladder live there and are not repeated per card." That sentence is the pattern. Copy it into any new document family.

**Seats, not names.** Documents name a seat (`LEAD`, `FAC-A`, `NOTE`); one table per semester maps seats to people. This is already the club's convention, it keeps the repo inside its own privacy policy, and it makes documents reusable next year. Design docs inherit it without exception.

---

## 2. Heading hierarchy and structure

### Depth

| Level | Use | Rule |
|---|---|---|
| h1 | The document title | Exactly one per file, always the first line |
| h2 | Sections | The working level. Aim for four to seven per document |
| h3 | Subsections inside a long h2 | Allowed. Never skip from h2 to h4 |
| h4 | Nothing | If you need one, the h2 above it is a document. Split |

The h4 ban has a structural reason, not a taste reason. On Google's own documentation chassis the heading font role changes at h4: h1 through h3 use the brand heading face, and h4 drops to emphasized body type. Below the section level a heading stops being a section and becomes a bold sentence. Our type scale behaves the same way, so at h4 the reader has already lost the outline.

### Grammar

Heading grammar encodes section type, so a reader knows what kind of section they are in from the first word.

- **Task section: bare infinitive.** "Run one." "Fill the Person column."
- **Concept section: noun phrase.** "The five laws." "Facilitator rotation."
- **No `-ing` openers.** "Running a session" becomes "Run a session".
- **Sentence case everywhere,** including the h1. This is the single highest-yield change to how a document reads, and it costs nothing. Enforce it in review.
- **No numbers, links, or inline code inside a heading text.** Headings are also anchors and link labels.

Two sanctioned exceptions, both already live in the repo. Keeping the exception list closed and written down is what keeps the rule alive.

1. **Session card titles carry their index and keep their own capitalization.** `# 5 - Anatomy of an Ask` stays. The number is the card's identity in the semester table, and the session name is the title of a work. Its GitHub anchor is `#5---anatomy-of-an-ask`; link to the file, not to that anchor.
2. **Seat names in table cells stay in backticks.** That is a cell, not a heading, and it is fine.
3. **The design system's own files number their sections** (`## 2.5 Contrast audit`), so that a citation like §2.5 stays stable when a file is split or a section moves; §5 moved whole from `foundations.md` to `motion.md` on 2026-09-21 and no citation broke. Nothing else in the repo numbers a heading.

### Ordering

Order by what the reader needs to act, not by the order you figured it out.

1. Title, job line, facts table.
2. The shape of the thing.
3. The rules that bind it.
4. The procedure.
5. Edge cases, failure modes, degradation ("If you have fewer people").
6. Boundary, maintenance footer.

The test: a reader who stops after the facts table can still show up and do the right thing. A reader who stops after block 4 knows the shape well enough to explain it to someone else.

### When to split

Split when any one of these is true. They are triggers, not a scoring system.

| Trigger | Split into |
|---|---|
| One h2 runs past roughly two screens | Its own file, linked from a one-line summary |
| More than seven h2 sections | Two documents, or an index plus children |
| Two blocks change on different cadences | Evergreen part to `docs/`, dated part to `semesters/<term>/`. This is the repo's existing rule 1 and it is the primary split axis |
| Two different seats own two halves | Two files, one owner each |
| A section is linked to from three or more documents | It was always a document |
| The document holds both a machine and its instances | Machine to `docs/03-playbooks/`, instances to the semester folder. `meeting-algorithm.md` plus session cards is the worked example |

---

## 3. Constructs that render correctly on GitHub and as HTML

**Provenance note before the rules:** none of the GitHub renderer behavior below is in the research survey. It is general knowledge of GitHub Flavored Markdown, not a dated check against github.com, so treat it as plausible and unverified. Section 3.5 gives the canary that turns it into verified fact, and the club should run that once before trusting any line of it.

### 3.1 The two hard constraints

1. **GitHub sanitizes HTML.** `class`, `style`, and `id` attributes are stripped, `<style>` and `<script>` are removed, and only a whitelisted tag set survives. `<aside>` is not on that list, so Google's own recommended callout markup (`<aside class="note"><b>Note:</b> ...`) is unusable here. Anything styled by an attribute the author typed renders in the standalone page and disappears on GitHub.
2. **CommonMark alone is not enough for the standalone page.** Tables, task lists, strikethrough, autolinked bare URLs, footnotes, and GitHub alerts are all GFM extensions. A converter running plain CommonMark silently drops or mangles every one of them. The parity traps are listed in 3.4.

### 3.2 Callouts

Use GitHub alert syntax. It is the only native callout on GitHub, and it is plain blockquote structure, so a converter can detect it with no author-supplied attribute.

The club's set is closed at three, and it is the set in [components.md §7.7](components.md): Note, Warning, and Receipt. GitHub offers five (`NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`); `TIP` and `CAUTION` are banned so the remaining three keep their distinctiveness. Until 2026-09-21 this section banned `IMPORTANT` and kept `CAUTION`, which contradicted §7.7; the Receipt won, because it is the semester's thesis, and Caution's meaning folded into Warning, which already covered anything that cannot be undone.

| Syntax | Means | Example use |
|---|---|---|
| `> [!NOTE]` | Useful, not critical. The reader can skip it and still succeed | "ACM has the room until 2:30, so expect two minutes of furniture" |
| `> [!WARNING]` | Get this wrong and the session degrades, or it cannot be undone: money, a sent message, a name in a public repo, anything with the logo on it | "This repo is public. A name here without written consent needs a history rewrite, not a delete commit" |
| `> [!IMPORTANT]` with a bold `**Receipt:**` lead-in | The artifact a member leaves the session holding | "**Receipt:** one real message, to one real person outside this club, sent from this room" |

On GitHub, `IMPORTANT` renders purple with GitHub's own label, so the bold lead-in is what carries the meaning there. In the HTML build it renders on `--rcc-primary-container`.

Admission test, applied before anything becomes a callout. All three conditions must hold:

1. The information is relevant but not necessary to the current task.
2. The interruption does not obstruct the reader's progress.
3. The content does not flow from the sentence before it.

Explicit non-uses: cross-references, prerequisites, a step of a procedure, anything critical to success, and anything the preceding paragraph already leads into. Most callout systems specify what a callout looks like. This one specifies what is allowed to become one, which is the half that actually holds.

Scarcity rule, and it is what lets the styling stay quiet: **at most two callouts per document, never two adjacent, never immediately after a heading.** Google states the reason plainly: "When you use multiple notices on a page, they begin to lose their visual distinctiveness."

Banned callout forms: `!!! note` (MkDocs), `:::note` (Docusaurus), a bolded `> **Note:**` blockquote, and an emoji-prefixed line. The first two render as literal text on GitHub. The third is superseded by alerts. The fourth depends on emoji shortcodes that only GitHub expands.

### 3.3 Tables, code, links, lists

**Lists versus tables.** Take this rule verbatim from the style guide: one datum per item is a bulleted list, two is a description list, three or more is a table. A single-column table is a list. A table with one row is two sentences.

**Tables.**

- GFM pipe tables only. No `colspan`, no `rowspan`, no nested tables, no merged cells, no `<caption>`, and no block content inside a cell (a list or a fenced block inside a cell does not render).
- A line break inside a cell is `<br>`. A literal pipe is `\|`.
- The header row is required by the parser. A key/value facts table uses an empty header (`| | |`), which is exactly what the club already writes, and the converter detects that shape and styles it as a facts block.
- Column heads are sentence case, concise, no end punctuation of any kind.
- Every table gets a complete introducing sentence above it. Google's convention adds the word "following" to that sentence; the club drops that tic because it reads stiff against this register. The complete sentence is the part that matters.
- Six columns is the practical ceiling. GitHub wraps cell text rather than scrolling, so a wide table gets very tall on a phone instead of scrolling. The Fall 2026 rotation table runs eight columns and is the known exception; the standalone page wraps every table in a horizontal scroll container, and GitHub gets the tall version.
- Styling, owned by `components`: horizontal rules only, tinted header row, body text one step below running prose. No vertical rules, no zebra stripes.

**Code blocks.**

- Always fenced, never indented, and always with a language token. Use `text` when there is no language.
- GitHub ignores extra info-string content (`title=`, line-range highlights). Do not write it. Put the filename in the introducing sentence.
- ` ```diff ` is the only line-level highlighting that works in both renderers.
- ` ```mermaid ` renders natively on GitHub. The converter must render it too, or the standalone page shows raw source. Section 6 covers this.
- Inline code is for literal strings a reader types or matches: paths, filenames, seat names, commands, flags.

**Links.**

- Relative links between `.md` files, exactly as the repo already does. `lychee --offline` in CI checks them, and `scripts/check.sh` checks them again locally.
- The converter rewrites `.md` to `.html` and preserves relative depth. Absolute paths to `github.com/...` break the standalone page and are banned inside the docs tree.
- No custom anchor IDs. `{#my-id}` is kramdown and pandoc syntax; GitHub prints it as literal text.
- Anchors are generated from heading text: lowercase, punctuation dropped, spaces to hyphens, duplicates suffixed `-1`, `-2`. The converter must use the identical algorithm (see section 6) or every cross-document anchor link breaks on the published site while passing CI.
- Bare URLs autolink on GitHub, which is why `MD034` is off in `.markdownlint.yml`. The converter must have linkification enabled or those URLs render as dead text.

**Other constructs.**

| Construct | GitHub | Standalone | Verdict |
|---|---|---|---|
| Task lists `- [ ]` | Renders as checkboxes | Needs an enabled plugin | Use. Already used in the event-plan template |
| Footnotes `[^1]` | Supported | Needs an enabled plugin | Allowed, rarely needed |
| `<details>` / `<summary>` | Supported | Native HTML | Allowed. Leave a blank line after `</summary>` or the markdown inside is not parsed |
| `<br>` | Supported | Native | Allowed inside table cells only |
| HTML comments | Hidden in both | Hidden | Use for the fill markers the templates carry (a comment starting `fill:`), which `check.sh` counts |
| YAML front matter | Rendered as a visible table, not hidden | Depends on the converter | Do not use. Metadata goes in the facts table |
| Emoji shortcodes `:warning:` | Expands | Does not expand | Banned |
| `#gh-dark-mode-only` image suffix | Deprecated GitHub-only hack | No effect | Banned. Use one image that reads in both themes |
| `<style>`, `<script>`, `class`, `id` | Stripped | Works | Banned. This is the whole principle |
| Math `$$...$$` | Renders | Needs a math plugin | Not needed by this club. Leave out until it is |

### 3.4 The parity traps, in one place

These are the constructs that pass CI, look right on GitHub, and quietly break the published page if the converter is not configured for them: **tables, task lists, strikethrough, autolinked bare URLs, footnotes, GitHub alerts, mermaid fences, heading anchor slugs, and `.md` link rewriting.** Nine items. Every one of them is a converter configuration, not an authoring decision.

### 3.5 The canary

Add `docs/04-brand/render-canary.md`: one file that uses every legal construct once, including all three callouts, a facts table, a six-column table, a `diff` block, a mermaid fence, a footnote, a task list, a bare URL, a relative link, and an anchor link into itself. Render it both ways and compare, once per semester and on any converter change. A construct that is not in the canary is not supported, and that is the rule that keeps this section from rotting.

---

## 4. The template

The blank design doc is [templates/design-doc.md](../../../templates/design-doc.md). It moved there from this file on 2026-09-23: its fill markers sat outside `templates/`, so `scripts/check.sh --strict`, which the semester close requires, failed on this page. Copy it into `docs/<section>/` for evergreen material or `semesters/<YYYY-term>/` for anything tied to a date, a person, or a dollar figure, and run `scripts/check.sh` on the filled copy before opening the PR.

---

## 5. Length and density

Every line loads every time someone reads the file. A line that is not load-bearing costs something on every read.

### Budgets

Set by this system, not measured from the survey. Treat them as review triggers, not hard failures.

| Document type | Target | Hard ceiling |
|---|---|---|
| Index or README | 250 words | 400 |
| Session card | 600 words | 900 |
| Playbook | 900 words | 1,400 |
| Semester plan | 1,200 words | 1,800 |
| Template | Whatever the form needs, and no explanation the form does not need | |

Past the ceiling, split (section 2). Do not compress by deleting the failure modes; those are the highest-value lines in the file.

### The tests

Apply these in review, in this order. The first three come from Google's technical-writing guidance and its paragraph test.

1. **The paragraph test.** For each paragraph: what are you telling the reader, why does it matter to them, and how do they use it? A paragraph that cannot answer all three is cut.
2. **The single-source test.** Does this fact exist in another file? Then link, and delete this copy. `meeting-algorithm.md` holds the machine. Cards do not restate it.
3. **The pre-announcement test.** Delete every sentence that describes what the document is about to do. "In this section we will cover" is always deletable.
4. **The three-facts test.** Three or more related facts per item is a table. Prose carrying five parallel facts is a table that has not been written yet.
5. **The load-bearing test.** Delete the line. Would a facilitator at 11 PM the night before do anything differently? If not, it stays deleted.

### Density conventions

- Paragraphs cap at four sentences. Most should be one or two.
- Second person, active voice, present tense. "You" rather than "we".
- Fixed prescriptive vocabulary: **must** or a bare imperative for required, "we recommend" for recommended, **can** for optional, **might** for a possible outcome. Generally avoid "should"; it reads as either of the first two and commits to neither.
- No em dashes inside sentences. Periods, colons, semicolons, parens, or "and". `check.sh` fails the build on U+2014.
- Register, calibrated by example rather than adjective. Too informal: "This meeting is going to be SO good." Right: "Everyone speaks in the first twelve minutes." Too formal: "Participation by all attendees is expected during the initial segment."
- The escape hatch is part of the system, quoted from Orwell by way of the style guide: "Break any of these rules sooner than say anything outright barbarous." Consistency is the default, not the goal.

---

## 6. From markdown to a styled page

The `.md` file in the repo stays the source of truth. HTML is build output, never checked in beside the markdown. Build to a gitignored `site/` and publish from the `gh-pages` branch, as `scripts/publish-site.sh` already does, so `scripts/check.sh` (which walks every file and enforces the 1 MB limit) never sees generated output.

**Status, 2026-09-23.** No converter exists. The one page the club publishes, the landing page, is hand-written HTML in `semesters/2026-fall/landing-page/`, and `publish-site.sh` copies it into `site/` with `tokens.css` and the logo files. This section is the specification a converter will be built to.

### 6.1 Toolchain

CI already runs Node for `markdownlint-cli2`, so the converter runs there too and adds no new runtime.

- **Parser: `markdown-it`,** GFM-configured, with `linkify` on, plus `markdown-it-footnote` and a task-list plugin. Two custom rules carry the club's conventions: alert blockquotes to callout markup, and empty-header two-column tables to facts blocks.
- **Anchors: `github-slugger`.** This is load-bearing. It implements GitHub's own slug algorithm, and using anything else means anchor links pass `lychee --offline` and land on nothing in the published page.
- **Mermaid:** pre-render fences to inline SVG at build time so the page carries no runtime dependency, or ship the mermaid runtime. Pre-rendering is preferred; it keeps the page self-contained and works with a strict content policy.
- **Parity oracle (optional, and worth doing once):** GitHub's REST `POST /markdown` endpoint in `gfm` mode returns GitHub's own HTML for a given source. Run the canary from 3.5 through it and diff the structure against the local converter's output. It is rate-limited, so use it as a periodic check rather than a build step. Confirm current endpoint parameters before wiring it up.
- Pandoc with `-f gfm` is a workable alternative and handles tables, footnotes, task lists, and autolinks natively, but it has no GitHub alert support, so the alert transform is needed either way.

### 6.2 Transforms

| Stage | Transform | Why |
|---|---|---|
| 1 | Collect `docs/**/*.md`, `semesters/**/*.md`, `templates/**/*.md` | Templates publish too; a reader should be able to see the blank form |
| 2 | Parse with the GFM configuration above | Covers all nine parity traps from 3.4 |
| 3 | h1 becomes the page title and the `<h1>`; strip it from the body flow | One h1 per page, enforced by the build rather than by review |
| 4 | Alert blockquote to the callout element the `components` section specifies, label included | Author writes `> [!NOTE]`, gets the club callout |
| 5 | Two-column table with an empty header row to the facts block | Detects the house pattern with no author markup |
| 6 | Every other table wrapped in a horizontal scroll container | Wide tables scroll instead of forcing the page to |
| 7 | Rewrite `.md` link targets to `.html`, preserving relative depth | Relative links keep working in both places |
| 8 | Slug every heading with `github-slugger`; build the on-page section list from h2 and h3 | Anchor parity, and the reader sees the outline before reading |
| 9 | Pre-render mermaid; add `loading="lazy"` and require `alt` on every image | Alt text is required, including on images inside tables |
| 10 | Emit the maintenance footer's review date into the page footer | A stale date is visible, which is what makes it a bug |

Build fails on: a second h1, an h4, a callout without one of the three legal labels, more than two callouts in a file, an image without `alt`, or a `.md` link that resolves to nothing. Those are the rules from sections 2 and 3 with teeth.

### 6.3 The page shell

One HTML shell, one stylesheet, tokens only, by the role names in `tokens.css`.

- **Type.** As `tokens.css` sets the elements: h1 takes `display-sm`, h2 `headline-lg`, h3 `headline-sm`, prose `body-lg`. Table and callout text sit one step below prose at `body-md`, and code takes the `code` roles. Hierarchy is carried by size and space: every heading is weight 500 and body is 400 ([foundations.md §3.3](foundations.md)), and no heading is bolder than another. Google's own documentation surface goes one step further and sets its headings at 400; the club keeps 500 so a heading still reads as one while the fallback face is showing. Until 2026-09-23 this bullet said weight stays flat at 400, which contradicted §3.3 and the stylesheet.
- **Rhythm.** Space above a heading is exactly twice the space below it, at every level, in units from the `space` scale. That one ratio does all the sectioning work, with no rules, boxes, or background changes needed to mark a boundary. It is also why documents do not need `---` separators, and why adding them fights GitHub, which already draws its own hairline under h1 and h2.
- **Callouts.** As [components.md §7.7](components.md) and `tokens.css` specify: a tinted container with its paired foreground, the bold inline label, an `--rcc-outline` hairline (the fills measure under 1.2:1 against the ground, so the boundary needs it), `--rcc-radius-lg`, and an asymmetric inline-start inset so the block reads as an interruption. Colors come from the tonal roles derived from the four GDG brand colors. Google's own notice palette (`#e8f0fe` on `#303f9f` and the rest of that set) is not used; the mechanism transfers, that specific palette is recognizably Google's. Until 2026-09-23 this bullet said no border and no radius, which contradicted both.
- **Callout icons: none, or a club-drawn glyph.** Material Symbols are openly licensed, and their silhouettes are one of the strongest signals of Google authorship on a page. The label and the tint carry the meaning on their own.
- **Tables.** Horizontal rules only, tinted header row, denser than surrounding prose.
- **Code blocks.** The most interior padding of any element on the page. If a copy button is added later, compute the top padding as `max(normal padding, button size)` so the control can never collide with the first line.
- **Theme.** Tokens defined on `:root`, redefined under `prefers-color-scheme: dark` and again under an explicit `data-theme` attribute so a three-state control (light / dark / system) wins in both directions. Values only; no component knows which theme it is in.
- **Motion.** Whatever the `motion` section specifies, inside `prefers-reduced-motion: no-preference`. Documentation pages need almost none.

### 6.4 Compliance on published pages

Every public page carrying the GDG on Campus logo ends with, verbatim:

> GDG on Campus Riverside City College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.

And the line this whole section sits on: the page takes Google's documentation **method** (sentence case, the heading grammar, the 2:1 heading rhythm, the closed callout set with an admission test, the list-versus-table rule, tone-carried hierarchy) and none of its **chrome**. No DevSite header, breadcrumb rail, book nav, or feedback widget. No Google wordmark or "Google for Developers" lockup. No Google product blue as an identity accent. No framing that implies this guide is Google's guide or that these documents were reviewed by Google.

---

## Provenance

- **Sourced from the survey:** sentence case for all headings and titles; the heading grammar rule and the `-ing` ban; one h1, no skipped levels, no numbers or links or code in headings; the closed callout set, its three-condition admission test, its non-uses, and the scarcity rule; the list-versus-table decision rule; table column-head rules and the introducing-sentence rule; the 2:1 heading space ratio (measured at 48/24 for h2 and 32/16 for h3 on developers.google.com); flat heading weights; callouts as tint plus same-hue text with zero border and zero radius; tables at one step below prose with horizontal rules only; code blocks holding the most padding; second person, active voice, conditions before instructions, the prescriptive vocabulary set, "don't pre-announce", the paragraph test, and the Orwell escape hatch; last-updated dates on published documents; the brand-versus-plain typeface split behind the h4 argument.
- **Derived, not sourced:** every word budget in section 5; the split triggers in section 2; the six-column table ceiling; the mapping of the club's three callouts onto GitHub's five labels; the anatomy block order.
- **Unverified, and not from the survey at all:** all GitHub renderer behavior in section 3, including the sanitizer's tag and attribute whitelist, alert label set and coloring, front-matter rendering, and info-string handling. It is general GFM knowledge, not a dated check. The canary in 3.5 is how the club converts it into fact, and it should be run before this section is relied on.
- **Also unverified:** the licensing status of Google Sans. The survey found a live contradiction inside Google's own font repo (an OFL release commit and an `OFL-1.1` detection against a `metadata/METADATA.pb` that still reads `license: "GOOGLE_RESTRICTED"` and `visibility: "INTERNAL"` as of 2026-02-11). The club's use rests on the GDG On Campus Brand Guide grant recorded in `docs/04-brand/brand.md`, not on that repo's OFL status. If that grant is ever questioned, the fallback is the substitute stack in [foundations.md §3.8](foundations.md), Inter and JetBrains Mono, both OFL and self-hostable; Roboto is deliberately not it, because Roboto plus a Google blue plus a card grid reads as stock Android. The role names survive the swap without a single component change.

Source files read: `docs/03-playbooks/meeting-algorithm.md`, `semesters/2026-fall/sessions/README.md`, `templates/event-plan.md`, `CONTRIBUTING.md`, `docs/README.md`, `.markdownlint.yml`, `lychee.toml`, `scripts/check.sh`, `.github/workflows/docs-check.yml`.

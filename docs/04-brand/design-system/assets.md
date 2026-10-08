# 10. Asset specs

Every size the club exports, with safe zones, type minimums, required elements, and the checks before anything goes out. One officer should be able to make an Instagram post, a story, a share card, a slide deck, and a flyer for an event from this file and the announcement template alone, and make the same set for the sibling ACM chapter by swapping one table.

The facts on an asset come from the Facts table in [templates/announcement.md](../../../templates/announcement.md). The image never carries a fact the announcement does not, and the announcement is corrected first when they disagree.

## 10.1 Club parameters

This is the only table that differs between the GDG and ACM copies of this file. Everything below it is shared.

| Parameter | GDG on Campus @ RCC |
|---|---|
| Club name on artifacts | Per [brand.md](../brand.md): "GDG on Campus Riverside City College" on official material, "GDG on Campus @ RCC" in casual headings |
| Meeting line | Thursdays, 2:30 to 3:30 PM, BLCIS A-210 Simulation Lab |
| Required text when the logo appears | The independence sentence, verbatim ([bright-lines.md §1.4](bright-lines.md)). On a social post it goes in the caption, not in the image. On print it goes at the bottom of the piece at body size. |
| Required text when ASRCC paid | "This event is funded by ASRCC (Associated Students of Riverside City College)." On the piece and in the caption |
| Hashtag | #GDGOnCampus |
| Logo files | `assets/gdg-on-campus-horizontal-light.svg`, the stacked light and dark variants. The club-made PNG is blocked pending review ([bright-lines.md §1.5](bright-lines.md)) |
| Device | The Step, rise by arc ([visual-voice.md §9.6](visual-voice.md)) |
| Lead hue | Green, `--rcc-primary` and the two sanctioned fills ([foundations.md §2](foundations.md)) |
| Tokens | [tokens.css](tokens.css) |
| Instagram | `[TBD: add the handle to links.md]` |
| Event platform | Bevy, published before anything else ([bevy-event-publishing.md](../../03-playbooks/bevy-event-publishing.md)) |
| Posting cadence | [communications.md](../../02-operations/communications.md): announcement at T-3 weeks, stories at T-1 week and T-1 day, recap at T+1 day |

## 10.2 The master file rule

One master per event, and every other size is exported from it. The master is the Instagram feed image at 1080 x 1440 (3:4), because it is the most constrained surface the club publishes to: the smallest type, the tightest safe zone, and a grid thumbnail that shows a third of a phone screen. Anything that reads there reads everywhere.

The master is built from the type system, not drawn. Three sanctioned image types exist ([visual-voice.md §9.3](visual-voice.md)): type as the image, a diagram, and a photograph of the room with the text beside it. Event assets are type as the image. (The Step field this line used to name was retired on 2026-09-21; §9.3 says why.) No photo sits behind text, ever, because the contrast of text over a photo cannot be measured ([accessibility.md §1.2](accessibility.md)).

**Template contract.** One SVG template per export size in `assets/templates/`, each holding text nodes with placeholder strings, the Step, and nothing else. An officer changes the strings and exports. `[TBD: the templates do not exist yet; the sizes below are their spec.]` Until they exist, build the master in whatever tool is at hand at exactly the pixel sizes here.

## 10.3 Instagram

Checked 2026-09-01. Instagram's own help pages could not be fetched from tooling that day, so the numbers come from the 2026 trade guides listed in §10.10 and agree with each other. The one Instagram page that did surface in search says feed photos accept "an aspect ratio between 1.91:1 and 4:5" at 1080 wide, which is the older rule that the API still enforces. Recheck each semester start; the platform changes its grid without notice.

**What changed and why the master is 3:4.** The profile grid switched from 1:1 squares to 3:4 rectangles in January 2025. Native 3:4 uploads followed on 2025-05-28, for single posts and carousels, by hand in the app only. The publishing API that schedulers use still accepts 4:5 to 1.91:1 and rejects 3:4. So:

| Surface | Export | Ratio | What the grid does to it | Safe zone for text and marks |
|---|---|---|---|---|
| Feed post, the master | 1080 x 1440 | 3:4 | Shown uncropped | Central 1080 x 1350 (45 px off the top and bottom) so a forced 4:5 crop loses nothing, plus 72 px in from each side |
| Feed post through a scheduler | 1080 x 1350 | 4:5 | Cropped 34 px off each side | 72 px in from each side, 72 px top and bottom |
| Square | 1080 x 1080 | 1:1 | Cropped to 810 x 1080, 135 px off each side | Retired as an event master. Photos only |
| Landscape | 1080 x 566 | 1.91:1 | Cropped hard | Photos that are genuinely wide. Never an event card |
| Carousel | Same as the feed post | Every slide the same ratio | As above | Slide 1 is the facts card. Three to six slides |
| Story | 1080 x 1920 | 9:16 | Not in the grid; 24 hours | Top 250 px and bottom 250 px clear (the profile strip and the reply bar), 65 px in from each side |
| Reel | 1080 x 1920 | 9:16 | Cover cropped to the central 3:4 | Top 269 px (14%), bottom 672 px (35%), sides 65 px (6%): the caption, audio line, and buttons stack into the bottom third |
| Reel cover | 1080 x 1920 | 9:16 | Grid shows the central 1080 x 1440 | Title and date inside that central 3:4 |
| Profile picture | 320 x 320 | 1:1, shown as a circle | Circle crop everywhere | The mark inside a centered circle 256 px across |

**The story is the master plus two bands.** Center the 1080 x 1440 master on a 1080 x 1920 field of `--rcc-surface`, 240 px above and 240 px below. The master's own margins keep every glyph at least 312 px from the top and bottom edges, inside the 250 px story safe zone with room to spare. One export, two surfaces, no relayout.

**The profile picture and the logo.** The platform's circular crop is not an alteration the club made, but the mark must fit inside the circle whole: the stacked lockup scaled to sit inside the 256 px circle, never the horizontal one cut off. When the avatar is a GDG logo file, the bio carries the independence sentence, permanently ([bright-lines.md §1.4](bright-lines.md)).

### Type minimums on the master

Derived, not measured on a device yet. A 1080 px image displays across roughly 390 CSS px on a current phone, a 2.77 times reduction. The system's `body-md` role is 15 CSS px, and 15 x 2.77 is 41.5, so 44 px (the next step on the 4 px grid) is the floor for any text on a feed image. The grid thumbnail is a third of the screen, about 129 CSS px for the full 1080, an 8.4 times reduction, so a 44 px line is 5 CSS px there and gone. Only the two largest things survive the thumbnail.

| Element | Size on the 1080 master | Role it maps to | Survives the thumbnail |
|---|---|---|---|
| Title | 144 px | `display-lg` at the top of its clamp | Yes, at about 17 CSS px |
| Date and time | 96 px | `display-sm` | Yes, at about 11 CSS px |
| Room | 64 px | `headline-sm` | Barely |
| Everything else | 44 to 56 px | `body-md` to `title-lg` | No, and it does not need to |

Sizes are a judgment call to be checked on a real phone and marked here when they have been. Tracking follows the scale: negative on the title, zero at the room, positive below.

### Layout of the master

Margins 72 px on every side (one fifteenth of the width), giving a 936 x 1296 content box. Top to bottom:

1. Ledger line ([visual-voice.md §9.7](visual-voice.md)): the arc name, or "Fall 2026", or the club's casual name. 44 px, code face, uppercase, `--rcc-on-surface-variant`.
2. Title. `display-lg`, `--rcc-on-surface`, capped at three lines. If it needs four, the title is wrong.
3. The Step rule, full content width, rise at the page's arc position.
4. Date and time, then the room, then one line of who it is for or what to bring.
5. Bottom band: the meeting line at 44 px, and the ASRCC line when it applies.

Ground is `--rcc-surface`. One of the two sanctioned fills may run as a band behind the title with ink text on it. The logo goes on the master only when there is a reason for it to (a Bevy event, a DevFest), because a logo on the image obligates the caption to carry the sentence and forbids photography behind it. A QR code never goes on an Instagram image: the reader is holding the phone the code would be scanned with. The link goes in the bio.

### The caption

1. First sentence: what, when, where. The feed shows roughly the first 125 characters before "more" (a widely stated figure, not verified this session), and the fold lands mid-sentence if the facts come second.
2. Who should come, what to bring, RSVP, each on its own line, from the Facts table.
3. The club line: "GDG on Campus @ RCC meets Thursdays, 2:30 to 3:30 PM in BLCIS A-210 Simulation Lab."
4. The required lines: the independence sentence when the image carries the logo, the ASRCC line when ASRCC paid.
5. The hashtag, last.

Custom alt text goes in the post's advanced settings and says what the image says, date and room included ([accessibility.md §1.7](accessibility.md)). No personal phone numbers or personal emails anywhere in a caption; the check script's rule applies to the announcement copy saved in the event folder.

### Post types per event

From the cadence in [communications.md](../../02-operations/communications.md). Each is a slice of the same master.

| When | Surface | What it carries |
|---|---|---|
| T-3 weeks, after the room approval email | Feed post, the master | Everything in the Facts table |
| T-1 week | Story (master plus bands) | Same image, "next week" sticker, link sticker to RSVP |
| T-1 day | Story | Same image, "tomorrow" sticker |
| Day of | Story | Same image plus the room, and a wide shot of the room once it is set up (no faces) |
| T+1 day | Feed post, a recap | One consented photo or a type card with what happened; the receipt if the session promised one |

## 10.4 Link previews and platform cards

| Surface | Export | Ratio | Spec source | Verified |
|---|---|---|---|---|
| Share card, `og:image` | 1200 x 630 | 1.91:1 | [components.md §8.6](components.md) | Yes, this system |
| GitHub repository social preview | 1280 x 640 | 2:1 | GitHub's repository settings page recommends 1280 x 640 and accepts 640 x 320 as the minimum | From GitHub's docs, not re-read this session |
| Discord server icon | 512 x 512 | 1:1, shown as a circle | Discord's upload dialog | Not verified this session |
| Discord server banner | 960 x 540 | 16:9 | Discord's upload dialog | Not verified this session |
| Discord scheduled event cover | 800 x 320 | 2.5:1 | Discord's event dialog | Not verified this session; read the size off the dialog before exporting |
| Bevy event cover | `[TBD: read the size off the Bevy upload dialog and record it here]` | | | |

The share card carries no logo, so it carries no disclaimer obligation, which is the reason it carries no logo ([bright-lines.md §1.4](bright-lines.md)). The repo social preview follows the same rule.

## 10.5 Slides and the projector

Export at 1920 x 1080. Margins 96 px. A-210 projects onto a wall in daylight, which flattens dark grounds and low-chroma tints ([foundations.md §2.4](foundations.md)), so decks run on the light theme.

| Element | Minimum on a 1920 x 1080 slide |
|---|---|
| Title | 72 px |
| Body | 40 px |
| Ledger line, footers, sources | 32 px |

Judgment call, to be tested on the projector and recorded here. `[TBD: A-210 projector native resolution.]` This section owns the export size, margins, and minimums only. How a deck is structured, how it moves, and the kit that builds one are in [presentation.md](presentation.md) (§13) and [deck-kit/](../../../deck-kit/README.md). One idea per slide. The Step once, on the title slide, and the Step rule as the only section divider. At most one callout per slide. The independence sentence on the title slide and the last slide when the logo appears ([bright-lines.md §1.4](bright-lines.md)).

## 10.6 Print

All pieces at 300 dpi. Bleed 0.125 in (38 px) on any piece a shop trims; safe margin 0.375 in (113 px) from the trim line for anything that matters. The print shop converts to CMYK; the club exports PDF with fonts embedded.

| Piece | Trim | Pixels at 300 dpi | Use |
|---|---|---|---|
| Flyer | US Letter, 8.5 x 11 in | 2550 x 3300 | Campus boards. Posting rules are `[TBD: Student Activities]` |
| Half-letter handout | 5.5 x 8.5 in | 1650 x 2550 | The Club Rush one-pager, two per sheet |
| Quarter card | 4.25 x 5.5 in | 1275 x 1650 | Table handouts, four per sheet |
| Poster | Tabloid, 11 x 17 in | 3300 x 5100 | An event with a room to fill |
| Table tent | Letter landscape, folded | 3300 x 2550 | The Club Rush table, session rooms |
| Name tag | 2.33 x 3.375 in (Avery 5395 size) | 700 x 1013 | DevFest and any guest event. Name tags are never photographed for public posting |
| Certificate | Letter landscape | 3300 x 2550 | Demo Day |
| Sticker | `[TBD: vendor sheet size]` | | The Step alone. The GDG logo goes on merch only through the brand guide's own templates ([bright-lines.md §1.3](bright-lines.md)) |

Type on paper: 10 pt body minimum, 14 pt for anything read at arm's length on a table, 72 pt or larger for a poster headline read from across a room. A QR code prints at 1 in (2.5 cm) or larger with a quiet zone of four modules and the URL printed beneath it in text ([accessibility.md §1.7](accessibility.md)).

**Fonts on paper.** Google Sans arrives by the Fonts API and the club cannot point at a license for a binary it would hand a print vendor ([foundations.md §3.1](foundations.md)). Print pieces use the substitute stack (Inter and JetBrains Mono, both OFL, embeddable) or the brand guide's own templates. Recheck before any vendor run.

## 10.7 Photographs coming in

Consent, the badge dot, EXIF stripping, and the shot list are in [accessibility.md §2.2](accessibility.md). For the repo: under 1 MB, which a JPEG at 2048 px on the long side usually clears; check the file size, not the pixel count. For Instagram: the same file, exported again at the sizes in §10.3 with the photo placed whole and text beside it, never over it.

## 10.8 Names and where files live

| What | Where | Name |
|---|---|---|
| Masters and sources (SVG, project files) | The shared drive `[TBD: link in links.md]` | `YYYY-MM-DD-slug-master.svg` |
| Exports under 1 MB that the repo needs (a flyer PDF, a share card) | The event folder in `semesters/` | `YYYY-MM-DD-slug-feed.png`, `-story.png`, `-og.png`, `-flyer.pdf` |
| Logos and evergreen brand files | `assets/` | As listed in [brand.md](../brand.md) |
| Photos of people | The shared drive, `restricted/` where consent is missing | Never the repo |

## 10.9 Before you post

Any failure in the first five stops the post.

1. Date, time, and room match the Facts table and the room approval email.
2. Club name written as in [brand.md](../brand.md). The independence sentence is in the caption if the logo is in the image. The ASRCC line is present if ASRCC paid.
3. No identifiable face without a badge dot on file. No personal phone number or personal email.
4. Every line of text is 44 px or larger on the 1080 master, inside the safe zone for its surface, and the title and the date are the two largest things.
5. Custom alt text is set and names the date and room.
6. Exported at exactly the pixel size in the table, sRGB, JPEG at quality 90 for a photo or PNG for a flat graphic, under 1 MB if it is going in the repo.
7. Contrast of every text pair measured against the tokens, not eyeballed ([accessibility.md §1.9](accessibility.md) step 2).
8. One other officer looked at it (the announcement template's rule).
9. The final caption and the export are saved in the event folder.

## 10.10 Sources, checked 2026-09-01

- Instagram Help Center, photo resolution and aspect ratio, `help.instagram.com/1631821640426723`, and Reel size and aspect ratios, `help.instagram.com/1038071743007909`. Both returned an empty page to tooling; the "1.91:1 to 4:5 at 1080 wide" rule is quoted from the search excerpt of the first.
- Sked Social, "Instagram Post Size Guide: Best Image & Video Sizes [2026]", last updated 2025-12-22: the 3:4 feed size, the 1080 x 1420 story safe zone, the profile picture size, the carousel same-ratio rule.
- iTech Guides, "Instagram 3:4 Aspect Ratio: How to Post Photos Without Cropping": the 2025-05-28 native 3:4 rollout and the API's 4:5 floor.
- Your Social Team, "The Ultimate Instagram Sizing Guide for 2026" and Boderia, "Instagram Grid Update 2025 Cheat Sheet": the January 2025 grid change.
- Superscale, "Meta ad sizes 2026", First Pier, "Instagram Ad Safe Zones (2026)", and Lucid Media, "Instagram & Facebook Ad Safe Zones 2026": the 14% / 35% / 6% Reels safe zone and Meta's March 2026 unified 9:16 zone.
- GitHub Docs, "Customizing your repository's social media preview": 1280 x 640 recommended, 640 x 320 minimum. Not re-read this session.
- Print sizes and bleed are standard US print practice, not a platform rule.

---

Last updated: 2026-09-23 (cross-references only; sizes unchanged since 2026-09-01). Reviewed at each semester start alongside [brand.md](../brand.md). A platform size that changes gets a dated row edit here, not a new file.

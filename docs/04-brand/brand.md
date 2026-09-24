# Brand

How the club names itself, which logo goes where, and what Google's rules allow. Last checked against Google's guides: 2026-08-24.

GDG on Campus Riverside City College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation. Put that sentence on anything public that carries the logo.

## Sources

| Guide | URL | Notes |
|---|---|---|
| GDG On Campus Brand Guide (Google Slides) | <https://goo.gle/on-campus-brand-guide> | The on-campus guide. Logos and templates (events, social, signage, swag) are Google Drive downloads linked from the deck. |
| GDG Brand Guide for Organizers (Google Slides) | <https://goo.gle/gdg-brand-guide> | Same fonts and colors; sections on messaging, digital, social, events, swag |
| Google Brand Resource Center: third-party guidance | <https://about.google/brand-resource-center/guidance/> | What non-Google groups may and may not do with Google marks |
| Google trademark list and rules | <https://about.google/brand-resource-center/trademark-list/> and <https://about.google/brand-resource-center/rules/> | |

The URL many chapter sites cite, `https://developers.google.com/community/gdg/brand-guidelines`, now lands on Google's generic community page. Do not link it.

## Naming

From the GDG On Campus Brand Guide:

| Use | Correct form |
|---|---|
| Full name | Google Developer Groups on Campus Riverside City College |
| Short name | GDG on Campus Riverside City College |
| Describing the group | "a Google Developer Group on Campus" or "a GDG on Campus" |
| Organizer title | "Google Developer Groups on Campus Organizer" or "GDG on Campus Organizer" |
| Hashtag | #GDGOnCampus |

The ASRCC registration uses "Google Developer Group on Campus Riverside City College (GDG)". This repo uses "GDG on Campus @ RCC" as a casual short form in headings and chat. Official material (Bevy event titles, posters, anything Google or RCC sees) uses one of the forms in the table. Avoid "GDG@RCC" and "Google RCC" in official material.

## Logo files

All files are in `assets/` at the repo root. Horizontal is preferred; use stacked when the space is too narrow (brand guide).

| File | Use |
|---|---|
| `assets/gdg-on-campus-horizontal-light.svg` | Default. README, slides, banners, light backgrounds |
| `assets/gdg-on-campus-stacked-light.svg` | Square or narrow spaces on light backgrounds (social avatars, badges) |
| `assets/gdg-on-campus-stacked-dark.svg` | Same, on dark backgrounds |
| `assets/gdg-rcc-logo.png` | Club-made mark. [TBD: review against the naming rule above and decide whether it stays in official use] |

Missing: a horizontal dark variant. Pull it from the brand guide's Drive folder when needed [TBD].

Source files, the animated GIFs, the sticker sheet, and the campus website banner are larger than the repo's 1 MB limit or are not brand-guide assets; they live in the club's shared drive [TBD: link].

## Typography

| Use | Font | Fallback |
|---|---|---|
| Everything | Google Sans (Regular, Bold) | Sans-serif system font |
| Code-style text | **Google Sans Code** | Any monospace |

The variable font covers 400 to 700 continuously, so the weight 500 the design system uses for every heading, label, and button is inside the grant.

Source for the faces: GDG On Campus Brand Guide. Source for the licensing: a check of the Google Fonts catalog metadata endpoint, the CSS2 API, `google/fonts`, `googlefonts/googlesans`, and the `name` tables of the served WOFF2 files, run 2026-08-31.

**Correction, 2026-08-31: this table used to say Google Sans Mono. It is not licensed for web embedding.** Mono has no Google Fonts catalog entry, no public repo, no license file, and its binary reads `Copyright 2024 Google LLC. All Rights Reserved.` with no license record in name ID 14. The CSS2 API will serve it if asked; serving is not licensing, and the brand guide is a slide deck describing what Google hands chapters rather than a font license.

**Google Sans Code replaces it.** It is in `google/fonts` at `ofl/googlesanscode/` with `license: "OFL"` in `METADATA.pb`, has a live upstream repo, and carries the OFL URL in its binary. Same licensor, same lineage, and it is the code face Google itself now ships. Google Sans itself is fine: catalogued, OFL in the binary, embeddable.

Delivery: link the Google Fonts API, do not self-host Google Sans. The club cannot point at a license for a binary it would be redistributing. Recheck before any print vendor or merch run, where the sanctioned route is the brand guide's own templates anyway.

Trademark is a separate question from license. `TRADEMARKS.txt` restricts the words "Google" and "Google Sans" as marks and forbids putting them in a company name, product name, domain, or social profile. It does not restrict setting the club's own text in the typeface. Drawing a club logotype out of Google Sans letterforms is where the "imitate Google's visual identity" rule below bites. The club already has logo files; type never becomes the mark.

Full evidence, including three unresolved contradictions in Google's own paper trail: [design-system/foundations.md](design-system/foundations.md).

## Colors

Core colors from the GDG On Campus Brand Guide (the guide also lists halftone and pastel variants):

| Name | Hex |
|---|---|
| Blue 500 | `#4285f4` |
| Green 500 | `#34a853` |
| Yellow 600 | `#f9ab00` |
| Red 500 | `#ea4335` |

Club-specific accent colors, if any: [TBD].

## Rules

Do:

- Use the unaltered GDG on Campus logo from `assets/` with the club name as given above.
- Put the independence sentence on public pages, event descriptions, and printed material.
- Credit ASRCC at any event ASRCC funds (required by ASRCC).

Do not (Google Brand Resource Center, third-party guidance):

- Use the Google logo by itself, or combine any Google mark into the club's own name, domain, or slogan.
- Imply Google endorsement or sponsorship. Guest speakers who work at Google are speaking as individuals unless Google says otherwise.
- Put Google marks on merchandise (shirts, mugs, posters) without permission. The on-campus guide's swag templates are the sanctioned route; anything outside them needs a check with Google first.
- Stretch, recolor, or add effects to the logo.
- Imitate Google's visual identity for club-made graphics.

Plain-text references to Google products, links, and unaltered logos in teaching material are allowed.

## Design system

How club web pages and design docs are built from these colors and faces: [design-system/](design-system/README.md). It holds the token stylesheet, component specs, page archetypes, the accessibility rules, the export sizes for Instagram, share cards, slides, and print ([design-system/assets.md](design-system/assets.md), since 2026-09-01), and, since 2026-09-21, the motion language, the visual voice, and the presentation language whose kit lives in [deck-kit/](../../deck-kit/README.md). The blank design doc is [templates/design-doc.md](../../templates/design-doc.md). This document outranks it; where they disagree, fix the design system.

## Templates

Event, social, signage, and swag templates are in the GDG On Campus Brand Guide deck (slides 7 to 57 as of 2026-08-24). Copy the template, do not redraw it. Announcement text goes through [templates/announcement.md](../../templates/announcement.md).

## Changing this document

Google updates the goo.gle short links in place. When the deck changes, update the tables here, note the date at the top, and log it in the [decision log](../01-governance/decision-log.md) if a rule changed.

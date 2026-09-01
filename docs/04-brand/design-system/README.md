# Design system

How the club's web pages and design docs look, and why. Built 2026-08-31 from a survey of 14 live Google design surfaces, audited for fabrication, then critiqued by three independent reviewers.

Brand authority runs: Google's Brand Resource Center, then [brand.md](../brand.md), then this system. Where they disagree, the higher one wins and this file gets corrected.

| File | What it holds |
|---|---|
| [bright-lines.md](bright-lines.md) | What we take from Google and what we never take. Read this first. |
| [foundations.md](foundations.md) | Color, typography, space, grid, shape, elevation, motion |
| [tokens.css](tokens.css) | The shipping stylesheet. 745 lines, light and dark, reset through print |
| [components.md](components.md) | Buttons, cards, tables, callouts, nav, and the five page archetypes |
| [documents.md](documents.md) | The design-doc system and the copyable template |
| [accessibility.md](accessibility.md) | Contrast, focus, keyboard, photo consent, and the Step |
| [assets.md](assets.md) | Every size the club exports: Instagram, share cards, slides, print, with safe zones and type minimums. Added 2026-09-01 |
| [checklist.md](checklist.md) | Before you publish |

## The short version

**Green leads.** `#34a853` is the primary hue. Blue is Google's action color and not using it is the cheapest separation available; red is the error convention; yellow measures 1.84:1 on the light surface and cannot be text at any size. Green also has the widest contrast headroom of the four, and it is the only one of the four whose meaning is about proceeding rather than stopping, warning, or linking. That is what the semester is.

**One job each.** Green is links, buttons, active state, focus. Blue is cross-references out, and nothing else. Red is errors and failure paths, semantic only. Yellow is the live-now marker and the warning callout, always a fill under dark text.

**Three checks that keep it off Google**, all verifiable by looking at a page:

1. No composition contains all four colors. Not in a row, an arc, logo order, or four equal shapes.
2. No single component uses more than two.
3. Green covers at least 70% of the non-neutral area on any surface.

**The arcs get a form, not a hue.** Voice, Ask, and Evidence are carried by the Step's rise position, set once per page as `data-arc` on the root element. A three-arc color scheme would break all three checks at once and put a 1.84:1 yellow on a chip label.

## The Step

The club's own device, derived from nothing Google owns: one stroke that runs, rises through two right angles, and runs on, with the outer corner of each turn round and the inner corner sharp. The asymmetry comes free from `stroke-linejoin="round"`, and it is the tell that separates an authored mark from a shape somebody found.

It does real work rather than sitting in a corner. The rise position encodes which arc a page belongs to:

| Page | `data-arc` | Rise sits at |
|---|---|---|
| Voice sessions | `voice` | 25% |
| Ask sessions | `ask` | 50% |
| Evidence sessions | `evidence` | 75% |
| Club pages, footer, everything else | omit | 12% |

Someone who has read three session pages recognizes the arc before reading the heading. It costs one attribute per page.

## Using it

```html
<html lang="en" data-arc="voice">
<head>
  <script>
    try { var t = localStorage.getItem('rcc-theme');
          if (t) document.documentElement.dataset.theme = t; } catch (e) {}
  </script>
  <link rel="stylesheet" href="tokens.css">
</head>
```

The theme script goes before the stylesheet so there is no flash. The page is correct without it; the media query carries the system preference on its own.

## Required on anything public that carries the logo

> GDG on Campus Riverside City College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.

Placement rules are in [bright-lines.md](bright-lines.md).

## Changing this system

Values here are either licensed, derived, or judgment calls, and each is labelled. Change a derived value by re-running the contrast audit in [accessibility.md](accessibility.md) and updating the table. Change a judgment call at a meeting and log it in the [decision log](../../01-governance/decision-log.md).

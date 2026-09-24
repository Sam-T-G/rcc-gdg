# Building a GDG deck: rules for agents

Read [README.md](README.md) for markup and [presentation.md](../docs/04-brand/design-system/presentation.md) for the language. These are the calls you make without asking.

## Photos: fetch them freely

Whenever a slide names something a person could photograph (a tool, an object, a place, a room setup, a piece of hardware), give it a photo. Do not wait to be asked. This extends visual-voice.md §9.3, which sanctions type as the image and photos of the room: openly licensed reference photos of things are the added type (Sam, 2026-09-24).

1. `node deck-kit/fetch-image.mjs search "<words>"` lists open-licensed candidates (CC0, public domain, CC BY, CC BY-SA only).
2. `node deck-kit/fetch-image.mjs get <id> <deck-folder>/<deck-name>-images <name> --alt "<what it shows>"` saves a 1600 px JPEG with no metadata, writes `CREDITS.md`, and prints a `<figure>` with a linked credit. The tool is shared with rcc-acm; change both copies together.
3. **Open the file and look at it** before it goes on a slide. Alt text says only what you can see.
4. Keep the linked credit line on the slide, in the ledger face at 32 px or larger. Never put text over a photo.

Never fetch: people or faces, stock people at laptops, AI images of people, Google product screenshots, Pixel or Store photography, Google marketing imagery, anything that could pass for a Google surface, the Google four colors as a composition, anything NC or ND.

Use the `photo` archetype (README.md; `data-layout` `bleed-right`, `bleed-left`, or `framed`). Do not hand-roll a photo layout inside a deck.

## Variety

Use the surfaces (`data-surface`, presentation.md §13.11) and the archetypes so no two neighboring slides read the same. Branding is the lockup with the independence sentence verbatim wherever it appears, the Step once per screen, and the club's own green.

## Always

- Invent no facts: no dates, numbers, names, or claims Sam did not give. Unknowns stay `[TBD]` or come off the slide.
- Copy is casual and short, as a student says it. No colons in headlines, no em dash inside a sentence, none of: seamless, comprehensive, robust, leverage, delve, showcase, elevate, unlock.
- Run `node deck-kit/check.mjs <deck> --shots <dir>` and look at the screenshots before publishing.

// What the browser checks open in this repo. Paths are from the repo root.
import { readdirSync, existsSync } from 'node:fs';

const find = (dir, re) => existsSync(dir)
  ? readdirSync(dir, { recursive: true }).map(String).filter((f) => re.test(f)).sort().map((f) => `${dir}/${f}`)
  : [];

// Meeting decks.
export const decks = find('semesters', /^[^/]+\/decks\/[^/]+\.html$/);
// Pages that go with a deck (cheat sheets, cards), kept in each deck's media folder. Worksheets are
// printed, never opened on a phone, so they are left out.
export const pages = find('semesters', /^[^/]+\/decks\/[^/]+-media\/[^/]+\.html$/).filter((p) => !/worksheet/.test(p));

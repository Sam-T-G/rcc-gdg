// Deck kit check. Headless Chrome over CDP, no dependencies (Node 22 global WebSocket).
//
//   node deck-kit/check.mjs <deck.html> [--shots <dir>]
//
// Serves the repo root on a free port, opens the deck, and fails on anything in
// presentation.md §13.9 item 1: structure (kinds, movements in order, Arrive first
// and Ask last, five room slides or fewer, four beats or fewer, statement length),
// the independence sentence wherever the lockup appears, type under the floors,
// content outside the stage or into the rail band, token drift from tokens.css,
// and console errors. Then it walks the deck with real key presses in five modes:
// motion, reduced motion, GSAP blocked, no script, and a 390px phone.
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, relative, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const args = process.argv.slice(2);
const deckArg = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--shots');
if (!deckArg) { console.error('usage: node deck-kit/check.mjs <deck.html> [--shots <dir>]'); process.exit(2); }
const DECK = resolve(deckArg);
const SHOTS = args.includes('--shots') ? resolve(args[args.indexOf('--shots') + 1]) : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SENTENCE = 'GDG on Campus Riverside City College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fails = [], passes = [];
const fail = (m) => { fails.push(m); console.log('  FAIL ' + m); };
const pass = (m) => { passes.push(m); console.log('  ok   ' + m); };
const check = (cond, m) => (cond ? pass(m) : fail(m));

// ---------- Token drift: every custom property deck.css shares with tokens.css must match.
function props(css, selector) {
  const out = {};
  const re = new RegExp(selector.replace(/[[\]().*+?^$|\\]/g, '\\$&') + '\\s*\\{([^}]*)\\}', 'g');
  let m;
  while ((m = re.exec(css))) for (const d of m[1].matchAll(/(--rcc-[\w-]+)\s*:\s*([^;]+);/g)) out[d[1]] = d[2].trim().replace(/\s+/g, ' ');
  return out;
}
console.log('tokens');
{
  const kit = readFileSync(join(HERE, 'deck.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const src = readFileSync(join(ROOT, 'docs/04-brand/design-system/tokens.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const sel of [':root', ':root[data-theme="dark"]']) {
    const a = props(kit, sel), b = props(src, sel);
    const shared = Object.keys(a).filter((k) => k in b);
    const drift = shared.filter((k) => a[k] !== b[k]);
    check(shared.length > 10 && !drift.length, `${sel}: ${shared.length} shared tokens, ${drift.length} drifted${drift.length ? ' (' + drift.map((k) => `${k} ${a[k]} vs ${b[k]}`).join(', ') + ')' : ''}`);
  }
}

// ---------- A static server over the repo root.
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json' };
const server = createServer((req, res) => {
  const p = resolve(ROOT, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !existsSync(p) || statSync(p).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const URL0 = `http://127.0.0.1:${server.address().port}/${relative(ROOT, DECK).split('\\').join('/')}`;

// ---------- Chrome.
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'deck-cdp-'))}`,
  '--no-first-run', '--hide-scrollbars', '--force-color-profile=srgb', 'about:blank'], { stdio: 'ignore' });
let target;
for (let i = 0; i < 60 && !target; i++) {
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page'); } catch { await sleep(200); }
}
if (!target) { console.error('Chrome did not start'); process.exit(2); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let seq = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); } else events.push(msg);
});
const send = (method, params = {}) => new Promise((ok, no) => {
  const n = ++seq; pending.set(n, (msg) => (msg.error ? no(new Error(method + ': ' + msg.error.message)) : ok(msg.result)));
  ws.send(JSON.stringify({ id: n, method, params }));
});
const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || JSON.stringify(r.exceptionDetails));
  return r.result.value;
};
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
// Headless Chrome marks a page hidden after a real key event unless it is the
// front tab, and a hidden page gets no animation frames. Without these two
// lines every tween freezes and the next press fast-forwards it, so a walk can
// pass with no animation having run at all (found 2026-09-21).
await send('Page.bringToFront');
await send('Emulation.setFocusEmulationEnabled', { enabled: true });

async function load({ w = 1920, h = 1080, reduce = false, js = true, block = [] } = {}) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduce ? 'reduce' : 'no-preference' }] });
  await send('Emulation.setScriptExecutionDisabled', { value: !js });
  await send('Network.setBlockedURLs', { urls: block });
  events.length = 0;
  await send('Page.navigate', { url: URL0 + '?fresh=' + Date.now() });
  for (let i = 0; i < 80; i++) { await sleep(100); try { if ((await evaluate('document.readyState')) === 'complete') break; } catch {} }
  await evaluate('document.fonts.ready.then(() => true)');
  await sleep(js ? 2600 : 400);          // the cover entrance runs about two seconds
}
function errors() {
  return events.filter((e) => (e.method === 'Runtime.exceptionThrown') || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error'))
    .map((e) => e.params.exceptionDetails?.exception?.description || e.params.args?.map((a) => a.value).join(' ') || 'error');
}
async function key(k, code, vk) {
  const base = { key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk };
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...base });
  if (k.length === 1) await send('Input.dispatchKeyEvent', { type: 'char', text: k, ...base });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
}
const KEYS = { right: ['ArrowRight', 'ArrowRight', 39], left: ['ArrowLeft', 'ArrowLeft', 37], home: ['Home', 'Home', 36], end: ['End', 'End', 35], five: ['5', 'Digit5', 53], t: ['t', 'KeyT', 84] };
const press = (name) => key(...KEYS[name]);
async function settle() { for (let i = 0; i < 60; i++) { if (!(await evaluate('window.__deck && window.__deck.state().busy'))) return; await sleep(50); } }
async function shot(name) {
  if (!SHOTS) return;
  const r = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(join(SHOTS, name + '.png'), Buffer.from(r.data, 'base64'));
}

// ---------- Scaffold: a deck made by new-deck.sh keeps its fill markers until a person decides.
console.log('scaffold');
{
  const src = readFileSync(DECK, 'utf8');
  const fills = src.match(/<!--\s*fill:[^>]*-->/g) || [];
  const tokens = src.match(/@@[A-Z_]+@@/g) || [];
  check(!fills.length, `no fill markers left (${fills.length})${fills.length ? ': first is ' + fills[0].slice(0, 70) : ''}`);
  check(!tokens.length, `no template tokens left (${tokens.length})${tokens.length ? ': ' + tokens.slice(0, 3).join(' ') : ''}`);
  const tbd = (src.match(/\[TBD[^\]]*\]/g) || []).length;
  if (tbd) console.log(`  note ${tbd} [TBD] marker(s), informational`);
}

// ---------- Structure, read from the live deck.
console.log('structure');
await load();
const info = await evaluate(`(() => {
  const S = ${JSON.stringify(SENTENCE)};
  const slides = [...document.querySelectorAll('.deck > .slide')];
  return slides.map((s, i) => ({
    i, kind: s.getAttribute('data-kind'), move: s.getAttribute('data-move'), room: s.hasAttribute('data-room'),
    beats: s.querySelectorAll('.beats > li').length,
    words: s.getAttribute('data-kind') === 'statement' ? (s.querySelector('h2')?.textContent.trim().split(/\\s+/).length || 0) : 0,
    versions: s.querySelectorAll('.compress-src > li').length,
    timer: +s.getAttribute('data-timer') || 0,
    lockup: !!s.querySelector('img[src*="gdg-on-campus"]'),
    sentence: [...s.querySelectorAll('.notice')].some((n) => n.textContent.replace(/\\s+/g, ' ').trim() === S),
  }));
})()`);
const KINDS = ['cover', 'statement', 'contrast', 'beats', 'card', 'compress', 'figure', 'clock', 'rail', 'ask'];
const MOVES = ['arrive', 'tension', 'work', 'turn', 'ask'];
check(info.every((s) => KINDS.includes(s.kind)), `every slide has a known data-kind (${info.length} slides)`);
check(info.every((s) => MOVES.includes(s.move)), 'every slide has a known data-move');
check(info.every((s, i) => i === 0 || MOVES.indexOf(s.move) >= MOVES.indexOf(info[i - 1].move)), 'movements never go backwards');
check(info[0].move === 'arrive' && info[info.length - 1].move === 'ask', 'opens in arrive and ends in ask');
const rooms = info.filter((s) => s.room).length;
check(rooms <= 5, `room mode has ${rooms} slides (five or fewer, Law 2)`);
check(info.every((s) => s.kind !== 'beats' || s.beats <= 4), 'every beats slide has four items or fewer');
check(info.every((s) => s.kind !== 'statement' || s.words <= 14), 'every statement is fourteen words or fewer');
check(info.every((s) => s.kind !== 'compress' || (s.versions >= 2 && s.versions <= 4)), 'every compress has two to four versions');
check(info.every((s) => s.kind !== 'clock' || s.timer > 0), 'every clock slide has a data-timer');
check(!(info[0].kind === 'cover' && info[1] && info[1].kind === 'rail'), 'the slide after the cover is not a rail slide (the Step lies down onto the chrome rail, which that slide hides)');
const first = info[0], last = info[info.length - 1];
check(!first.lockup || first.sentence, 'cover: the lockup carries the independence sentence, verbatim');
check(!last.lockup || last.sentence, 'last slide: the lockup carries the independence sentence, verbatim');
check(first.sentence && last.sentence, 'the independence sentence is on the first and last slide');

// ---------- Floors and overflow, on every slide with every beat showing.
console.log('floors and overflow (1920 x 1080, every beat revealed)');
const layout = await evaluate(`(() => {
  const deck = document.querySelector('.deck'), u = deck.clientWidth / 1920, dr = deck.getBoundingClientRect();
  const slides = [...deck.querySelectorAll(':scope > .slide')], out = [];
  const LEDGER = '.eyebrow, .label, .ledger, .counter, .compress__unit, .rung__label small, .rung__here';
  slides.forEach((s, i) => {
    slides.forEach((o) => o.classList.toggle('is-current', o === s));
    s.querySelectorAll('[data-beat]').forEach((b) => b.classList.remove('is-pending'));
    const low = [], outside = [], band = [];
    for (const el of s.querySelectorAll('*')) {
      // SVG is skipped except inside the semester diagram, whose labels are real content.
      const inSvg = !!el.closest('svg');
      if (el.closest('.notes, .visually-hidden, .compress-src, .rung-src') || (inSvg && !el.closest('.rung')) || getComputedStyle(el).visibility === 'hidden') continue;
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim());
      if (own) {
        // SVG text is already in stage units; HTML text is in CSS pixels. Labels inside
        // the semester diagram may use the 32px ledger floor (presentation.md §13.3).
        const fs = parseFloat(getComputedStyle(el).fontSize) / (inSvg ? 1 : u);
        const min = el.closest('h1, h2') ? 72 : el.closest(LEDGER) || el.closest('.rung') ? 32 : 40;
        const cut = el.closest('.compress__line');   // tokens being cut are shrinking on purpose
        if (!cut && fs < min - 0.5) low.push((el.getAttribute('class') || el.tagName) + ' ' + fs.toFixed(0) + ' < ' + min);
      }
      if (!own && !el.matches('img, .card, .qr__tile, .clock__rail, .compress__bar, .cover__step')) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const y1 = (r.bottom - dr.top) / u, x1 = (r.right - dr.left) / u, y0 = (r.top - dr.top) / u, x0 = (r.left - dr.left) / u;
      if (x0 < 95 || x1 > 1825 || y0 < 40 || y1 > 1040) outside.push((el.getAttribute('class') || el.tagName) + ' [' + x0.toFixed(0) + ',' + y0.toFixed(0) + ' ' + x1.toFixed(0) + ',' + y1.toFixed(0) + ']');
      // The rail steps aside on a rail slide, so that slide may use the band.
      if (s.dataset.kind !== 'cover' && s.dataset.kind !== 'rail' && y1 > 960) band.push((el.getAttribute('class') || el.tagName) + ' bottom ' + y1.toFixed(0));
    }
    out.push({ i, kind: s.dataset.kind, low, outside, band });
  });
  return out;
})()`);
layout.forEach((s) => {
  check(!s.low.length, `slide ${s.i + 1} (${s.kind}): type at or above the floors${s.low.length ? ': ' + s.low.slice(0, 3).join('; ') : ''}`);
  check(!s.outside.length, `slide ${s.i + 1} (${s.kind}): inside the stage margins${s.outside.length ? ': ' + s.outside.slice(0, 3).join('; ') : ''}`);
  check(!s.band.length, `slide ${s.i + 1} (${s.kind}): clear of the rail band${s.band.length ? ': ' + s.band.slice(0, 3).join('; ') : ''}`);
});

// ---------- Walk the deck with real key presses, in each mode.
async function walk(label, opts, expect) {
  console.log(label);
  await load(opts);
  if (!opts.js && opts.js !== undefined) {
    const n = await evaluate('[...document.querySelectorAll(".deck > .slide")].filter((s) => s.getBoundingClientRect().height > 0).length');
    check(n === info.length, `no script: all ${info.length} slides render as a readable stack (${n})`);
    await shot(label.replace(/\W+/g, '-') + '-stack');
    check(!errors().length, 'no console errors');
    return;
  }
  const st0 = await evaluate('__deck.state()');
  check(st0.presenting === expect.presenting, `presenting: ${st0.presenting}`);
  if (!expect.presenting) {
    const hidden = await evaluate('[...document.querySelectorAll("[data-beat]")].filter((b) => getComputedStyle(b).visibility === "hidden").length');
    check(hidden === 0, 'stacked: every beat is showing');
    await shot(label.replace(/\W+/g, '-') + '-stack');
    check(!errors().length, `no console errors${errors().length ? ': ' + errors()[0] : ''}`);
    return;
  }
  check(st0.gsap === expect.gsap, `GSAP loaded: ${st0.gsap}`);
  await shot(label.replace(/\W+/g, '-') + '-00');
  if (expect.midflight && info[0].kind === 'cover') {
    // Sample the opening move mid-flight: the Step must be caught lying down, not jumping.
    await press('right'); await sleep(380);
    const mid = await evaluate('__deck.state()');
    check(mid.busy && mid.rail.t > 0.05 && mid.rail.t < 0.98, `the Step lies down over time (t = ${mid.rail.t.toFixed(2)} at 380 ms)`);
    await shot(label.replace(/\W+/g, '-') + '-open-mid');
    await settle();
    await press('left'); await settle();
  }
  const seen = [], total = (await evaluate('__deck.slides')).reduce((a, s) => a + 1 + s.beats, 0);
  for (let k = 0; k < total + 2; k++) {
    await press('right'); await settle();
    const st = await evaluate('__deck.state()');
    seen.push(st.last);
    if (SHOTS && expect.shots) await shot(label.replace(/\W+/g, '-') + '-' + String(k + 1).padStart(2, '0'));
  }
  const end = await evaluate('__deck.state()');
  check(end.i === info.length - 1 && end.pos === end.count - 1, `ArrowRight x${total + 2} reaches the last slide (${end.i + 1}/${info.length})`);
  check(Math.abs(end.rail.frac - 1) < 1e-6 && end.rail.t === 1, 'the rail closes on the last slide');
  if (expect.kinds) {
    for (const k of expect.kinds) check(seen.some((s) => s.startsWith(k)), `derived a ${k} transition`);
  }
  if (expect.onlyCut) check(seen.every((s) => s.startsWith('cut')), `every transition was a cut (${[...new Set(seen)].join(', ')})`);
  // Back to the start with real presses: every step lands, nothing sticks.
  for (let k = 0; k < total + 2; k++) { await press('left'); await settle(); }
  const back = await evaluate('__deck.state()');
  check(back.i === 0 && back.b === 0, 'ArrowLeft all the way back lands on slide 1, beat 0');
  if (expect.presenting && info[0].kind === 'cover') check(back.rail.t === 0 && back.rail.draw === 1, 'back on the cover, the rail is folded back into the Step');
  // A burst of presses faster than any transition: every press has to count.
  const plan = await evaluate('__deck.slides');
  let ei = 0, eb = 0;
  for (let k = 0; k < 6; k++) { if (eb < plan[ei].beats) eb++; else if (ei + 1 < plan.length) { ei++; eb = 0; } }
  for (let k = 0; k < 6; k++) await press('right');
  await settle();
  const burst = await evaluate('__deck.state()');
  check(!burst.busy && burst.i === ei && burst.b === eb, `six presses in a burst land exactly six steps on (slide ${burst.i + 1} beat ${burst.b}, expected slide ${ei + 1} beat ${eb})`);
  // Room mode.
  await press('home'); await settle(); await press('five'); await settle();
  const room = await evaluate('__deck.state()');
  check(room.room && room.count === rooms, `room mode shows ${rooms} slides (${room.count})`);
  for (let k = 0; k < 8; k++) { await press('right'); await settle(); }
  const rs = await evaluate('__deck.state()');
  check(rs.last.startsWith('cut'), 'room mode transitions are cuts');
  await press('five'); await settle();
  // Enter on the focused QR link belongs to the link, not the deck.
  if (expect.presenting && (await evaluate('!!document.querySelector("a.qr")'))) {
    // Go to the slide that holds the link: a hidden slide's link cannot take focus.
    await evaluate(`location.hash = '#' + ([...document.querySelectorAll('.deck > .slide')].findIndex((s) => s.querySelector('a.qr')) + 1)`);
    await sleep(300); await settle();
    const before = (await evaluate('__deck.state()')).i;
    await evaluate(`(() => { const a = document.querySelector('a.qr'); a.addEventListener('click', (e) => { e.preventDefault(); window.__qrClicked = true; }, { once: true }); a.focus(); })()`);
    const focused = await evaluate('document.activeElement && document.activeElement.matches("a.qr")');
    await key('Enter', 'Enter', 13); await settle();
    const after = await evaluate('({ i: __deck.state().i, clicked: !!window.__qrClicked })');
    check(focused && after.clicked && after.i === before, `Enter on the focused QR link follows the link and does not move the deck (focused ${focused}, clicked ${after.clicked})`);
  }
  check(!errors().length, `no console errors${errors().length ? ': ' + errors()[0] : ''}`);
}

await walk('motion (GSAP, 1920 x 1080)', { w: 1920, h: 1080 }, { presenting: true, gsap: true, kinds: ['unfold', 'ascend', 'turn', 'hold'], shots: true, midflight: true });
await walk('reduced motion', { w: 1440, h: 900, reduce: true }, { presenting: true, gsap: true, onlyCut: true });
await walk('GSAP blocked (offline fallback)', { w: 1280, h: 800, block: ['*cdnjs.cloudflare.com*'] }, { presenting: true, gsap: false });
await walk('no script', { w: 1280, h: 800, js: false }, {});
await walk('phone 390', { w: 390, h: 844 }, { presenting: false });

// ---------- Timer: T starts it, a transition during a run is a cut.
console.log('clock');
await load();
const clockAt = info.findIndex((s) => s.timer > 0);
if (clockAt >= 0) {
  await evaluate(`location.hash = '#${clockAt + 1}'`); await sleep(300);
  await press('t'); await sleep(1300);
  const txt = await evaluate(`document.querySelectorAll('.deck > .slide')[${clockAt}].querySelector('.clock__digits').textContent`);
  const state = await evaluate(`document.querySelectorAll('.deck > .slide')[${clockAt}].querySelector('.clock').dataset.state`);
  check(state === 'running' && txt !== fmt(info[clockAt].timer), `T starts the clock (${state}, ${txt})`);
  await press('right'); await settle();
  check((await evaluate('__deck.state()')).last.startsWith('cut'), 'leaving a slide with a running clock is a cut');
}
function fmt(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

ws.close(); chrome.kill(); server.close();
console.log(`\n${passes.length} passed, ${fails.length} failed${SHOTS ? '. Screenshots in ' + SHOTS : ''}`);
process.exit(fails.length ? 1 : 0);

/* ===========================================================================
   GDG on Campus Riverside City College. Deck kit engine.
   Implements docs/04-brand/design-system/presentation.md (§13) and motion.md (§5).

   No build step. GSAP is optional: when it loads (cdnjs, pinned, SRI) the full
   motion score runs; when it does not, content still rises through its masks
   by CSS and everything else lands in its end state. Reduced motion, room mode,
   and a running timer make every transition a Cut.

   The one architectural rule: every transition ends by calling applyState(i, b),
   which sets the whole deck to "slide i, beat b" from nothing. Animation is
   decoration laid over a state machine, so a clicker pressed six times in a
   second lands on the right slide in the right state, every time.
   =========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var deck = document.querySelector('.deck');
  if (!deck) return;
  var slides = Array.prototype.filter.call(deck.children, function (el) { return el.classList.contains('slide'); });
  if (!slides.length) return;

  var MOVES = ['arrive', 'tension', 'work', 'turn', 'ask'];
  var KEY = 'gdg-deck:' + (deck.getAttribute('data-deck') || location.pathname) + ':';
  var gsap = window.gsap || null;
  var reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  var NS = 'http://www.w3.org/2000/svg';
  var STAGGER = 0.056;              // 8% of the beat, motion.md §5.7
  var STAGGER_CAP = 5;              // six groups: 0..5

  root.classList.add('deck-live');
  if (!gsap) root.classList.add('no-gsap');

  /* ---------- Utilities --------------------------------------------------- */
  function store(k, v) { try { localStorage.setItem(KEY + k, v); } catch (e) { /* private window */ } }
  function recall(k) { try { return localStorage.getItem(KEY + k); } catch (e) { return null; } }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ramp(x, a, b) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function one(sel, el) { return (el || document).querySelector(sel); }
  function all(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  function make(tag, cls, parent) { var el = document.createElement(tag); if (cls) el.className = cls; if (parent) parent.appendChild(el); return el; }
  function svgEl(tag, attrs, parent) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }
  function r2(n) { return Math.round(n * 100) / 100; }

  /* ---------- Tokens: one source for CSS and GSAP ------------------------- */
  function token(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  function seconds(name) {
    var v = token(name); if (!v) return 0;
    var n = parseFloat(v); return /ms$/.test(v) ? n / 1000 : n;
  }
  // Solve a cubic-bezier for y at x by bisection. x(t) is monotonic for any
  // curve whose x control points sit in [0, 1], which every token here does.
  function cubicBezier(x1, y1, x2, y2) {
    function at(t, a, b) { return ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t; }
    return function (x) {
      if (x <= 0) return 0; if (x >= 1) return 1;
      var lo = 0, hi = 1, t = x;
      for (var i = 0; i < 28; i++) {
        var cx = at(t, x1, x2);
        if (Math.abs(cx - x) < 1e-6) break;
        if (cx < x) lo = t; else hi = t;
        t = (lo + hi) / 2;
      }
      return at(t, y1, y2);
    };
  }
  function curve(name, fallback) {
    var m = /cubic-bezier\(([^)]+)\)/.exec(token(name));
    var p = m ? m[1].split(',').map(parseFloat) : fallback;
    return cubicBezier(p[0], p[1], p[2], p[3]);
  }
  var EASE = {
    arrive: curve('--rcc-ease-arrive', [0.16, 1, 0.3, 1]),
    exit: curve('--rcc-ease-exit', [0.4, 0, 1, 1]),
    standard: curve('--rcc-ease-standard', [0.2, 0, 0, 1])
  };
  function motionOn() { return !!gsap && !reduceMQ.matches; }
  function dur(kind) { return seconds(kind === 'move' ? '--rcc-dur-move' : '--rcc-dur-beat'); }

  /* ---------- Units: what rises through a mask ---------------------------- */
  var TEXT = 'h1, h2, h3, p, li, .eyebrow, .label';
  var BLOCK = '.card, .clock, .figure, .compress';
  var NOSPLIT = '.notes, .notice, .qr, .compress, .compress-src, .rung, .rung-src, .cover__starts, .cover__lockup, .card, .clock, .figure, [data-static], svg, script, style';

  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), nodes = [], words = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (!node.nodeValue.trim()) return;
      var host = node.parentNode;
      if (host !== el && host.closest && host.closest(NOSPLIT)) return;
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var w = make('span', 'w'), inner = make('span', 'w__in', w);
        inner.textContent = part;
        frag.appendChild(w); words.push(inner);
      });
      host.replaceChild(frag, node);
    });
    return words;
  }
  function wrapBlock(el) {
    var mask = make('div', 'blk'), inner = make('div', 'blk__in', mask);
    el.parentNode.insertBefore(mask, el); inner.appendChild(el);
    return inner;
  }
  function ensureBody(li) {
    if (one(':scope > .body', li)) return;
    var body = make('span', 'body');
    while (li.firstChild) body.appendChild(li.firstChild);
    li.appendChild(body);
  }

  // Collect a slide's units in document order: {el, beat, target}. Groups
  // (stagger indexes) are assigned by measure(), because they depend on lines.
  function buildUnits(slide) {
    var beats = all('[data-beat]', slide), units = [];
    var targets = all(TEXT + ', ' + BLOCK, slide).filter(function (el) {
      if (el.matches(BLOCK)) return !el.parentNode.closest(BLOCK);
      if (el.closest(NOSPLIT)) return false;
      var up = el.parentNode.closest(TEXT + ', ' + BLOCK);
      return !up || !slide.contains(up);
    });
    targets.forEach(function (t) {
      var host = t.closest('[data-beat]'), beat = host && slide.contains(host) ? beats.indexOf(host) + 1 : 0;
      var els = t.matches(BLOCK) ? [wrapBlock(t)] : splitWords(t);
      els.forEach(function (el) { units.push({ el: el, beat: beat, target: t }); });
    });
    return units;
  }
  // Words in the same line of the same element share a group, so a line rises
  // as one. Groups count up in reading order and stop at six (§5.7).
  function measure(slide) {
    var groups = {}, last = {};
    slide._units.forEach(function (u) {
      var top = Math.round(u.el.parentNode.getBoundingClientRect().top), b = u.beat;
      if (groups[b] === undefined) { groups[b] = -1; last[b] = null; }
      var sig = last[b];
      if (!sig || sig.target !== u.target || Math.abs(sig.top - top) > 2) { groups[b]++; last[b] = { target: u.target, top: top }; }
      u.k = Math.min(groups[b], STAGGER_CAP);
      u.el.style.setProperty('--i', u.k);
    });
  }
  // Boxes: containers with a fill (tiles, panels) wipe up from their bottom edge
  // like the words rise through their masks; a list's number dot pops. Without
  // this the words rose into a box that was already sitting there at full size.
  var BOX = '.slide[data-layout="tiles"] .beats > li, .slide[data-layout="panel"] .contrast > div, .grid > li';
  var DOT = '.slide:not([data-layout="tiles"]) .beats > li';
  function buildBoxes(slide) {
    var beats = all('[data-beat]', slide);
    function beatOf(el) { var h = el.closest('[data-beat]'); return h && slide.contains(h) ? beats.indexOf(h) + 1 : 0; }
    return all(BOX, slide).map(function (el) { el.classList.add('box'); return { el: el, beat: beatOf(el), dot: false }; })
      .concat(all(DOT, slide).map(function (el) { return { el: el, beat: beatOf(el), dot: true }; }));
  }
  function boxesFor(slide, a, b) { return slide._boxes.filter(function (x) { return x.beat >= a && x.beat <= b; }); }
  function clearBoxes(slide) {
    slide._boxes.forEach(function (x) { x.el.style.clipPath = ''; x.el.style.transform = ''; x.el.style.removeProperty('--pop'); });
  }
  function boxClip(el, top, bottom) {
    var r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    return 'inset(' + top + '% 0% ' + bottom + '% 0% round ' + r2(r) + 'px)';
  }
  // Add entrances to a timeline at a position, staggered in reading order.
  function boxesIn(tl, list, at, back) {
    var u = deck.clientWidth / 1920 || 1, d = dur('beat') * (back || 1);
    list.forEach(function (x, k) {
      var when = at + k * 0.07;
      if (x.dot) tl.fromTo(x.el, { '--pop': 0 }, { '--pop': 1, duration: d * 0.9, ease: 'back.out(2.2)' }, when);
      else tl.fromTo(x.el, { clipPath: boxClip(x.el, 100, 0), y: 32 * u }, { clipPath: boxClip(x.el, 0, 0), y: 0, duration: d * 1.15, ease: EASE.arrive }, when);
    });
  }
  // Exits go the way the words go: up and out forward, down and out backward.
  function boxesOut(tl, list, at, sign) {
    list.forEach(function (x) {
      if (x.dot) tl.to(x.el, { '--pop': 0, duration: 0.3 * dur('beat'), ease: EASE.exit }, at);
      else tl.to(x.el, { clipPath: sign > 0 ? boxClip(x.el, 0, 100) : boxClip(x.el, 100, 0), duration: 0.3 * dur('beat'), ease: EASE.exit }, at);
    });
  }

  function unitsFor(slide, beatFrom, beatTo) {
    return slide._units.filter(function (u) { return u.beat >= beatFrom && u.beat <= beatTo; });
  }

  /* ---------- Compress: a sentence being cut down (§13.5) ----------------- */
  var PUNCT = /^[,.;:!?]+$/;
  function tokenize(s) {
    var out = [];
    s.trim().split(/\s+/).forEach(function (chunk) {
      var m = /^(.*[^\s,.;:!?])([,.;:!?]+)$/.exec(chunk);
      if (m) { out.push(m[1]); m[2].split('').forEach(function (p) { out.push(p); }); } else out.push(chunk);
    });
    return out;
  }
  // Longest common subsequence, walked out as keep / del / ins in order.
  function diff(a, b) {
    var n = a.length, m = b.length, i, j, L = [];
    for (i = 0; i <= n; i++) { L.push([]); for (j = 0; j <= m; j++) L[i].push(0); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--)
      L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var ops = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (a[i] === b[j]) ops.push({ op: 'keep', i: i++, j: j++ });
      else if (L[i + 1][j] >= L[i][j + 1]) ops.push({ op: 'del', i: i++ });
      else ops.push({ op: 'ins', j: j++ });
    }
    while (i < n) ops.push({ op: 'del', i: i++ });
    while (j < m) ops.push({ op: 'ins', j: j++ });
    return ops;
  }
  // Every version word-diffed into one ordered token list, where each token
  // knows the version it arrives in and the version it leaves in. Same method as
  // the landing page's Voice rep, generalized from three versions to any number.
  function buildTokens(rounds) {
    var N = rounds.length;
    function blank() { var t = []; for (var q = 0; q < N; q++) t.push(null); return t; }
    var every = tokenize(rounds[0]).map(function (w) { var t = blank(); t[0] = w; return { text: t, from: 0, out: -1 }; });
    var cur = every.slice();
    for (var r = 1; r < N; r++) {
      var bw = tokenize(rounds[r]), next = [], nextCur = [], p = 0;
      var ops = diff(cur.map(function (t) { return t.text[r - 1].toLowerCase(); }), bw.map(function (w) { return w.toLowerCase(); }));
      ops.forEach(function (o) {
        if (o.op === 'ins') { var born = { text: blank(), from: r, out: -1 }; born.text[r] = bw[o.j]; next.push(born); nextCur.push(born); return; }
        var target = cur[o.i];
        while (p < every.length && every[p] !== target) next.push(every[p++]);
        next.push(every[p++]);
        if (o.op === 'keep') { target.text[r] = bw[o.j]; nextCur.push(target); } else target.out = r;
      });
      while (p < every.length) next.push(every[p++]);
      every = next; cur = nextCur;
    }
    return every;
  }
  function textAt(k, r) { for (; r >= 0; r--) if (k.text[r] != null) return k.text[r]; return ''; }
  // Arrivals start while the cut is still running, so a replaced phrase reads
  // as a trade. In sequence, the line sat for a beat as a stub (landing page, 2026-09-17).
  var WIN = { fade: [0.05, 0.35], cut: [0.15, 0.6], arrive: [0.3, 0.85] };

  function makeCompress(slide) {
    var src = one('.compress-src', slide);
    if (!src) return null;
    var items = all('li', src), N = items.length;
    var rounds = items.map(function (li) { return li.textContent.replace(/\s+/g, ' ').trim(); });
    var labels = items.map(function (li) { return li.getAttribute('data-label') || ''; });
    var whys = items.map(function (li) { return li.getAttribute('data-why') || ''; });
    var nums = labels.map(function (l) { return parseFloat(l); });
    var unit = (labels[0] || '').replace(/^[\d.\s]+/, '');
    var counting = nums.every(function (n) { return !isNaN(n); });

    var box = one('.compress', slide);
    if (!box) {
      box = make('div', 'compress'); box.setAttribute('aria-hidden', 'true');
      var meter = make('div', 'compress__meter', box);
      make('p', 'compress__num', meter); make('p', 'compress__unit', meter);
      make('span', 'compress__fill', make('span', 'compress__bar', meter));
      var text = make('div', 'compress__text', box);
      make('p', 'compress__line', text); make('p', 'compress__why', text);
      src.parentNode.insertBefore(box, src.nextSibling);
    }
    var numEl = one('.compress__num', box), unitEl = one('.compress__unit', box), fill = one('.compress__fill', box);
    var line = one('.compress__line', box), why = one('.compress__why', box);
    if (!counting) { one('.compress__meter', box).style.visibility = 'hidden'; }
    unitEl.textContent = unit;

    var tokens = buildTokens(rounds).map(function (k) {
      var span = make('span', 't', line), space = document.createTextNode(''), word = make('span', 'tw');
      span.appendChild(space); span.appendChild(word);
      k.el = span; k.word = word; k.space = space;
      k.lead = PUNCT.test(textAt(k, N - 1)) ? '' : ' ';
      return k;
    });
    function render(v) {
      v = clamp(v, 0, N - 1);
      var r = Math.min(N - 1, Math.floor(v + 0.5)), first = null;
      tokens.forEach(function (k) {
        var size = 1, alpha = 1, cutting = false, fresh = false, b;
        if (k.from > 0) { b = k.from - 1; size = alpha = ramp(v, b + WIN.arrive[0], b + WIN.arrive[1]); fresh = alpha < 0.999; }
        if (k.out > 0) {
          b = k.out - 1;
          size = Math.min(size, 1 - ramp(v, b + WIN.cut[0], b + WIN.cut[1]));
          alpha = Math.min(alpha, 1 - ramp(v, b + WIN.fade[0], b + WIN.fade[1]));
          cutting = v > b + WIN.fade[0] - 0.02; fresh = false;
        }
        k.el.style.fontSize = size < 0.001 ? '0' : size + 'em';
        k.el.style.opacity = alpha;
        k.el.classList.toggle('cutting', cutting && size > 0.001);
        k.el.classList.toggle('fresh', fresh && size > 0.001);
        k.word.textContent = textAt(k, r);
        k.space.textContent = k.lead;
        if (!first && size > 0.5) first = k;
      });
      if (first) first.space.textContent = '';
      var s = Math.min(N - 2, Math.floor(v)), u = v - s;
      if (counting) {
        var val = v >= N - 1 ? nums[N - 1] : lerp(nums[s], nums[s + 1], ramp(u, 0.1, 0.9));
        numEl.textContent = Math.round(val);
        fill.style.transform = 'scaleX(' + (val / nums[0]) + ')';
      }
      why.textContent = whys[r];
      why.style.opacity = Number.isInteger(v) ? 1 : Math.min(1, Math.abs(u - 0.5) * 4);
    }
    // Reserve the tallest state so the slide never reflows mid-cut (§5.8).
    function reserve() {
      line.style.minHeight = ''; why.style.minHeight = '';
      var hl = 0, hw = 0;
      for (var v = 0; v <= N - 1; v += 0.5) { render(v); hl = Math.max(hl, line.offsetHeight); hw = Math.max(hw, why.offsetHeight); }
      line.style.minHeight = hl + 'px'; why.style.minHeight = hw + 'px';
    }
    return { steps: N - 1, render: render, reserve: reserve, state: { v: 0 } };
  }

  /* ---------- Figure: a count arriving ------------------------------------ */
  function makeFigure(slide) {
    var el = one('.figure__num', slide);
    if (!el) return null;
    var to = parseFloat(el.getAttribute('data-to') || el.textContent);
    var from = parseFloat(el.getAttribute('data-from') || '0');
    // Reserve the measured width of the end value, so a count that grows (0 to 30)
    // never pushes the unit and the end state sits flush. ch is not used: tracking
    // and tabular figures make it disagree with the real digit width.
    el.style.display = 'inline-block'; el.style.textAlign = 'right';
    function render(p) { el.textContent = Math.round(lerp(from, to, clamp(p, 0, 1))); }
    function reserve() {
      el.style.minWidth = ''; render(1);
      var u = deck.clientWidth / 1920 || 1;
      el.style.minWidth = 'calc(' + r2(el.getBoundingClientRect().width / u) + ' * var(--u))';
    }
    return { render: render, reserve: reserve, state: { p: 1 } };
  }

  /* ---------- Clock -------------------------------------------------------- */
  function fmt(ms) { var s = Math.ceil(ms / 1000), m = Math.floor(s / 60); s %= 60; return m + ':' + (s < 10 ? '0' : '') + s; }
  function makeClock(slide) {
    var secs = parseInt(slide.getAttribute('data-timer'), 10);
    if (!secs) return null;
    var el = one('.clock', slide);
    if (!el) {
      el = make('div', 'clock');
      make('p', 'clock__digits', el); make('span', 'clock__fill', make('span', 'clock__rail', el)); make('p', 'clock__hint', el);
      (one('[data-clock-slot]', slide) || slide).appendChild(el);
    }
    var digits = one('.clock__digits', el), fill = one('.clock__fill', el), hint = one('.clock__hint', el);
    var hint0 = hint.textContent.trim() || 'T to start';
    hint.textContent = hint0;
    var c = { total: secs * 1000, left: secs * 1000, running: false, last: 0, raf: 0 };
    function paint() {
      var state = c.left <= 0 ? 'done' : c.running ? (c.left <= 10000 ? 'ending' : 'running') : (c.left === c.total ? 'idle' : 'paused');
      digits.textContent = state === 'done' ? 'Time' : fmt(c.left);
      fill.style.transform = 'scaleX(' + (c.left / c.total) + ')';
      el.setAttribute('data-state', state);
      hint.textContent = state === 'done' ? 'R to reset' : state === 'paused' ? 'Paused. T to resume' : state === 'idle' ? hint0 : 'T to pause';
    }
    function tick() {
      var now = performance.now();
      c.left = Math.max(0, c.left - (now - c.last)); c.last = now; paint();
      if (c.left > 0 && c.running) c.raf = requestAnimationFrame(tick); else c.running = false;
    }
    c.toggle = function () {
      if (c.left <= 0) return;
      c.running = !c.running;
      if (c.running) { c.last = performance.now(); c.raf = requestAnimationFrame(tick); } else cancelAnimationFrame(c.raf);
      paint();
    };
    c.reset = function () { c.running = false; cancelAnimationFrame(c.raf); c.left = c.total; paint(); };
    c.pause = function () { if (c.running) { c.running = false; cancelAnimationFrame(c.raf); paint(); } };
    paint();
    return c;
  }

  /* ---------- Rung: the semester (visual-voice.md §9.2) ------------------- */
  // Two styles from one list. Climb (default): the Step at poster scale, one tread
  // per part of the semester, each session named under its tread, and a camera
  // that opens on this week and pulls back. Ledger (data-style="ledger"): the arcs
  // as columns of numbered sessions, each column higher than the last, so the type
  // makes the stair; one Step rule under the column heads.
  var DOT = '●';
  function capital(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function readRung(src) {
    var h = 0, a = 0, groups = [];
    var items = all('li', src).map(function (li) {
      var arc = li.getAttribute('data-arc') || 'hook';
      var it = { arc: arc, receipt: li.hasAttribute('data-receipt'), current: li.getAttribute('aria-current') === 'step',
                 name: li.textContent.replace(/\s+/g, ' ').trim() };
      it.n = arc === 'hook' ? 'H' + (++h) : String(++a);
      return it;
    });
    items.forEach(function (it, i) {
      it.i = i;
      var g = groups.filter(function (x) { return x.key === it.arc; })[0];
      if (!g) { g = { key: it.arc, name: capital(it.arc === 'hook' ? 'hooks' : it.arc), items: [] }; groups.push(g); }
      g.items.push(it);
    });
    groups.forEach(function (g) {
      var f = g.items[0].n, l = g.items[g.items.length - 1].n;
      g.sub = g.key === 'hook' ? g.items.map(function (x) { return x.n; }).join(' and ') : (f === l ? 'Session ' + f : 'Sessions ' + f + ' to ' + l);
    });
    var cur = -1; items.forEach(function (it, i) { if (it.current) cur = i; });
    return { items: items, groups: groups, cur: cur };
  }
  function makeRung(slide) {
    var src = one('.rung-src', slide);
    if (!src) return null;
    var style = slide.getAttribute('data-style') === 'ledger' ? 'ledger' : 'climb';
    var box = one('.rung', slide);
    if (!box) { box = make('div', 'rung'); box.setAttribute('aria-hidden', 'true'); slide.appendChild(box); }
    box.className = 'rung rung--' + style; box.textContent = '';
    var data = readRung(src);
    return style === 'ledger' ? ledgerRung(box, data) : climbRung(box, data);
  }
  function climbRung(box, D) {
    var svg = svgEl('svg', { viewBox: '0 0 1920 1080', 'aria-hidden': 'true', focusable: 'false' }, box);
    var cam = svgEl('g', {}, svg), G = D.groups, T = G.length;
    // Tread widths follow session counts, three units at least, so two names fit a short tread.
    var units = G.map(function (g) { return Math.max(g.items.length, 3); }), U = units.reduce(function (a, b) { return a + b; }, 0);
    var xs = [96]; units.forEach(function (u) { xs.push(xs[xs.length - 1] + u * 1728 / U); });
    var rise = T > 1 ? Math.min(130, 390 / (T - 1)) : 0, ys = G.map(function (g, c) { return 800 - c * rise; });
    var d = 'M' + r2(xs[0]) + ' ' + ys[0];
    for (var c = 1; c < T; c++) d += 'H' + r2(xs[c]) + 'V' + r2(ys[c]);
    d += 'H' + r2(xs[T]);
    svgEl('path', { d: d, class: 'rung__track' }, cam);
    var prog = svgEl('path', { d: d, class: 'rung__progress' }, cam);
    var at = null, travelled = 0;
    G.forEach(function (g, c) {
      // The first tread has no riser on its left, so its list sits on the margin.
      var inset = c === 0 ? 0 : 34, gr = svgEl('g', {}, cam), maxW = xs[c + 1] - xs[c] - inset - 36, y = ys[c] + 62, x = xs[c] + inset;
      var nm = svgEl('text', { x: r2(xs[c + 1] - 30), y: r2(ys[c] - 36), 'text-anchor': 'end', class: 'rung__arc' }, gr); nm.textContent = g.name;
      g.items.forEach(function (it, k) {
        var state = it.i === D.cur ? ' is-current' : D.cur >= 0 && it.i < D.cur ? ' is-past' : '';
        if (it.i === D.cur) {
          var tag = svgEl('text', { x: r2(x), y: r2(y), class: 'rung__here code' }, gr); tag.textContent = 'THIS WEEK';
          y += 44;
          at = { x: xs[c] + (k + 0.5) * (xs[c + 1] - xs[c]) / g.items.length, y: ys[c] };
          travelled = 0;
          for (var q = 0; q < c; q++) travelled += (xs[q + 1] - xs[q]) + (ys[q] - ys[q + 1]);
          travelled += at.x - xs[c];
        }
        // Names wrap to the tread's width, so a long one never runs into the next flight.
        var t = svgEl('text', { x: r2(x), y: r2(y), class: 'rung__name' + state }, gr);
        var words = it.name.split(' '), line = svgEl('tspan', { x: r2(x), dy: 0 }, t), lines = 1;
        function wrapTo(w) { line = svgEl('tspan', { x: r2(x), dy: 40 }, t); line.textContent = w; lines++; }
        words.forEach(function (w) {
          var before = line.textContent;
          line.textContent = before ? before + ' ' + w : w;
          if (before && line.getComputedTextLength() > maxW) { line.textContent = before; wrapTo(w); }
        });
        // A receipt week ends in a green dot, as in the legend. Only the last line
        // has to make room for it.
        if (it.receipt) {
          if (line.getComputedTextLength() + 32 > maxW && line.textContent.indexOf(' ') > 0) {
            var cut = line.textContent.lastIndexOf(' '), tail = line.textContent.slice(cut + 1);
            line.textContent = line.textContent.slice(0, cut); wrapTo(tail);
          }
          var dot = svgEl('tspan', { class: 'rung__rc-dot', dx: 10 }, t); dot.textContent = DOT;
        }
        y += 44 + (lines - 1) * 40;
      });
    });
    var you = at ? svgEl('circle', { cx: r2(at.x), cy: r2(at.y), r: 30, class: 'rung__you' }, cam) : null;
    if (D.items.some(function (it) { return it.receipt; })) {
      var lg = svgEl('text', { x: 1824, y: 1000, 'text-anchor': 'end', class: 'rung__legend' }, svg);
      var ld = svgEl('tspan', { class: 'rung__rc-dot' }, lg); ld.textContent = DOT;
      var lt = svgEl('tspan', { dx: 14 }, lg); lt.textContent = 'Receipt week: you leave with proof';
    }
    var len = prog.getTotalLength ? prog.getTotalLength() : 1;
    function render(p) {
      // The camera: close on this week, then pull back to the whole climb.
      var z = at ? 1 - Math.pow(2, -10 * ramp(p, 0.18, 0.9)) : 1, s = lerp(2.3, 1, z);
      var fx = at ? lerp(at.x + 120, 960, z) : 960, fy = at ? lerp(at.y + 40, 540, z) : 540;
      cam.setAttribute('transform', 'translate(' + r2(960 - fx * s) + ' ' + r2(540 - fy * s) + ') scale(' + r2(s * 1000) / 1000 + ')');
      var drawn = travelled * ramp(p, 0.05, 0.4);
      prog.style.strokeDasharray = r2(drawn) + ' ' + r2(len + 40);
      if (you) you.style.opacity = ramp(p, 0.02, 0.12);
      if (lg) lg.style.opacity = ramp(p, 0.85, 1);
    }
    return { render: render, state: { p: 1 }, duration: 3.0, camera: !!at };
  }
  function ledgerRung(box, D) {
    var svg = svgEl('svg', { viewBox: '0 0 1920 1080', 'aria-hidden': 'true', focusable: 'false' }, box);
    var rule = svgEl('path', { class: 'rung__rule' }, svg);
    var map = make('div', 'rung__cols', box), G = D.groups;
    map.style.gridTemplateColumns = G.map(function (g) { return g.key === 'hook' ? '0.8fr' : '1fr'; }).join(' ');
    var cols = G.map(function (g, c) {
      var col = make('div', 'rung__col', map); col.style.setProperty('--drop', (G.length - 1 - c) * 80);
      var head = make('div', 'rung__head', col);
      make('b', '', head).textContent = g.name;
      // Hooks need no range: their rows already say H1 and H2.
      if (g.key !== 'hook') make('small', '', head).textContent = g.sub.replace(/^Sessions? /, '').toUpperCase();
      var ol = make('ol', 'rung__rows', col);
      g.items.forEach(function (it) {
        var li = make('li', (D.cur >= 0 && it.i < D.cur ? 'is-past' : '') + (it.i === D.cur ? ' is-current' : '') + (it.i === D.items.length - 1 ? ' is-end' : ''), ol);
        var inn = make('span', 'rung__in', li);
        make('span', 'rung__n', inn).textContent = it.n;
        var nm = make('span', 'rung__nm', inn); nm.textContent = it.name;
        if (it.receipt) make('i', 'rung__rc', nm);
      });
      return col;
    });
    var legend = null;
    if (D.items.some(function (it) { return it.receipt; })) { legend = make('p', 'rung__legend-html', box); legend.innerHTML = '<i class="rung__rc"></i>Receipt week: you leave with proof'; }
    // The rule runs under each column head and rises at each gap, measured from the real layout.
    function layout() {
      var sr = box.getBoundingClientRect(), u = sr.width / 1920 || 1;
      var pts = cols.map(function (c) { var h = one('.rung__head', c).getBoundingClientRect(); return { l: (h.left - sr.left) / u, r: (h.right - sr.left) / u, y: (h.bottom - sr.top) / u }; });
      var d = 'M' + r2(pts[0].l) + ' ' + r2(pts[0].y);
      for (var k = 1; k < pts.length; k++) d += 'H' + r2((pts[k - 1].r + pts[k].l) / 2) + 'V' + r2(pts[k].y);
      rule.setAttribute('d', d + 'H' + r2(pts[pts.length - 1].r));
    }
    layout();
    var heads = all('.rung__head', map), rows = all('.rung__rows li', map);
    function render(p) {
      var len = rule.getTotalLength ? rule.getTotalLength() : 1;
      rule.style.strokeDasharray = r2(len * ramp(p, 0.1, 0.55)) + ' ' + r2(len + 40);
      heads.forEach(function (h, c) { var t = ramp(p, 0.1 + c * 0.1, 0.4 + c * 0.1); h.style.opacity = t; h.style.transform = 'translateY(' + r2((1 - t) * 24) + '%)'; });
      rows.forEach(function (li) {
        var c = cols.indexOf(li.parentNode.parentNode), k = Array.prototype.indexOf.call(li.parentNode.children, li);
        var t = 1 - Math.pow(2, -10 * ramp(p, 0.18 + c * 0.1 + k * 0.03, 0.46 + c * 0.1 + k * 0.03));
        li.firstChild.style.transform = t >= 0.999 ? '' : 'translateY(' + r2((1 - t) * 110) + '%)';
        if (li.classList.contains('is-current')) li.style.setProperty('--band', r2(1 - Math.pow(2, -10 * ramp(p, 0.6, 0.9))));
      });
      if (legend) legend.style.opacity = ramp(p, 0.85, 1);
    }
    return { render: render, state: { p: 1 }, duration: 2.4, camera: false, layout: layout };
  }

  /* ---------- Chrome: ledger, counter, rail -------------------------------- */
  // Stage effects: the Step's edge on a step wipe and the band on a sweep. Sits
  // over the slides and under the chrome; empty whenever nothing is moving.
  var fx = svgEl('svg', { class: 'stage-fx', viewBox: '0 0 1920 1080', preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' }, deck);
  var fxEdge = svgEl('path', { d: '' }, fx), fxBand = svgEl('polygon', { points: '' }, fx);
  var chrome = make('div', 'chrome', deck); chrome.setAttribute('aria-hidden', 'true');
  var ledger = make('p', 'ledger', chrome), counter = make('p', 'counter', chrome);
  var rail = svgEl('svg', { class: 'rail', viewBox: '0 0 1920 1080', focusable: 'false' }, chrome);
  var railMorph = svgEl('path', { class: 'rail__morph' }, rail);
  var railSegs = svgEl('g', { class: 'rail__segs' }, rail);
  var live = make('p', 'visually-hidden', document.body); live.setAttribute('aria-live', 'polite');

  // The rail is five named segments, one per movement present, each as wide as its
  // slides, filling as the deck goes (presentation.md §13.4). The cover's Step is
  // a path whose numbers [x0, y0, riser x, y1, x1] interpolate to a flat line at
  // the bar: the Step lies down, then splits into the segments. One value, t.
  var RAIL = { left: 96, right: 1824, bar: 1022, barH: 8, label: 1002, gap: 14, stroke: 8, coverStroke: 12 };
  var G = { flat: null, cover: null, segs: [] };
  var R = { t: 1, fill: 0, draw: 1 };
  function toD(n) { var d = 'M' + r2(n[0]) + ' ' + r2(n[1]); for (var k = 2; k < n.length - 1; k += 2) d += 'H' + r2(n[k]) + 'V' + r2(n[k + 1]); return d + 'H' + r2(n[n.length - 1]); }

  function layoutRail() {
    var V = visible(), n = V.length, runs = [];
    V.forEach(function (i, j) {
      var m = slides[i]._move, last = runs[runs.length - 1];
      if (last && last.move === m) last.n++; else runs.push({ move: m, n: 1, start: j });
    });
    var unit = (RAIL.right - RAIL.left - RAIL.gap * (runs.length - 1)) / n, x = RAIL.left, y = RAIL.bar + RAIL.barH / 2;
    railSegs.textContent = '';
    G.segs = runs.map(function (r) {
      var w = r.n * unit, g = svgEl('g', {}, railSegs);
      svgEl('rect', { x: r2(x), y: RAIL.bar, width: r2(w), height: RAIL.barH, class: 'rail__track' }, g);
      var fill = svgEl('rect', { x: r2(x), y: RAIL.bar, width: 0, height: RAIL.barH, class: 'rail__fill' }, g);
      var label = svgEl('text', { x: r2(x), y: RAIL.label, class: 'rail__label' }, g);
      label.textContent = r.move.toUpperCase();
      var s = { x: x, w: w, n: r.n, start: r.start, fill: fill, label: label, fits: true };
      x += w + RAIL.gap;
      return s;
    });
    G.segs.forEach(function (s) { try { s.lw = s.label.getComputedTextLength(); } catch (e) { s.lw = 0; } s.fits = s.lw <= s.w - 8; });
    var arc = parseFloat(token('--rcc-step-arc')) / 100 || 0.12;
    G.flat = [RAIL.left, y, lerp(RAIL.left, RAIL.right, arc), y, RAIL.right];
    // The cover Step lives in the .cover__step box, in stage units.
    var cover = slides.filter(function (s) { return s._kind === 'cover'; })[0], box = cover && one('.cover__step', cover);
    if (box && deck.clientWidth && box.getBoundingClientRect().height > 2 * RAIL.coverStroke * deck.clientWidth / 1920) {
      var u = deck.clientWidth / 1920, dr = deck.getBoundingClientRect(), br = box.getBoundingClientRect(), half = RAIL.coverStroke / 2;
      var x0 = (br.left - dr.left) / u, x1 = (br.right - dr.left) / u, y0 = (br.top - dr.top) / u, y1 = (br.bottom - dr.top) / u;
      G.cover = [x0, y1 - half, lerp(x0, x1, arc), y0 + half, x1];
    } else G.cover = G.flat.slice();
  }
  function railTarget(i) {
    if (slides[i]._kind === 'cover') return { t: 0, fill: 0 };
    var V = visible(), j = V.indexOf(i);
    return { t: 1, fill: j < 0 ? R.fill : j + 1 };
  }
  function renderRail() {
    if (!G.flat) return;
    var f = clamp(R.t / 0.7, 0, 1);                 // the Step lies flat over the first 70%
    var n = G.flat.map(function (v, k) { return lerp(G.cover[k], v, f); });
    railMorph.setAttribute('d', toD(n));
    railMorph.setAttribute('stroke-width', r2(lerp(RAIL.coverStroke, RAIL.stroke, f)));
    var len = 0; try { len = railMorph.getTotalLength(); } catch (e) {}
    railMorph.style.strokeDasharray = r2(len * clamp(R.draw, 0, 1)) + ' ' + r2(len + 40);
    railMorph.style.opacity = 1 - ramp(R.t, 0.72, 0.95);
    railSegs.style.opacity = ramp(R.t, 0.6, 1);
    var at = -1;
    G.segs.forEach(function (s, k) {
      var part = clamp((R.fill - s.start) / s.n, 0, 1);
      s.fill.setAttribute('width', r2(s.w * part));
      if (R.fill > s.start && R.fill <= s.start + s.n + 1e-6) at = k;
    });
    G.segs.forEach(function (s, k) {
      s.label.classList.toggle('is-past', at >= 0 && k < at);
      s.label.classList.toggle('is-current', k === at);
      // A label too wide for its segment shows only while it is the current one.
      s.label.classList.toggle('is-hidden', !s.fits && k !== at);
    });
    // A current label wider than its segment runs over the next ones; hide what it covers.
    var cur = G.segs[at];
    if (cur && !cur.fits) G.segs.forEach(function (s, k) { if (k > at && s.x < cur.x + cur.lw + 24) s.label.classList.add('is-hidden'); });
  }

  /* ---------- Build every slide ------------------------------------------- */
  // The countdown line goes in before anything is measured, so the cover lays
  // out once with it in place. Hidden until the start is under 30 minutes away.
  slides.forEach(function (s) {
    if (s.getAttribute('data-kind') !== 'cover' || !s.hasAttribute('data-starts') || one('.cover__starts', s)) return;
    var el = make('p', 'eyebrow cover__starts'); el.style.visibility = 'hidden'; el.textContent = 'Starts in 0:00';
    var eb = one('.eyebrow', s); s.insertBefore(el, eb || s.firstChild);
  });
  slides.forEach(function (slide, i) {
    slide._i = i;
    slide._kind = slide.getAttribute('data-kind') || 'statement';
    slide._move = slide.getAttribute('data-move') || 'work';
    all('.beats li', slide).forEach(ensureBody);
    slide._clock = makeClock(slide);
    slide._compress = makeCompress(slide);
    slide._figure = makeFigure(slide);
    slide._rung = makeRung(slide);
    slide._units = buildUnits(slide);
    slide._boxes = buildBoxes(slide);
    slide._beatEls = all('[data-beat]', slide);
    slide._beats = slide._compress ? slide._compress.steps : slide._beatEls.length;
  });

  /* ---------- State -------------------------------------------------------- */
  var S = { i: 0, b: 0, room: recall('room') === '1', tl: null, last: 'none', style: 'none', presenting: false };
  function visible() {
    if (!S.room) return slides.map(function (s, i) { return i; });
    var v = slides.map(function (s, i) { return s.hasAttribute('data-room') ? i : -1; }).filter(function (i) { return i >= 0; });
    return v.length ? v : slides.map(function (s, i) { return i; });
  }

  function setBeats(slide, b) {
    slide._beatEls.forEach(function (el, k) {
      el.classList.toggle('is-pending', k >= b);
      el.classList.toggle('is-past', k < b - 1 && el.matches('.beats li'));
    });
  }
  function resetUnits(list) { if (gsap) gsap.set(list.map(function (u) { return u.el; }), { yPercent: 0 }); }

  // The whole deck, set to "slide i, beat b", from nothing. Idempotent.
  function applyState(i, b) {
    var slide = slides[i];
    S.i = i; S.b = b;
    slides.forEach(function (s, k) {
      var on = k === i;
      s.classList.toggle('is-current', on);
      if (!on && s._clock) s._clock.pause();
      clearStage(s);
      clearBoxes(s);
    });
    syncVideos(slide);
    var moved = deck.classList.contains('is-moving');
    deck.classList.remove('is-3d', 'is-staging', 'is-moving');
    setGround(slide, moved);
    fxEdge.setAttribute('d', ''); fxBand.setAttribute('points', '');
    setBeats(slide, b);
    resetUnits(unitsFor(slide, 0, b));
    if (slide._compress) { slide._compress.state.v = b; slide._compress.render(b); }
    if (slide._figure) { slide._figure.state.p = 1; slide._figure.render(1); }
    if (slide._rung) { slide._rung.state.p = 1; slide._rung.render(1); }
    var rt = railTarget(i); R.t = rt.t; R.fill = rt.fill; R.draw = 1; renderRail();
    chromeText();
  }
  function surf(s) { return s.getAttribute('data-surface') || ''; }
  // A clip on a photo slide plays only while its slide is on the stage, and never
  // under reduced motion or in the reading stack (motion.md §5.6: it is the
  // slide's subject, and it stops when the slide is not the one being shown).
  var videos = all('.photo video, .grid video');
  function syncVideos(current) {
    videos.forEach(function (v) {
      var on = S.presenting && !reduceMQ.matches && current && current.contains(v);
      if (on) { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!v.paused) v.pause();
    });
  }
  // The stage's ground. While presenting, slides are transparent and the deck
  // paints the current surface, so a change of color with no stage move behind it
  // (a cut, the offline fallback) crossfades on the effects track instead of
  // snapping. During a stage move the slides paint their own surfaces (.is-moving),
  // because the wipe's edge is the color change. Instant after a move: the
  // incoming slide already covers the stage in that color.
  function setGround(slide, instant) {
    var c = getComputedStyle(slide).getPropertyValue('--rcc-surface').trim();
    if (instant) { deck.style.transition = 'none'; deck.style.backgroundColor = c; void deck.offsetWidth; deck.style.transition = ''; }
    else deck.style.backgroundColor = c;
  }
  function clearStage(s) {
    s.classList.remove('is-leaving');
    ['transform', 'transformOrigin', 'clipPath', 'filter', 'zIndex', 'borderRadius', 'boxShadow'].forEach(function (p) { s.style[p] = ''; });
  }
  function chromeText() {
    var slide = slides[S.i], V = visible(), pos = V.indexOf(S.i);
    chrome.setAttribute('data-surface', surf(slide));
    deck.classList.toggle('on-cover', slide._kind === 'cover');
    deck.classList.toggle('on-demo', slide._kind === 'demo');
    deck.classList.toggle('on-rung', !!slide._rung);
    var bleed = slide._kind === 'photo' ? (slide.getAttribute('data-layout') || 'bleed-right') : '';
    deck.classList.toggle('on-bleed-right', bleed === 'bleed-right');
    deck.classList.toggle('on-bleed-left', bleed === 'bleed-left');
    ledger.textContent = slide.getAttribute('data-ledger') || deck.getAttribute('data-ledger') || '';
    var text = pad(pos + 1) + ' / ' + pad(V.length);
    if (S.room) text += ' · Room';
    else if (pos === 0) text += ' · ? for keys';
    counter.textContent = text;
    if (history.replaceState) history.replaceState(null, '', '#' + (S.i + 1));
    renderNotes();
  }
  function announce(slide, b) {
    var V = visible(), pos = V.indexOf(slide._i), label = slide.getAttribute('aria-label');
    if (!label) { var h = one('h1, h2', slide); label = h ? h.textContent.replace(/\s+/g, ' ').trim() : ''; }
    if (b > 0 && slide._beatEls[b - 1]) live.textContent = slide._beatEls[b - 1].textContent.replace(/\s+/g, ' ').trim();
    else live.textContent = 'Slide ' + (pos + 1) + ' of ' + V.length + (label ? ': ' + label : '');
  }

  /* ---------- Transitions (motion.md §5.9, presentation.md §13.6) --------- */
  function timerRunning() { var c = slides[S.i]._clock; return !!(c && c.running); }
  function kindOf(i, ni) {
    if (!S.presenting || reduceMQ.matches || S.room || timerRunning()) return 'cut';
    if (ni === i) return 'hold';
    var a = slides[i], z = slides[ni];
    if (a._kind === 'cover' || z._kind === 'cover') return 'unfold';
    return a._move === z._move ? 'ascend' : 'turn';
  }
  function finish() { if (S.tl) { var tl = S.tl; S.tl = null; tl.progress(1); tl.kill(); } }

  // The stage moves only when the meaning changes (motion.md §5.9). A slide may
  // name the style it arrives with; going back plays the style that brought the
  // current slide in, mirrored. Otherwise: a new movement climbs (step), a new
  // surface sweeps in, and anything else is the plain rise.
  var STYLES = ['rise', 'step', 'sweep', 'rotate', 'deal'];
  function styleOf(kind, from, to, dir) {
    var named = (dir < 0 ? from : to).getAttribute('data-transition');
    if (named && STYLES.indexOf(named) >= 0) return named;
    if (kind === 'turn') return 'step';
    return surf(from) !== surf(to) ? 'sweep' : 'rise';
  }
  var IN_OUT = cubicBezier(0.65, 0, 0.35, 1), TURN = cubicBezier(0.6, 0, 0.25, 1);
  function pct(n) { return r2(n) + '%'; }

  // Each style is a pure function of p in [0, 1] (and the direction), so a
  // transition in flight can be landed at any point and reversed exactly.
  function stageRender(style, from, to, dir) {
    var W = deck.clientWidth || 1920, u = W / 1920;
    var acc = getComputedStyle(to).getPropertyValue('--rcc-primary').trim() || '#00732d';
    if (style === 'step') {
      var N = 4, lag = 0.14, xs = [];
      for (var q = 0; q <= N; q++) xs.push(q * 100 / N);
      fxEdge.setAttribute('stroke', acc); fxEdge.setAttribute('stroke-width', 14);
      return function (p) {
        var hs = [];
        for (var c = 0; c < N; c++) {
          var col = dir > 0 ? c : N - 1 - c;            // forward climbs left to right
          hs.push(EASE.arrive(clamp((p - col * lag) / (1 - (N - 1) * lag), 0, 1)) * 100);
        }
        var pts = dir > 0 ? ['0% 100%'] : ['0% 0%'], d = '';
        hs.forEach(function (h, c) {
          var y = dir > 0 ? 100 - h : h;
          pts.push(pct(xs[c]) + ' ' + pct(y), pct(xs[c + 1]) + ' ' + pct(y));
          d += (c ? 'L' : 'M') + r2(xs[c] * 19.2) + ' ' + r2(y * 10.8) + 'H' + r2(xs[c + 1] * 19.2);
        });
        pts.push(dir > 0 ? '100% 100%' : '100% 0%');
        to.style.clipPath = 'polygon(' + pts.join(', ') + ')';
        fxEdge.setAttribute('d', d);
        fxEdge.style.opacity = 1 - ramp(p, 0.72, 0.96);
        chrome.setAttribute('data-surface', surf(p < 0.55 ? from : to));
      };
    }
    if (style === 'sweep') {
      var sk = 14, band = 4;
      return function (p) {
        var e = IN_OUT(p) * (100 + sk + band);
        function X(x) { return pct(dir > 0 ? x : 100 - x); }
        to.style.clipPath = 'polygon(' + [X(0) + ' 0%', X(e) + ' 0%', X(e - sk) + ' 100%', X(0) + ' 100%'].join(', ') + ')';
        var b = [[e, 0], [e + band, 0], [e + band - sk, 100], [e - sk, 100]];
        fxBand.setAttribute('points', b.map(function (v) { return r2((dir > 0 ? v[0] : 100 - v[0]) * 19.2) + ',' + r2(v[1] * 10.8); }).join(' '));
        fxBand.setAttribute('fill', acc);
        from.style.transform = 'translateX(' + r2(-5 * dir * IN_OUT(p)) + '%)';
        from.style.filter = 'brightness(' + r2(1 - 0.18 * p) + ')';
        chrome.setAttribute('data-surface', surf(e - sk / 2 < 60 ? from : to));
      };
    }
    if (style === 'rotate') {
      var half = W / 2;
      return function (p) {
        var t = TURN(p), s = 1 - 0.12 * Math.sin(Math.PI * t);
        function face(a) { return 'scale(' + r2(s * 1000) / 1000 + ') translateZ(' + r2(-half) + 'px) rotateY(' + r2(a) + 'deg) translateZ(' + r2(half) + 'px)'; }
        from.style.transform = face(-90 * dir * t);
        to.style.transform = face(90 * dir * (1 - t));
        from.style.filter = 'brightness(' + r2(1 - 0.55 * t) + ')';
        to.style.filter = 'brightness(' + r2(0.45 + 0.55 * t) + ')';
        chrome.setAttribute('data-surface', surf(t < 0.5 ? from : to));
      };
    }
    // deal: forward, the next card lands on the stack; back, the top card lifts away.
    var top = dir > 0 ? to : from, under = dir > 0 ? from : to, R0 = 28 * u;
    top.style.zIndex = 1; under.style.zIndex = 0; top.style.transformOrigin = '50% 100%';
    return function (p) {
      var t = dir > 0 ? EASE.arrive(p) : 1 - EASE.exit(p);     // t = how landed the top card is
      top.style.transform = 'translateY(' + r2((1 - t) * 104) + '%) rotateX(' + r2((1 - t) * 16) + 'deg)';
      top.style.borderRadius = r2(R0 * (1 - t)) + 'px';
      top.style.boxShadow = t < 0.999 ? '0 ' + r2(-24 * u) + 'px ' + r2(80 * u) + 'px rgb(0 0 0 / ' + r2(0.35 * (1 - t) + 0.1) + ')' : '';
      under.style.transform = 'scale(' + r2((1 - 0.08 * t) * 1000) / 1000 + ')';
      under.style.filter = 'brightness(' + r2(1 - 0.4 * t) + ')';
      under.style.borderRadius = r2(R0 * t) + 'px';
      chrome.setAttribute('data-surface', surf(t > 0.5 ? top : under));
    };
  }

  function go(ni, nb, dir) {
    finish();
    var i = S.i, b = S.b, kind = kindOf(i, ni);
    S.last = kind + (dir < 0 ? '-back' : ''); S.style = kind;
    var from = slides[i], to = slides[ni];
    if (kind !== 'hold') setGround(to, false);      // the fade starts with the press
    if (kind === 'cut') { applyState(ni, nb); announce(to, ni === i ? nb : 0); return; }
    if (!motionOn()) { applyState(ni, nb); cssEntrance(to, ni === i ? b : -1, nb, dir); announce(to, ni === i ? nb : 0); return; }

    var beat = dur('beat'), move = dur('move'), back = dir < 0 ? 0.6 : 1;
    var tl = gsap.timeline({ onComplete: function () { if (S.tl === tl) S.tl = null; applyState(ni, nb); } });
    S.tl = tl;

    if (kind === 'hold') {
      if (from._compress) {
        tl.to(from._compress.state, { v: nb, duration: 2 * beat * back, ease: 'none', onUpdate: function () { from._compress.render(from._compress.state.v); } });
      } else if (dir > 0) {
        setBeats(from, nb);
        var inU = unitsFor(from, nb, nb).map(function (u) { return u.el; });
        var ks = unitsFor(from, nb, nb).map(function (u) { return u.k; });
        boxesIn(tl, boxesFor(from, nb, nb), 0);
        tl.fromTo(inU, { yPercent: 110 }, { yPercent: 0, duration: beat, ease: EASE.arrive, stagger: function (q) { return ks[q] * STAGGER; } }, 0.06);
      } else {
        var outU = unitsFor(from, b, b).map(function (u) { return u.el; });
        tl.to(outU, { yPercent: 110, duration: 0.3 * beat, ease: EASE.exit });
        boxesOut(tl, boxesFor(from, b, b), 0, -1);
      }
      announce(from, nb);
      return;
    }

    var style = styleOf(kind, from, to, dir);
    S.style = style;
    if (style !== 'rise') { stageGo(tl, style, from, to, ni, nb, dir, kind, back); return; }

    // Ascend, Turn, Unfold. Forward climbs: out goes up, in rises from below.
    // Backward runs the other way at the tier below (§5.9).
    var D = (kind === 'ascend' ? beat : move) * back;
    var outEls = unitsFor(from, 0, b).map(function (u) { return u.el; });
    var inList = unitsFor(to, 0, nb), inEls = inList.map(function (u) { return u.el; }), inK = inList.map(function (u) { return u.k; });
    var sign = dir < 0 ? -1 : 1;
    tl.to(outEls, { yPercent: -110 * sign, duration: 0.3 * beat, ease: EASE.exit });
    boxesOut(tl, boxesFor(from, 0, b), 0, sign);
    tl.add(function () {
      gsap.set(inEls, { yPercent: 110 * sign });
      slides.forEach(function (s, k) { s.classList.toggle('is-current', k === ni); });
      setBeats(to, nb);
      S.i = ni; S.b = nb;
      if (to._compress) to._compress.render(nb);
      if (to._figure) to._figure.render(dir > 0 ? 0 : 1);
      if (to._rung) to._rung.render(dir > 0 ? 0 : 1);
      chromeText();
      if (from._clock) from._clock.pause();
    });
    // On a climb rung the camera moves first; the heading rises as it settles.
    var hold = dir > 0 && to._rung && to._rung.camera ? to._rung.duration * 0.62 : 0;
    var rt = railTarget(ni);
    tl.to(R, { t: rt.t, fill: rt.fill, duration: D, ease: EASE.arrive, onUpdate: renderRail });
    tl.to(inEls, { yPercent: 0, duration: D, delay: hold, ease: EASE.arrive, stagger: function (q) { return inK[q] * STAGGER; } }, '<');
    boxesIn(tl, boxesFor(to, 0, nb), tl.recent().startTime() + hold, back);
    if (dir > 0 && to._figure) { to._figure.state.p = 0; tl.to(to._figure.state, { p: 1, duration: move, ease: EASE.arrive, onUpdate: function () { to._figure.render(to._figure.state.p); } }, '<0.25'); }
    if (dir > 0 && to._rung) { to._rung.state.p = 0; tl.to(to._rung.state, { p: 1, duration: to._rung.duration, ease: 'none', onUpdate: function () { to._rung.render(to._rung.state.p); } }, '<'); }
    announce(to, 0);
  }

  // A stage transition: both slides are on the stage and the slides themselves
  // move. The deck's state switches at the start, so the chrome, the notes, and a
  // press in flight all read the new slide; applyState() clears it all at the end.
  function stageGo(tl, style, from, to, ni, nb, dir, kind, back) {
    var inList = unitsFor(to, 0, nb), inEls = inList.map(function (u) { return u.el; }), inK = inList.map(function (u) { return u.k; });
    var sign = dir < 0 ? -1 : 1, move = dur('move');
    from.classList.add('is-leaving');
    slides.forEach(function (s) { s.classList.toggle('is-current', s === to); });
    setBeats(to, nb);
    S.i = ni; S.b = nb;
    if (to._compress) to._compress.render(nb);
    if (to._figure) to._figure.render(dir > 0 ? 0 : 1);
    if (to._rung) to._rung.render(dir > 0 ? 0 : 1);
    if (from._clock) from._clock.pause();
    chromeText();
    deck.classList.add('is-moving');
    syncVideos(to);
    if (style === 'rotate' || style === 'deal') deck.classList.add('is-3d', 'is-staging');
    if (style === 'step' || style === 'sweep') { from.style.zIndex = 0; to.style.zIndex = 1; }
    var render = stageRender(style, from, to, dir), P = { p: 0 };
    render(0);
    var D = { step: 1.35, sweep: 1.15, rotate: 1.3, deal: 1.0 }[style] * move * back;
    tl.to(P, { p: 1, duration: D, ease: 'none', onUpdate: function () { render(P.p); } }, 0);
    var rt = railTarget(ni);
    tl.to(R, { t: rt.t, fill: rt.fill, duration: D, ease: EASE.arrive, onUpdate: renderRail }, 0);
    // On the wipes the words still rise, once the edge has passed them.
    if (style === 'step' || style === 'sweep') {
      gsap.set(inEls, { yPercent: 110 * sign });
      tl.to(inEls, { yPercent: 0, duration: move * back, ease: EASE.arrive, stagger: function (q) { return inK[q] * STAGGER; } }, D * 0.26);
      boxesIn(tl, boxesFor(to, 0, nb), D * 0.22, back);
    } else {
      gsap.set(inEls, { yPercent: 0 });
      // The slide itself is moving on a turn or a deal; its boxes land a beat after it.
      boxesIn(tl, boxesFor(to, 0, nb), D * 0.55, back);
    }
    var late = D * 0.6;
    if (dir > 0 && to._figure) { to._figure.state.p = 0; tl.to(to._figure.state, { p: 1, duration: move, ease: EASE.arrive, onUpdate: function () { to._figure.render(to._figure.state.p); } }, late); }
    if (dir > 0 && to._rung) { to._rung.state.p = 0; tl.to(to._rung.state, { p: 1, duration: to._rung.duration, ease: 'none', onUpdate: function () { to._rung.render(to._rung.state.p); } }, late); }
    announce(to, 0);
  }

  // No GSAP: the same entrances by CSS keyframes, everything else at its end state.
  function cssEntrance(slide, fromBeat, toBeat, dir) {
    if (reduceMQ.matches || !S.presenting) return;
    if (fromBeat >= 0) {                           // a beat on the same slide
      if (dir < 0 || toBeat < 1) return;
      var el = slide._beatEls[toBeat - 1]; if (!el) return;
      el.classList.remove('is-revealing'); void el.offsetWidth; el.classList.add('is-revealing');
      return;
    }
    slide.classList.remove('is-entering'); void slide.offsetWidth; slide.classList.add('is-entering');
    clearTimeout(slide._enterT);
    slide._enterT = setTimeout(function () { slide.classList.remove('is-entering'); }, 2000);
  }

  // Every press first lands the transition in flight, then reads the state. Read
  // first and a fast second press recomputes the same target and is lost.
  function next() {
    finish();
    var slide = slides[S.i];
    if (S.b < slide._beats) { go(S.i, S.b + 1, 1); return; }
    var V = visible(), pos = V.indexOf(S.i);
    if (pos < 0) pos = V.filter(function (k) { return k < S.i; }).length - 1;
    if (pos + 1 < V.length) go(V[pos + 1], 0, 1);
  }
  function prev() {
    finish();
    if (S.b > 0) { go(S.i, S.b - 1, -1); return; }
    var V = visible(), pos = V.indexOf(S.i);
    if (pos < 0) pos = V.filter(function (k) { return k < S.i; }).length;
    if (pos - 1 >= 0) { var p = V[pos - 1]; go(p, slides[p]._beats, -1); }
  }
  function jump(i) { finish(); S.last = 'cut'; S.style = 'cut'; applyState(i, 0); announce(slides[i], 0); }

  /* ---------- Cover: the opening, and the optional countdown ------------- */
  function coverEntrance() {
    var cover = slides[S.i];
    if (cover._kind !== 'cover' || !S.presenting) return;
    if (!motionOn()) { cssEntrance(cover, -1, 0, 1); return; }
    var list = unitsFor(cover, 0, 0), els = list.map(function (u) { return u.el; }), ks = list.map(function (u) { return u.k; });
    var tl = gsap.timeline({ onComplete: function () { if (S.tl === tl) S.tl = null; applyState(S.i, S.b); } });
    S.tl = tl;
    R.t = 0; R.fill = 0; R.draw = 0; renderRail();
    tl.fromTo(els, { yPercent: 110 }, { yPercent: 0, duration: dur('move'), ease: EASE.arrive, stagger: function (q) { return ks[q] * STAGGER; } }, 0.15);
    tl.to(R, { draw: 1, duration: dur('move'), ease: EASE.arrive, onUpdate: renderRail }, 0.75);
    // Backstop on a timer, not on frames: where no animation frames run (a
    // thumbnail capture, a throttled tab) the cover would otherwise stay blank.
    setTimeout(function () { if (S.tl === tl) finish(); }, tl.duration() * 1000 + 400);
  }
  var countdown = null;
  function startCountdown() {
    var cover = slides.filter(function (s) { return s._kind === 'cover' && s.hasAttribute('data-starts'); })[0];
    var el = cover && one('.cover__starts', cover);
    if (!el) return;
    var hm = cover.getAttribute('data-starts').split(':');
    function paint() {
      var now = new Date(), at = new Date(now); at.setHours(+hm[0], +hm[1], 0, 0);
      var ms = at - now;
      el.style.visibility = ms > 0 && ms < 30 * 60000 ? 'visible' : 'hidden';
      el.textContent = 'Starts in ' + fmt(ms);
    }
    paint(); countdown = setInterval(paint, 1000);
  }

  /* ---------- Notes, help, toast ------------------------------------------ */
  var notes = make('aside', 'deck-notes', document.body); notes.hidden = true; notes.setAttribute('aria-label', 'Speaker notes');
  function renderNotes() {
    if (notes.hidden) return;
    var src = one('.notes', slides[S.i]);
    notes.innerHTML = '<h2>Notes, slide ' + (S.i + 1) + '</h2>' + (src ? src.innerHTML : '<p>No notes on this slide.</p>');
  }
  var help = make('div', 'deck-help', document.body); help.hidden = true; help.setAttribute('role', 'dialog'); help.setAttribute('aria-label', 'Keys');
  help.innerHTML = '<h2>Keys</h2><table><tbody>' + [
    ['→  Space  Page Down', 'Next beat or slide'], ['←  Page Up', 'Back'], ['Home  End', 'First, last'],
    ['T', 'Start or pause the clock'], ['R', 'Reset the clock'], ['5', 'Room mode'], ['P', 'Reload the phone'], ['N', 'Speaker notes'],
    ['D', 'Dark, for laptop preview'], ['F', 'Fullscreen'], ['?', 'This help']
  ].map(function (r) { return '<tr><td>' + r[0].split('  ').map(function (k) { return '<kbd>' + k + '</kbd>'; }).join(' ') + '</td><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table>';
  var toast = make('p', 'deck-toast', document.body), toastT = 0;
  function say(msg) { toast.textContent = msg; toast.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(function () { toast.classList.remove('is-on'); }, 1600); }

  /* ---------- Modes -------------------------------------------------------- */
  function setRoom(on) {
    finish();
    S.room = on; store('room', on ? '1' : '0');
    layoutRail();
    var V = visible();
    if (V.indexOf(S.i) < 0) { var after = V.filter(function (k) { return k > S.i; }); jump(after.length ? after[0] : V[V.length - 1]); }
    else applyState(S.i, S.b);
    say(on ? 'Room mode: ' + V.length + ' slides' : 'Full deck: ' + V.length + ' slides');
  }
  function setTheme(t) { root.setAttribute('data-theme', t); store('theme', t); if (S.presenting) setGround(slides[S.i], true); }
  var FORCE_STACK = /[?&]stack\b/.test(location.search);
  function setMode() {
    var presenting = !FORCE_STACK && window.innerWidth >= 700;
    if (presenting === S.presenting) return;
    finish();
    S.presenting = presenting;
    root.classList.toggle('is-presenting', presenting);
    if (presenting) layoutRail();
    if (!presenting) {
      deck.style.backgroundColor = '';
      syncVideos(null);
      slides.forEach(function (s) {
        if (gsap) gsap.set(s._units.map(function (u) { return u.el; }), { clearProps: 'transform' });
        s._beatEls.forEach(function (el) { el.classList.remove('is-pending', 'is-past'); });
        if (s._figure) s._figure.render(1);
        if (s._rung) s._rung.render(1);
      });
    } else applyState(S.i, S.b);
  }
  // demo slides: the phone's screen is a real 440 x 956 CSS px viewport, scaled
  // so its 956 px fill the 856 stage px of glass (deck.css).
  var devices = [].slice.call(deck.querySelectorAll('.device'));
  function sizeDevices() {
    if (devices.length) root.style.setProperty('--device-scale', String((deck.clientWidth / 1920 || 1) * 856 / 956));
  }
  // Keys typed into the phone go to the app, never to the deck, so show who has them.
  function syncDeviceKeys() {
    devices.forEach(function (d) { d.classList.toggle('has-keys', document.activeElement === one('iframe', d)); });
  }
  window.addEventListener('blur', function () { setTimeout(syncDeviceKeys, 0); });
  window.addEventListener('focus', syncDeviceKeys);
  function remeasure() {
    finish();
    sizeDevices();
    slides.forEach(function (s) { measure(s); if (s._compress) s._compress.reserve(); if (s._figure) s._figure.reserve(); if (s._rung) s._rung = makeRung(s); });
    layoutRail();
    if (S.presenting) applyState(S.i, S.b);
    else slides.forEach(function (s) { if (s._compress) s._compress.render(s._compress.steps); });
  }

  /* ---------- Input -------------------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (!S.presenting && !/^[?dD]$/.test(e.key)) return;
    var k = e.key;
    // Enter and Space belong to a focused link or button (the QR link), not to the deck.
    if ((k === 'Enter' || k === ' ') && t && t.closest && t.closest('a[href], button')) return;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Enter') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); jump(visible()[0]); }
    else if (k === 'End') { e.preventDefault(); var V = visible(); jump(V[V.length - 1]); }
    else if (k === 't' || k === 'T') { var c = slides[S.i]._clock; if (c) { c.toggle(); } else say('No clock on this slide'); }
    else if (k === 'r' || k === 'R') { var c2 = slides[S.i]._clock; if (c2) { c2.reset(); say('Clock reset'); } }
    else if (k === '5') setRoom(!S.room);
    else if (k === 'p' || k === 'P') {
      var phone = one('.device iframe', slides[S.i]);
      if (phone) { phone.src = phone.src; say('Phone reloaded'); } else say('No phone on this slide');
    }
    else if (k === 'n' || k === 'N') { notes.hidden = !notes.hidden; renderNotes(); }
    else if (k === 'd' || k === 'D') { setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); say(root.getAttribute('data-theme') === 'dark' ? 'Dark (preview only)' : 'Light'); }
    else if (k === 'f' || k === 'F') {
      // A sandboxed frame (an artifact viewer, an embed) may refuse fullscreen; say so rather than throw.
      if (document.fullscreenElement) document.exitFullscreen();
      else if (root.requestFullscreen) { var fs = root.requestFullscreen(); if (fs && fs.catch) fs.catch(function () { say('Fullscreen is blocked here. Open the file directly.'); }); }
    }
    else if (k === '?' || k === '/') { help.hidden = !help.hidden; }
    else if (k === 'Escape') { help.hidden = true; notes.hidden = true; }
  });
  var swipe = null;
  deck.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') swipe = { x: e.clientX, y: e.clientY }; });
  deck.addEventListener('pointerup', function (e) {
    if (!swipe || !S.presenting) return;
    var dx = e.clientX - swipe.x, dy = e.clientY - swipe.y; swipe = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { if (dx < 0) next(); else prev(); }
  });
  var resizeT = 0;
  window.addEventListener('resize', function () { clearTimeout(resizeT); resizeT = setTimeout(function () { setMode(); remeasure(); }, 120); });
  window.addEventListener('hashchange', function () { var n = parseInt(location.hash.slice(1), 10); if (n >= 1 && n <= slides.length && n - 1 !== S.i) jump(n - 1); });

  /* ---------- Start -------------------------------------------------------- */
  var saved = recall('theme');
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  var n0 = parseInt((location.hash || '').slice(1), 10);
  S.i = n0 >= 1 && n0 <= slides.length ? n0 - 1 : 0;
  if (S.room && visible().indexOf(S.i) < 0) S.i = visible()[0];
  S.presenting = !FORCE_STACK && window.innerWidth >= 700;
  root.classList.toggle('is-presenting', S.presenting);
  slides.forEach(measure);
  layoutRail();
  if (S.presenting) {
    applyState(S.i, 0);
    // Hold the cover's title below its masks until fonts land, so lines are
    // measured against the real face and nothing flashes before it rises.
    if (slides[S.i]._kind === 'cover' && motionOn()) { gsap.set(unitsFor(slides[S.i], 0, 0).map(function (u) { return u.el; }), { yPercent: 110 }); R.draw = 0; renderRail(); }
  }
  // Start once fonts land or after a second, whichever is first. If the webfont
  // lands later, measure again: line groups and the cover Step's box both
  // depend on the real face (remeasure lands any entrance still running).
  var begun = false;
  function begin() {
    if (begun) return; begun = true;
    remeasure();
    if (S.presenting && slides[S.i]._kind === 'cover') coverEntrance();
    startCountdown();
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (begun) remeasure(); else begin(); });
  setTimeout(begin, 1000);

  // What the deck is doing, for deck-kit/check.mjs. Read-only.
  window.__deck = {
    state: function () {
      var V = visible();
      return { i: S.i, b: S.b, pos: V.indexOf(S.i), count: V.length, room: S.room, last: S.last, style: S.style,
               busy: !!S.tl, presenting: S.presenting, gsap: !!gsap, theme: root.getAttribute('data-theme') || 'light',
               rail: { t: R.t, frac: V.length ? R.fill / V.length : 0, draw: R.draw } };
    },
    slides: slides.map(function (s) {
      return { kind: s._kind, move: s._move, room: s.hasAttribute('data-room'), beats: s._beats, timer: s._clock ? s._clock.total / 1000 : 0 };
    })
  };
})();

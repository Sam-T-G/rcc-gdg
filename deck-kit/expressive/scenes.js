/* GDG deck kit: scene library (opt-in, presentation.md §13.14). Each scene is fn(el, v, ctx): draw the picture for
   v in [0, steps], from nothing, every call. deck.js tweens v on each press, so a
   scene never runs its own clock and never moves between presses. Content comes
   from the markup inside the scene element, never from this file. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function r2(n) { return Math.round(n * 100) / 100; }
  function rgbOf(c) {
    c = (c || '').trim();
    if (c[0] === '#') { var h = c.length === 4 ? c.replace(/./g, function (x, i) { return i ? x + x : ''; }) : c.slice(1); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
    var m = c.match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : [0, 0, 0];
  }
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function stage(host) {
    var svg = el('svg', { viewBox: '0 0 1728 640', 'aria-hidden': 'true', focusable: 'false' });
    host.appendChild(svg);
    return svg;
  }
  function text(parent, x, y, cls, size, str, anchor) {
    var t = el('text', { x: x, y: y, class: cls, 'font-size': size, 'text-anchor': anchor || 'middle' }, parent);
    t.textContent = str;
    return t;
  }

  /* dots: people arrive one by one, then sort into teams, then each team gets a lead.
     An optional fourth step moves people to another team (data-moves="person:team,...",
     both counted from 0; leads are each team's first person and never move).
     <div data-scene="dots" data-steps="3|4" data-teams="4,3,3" data-row="About ten of us"
          data-names="Check-in,Live slides,Professor view" data-lead="Lead" data-moves="2:1"> */
  function dots(host, v, ctx) {
    var S = host._s;
    if (!S) {
      var teams = host.getAttribute('data-teams').split(',').map(Number), n = teams.reduce(function (a, b) { return a + b; }, 0);
      var names = (host.getAttribute('data-names') || '').split(',');
      var svg = stage(host), cx = [], spread = 1728 / teams.length;
      teams.forEach(function (_, t) { cx.push(spread * (t + 0.5)); });
      // Where seat j of a team of `size` sits, around the team's center.
      function slot(t, j, size) {
        var rows = Math.ceil(size / 2);
        return { x: cx[t] + ((j % 2) - 0.5) * 128 * (size === 1 ? 0 : 1), y: 270 + Math.floor(j / 2) * 128 - (rows - 1) * 64 };
      }
      S = host._s = { svg: svg, items: [], teamLabels: [] };
      var k = 0;
      teams.forEach(function (size, t) {
        for (var j = 0; j < size; j++, k++) {
          var g = el('g', {}, svg);
          el('circle', { r: 46, class: 'sc-dot' }, g);
          var lead = el('circle', { r: 46, class: 'sc-dot sc-dot--lead' }, g);
          var ring = el('circle', { r: 60, class: 'sc-ring' }, g);
          S.items.push({ g: g, lead: j === 0 ? lead : null, ring: ring, k: k, team: t,
            a: { x: 864 + (k - (n - 1) / 2) * 150, y: 280 }, b: slot(t, j, size) });
          if (j !== 0) lead.remove();
        }
        S.teamLabels.push(text(svg, cx[t], 520, 'sc-label', 48, names[t] || ('Team ' + (t + 1))));
      });
      // After the moves: each person's new team, then re-seat every team in order.
      var moves = {};
      (host.getAttribute('data-moves') || '').split(',').filter(Boolean).forEach(function (m) { var p = m.split(':').map(Number); moves[p[0]] = p[1]; });
      S.moved = Object.keys(moves).length > 0;
      teams.forEach(function (_, t) {
        var members = S.items.filter(function (it) { return (moves[it.k] !== undefined ? moves[it.k] : it.team) === t; });
        members.sort(function (p, q) { return (moves[p.k] !== undefined) - (moves[q.k] !== undefined) || p.k - q.k; });   // newcomers take the last seats; the lead keeps the first
        members.forEach(function (it, j) { it.c = slot(t, j, members.length); it.mover = moves[it.k] !== undefined; });
      });
      S.row = text(svg, 864, 440, 'sc-ledger', 32, host.getAttribute('data-row') || '');
      S.leadTags = S.items.filter(function (x) { return x.lead; }).map(function (x) {
        return { x: x, t: text(svg, 0, 0, 'sc-ledger sc-ledger--on', 32, host.getAttribute('data-lead') || 'Lead') };
      });
    }
    var p1 = clamp(v, 0, 1), p2 = clamp(v - 1, 0, 1), p3 = clamp(v - 2, 0, 1), p4 = S.moved ? clamp(v - 3, 0, 1) : 0, n = S.items.length;
    S.items.forEach(function (it) {
      var s = ctx.ease.pop(clamp((p1 - it.k * (0.5 / n)) / 0.5, 0, 1));
      var m = smooth((p2 - it.k * 0.03) / 0.7);
      // Movers lift out first and land last; the people who make room shuffle in between.
      var w = it.mover ? smooth((p4 - 0.1) / 0.8) : smooth((p4 - 0.35) / 0.5);
      var hop = it.mover ? Math.sin(Math.PI * w) * -90 : 0;
      var x = lerp(lerp(it.a.x, it.b.x, m), it.c.x, w), y = lerp(lerp(it.a.y, it.b.y, m), it.c.y, w) + hop;
      it.g.setAttribute('transform', 'translate(' + r2(x) + ' ' + r2(y) + ') scale(' + r2(s * 1000) / 1000 + ')');
      it.pos = { x: x, y: y };
      if (it.lead) it.lead.style.opacity = r2(smooth(p3 / 0.6));
      it.ring.style.opacity = it.mover ? r2(smooth(p4 / 0.25)) : 0;
    });
    S.row.style.opacity = r2(smooth(p1 * 2) * (1 - smooth(p2 * 2)));
    S.teamLabels.forEach(function (t, i) { t.style.opacity = r2(smooth((p2 - 0.4 - i * 0.08) / 0.4)); });
    S.leadTags.forEach(function (lt) {
      lt.t.setAttribute('x', r2(lt.x.pos.x)); lt.t.setAttribute('y', r2(lt.x.pos.y - 70));
      lt.t.style.opacity = r2(smooth((p3 - 0.2) / 0.5));
    });
  }

  /* flow: each press adds the next stop; the line to it draws and a dot carries
     the data along it. <div data-scene="flow" data-steps="N"><ol class="flow-src">
     <li data-d="what it does">Name</li> ... With fewer steps than stops
     (data-steps="1"), each press draws its share of the stops in order. */
  var flowCount = 0;
  function flow(host, v, ctx) {
    var S = host._s;
    if (!S) {
      var src = Array.prototype.map.call(host.querySelectorAll('.flow-src li'), function (li) { return { t: li.textContent.trim(), d: li.getAttribute('data-d') || '' }; });
      var svg = stage(host), n = src.length, gap = 1728 / n, W = Math.min(352, gap - 104), Y = 210;
      var hid = 'flow-head-' + (++flowCount);   // one id per diagram: a marker inside a hidden slide draws nothing
      S = host._s = { nodes: [], links: [], head: 'url(#' + hid + ')' };
      var defs = el('defs', {}, svg);
      var mk = el('marker', { id: hid, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto' }, defs);
      el('path', { d: 'M0 0L10 5L0 10Z', class: 'sc-head' }, mk);
      src.forEach(function (s, i) {
        var cx = gap * (i + 0.5);
        if (i > 0) {
          var x0 = gap * (i - 0.5) + W / 2 + 12, x1 = cx - W / 2 - 18;
          var line = el('path', { d: 'M' + r2(x0) + ' ' + Y + 'H' + r2(x1), pathLength: 1, class: 'sc-link' }, svg);
          var dot = el('circle', { r: 14, class: 'sc-packet' }, svg);
          S.links.push({ line: line, dot: dot, x0: x0, x1: x1 });
        }
        var g = el('g', { class: 'sc-node' }, svg);
        el('rect', { x: r2(cx - W / 2), y: Y - 80, width: W, height: 160, rx: 28, class: 'sc-box' }, g);
        text(g, cx, Y + 17, 'sc-label', 52, s.t);
        var words = s.d.split(' '), lines = [''], max = W > 300 ? 15 : 12;
        words.forEach(function (w) { var l = lines[lines.length - 1]; if ((l + ' ' + w).trim().length > max && l) lines.push(w); else lines[lines.length - 1] = (l + ' ' + w).trim(); });
        lines.forEach(function (l, k) { text(g, cx, Y + 160 + k * 50, 'sc-detail', 40, l); });
        S.nodes.push(g);
      });
    }
    v *= S.nodes.length / Math.max(1, Math.min(ctx.steps || S.nodes.length, S.nodes.length));
    var cur = Math.round(v);
    S.nodes.forEach(function (g, i) {
      // The first stop arrives in its step; each later one after its line draws.
      var t = i === 0 ? clamp(v, 0, 1) : smooth((v - i - 0.35) / 0.65);
      g.style.clipPath = 'inset(' + r2((1 - t) * 100) + '% 0 0 0)';
      g.setAttribute('transform', 'translate(0 ' + r2((1 - ctx.ease.settle(t)) * 40) + ')');
      g.classList.toggle('is-current', i === cur - 1);
    });
    S.links.forEach(function (L, i) {
      var t = clamp((v - (i + 1)) / 0.5, 0, 1);
      L.line.style.strokeDasharray = '1 1';
      L.line.style.strokeDashoffset = r2(1 - t);
      L.line.setAttribute('marker-end', t > 0.92 ? S.head : 'none');   // a marker ignores the dash
      L.dot.setAttribute('cx', r2(lerp(L.x0, L.x1, smooth(t))));
      L.dot.setAttribute('cy', 210);
      L.dot.style.opacity = t > 0 && t < 1 ? 1 : 0;
    });
  }

  /* strip: a row of cards wider than the stage. Each press scrolls one card to the
     front and fills the time bar. <div data-scene="strip" data-steps="N">
     <ol class="strip-src"><li data-min="8" data-label="Sprint 0">Set the target.</li> */
  function strip(host, v, ctx) {
    var S = host._s;
    if (!S) {
      var src = Array.prototype.map.call(host.querySelectorAll('.strip-src li'), function (li) {
        return { min: parseFloat(li.getAttribute('data-min')), label: li.getAttribute('data-label'), line: li.textContent.trim() };
      });
      var box = document.createElement('div'); box.className = 'strip'; host.appendChild(box);
      var track = document.createElement('div'); track.className = 'strip__track'; box.appendChild(track);
      S = host._s = { track: track, cards: [], src: src, total: src.reduce(function (a, s) { return a + s.min; }, 0) };
      src.forEach(function (s) {
        var c = document.createElement('div'); c.className = 'strip__card';
        c.innerHTML = '<p class="label"></p><p class="strip__min"><span></span><small>min</small></p><p class="strip__line"></p>';
        c.querySelector('.label').textContent = s.label;
        c.querySelector('.strip__min span').textContent = String(s.min);
        c.querySelector('.strip__line').textContent = s.line;
        track.appendChild(c); S.cards.push(c);
      });
      var bar = document.createElement('div'); bar.className = 'strip__bar'; box.appendChild(bar);
      S.fill = document.createElement('div'); S.fill.className = 'strip__fill'; bar.appendChild(S.fill);
    }
    // Scroll one card (560 + gap 40) per press, but never past the point where the
    // last card sits at the right edge: after that the highlight walks on alone.
    var step = 600 * ctx.u, max = Math.max(0, S.track.scrollWidth - host.clientWidth);
    S.track.style.transform = 'translateX(' + r2(-Math.min(v * step, max)) + 'px)';
    var done = 0, x0 = -Math.min(v * step, max), W = host.clientWidth, cw = 560 * ctx.u;
    var css = getComputedStyle(host), A = rgbOf(css.getPropertyValue('--rcc-surface-container-lowest')), B = rgbOf(css.getPropertyValue('--rcc-primary'));
    S.cards.forEach(function (c, k) {
      var e = clamp(1 - Math.abs(v - k), 0, 1), left = x0 + k * step;
      // Mixed by hand into a plain rgb(), so the color is exact and contrast checks can read it.
      c.style.background = 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(lerp(A[i], B[i], e)); }).join(', ') + ')';
      c.style.color = e > 0.5 ? 'var(--rcc-on-primary)' : 'var(--rcc-on-surface)';
      c.style.visibility = left + cw < 0 || left > W ? 'hidden' : '';     // wholly off the stage
      done += S.src[k].min * clamp(v - k + 1, 0, 1);
    });
    S.fill.style.width = r2(done / S.total * 100) + '%';
  }

  /* bars: press 1 grows the bars in the order they happen, press 2 re-sorts them by
     size, press 3 lights the marked ones and brackets their total.
     <div data-scene="bars" data-steps="3" data-unit="min" data-total="of sprints">
     <ol class="bars-src"><li data-v="8" data-hl>Sprint 0</li> ... */
  function fmtNum(x, dec) { return dec ? (Math.round(x * 10) / 10).toFixed(1).replace(/\.0$/, '') : String(Math.round(x)); }
  function bars(host, v, ctx) {
    var S = host._s;
    if (!S) {
      var src = Array.prototype.map.call(host.querySelectorAll('.bars-src li'), function (li) {
        return { label: li.textContent.trim(), v: parseFloat(li.getAttribute('data-v')), hl: li.hasAttribute('data-hl') };
      });
      var svg = stage(host), n = src.length, rowH = 80, gap = 16, top = (640 - (n * rowH + (n - 1) * gap)) / 2;
      var x0 = 320, x1 = 1080, max = Math.max.apply(null, src.map(function (s) { return s.v; }));
      var rank = src.map(function (s, i) { return i; }).sort(function (p, q) { return src[q].v - src[p].v; });
      S = host._s = { items: [], x0: x0, unit: host.getAttribute('data-unit') || '' };
      src.forEach(function (s, i) {
        var g = el('g', {}, svg);
        var lab = text(g, x0 - 32, rowH / 2 + 15, 'sc-label', 44, s.label, 'end');
        var bar = el('rect', { x: x0, y: 0, height: rowH, rx: 18, width: 0, class: 'sc-bar' }, g);
        var val = text(g, x0, rowH / 2 + 15, 'sc-value', 44, '', 'start');
        S.items.push({ g: g, bar: bar, val: val, lab: lab, s: s, k: i, dec: s.v % 1 !== 0,
          a: top + i * (rowH + gap), b: top + rank.indexOf(i) * (rowH + gap), w: s.v / max * (x1 - x0) });
      });
      var hl = S.items.filter(function (x) { return x.s.hl; });
      if (hl.length) {
        var ys = hl.map(function (x) { return x.b; }), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys) + rowH, bx = 1300;
        S.bracket = el('path', { d: 'M' + (bx - 28) + ' ' + y0 + 'H' + bx + 'V' + y1 + 'H' + (bx - 28), pathLength: 1, class: 'sc-bracket' }, svg);
        S.total = hl.reduce(function (a, x) { return a + x.s.v; }, 0);
        S.totNum = text(svg, bx + 40, (y0 + y1) / 2 + 20, 'sc-total', 120, '', 'start');
        S.totLab = text(svg, bx + 44, (y0 + y1) / 2 + 76, 'sc-ledger', 32, host.getAttribute('data-total') || '', 'start');
      }
    }
    var p1 = clamp(v, 0, 1), p2 = clamp(v - 1, 0, 1), p3 = clamp(v - 2, 0, 1), n = S.items.length, lag = 0.08, span = 1 - (n - 1) * lag;
    S.items.forEach(function (it) {
      var t = clamp((p1 - it.k * lag) / span, 0, 1), grow = ctx.ease.settle(t);
      var m = smooth((p2 - it.k * 0.04) / (1 - (n - 1) * 0.04));
      var y = lerp(it.a, it.b, m), nudge = Math.sin(Math.PI * m) * (it.b < it.a ? 18 : -10);   // risers lean forward
      var w = Math.max(0, it.w * grow);
      it.g.setAttribute('transform', 'translate(' + r2(nudge) + ' ' + r2(y) + ')');
      it.bar.setAttribute('width', r2(w));
      it.val.setAttribute('x', r2(S.x0 + w + 22));
      it.val.textContent = t > 0 ? fmtNum(it.s.v * clamp(t, 0, 1), it.dec) + (S.unit ? ' ' + S.unit : '') : '';
      var on = smooth(p3 / 0.6);
      it.bar.style.fill = it.s.hl
        ? 'color-mix(in oklab, var(--rcc-primary) ' + r2(on * 100) + '%, var(--rcc-primary-container))'
        : 'color-mix(in oklab, var(--rcc-surface-container-highest) ' + r2(on * 100) + '%, var(--rcc-primary-container))';
      it.lab.style.fill = !it.s.hl && on > 0.5 ? 'var(--rcc-on-surface-variant)' : '';
    });
    if (S.bracket) {
      S.bracket.style.strokeDasharray = '1 1';
      S.bracket.style.strokeDashoffset = r2(1 - smooth((p3 - 0.15) / 0.6));
      var c = smooth((p3 - 0.3) / 0.6);
      S.totNum.textContent = c > 0 ? fmtNum(S.total * c, S.total % 1 !== 0) : '';
      S.totLab.style.opacity = r2(smooth((p3 - 0.6) / 0.4));
    }
  }

  /* odometer: one big number that rolls like a car's odometer from one value to
     the next, each press. The caption under it changes with it.
     <div data-scene="odometer" data-steps="N-1"><ol class="odo-src"><li data-v="60">caption</li> */
  function odometer(host, v, ctx) {
    var S = host._s;
    if (!S) {
      var src = Array.prototype.map.call(host.querySelectorAll('.odo-src li'), function (li) { return { v: parseFloat(li.getAttribute('data-v')), cap: li.textContent.trim() }; });
      var digits = String(Math.round(Math.max.apply(null, src.map(function (s) { return s.v; })))).length;
      var box = document.createElement('div'); box.className = 'odo'; host.appendChild(box);
      var num = document.createElement('div'); num.className = 'odo__num'; box.appendChild(num);
      S = host._s = { src: src, cols: [], caps: [] };
      for (var k = digits - 1; k >= 0; k--) {
        var col = document.createElement('span'); col.className = 'odo__col';
        var strip = document.createElement('span'); strip.className = 'odo__strip';
        [' ', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(function (d) { var c = document.createElement('span'); c.textContent = d; strip.appendChild(c); });
        col.appendChild(strip); num.appendChild(col);
        S.cols.push({ k: k, col: col, strip: strip });
      }
      var caps = document.createElement('div'); caps.className = 'odo__caps'; box.appendChild(caps);
      src.forEach(function (s) { var p = document.createElement('p'); p.className = 'odo__cap'; p.textContent = s.cap; caps.appendChild(p); S.caps.push(p); });
    }
    var n = S.src.length, i = Math.min(Math.floor(v), n - 2), f = n > 1 ? v - i : 0;
    var V = n > 1 ? lerp(S.src[Math.max(0, i)].v, S.src[Math.max(0, i) + 1].v, clamp(f, 0, 1)) : S.src[0].v;
    S.cols.forEach(function (c) {
      var unit = Math.pow(10, c.k), pos;
      if (c.k === 0) pos = ((V % 10) + 10) % 10;
      else if (V < unit) pos = -1 + clamp(V - (unit - 1), 0, 1);           // a leading zero is a blank cell
      else pos = Math.floor(V / unit) % 10 + clamp(V % unit - (unit - 1), 0, 1);
      c.strip.style.transform = 'translateY(' + r2(-(pos + 1)) + 'em)';
      c.col.style.width = c.k === 0 ? '' : r2(clamp(pos + 1, 0, 1) * 0.62) + 'em';   // a blank column folds away
    });
    S.caps.forEach(function (p, j) { p.style.transform = 'translateY(' + r2(clamp(j - v, -1, 1) * 115) + '%)'; });
  }

  /* wipe: before and after in one frame. A divider sweeps across on each press.
     <div data-scene="wipe" data-steps="2" data-stops="100,50,0" data-a="Before" data-b="After">
     <div class="wipe__a">...</div><div class="wipe__b">...</div> */
  function wipe(host, v, ctx) {
    var S = host._s;
    if (!S) {
      var h = document.createElement('div'); h.className = 'wipe__handle';
      h.innerHTML = '<span class="wipe__chip wipe__chip--a"></span><span class="wipe__grip" aria-hidden="true"></span><span class="wipe__chip wipe__chip--b"></span>';
      h.querySelector('.wipe__chip--a').textContent = host.getAttribute('data-a') || 'Before';
      h.querySelector('.wipe__chip--b').textContent = host.getAttribute('data-b') || 'After';
      host.appendChild(h);
      S = host._s = { a: host.querySelector('.wipe__a'), b: host.querySelector('.wipe__b'), h: h,
        ca: h.querySelector('.wipe__chip--a'), cb: h.querySelector('.wipe__chip--b'),
        stops: (host.getAttribute('data-stops') || '100,50,0').split(',').map(Number) };
    }
    var st = S.stops, i = Math.min(Math.floor(v), st.length - 2), x = lerp(st[i], st[i + 1], clamp(v - i, 0, 1));
    S.b.style.clipPath = 'inset(0 0 0 ' + r2(x) + '% round calc(28 * var(--u)))';
    S.a.style.transform = 'translateX(' + r2(-(100 - x) * 0.03) + '%)';     // the covered side drifts back a little
    S.h.style.left = r2(x) + '%';
    S.ca.style.opacity = x > 12 ? 1 : 0;
    S.cb.style.opacity = x < 88 ? 1 : 0;
  }

  window.DeckScenes = Object.assign(window.DeckScenes || {}, { dots: dots, flow: flow, strip: strip, bars: bars, odometer: odometer, wipe: wipe });
})();

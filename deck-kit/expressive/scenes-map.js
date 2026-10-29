/* map: a camera that flies between places, one place per press. The flight pulls
   out, travels, and drops back in (van Wijk and Nuij's smooth zoom, the curve
   behind Mapbox's flyTo), so even a long hop reads as one move.
   <div data-scene="map" data-steps="N-1" data-dur="1.8" data-ease="sweep">
   <ol class="map-src"><li data-lat data-lon data-z [data-pin]>Name</li>
   Tiles: OpenStreetMap's standard tiles, drawn greyed so our green pin and our big
   names carry the color. (CARTO's light tiles answer browsers with a key watermark.)
   Pure function of v: tiles that land later only repaint the same frame. */
(function () {
  'use strict';
  var TILE = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  var RHO = 1.42;
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  // Web Mercator, in zoom-0 pixels (the world is 256 wide).
  function world(lat, lon) {
    var s = Math.sin(lat * Math.PI / 180);
    return { x: (lon + 180) / 360 * 256, y: (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * 256 };
  }

  // One flight from (c0, z0) to (c1, z1) for a viewport w0 px wide. Returns t -> {c, z}.
  function flight(c0, z0, c1, z1, w0) {
    var k = Math.pow(2, z0), u1 = Math.hypot((c1.x - c0.x) * k, (c1.y - c0.y) * k);
    var w1 = w0 / Math.pow(2, z1 - z0), r2 = RHO * RHO;
    function r(i) {
      var b = (w1 * w1 - w0 * w0 + (i ? -1 : 1) * r2 * r2 * u1 * u1) / (2 * (i ? w1 : w0) * r2 * u1);
      return Math.log(Math.sqrt(b * b + 1) - b);
    }
    var r0 = r(0), S = (r(1) - r0) / RHO, wOf, uOf;
    if (u1 < 1e-6 || !isFinite(S)) {
      var dir = w1 < w0 ? -1 : 1;
      S = Math.abs(Math.log(w1 / w0)) / RHO;
      wOf = function (s) { return Math.exp(dir * RHO * s); };
      uOf = function () { return 0; };
    } else {
      wOf = function (s) { return Math.cosh(r0) / Math.cosh(r0 + RHO * s); };
      uOf = function (s) { return w0 * ((Math.cosh(r0) * Math.tanh(r0 + RHO * s) - Math.sinh(r0)) / r2) / u1; };
    }
    return function (t) {
      var s = t * S, u = u1 ? uOf(s) : 0;
      return { c: { x: lerp(c0.x, c1.x, u), y: lerp(c0.y, c1.y, u) }, z: z0 + Math.log2(1 / wOf(s)) };
    };
  }

  var cache = {};
  function tile(z, x, y, redraw) {
    var key = z + '/' + x + '/' + y, im = cache[key];
    if (!im) {
      im = cache[key] = new Image();
      im.onload = function () { im.ok = true; redraw(); };
      im.src = TILE.replace('{z}', z).replace('{x}', x).replace('{y}', y);
    }
    return im;
  }

  function build(host) {
    var stops = Array.prototype.map.call(host.querySelectorAll('.map-src li'), function (li) {
      return { name: li.textContent.trim(), w: world(+li.getAttribute('data-lat'), +li.getAttribute('data-lon')),
               z: +li.getAttribute('data-z'), pin: li.hasAttribute('data-pin') };
    });
    var box = document.createElement('div'); box.className = 'map';
    var cv = document.createElement('canvas'); box.appendChild(cv);
    var pins = stops.map(function (s) {
      if (!s.pin) return null;
      var p = document.createElement('div'); p.className = 'map__pin';
      p.innerHTML = '<span class="map__ping"></span><span class="map__dot"></span><span class="map__tag"></span>';
      p.querySelector('.map__tag').textContent = s.name;
      box.appendChild(p); return p;
    });
    var title = document.createElement('div'); title.className = 'map__title';
    var caps = stops.map(function (s) { var t = document.createElement('p'); t.textContent = s.name; title.appendChild(t); return t; });
    box.appendChild(title);
    var credit = document.createElement('p'); credit.className = 'map__credit'; credit.textContent = '© OpenStreetMap contributors';
    box.appendChild(credit);
    host.appendChild(box);
    return { stops: stops, cv: cv, ctx: cv.getContext('2d'), pins: pins, caps: caps, flights: {}, v: 0 };
  }

  function draw(host, S, cam) {
    var W = S.cv.clientWidth, H = S.cv.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
    if (!W || !H) return;
    if (S.cv.width !== Math.round(W * dpr)) { S.cv.width = Math.round(W * dpr); S.cv.height = Math.round(H * dpr); }
    var g = S.ctx; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = getComputedStyle(host).getPropertyValue('--rcc-surface-container').trim() || '#e8f0e9';
    g.fillRect(0, 0, W, H);
    g.filter = 'grayscale(0.9) contrast(0.82) brightness(1.07)';
    var tz = clamp(Math.round(cam.z), 1, 19), ts = 256 * Math.pow(2, cam.z - tz), n = Math.pow(2, tz);
    var cx = cam.c.x * n, cy = cam.c.y * n;                                   // camera in tile-zoom pixels
    var redraw = function () { if (!S.raf) S.raf = requestAnimationFrame(function () { S.raf = 0; window.DeckScenes.map(host, S.v); }); };
    var x0 = Math.floor((cx - W / 2 * 256 / ts) / 256), x1 = Math.floor((cx + W / 2 * 256 / ts) / 256);
    var y0 = Math.max(0, Math.floor((cy - H / 2 * 256 / ts) / 256)), y1 = Math.min(n - 1, Math.floor((cy + H / 2 * 256 / ts) / 256));
    for (var ty = y0; ty <= y1; ty++) for (var tx = x0; tx <= x1; tx++) {
      var dx = W / 2 + (tx * 256 - cx) * ts / 256, dy = H / 2 + (ty * 256 - cy) * ts / 256, wx = ((tx % n) + n) % n;
      var im = tile(tz, wx, ty, redraw);
      if (im.ok) { g.drawImage(im, dx, dy, ts + 0.5, ts + 0.5); continue; }
      // Until a tile lands, stretch the nearest loaded parent over its spot.
      for (var d = 1; d <= 5 && tz - d >= 0; d++) {
        var p = cache[(tz - d) + '/' + (wx >> d) + '/' + (ty >> d)];
        if (p && p.ok) {
          var f = 256 >> d, sx = (wx - ((wx >> d) << d)) * f, sy = (ty - ((ty >> d) << d)) * f;
          g.drawImage(p, sx, sy, f, f, dx, dy, ts + 0.5, ts + 0.5); break;
        }
      }
    }
    g.filter = 'none';
    return function (wpt) { return { x: W / 2 + (wpt.x - cam.c.x) * Math.pow(2, cam.z), y: H / 2 + (wpt.y - cam.c.y) * Math.pow(2, cam.z) }; };
  }

  function map(host, v) {
    var S = host._s || (host._s = build(host));
    S.v = v;
    var n = S.stops.length, i = Math.min(Math.floor(v), n - 2), f = clamp(v - i, 0, 1), cam;
    if (n < 2) cam = { c: S.stops[0].w, z: S.stops[0].z };
    else {
      var key = i + ':' + S.cv.clientWidth, a = S.stops[i], b = S.stops[i + 1];
      var fl = S.flights[key] || (S.flights[key] = flight(a.w, a.z, b.w, b.z, Math.max(S.cv.clientWidth, S.cv.clientHeight) || 1600));
      cam = fl(f);
    }
    var proj = draw(host, S, cam);
    if (!proj) return;
    S.stops.forEach(function (s, k) {
      var near = clamp(1 - Math.abs(v - k), 0, 1);                       // 1 when this is the stop on screen
      if (S.pins[k]) {
        var pt = proj(s.w), arrive = smooth((near - 0.55) / 0.45);
        var pin = S.pins[k];
        pin.style.transform = 'translate(' + pt.x.toFixed(1) + 'px, ' + pt.y.toFixed(1) + 'px)';
        pin.style.setProperty('--pin', (window.__deckEase ? window.__deckEase.pop(arrive) : arrive).toFixed(3));
        pin.style.setProperty('--ping', (k === Math.round(v) ? clamp((near - 0.7) / 0.3, 0, 1) : 0).toFixed(3));
      }
      S.caps[k].style.transform = 'translateY(' + (clamp(k - v, -1, 1) * 115).toFixed(1) + '%)';
    });
  }

  window.DeckScenes = window.DeckScenes || {};
  window.DeckScenes.map = map;
  if (window.__deckRerender) window.__deckRerender();
})();

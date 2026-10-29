/* stack3d: an app pulled apart into its layers, one layer per press.
   <div data-scene="stack3d" data-steps="3"><ol class="s3-src"><li data-t="Screen">What it does</li>...
   Renders one frame per call, only when deck.js changes v: no loop, nothing
   moving between presses. Colors come from the slide's tokens. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }

function build(host) {
  const src = [...host.querySelectorAll('.s3-src li')].map(li => ({ t: li.getAttribute('data-t'), d: li.textContent.trim() }));
  const wrap = document.createElement('div'); wrap.className = 's3';
  const view = document.createElement('div'); view.className = 's3__view';
  const list = document.createElement('ol'); list.className = 's3__list';
  src.forEach(s => { const li = document.createElement('li'); li.innerHTML = '<b></b><span></span>'; li.querySelector('b').textContent = s.t; li.querySelector('span').textContent = s.d; list.appendChild(li); });
  wrap.append(view, list); host.appendChild(wrap);

  const css = getComputedStyle(host);
  const col = name => new THREE.Color(css.getPropertyValue(name).trim() || '#888888');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  view.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe8e0, 2.2));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(4, 9, 6); scene.add(sun);

  const quiet = col('--rcc-primary-container'), loud = col('--rcc-primary'), edge = col('--rcc-on-primary-container');
  const geo = new RoundedBoxGeometry(5, 0.34, 3.4, 4, 0.16);
  const plates = src.map(() => {
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: quiet.clone(), roughness: 0.7, metalness: 0 }));
    const line = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(5, 0.34, 3.4)), new THREE.LineBasicMaterial({ color: edge, transparent: true, opacity: 0.35 }));
    m.add(line); scene.add(m); return m;
  });
  return { renderer, scene, camera, plates, view, items: [...list.children], quiet, loud, size: '' };
}

function stack3d(host, v) {
  const S = host._s || (host._s = build(host));
  const w = S.view.clientWidth, h = S.view.clientHeight;
  if (!w || !h) return;
  if (S.size !== w + 'x' + h) { S.renderer.setSize(w, h, false); S.camera.aspect = w / h; S.camera.updateProjectionMatrix(); S.size = w + 'x' + h; }
  const n = S.plates.length, open = smooth(v), gap = lerp(0.36, 1.45, open);
  S.plates.forEach((m, k) => {
    // Top plate is the first item. The current layer slides toward the viewer and turns green.
    const on = clamp(1 - Math.abs(v - (k + 1)), 0, 1);
    m.position.set(on * 0.7, ((n - 1) / 2 - k) * gap, on * 0.5);
    m.material.color.copy(S.quiet).lerp(S.loud, smooth(on));
    S.items[k].classList.toggle('is-on', Math.round(v) === k + 1);
  });
  const az = lerp(-0.62, -0.32, clamp(v / n, 0, 1)), el = lerp(0.32, 0.5, open), r = 16;
  S.camera.position.set(Math.sin(az) * Math.cos(el) * r, Math.sin(el) * r, Math.cos(az) * Math.cos(el) * r);
  S.camera.lookAt(0, 0, 0);
  S.renderer.render(S.scene, S.camera);
}

/* gallery: cards around the outside of a drum that runs off both edges of the slide; the
   camera tracks from one to the next, pulling back and lifting mid-move so the next
   card is seen coming. At rest the camera faces the card square on and a real HTML
   card takes the drawn one's exact place, so the words you read are sharp text.
   <div data-scene="gallery" data-steps="N-1" data-dur="1.6" data-ease="sweep">
   <ol class="gal-src"><li data-label data-title><ul><li>line</li>...</ul></li> */
const R = 22, SPACE = 0.4, NEAR = 7.4, PX = 200;           // PX: card pixels per world unit
const F = { label: '500 46px "Google Sans Code"', title: '500 88px "Google Sans"', line: '400 62px "Google Sans"', num: '500 44px "Google Sans Code"' };
// One layout, used twice: by the canvas texture (in flight) and the HTML card (at rest).
function layoutCard(card) {
  const m = document.createElement('canvas').getContext('2d'), CW = 1600, PAD = 80;
  m.font = F.title;
  const tl = []; let line = '';
  card.title.split(' ').forEach(w => { const t = line ? line + ' ' + w : w; if (m.measureText(t).width > CW - 192 && line) { tl.push(line); line = w; } else line = t; });
  tl.push(line);
  const items = [{ k: 'label', text: card.label.toUpperCase(), x: 96, top: 80, lh: 56 }];
  let top = 168;
  tl.forEach(t => { items.push({ k: 'title', text: t, x: 96, top, lh: 100 }); top += 100; });
  top += 40;
  m.font = F.line;
  card.lines.forEach((t, i) => {
    items.push({ k: 'num', text: String(i + 1), cx: 134, cy: top + 50 });
    // A line too long for the card wraps under itself rather than running off the edge.
    const parts = []; let l = '';
    t.split(' ').forEach(w => { const x = l ? l + ' ' + w : w; if (m.measureText(x).width > CW - 208 - 72 && l) { parts.push(l); l = w; } else l = x; });
    parts.push(l);
    parts.forEach((p, j) => { items.push({ k: 'line', text: p, x: 208, top, lh: j ? 76 : 100 }); top += j < parts.length - 1 ? (j ? 76 : 88) : (j ? 88 : 100); });
  });
  return { CW, CH: top + 64, PAD, items };
}
function metrics(font) { const m = document.createElement('canvas').getContext('2d'); m.font = font; const t = m.measureText('Hg'); return { a: t.fontBoundingBoxAscent, d: t.fontBoundingBoxDescent }; }
// CSS puts a line's baseline at top + (line-height - (ascent + descent)) / 2 + ascent.
function baseline(it, font) { const k = metrics(font); return it.top + (it.lh - (k.a + k.d)) / 2 + k.a; }
function cardTexture(L, css) {
  const tok = n => css.getPropertyValue(n).trim(), green = tok('--rcc-primary');
  const c = document.createElement('canvas'); c.width = L.CW + L.PAD * 2; c.height = L.CH + L.PAD * 2;
  const g = c.getContext('2d'); g.translate(L.PAD, L.PAD - 24);
  g.save(); g.shadowColor = 'rgba(16, 32, 20, 0.16)'; g.shadowBlur = 60; g.shadowOffsetY = 28;
  g.fillStyle = '#ffffff'; g.beginPath(); g.roundRect(0, 0, L.CW, L.CH, 56); g.fill(); g.restore();
  g.lineWidth = 4; g.strokeStyle = tok('--rcc-outline-variant'); g.beginPath(); g.roundRect(2, 2, L.CW - 4, L.CH - 4, 54); g.stroke();
  L.items.forEach(it => {
    if (it.k === 'num') {
      g.strokeStyle = green; g.lineWidth = 5; g.beginPath(); g.arc(it.cx, it.cy, 38, 0, Math.PI * 2); g.stroke();
      g.fillStyle = green; g.font = F.num; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(it.text, it.cx, it.cy + 2);
      g.textAlign = 'left'; g.textBaseline = 'alphabetic'; return;
    }
    g.font = F[it.k]; g.fillStyle = it.k === 'label' ? green : it.k === 'title' ? tok('--rcc-on-surface') : tok('--rcc-on-surface-variant');
    if ('letterSpacing' in g) g.letterSpacing = it.k === 'label' ? '3px' : '0px';
    g.fillText(it.text, it.x, baseline(it, F[it.k]));
  });
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  return { tex, w: c.width / PX, h: c.height / PX, cw: c.width };
}
function cardFace(L) {
  const face = document.createElement('div'); face.className = 'gal__face';
  face.style.width = (L.CW + L.PAD * 2) + 'px'; face.style.height = (L.CH + L.PAD * 2) + 'px';
  const card = document.createElement('div'); card.className = 'gal__card';
  Object.assign(card.style, { left: L.PAD + 'px', top: (L.PAD - 24) + 'px', width: L.CW + 'px', height: L.CH + 'px' });
  L.items.forEach(it => {
    const e = document.createElement('div');
    if (it.k === 'num') { e.className = 'gal__num'; Object.assign(e.style, { left: (it.cx - 38) + 'px', top: (it.cy - 38) + 'px' }); }
    else { e.className = 'gal__' + it.k; Object.assign(e.style, { left: it.x + 'px', top: it.top + 'px', lineHeight: it.lh + 'px' }); }
    e.textContent = it.text; card.appendChild(e);
  });
  face.appendChild(card); return face;
}
// Seen from outside the drum, so x runs negative: the next card comes in from the right.
function arcPoint(a, r, h = 0) { return new THREE.Vector3(-r * Math.sin(a), h, -r * Math.cos(a)); }
function buildGallery(host) {
  const cards = [...host.querySelectorAll('.gal-src > li')].map(li => ({ label: li.getAttribute('data-label'), title: li.getAttribute('data-title'), lines: [...li.querySelectorAll('li')].map(x => x.textContent.trim()) }));
  const view = document.createElement('div'); view.className = 'gal'; host.appendChild(view);
  const css = getComputedStyle(host);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  view.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  // Far cards sink into the paper color: depth without a dark backdrop or a grey dim.
  scene.fog = new THREE.Fog(new THREE.Color(css.getPropertyValue('--rcc-surface').trim() || '#f7faf8'), NEAR + 3, NEAR + 20);
  const camera = new THREE.PerspectiveCamera(34, 2, 0.1, 100);
  const meshes = [], faces = [];
  cards.forEach((card, i) => {
    const L = layoutCard(card), t = cardTexture(L, css);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(t.w, t.h), new THREE.MeshBasicMaterial({ map: t.tex, transparent: true, fog: true, depthWrite: false }));
    m.position.copy(arcPoint(i * SPACE, R)); m.lookAt(arcPoint(i * SPACE, R * 2)); m.userData = t;   // faces out, so neighbors fall away
    scene.add(m); meshes.push(m);
    const face = cardFace(L); view.appendChild(face); faces.push(face);
  });
  return { renderer, scene, camera, meshes, faces, view, size: '' };
}
const v3 = new THREE.Vector3();
function gallery(host, v) {
  let S = host._s;
  if (!S) {
    if (!host._loading) {
      // Draw the card faces only once the brand fonts are in, or they bake in a fallback face.
      host._loading = Promise.all(Object.values(F).map(f => document.fonts.load(f))).catch(() => {})
        .then(() => { host._s = buildGallery(host); gallery(host, host._v ?? v); });
    }
    host._v = v; return;
  }
  const w = S.view.clientWidth, h = S.view.clientHeight;
  if (!w || !h) return;
  if (S.size !== w + 'x' + h) { S.renderer.setSize(w, h, false); S.camera.aspect = w / h; S.camera.updateProjectionMatrix(); S.size = w + 'x' + h; }
  const n = S.meshes.length, i = clamp(Math.floor(v), 0, n - 2), f = clamp(v - i, 0, 1);
  const a = (i + f) * SPACE, lift = Math.sin(Math.PI * f);
  S.camera.position.copy(arcPoint(a, R + NEAR + lift * 4.2, lift * 1.1));    // out, up, and back in
  S.camera.up.set(0, 1, 0);
  S.camera.lookAt(arcPoint(a + lift * 0.05, R, -lift * 0.35));               // lead the turn a little
  S.camera.updateMatrixWorld();
  const rest = Math.abs(v - Math.round(v)) < 1e-4 ? Math.round(v) : -1;
  S.meshes.forEach((m, k) => {
    const near = clamp(1 - Math.abs(v - k), 0, 1);
    m.scale.setScalar(lerp(0.92, 1, smooth(near)));
    m.visible = k !== rest;
    // display, not visibility: an inline visible would show through the hidden slides around it.
    S.faces[k].style.display = k === rest ? 'block' : 'none';
  });
  if (rest >= 0) {
    // Put the HTML card exactly over where the drawn card projects.
    const m = S.meshes[rest]; m.updateMatrixWorld();
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity;
    [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sy]) => {
      v3.set(sx * m.userData.w / 2, sy * m.userData.h / 2, 0).applyMatrix4(m.matrixWorld).project(S.camera);
      const px = (v3.x + 1) / 2 * w, py = (1 - v3.y) / 2 * h;
      x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py);
    });
    S.faces[rest].style.transform = 'translate(' + x0.toFixed(2) + 'px, ' + y0.toFixed(2) + 'px) scale(' + ((x1 - x0) / m.userData.cw).toFixed(5) + ')';
  }
  S.renderer.render(S.scene, S.camera);
}

window.DeckScenes = window.DeckScenes || {};
window.DeckScenes.stack3d = stack3d;
window.DeckScenes.gallery = gallery;
if (window.__deckRerender) window.__deckRerender();

type Hue = number;

interface Scene {
  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ps: Particle[];
  hues: Hue[];
  w: number;
  h: number;
  size: () => void;
}

interface Particle {
  x: number;
  y: number;
  s: number;
  vx: number;
  vy: number;
  h: Hue;
  a: number;
  ph: number;
}

const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function setup(id: string, seed: number, hues: Hue[], count: number): Scene | null {
  const c = document.getElementById(id) as HTMLCanvasElement | null;
  if (!c) return null;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  const r = rng(seed);
  const ps: Particle[] = [];
  for (let i = 0; i < count; i++) {
    ps.push({
      x: r(),
      y: 0.15 + r() * 0.7,
      s: 0.04 + r() * 0.14,
      vx: (r() - 0.5) * 0.012,
      vy: (r() - 0.5) * 0.006,
      h: hues[Math.floor(r() * hues.length)]!,
      a: 0.18 + r() * 0.35,
      ph: r() * 6.28,
    });
  }
  const o: Scene = { c, ctx, ps, hues, w: 0, h: 0, size: () => {} };
  const size = () => {
    const b = c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    o.w = Math.max(1, Math.round(b.width * dpr));
    o.h = Math.max(1, Math.round(b.height * dpr));
    c.width = o.w;
    c.height = o.h;
  };
  o.size = size;
  size();
  if (window.ResizeObserver) {
    new ResizeObserver(size).observe(c);
  } else {
    window.addEventListener('resize', size);
  }
  return o;
}

function drawScene(o: Scene, t: number) {
  const { ctx, w, h } = o;
  if (!w || !h) return;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#07080d');
  g.addColorStop(0.62, `hsl(${o.hues[0]},35%,9%)`);
  g.addColorStop(1, '#050508');
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  for (const p of o.ps) {
    const x = ((p.x + p.vx * t) % 1 + 1) % 1 * w;
    const y = (p.y + Math.sin(t * 0.4 + p.ph) * 0.03 + p.vy * Math.sin(t * 0.2)) * h;
    const r = p.s * Math.min(w, h) * 1.2;
    const a = p.a * (0.75 + 0.25 * Math.sin(t * 0.9 + p.ph));
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `hsla(${p.h},85%,62%,${a})`);
    rg.addColorStop(0.55, `hsla(${p.h},85%,52%,${a * 0.35})`);
    rg.addColorStop(1, `hsla(${p.h},85%,50%,0)`);
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 6.283);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  const fy = h * 0.74;
  const fg = ctx.createLinearGradient(0, fy, 0, h);
  fg.addColorStop(0, 'rgba(0,0,0,0)');
  fg.addColorStop(0.02, 'rgba(0,0,0,0.55)');
  fg.addColorStop(1, 'rgba(0,0,0,0.85)');
  ctx.fillStyle = fg;
  ctx.fillRect(0, fy, w, h - fy);
  const lg = ctx.createLinearGradient(0, 0, w, 0);
  lg.addColorStop(0, 'rgba(232,168,73,0)');
  lg.addColorStop(0.5, 'rgba(232,168,73,0.35)');
  lg.addColorStop(1, 'rgba(232,168,73,0)');
  ctx.fillStyle = lg;
  ctx.fillRect(0, fy, w, Math.max(1, h * 0.004));
  const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  const step = Math.max(2, Math.round(h / 180));
  for (let yy = 0; yy < h; yy += step * 2) {
    ctx.fillRect(0, yy, w, step);
  }
}

function drawBars(o: Scene) {
  const { ctx, w, h } = o;
  if (!w || !h) return;
  const top = ['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'];
  const mid = ['#0000c0', '#131313', '#c000c0', '#131313', '#00c0c0', '#131313', '#c0c0c0'];
  const bw = w / 7;
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = top[i]!;
    ctx.fillRect(Math.floor(i * bw), 0, Math.ceil(bw), h * 0.67);
    ctx.fillStyle = mid[i]!;
    ctx.fillRect(Math.floor(i * bw), h * 0.67, Math.ceil(bw), h * 0.08);
  }
  const low = ['#00214c', '#ffffff', '#32006a', '#131313', '#090909', '#131313', '#1d1d1d', '#131313'];
  const lw = [1.25, 1.25, 1.25, 1.25, 1 / 3, 1 / 3, 1 / 3, 1];
  let x = 0;
  for (let j = 0; j < low.length; j++) {
    const ww = lw[j]! * bw;
    ctx.fillStyle = low[j]!;
    ctx.fillRect(Math.floor(x), h * 0.75, Math.ceil(ww) + 1, h * 0.25);
    x += ww;
  }
}

const tc = document.getElementById('tc');
function pad(n: number) { return n < 10 ? '0' + n : '' + n; }
function tick() {
  if (!tc) return;
  const d = new Date();
  tc.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + ':' + pad(Math.floor(d.getMilliseconds() / 40));
}

const pgm = setup('pgm', 7, [32, 38, 210, 24], 14);
const cams = [
  setup('cam1', 19, [205, 215, 30], 9),
  setup('cam2', 41, [28, 34, 350], 8),
  setup('cam3', 83, [190, 40, 220], 9),
];
const bars = setup('pvw', 3, [0], 0);
if (bars && window.ResizeObserver) {
  new ResizeObserver(() => { bars.size(); drawBars(bars); }).observe(bars.c);
}
if (bars) drawBars(bars);

const mL = document.getElementById('mL') as HTMLElement | null;
const mR = document.getElementById('mR') as HTMLElement | null;
const lv = [0.4, 0.4];

function meters(t: number) {
  for (let k = 0; k < 2; k++) {
    const target = 0.35 + 0.35 * Math.abs(Math.sin(t * (2.1 + k * 0.7) + k)) * (0.6 + 0.4 * Math.random()) + (Math.random() < 0.04 ? 0.22 : 0);
    lv[k] += (target - lv[k]!) * (target > lv[k]! ? 0.6 : 0.15);
  }
  if (mL) mL.style.height = Math.min(98, lv[0]! * 100) + '%';
  if (mR) mR.style.height = Math.min(98, lv[1]! * 100) + '%';
}

function setMeterSize() {
  const m = document.querySelector('.meter');
  if (m) {
    const hh = (m as HTMLElement).getBoundingClientRect().height;
    [mL, mR].forEach((e) => { e?.style.setProperty('--mh', hh + 'px'); });
  }
}
setMeterSize();
window.addEventListener('resize', setMeterSize);

if (reduce) {
  tick();
  if (pgm) drawScene(pgm, 1);
  cams.forEach((c) => { if (c) drawScene(c, 2); });
  if (mL) mL.style.height = '62%';
  if (mR) mR.style.height = '58%';
  window.setInterval(tick, 1000);
} else {
  let last = 0;
  const loop = (now: number) => {
    requestAnimationFrame(loop);
    if (now - last < 33) return;
    last = now;
    const t = now / 1000;
    tick();
    if (pgm) drawScene(pgm, t);
    cams.forEach((c, i) => { if (c) drawScene(c, t * 0.8 + i * 3); });
    meters(t);
  };
  requestAnimationFrame(loop);
}

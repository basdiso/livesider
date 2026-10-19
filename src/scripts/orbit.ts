const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

const svg = document.getElementById('orbit');
if (svg) {
  const NS = 'http://www.w3.org/2000/svg';
  const cx = 280;
  const cy = 280;
  const R = 228;
  const names = ['YT', 'IG', 'FB', 'IN', 'TT', 'X', 'TW', 'KICK', 'VIMEO', 'DM'];

  const el = (tag: string, attrs: Record<string, string>) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]!);
    return e;
  };

  const rays: SVGLineElement[] = [];
  const pts: SVGCircleElement[] = [];

  for (let i = 0; i < 30; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / 30;
    const x = cx + R * Math.cos(a);
    const y = cy + R * Math.sin(a);
    const ray = el('line', {
      x1: String(cx), y1: String(cy),
      x2: String(x), y2: String(y),
      class: 'ray',
    }) as SVGLineElement;
    svg.appendChild(ray);
    rays.push(ray);
  }

  for (let j = 0; j < 30; j++) {
    const b = -Math.PI / 2 + j * 2 * Math.PI / 30;
    const px = cx + R * Math.cos(b);
    const py = cy + R * Math.sin(b);
    const c = el('circle', {
      cx: String(px), cy: String(py),
      r: j % 3 === 0 ? '9' : '6',
      class: 'pt',
    }) as SVGCircleElement;
    svg.appendChild(c);
    pts.push(c);
    if (j % 3 === 0) {
      const lx = cx + (R + 26) * Math.cos(b);
      const ly = cy + (R + 26) * Math.sin(b);
      const txt = el('text', {
        x: String(lx), y: String(ly + 4),
        'text-anchor': 'middle',
        class: 'plat',
        'font-size': '12',
      });
      txt.textContent = names[j / 3]!;
      svg.appendChild(txt);
    }
  }

  svg.appendChild(el('circle', {
    cx: String(cx), cy: String(cy), r: '96',
    fill: 'none', stroke: 'var(--line)',
    'stroke-dasharray': '3 5',
  }));
  svg.appendChild(el('circle', {
    cx: String(cx), cy: String(cy), r: '62',
    fill: 'var(--fg)',
  }));
  svg.appendChild(el('circle', {
    cx: String(cx), cy: String(cy - 30), r: '6',
    fill: 'var(--tally)',
  }));

  const h = el('text', {
    x: String(cx), y: String(cy + 6),
    'text-anchor': 'middle',
    class: 'hub-label',
    'font-size': '19',
  });
  h.textContent = 'STUDIO';
  svg.appendChild(h);

  const h2 = el('text', {
    x: String(cx), y: String(cy + 26),
    'text-anchor': 'middle',
    class: 'plat',
    'font-size': '10',
    style: 'fill:#555b68',
  });
  h2.textContent = '1 → 30';
  svg.appendChild(h2);

  if (reduce) {
    rays.forEach((r) => r.classList.add('hot'));
    pts.forEach((p) => p.classList.add('hot'));
  } else {
    let k = 0;
    window.setInterval(() => {
      const idx = k % 34;
      if (idx < 30) {
        rays[idx]!.classList.add('hot');
        pts[idx]!.classList.add('hot');
      } else {
        rays.forEach((r) => r.classList.remove('hot'));
        pts.forEach((p) => p.classList.remove('hot'));
      }
      k++;
    }, 110);
  }
}

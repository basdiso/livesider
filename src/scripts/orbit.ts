const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const svg = document.getElementById('orbit');

if (svg) {
  const rays = Array.from(svg.querySelectorAll<SVGLineElement>('line.ray'));
  const pts = Array.from(svg.querySelectorAll<SVGCircleElement>('circle.pt'));
  const brands = Array.from(svg.querySelectorAll<SVGGElement>('g.brand'));

  if (reduce) {
    rays.forEach((r) => r.classList.add('hot'));
    pts.forEach((p) => p.classList.add('hot'));
    brands.forEach((b) => b.classList.add('hot'));
  } else {
    let k = 0;
    window.setInterval(() => {
      const idx = k % 34;
      if (idx < 30) {
        rays[idx]?.classList.add('hot');
        pts[idx]?.classList.add('hot');
        if (idx % 3 === 0) brands[idx / 3]?.classList.add('hot');
      } else {
        rays.forEach((r) => r.classList.remove('hot'));
        pts.forEach((p) => p.classList.remove('hot'));
        brands.forEach((b) => b.classList.remove('hot'));
      }
      k++;
    }, 110);
  }
}

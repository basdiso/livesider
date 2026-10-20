const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const svg = document.getElementById('orbit');

if (svg) {
  const rays = Array.from(svg.querySelectorAll<SVGLineElement>('line.ray'));
  const pts = Array.from(svg.querySelectorAll<SVGCircleElement>('circle.pt'));
  const brands = Array.from(svg.querySelectorAll<SVGGElement>('g.brand'));
  const N = rays.length;
  const EVERY = N / brands.length;

  if (reduce || N === 0) {
    rays.forEach((r) => r.classList.add('hot'));
    pts.forEach((p) => p.classList.add('hot'));
    brands.forEach((b) => b.classList.add('hot'));
  } else {
    const WINDOW = 6;
    let head = 0;
    const tick = () => {
      for (let i = 0; i < N; i++) {
        const dist = ((i - head) % N + N) % N;
        const hot = dist < WINDOW;
        rays[i]!.classList.toggle('hot', hot);
        pts[i]!.classList.toggle('hot', hot);
        if (i % EVERY === 0) {
          brands[i / EVERY]?.classList.toggle('hot', hot);
        }
      }
      head = (head + 1) % N;
    };
    tick();
    window.setInterval(tick, 120);
  }
}

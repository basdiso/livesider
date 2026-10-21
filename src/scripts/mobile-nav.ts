const btn = document.querySelector<HTMLButtonElement>('.hamburger');
const nav = document.getElementById('site-nav');

if (btn && nav) {
  const setOpen = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    nav.setAttribute('data-open', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  btn.addEventListener('click', () => {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });

  const mql = window.matchMedia('(min-width: 821px)');
  mql.addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

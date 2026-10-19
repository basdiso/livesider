const btn = document.getElementById('copy-btn') as HTMLButtonElement | null;
const addr = document.getElementById('addr');

if (btn && addr) {
  const label = btn.dataset.copyLabel ?? 'Copy';
  const done = btn.dataset.copyDone ?? 'Copied';
  const email = (addr.textContent ?? '').trim();

  const flash = () => {
    btn.textContent = done;
    window.setTimeout(() => { btn.textContent = label; }, 1800);
  };
  const fallback = () => {
    const range = document.createRange();
    range.selectNodeContents(addr);
    const sel = window.getSelection();
    if (sel) { sel.removeAllRanges(); sel.addRange(range); }
  };

  btn.addEventListener('click', () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(flash, fallback);
    } else {
      fallback();
    }
  });
}

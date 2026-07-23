// Slider comparativo día 1 vs. cicatrizado (drag / touch)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-compare]').forEach((wrap) => {
    const before = wrap.querySelector('[data-compare-before]');
    const handle = wrap.querySelector('[data-compare-handle]');
    const knob = wrap.querySelector('[data-compare-knob]');
    let dragging = false;

    const setPct = (pct) => {
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      handle.style.left = pct + '%';
      knob.style.left = pct + '%';
    };
    const posFromEvt = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return (x / rect.width) * 100;
    };
    const start = (e) => { dragging = true; setPct(posFromEvt(e)); if (e.cancelable) e.preventDefault(); };
    const move = (e) => { if (!dragging) return; setPct(posFromEvt(e)); if (e.cancelable) e.preventDefault(); };
    const end = () => { dragging = false; };

    wrap.addEventListener('pointerdown', start);
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);

    setTimeout(() => setPct(46), 300);
    setTimeout(() => setPct(54), 700);
    setTimeout(() => setPct(50), 1100);
  });
});

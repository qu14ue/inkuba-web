// Carruseles horizontales con dots + contador (La obra, Reseñas, etc.)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach((c) => {
    const key = c.getAttribute('data-carousel');
    const track = c.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide, .review-slide');
    const dotsEl = c.querySelector('[data-dots="' + key + '"]');
    const cur = c.querySelector('[data-current="' + key + '"]');
    const total = c.querySelector('[data-total="' + key + '"]');
    if (!slides.length) return;

    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Ir a slide ' + (i + 1));
      d.addEventListener('click', () => slides[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' }));
      dotsEl.appendChild(d);
    });
    if (total) total.textContent = String(slides.length).padStart(2, '0');

    // Drag-to-scroll con mouse (desktop). Touch/trackpad ya funcionan nativo.
    let isDown = false, startX = 0, startScroll = 0, moved = false;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      isDown = true; moved = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add('dragging');
    });
    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      track.scrollLeft = startScroll - dx;
    });
    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('dragging');
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointerleave', endDrag);
    // Evita que un drag dispare el click del lightbox
    track.addEventListener('click', (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    let ticking = false;
    track.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const slideW = slides[0].getBoundingClientRect().width + 12;
        const idx = Math.round(track.scrollLeft / slideW);
        const clamped = Math.max(0, Math.min(slides.length - 1, idx));
        dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === clamped));
        if (cur) cur.textContent = String(clamped + 1).padStart(2, '0');
        ticking = false;
      });
    }, { passive: true });
  });
});

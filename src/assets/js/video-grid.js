// Grid de videos de proceso (home, bloque 03): autoplay mudo solo en viewport (perf mobile) + toggle de sonido
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('[data-video-card]');
  if (!cards.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector('[data-video-el]');
      if (!video) return;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
  }, { threshold: 0.5 });

  cards.forEach((card) => {
    const video = card.querySelector('[data-video-el]');
    if (!video) return;
    io.observe(card);

    const toggle = card.querySelector('[data-video-toggle]');
    const label = card.querySelector('[data-video-toggle-label]');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      video.muted = !video.muted;
      toggle.classList.toggle('is-unmuted', !video.muted);
      toggle.setAttribute('aria-label', video.muted ? 'Activar sonido' : 'Silenciar');
      if (label) label.textContent = video.muted ? 'Sonido' : 'Silenciar';
    });
  });
});

// Lightbox: ver la pieza en grande sin salir de la página (no hay URL por trabajo)
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.querySelector('[data-lightbox]');
  const body = document.querySelector('[data-lightbox-body]');
  const closeBtn = document.querySelector('[data-lightbox-close]');
  if (!lightbox || !body) return;

  const open = (card) => {
    const ph = card.querySelector('.ph');
    if (!ph) return;
    const title =
      card.querySelector('.card-title')?.textContent ||
      card.querySelector('.work-cap')?.textContent ||
      '';
    let metaHtml = '';
    card.querySelectorAll('.card-meta .row').forEach((r) => {
      metaHtml += '<div class="row">' + r.innerHTML + '</div>';
    });
    body.innerHTML =
      ph.outerHTML +
      (title ? '<div class="lb-title">' + title + '</div>' : '') +
      (metaHtml ? '<div class="lb-meta">' + metaHtml + '</div>' : '');
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('[data-lightbox-trigger]').forEach((card) => {
    card.addEventListener('click', (e) => { e.preventDefault(); open(card); });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
});

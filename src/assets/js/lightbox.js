// Lightbox del portfolio: ver la pieza sin salir de la página (no hay URL por trabajo)
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.querySelector('[data-lightbox]');
  const body = document.querySelector('[data-lightbox-body]');
  const closeBtn = document.querySelector('[data-lightbox-close]');
  if (!lightbox || !body) return;

  const open = (card) => {
    const phHtml = card.querySelector('.ph').outerHTML;
    const title = card.querySelector('.card-title')?.textContent || '';
    const metaRows = card.querySelectorAll('.card-meta .row');
    let metaHtml = '';
    metaRows.forEach((r) => { metaHtml += '<div class="row">' + r.innerHTML + '</div>'; });
    body.innerHTML =
      phHtml +
      '<div class="lb-title">' + title + '</div>' +
      '<div class="lb-meta">' + metaHtml + '</div>';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('.grid-card[data-lightbox-trigger]').forEach((card) => {
    card.addEventListener('click', (e) => { e.preventDefault(); open(card); });
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
});

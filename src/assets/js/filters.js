// Filtros de /portfolio (chips rápidos, drawer, filtros aplicados) + mini-filtros de galería de artista
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-quick]').forEach((c) => {
    c.addEventListener('click', () => {
      document.querySelectorAll('[data-quick]').forEach((o) => o.classList.remove('active'));
      c.classList.add('active');
    });
  });

  document.querySelectorAll('.applied-chip button').forEach((b) => {
    b.addEventListener('click', () => b.parentElement.remove());
  });
  const clearBtn = document.querySelector('.applied-clear');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.applied-chip').forEach((c) => c.remove());
  });

  const loadMore = document.querySelector('[data-load-more]');
  if (loadMore) {
    loadMore.addEventListener('click', () => {
      loadMore.textContent = 'Cargando…';
      setTimeout(() => {
        loadMore.textContent = 'Cargar más piezas';
        const hint = document.querySelector('.load-more-hint');
        if (hint) hint.innerHTML = 'Mostrando <strong>24</strong> de <strong>142</strong>';
      }, 900);
    });
  }

  const drawer = document.querySelector('[data-drawer]');
  const backdrop = document.querySelector('[data-drawer-backdrop]');
  const openBtn = document.querySelector('[data-open-drawer]');
  const openDrawer = () => { drawer.classList.add('open'); backdrop.classList.add('open'); backdrop.setAttribute('aria-hidden', 'false'); };
  const closeDrawer = () => { drawer.classList.remove('open'); backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden', 'true'); };
  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-footer .apply, .drawer-footer .reset').forEach((b) => b.addEventListener('click', closeDrawer));
  document.querySelectorAll('.drawer .chip').forEach((c) => {
    c.addEventListener('click', () => c.classList.toggle('active'));
  });

  document.querySelectorAll('.mini-chip').forEach((c) => {
    c.addEventListener('click', () => {
      const group = c.closest('.mini-filters');
      group.querySelectorAll('.mini-chip').forEach((o) => o.classList.remove('active'));
      c.classList.add('active');
    });
  });
});

// Menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
  const hamb = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!hamb || !menu) return;
  hamb.addEventListener('click', () => {
    hamb.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    hamb.classList.remove('open');
    menu.classList.remove('open');
  }));
});

// Header: transparente sobre el hero, sólido apenas se scrollea (legibilidad en el resto de las secciones)
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  const toggle = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
});

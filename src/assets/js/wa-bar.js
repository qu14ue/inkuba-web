(function () {
  var bar = document.querySelector('[data-wa-bar]');
  if (!bar) return;

  var close = bar.querySelector('[data-wa-bar-close]');
  if (close) {
    close.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      bar.classList.remove('is-visible');
    });
  }

  function reveal() {
    if (window.scrollY > 300) {
      bar.classList.add('is-visible');
      window.removeEventListener('scroll', reveal);
    }
  }
  window.addEventListener('scroll', reveal, { passive: true });
  reveal();
})();

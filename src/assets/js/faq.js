// FAQ tipo acordeón — solo una pregunta abierta a la vez
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      document.querySelectorAll('.faq-item[open]').forEach((other) => { if (other !== d) other.open = false; });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'faq_open',
        question: (d.querySelector('.q, summary')?.textContent || '').trim(),
        page_path: location.pathname
      });
    });
  });
});

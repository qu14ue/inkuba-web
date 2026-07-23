// Stepper "Cómo trabajamos" — acordeón, un paso abierto a la vez
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-stepper]').forEach((s) => {
    const steps = s.querySelectorAll('.step');
    steps.forEach((step) => {
      const title = step.querySelector('.step-title');
      title.addEventListener('click', () => {
        const wasCollapsed = step.classList.contains('collapsed');
        steps.forEach((st) => { st.classList.add('collapsed'); st.classList.remove('active'); });
        if (wasCollapsed) { step.classList.remove('collapsed'); step.classList.add('active'); }
      });
    });
  });
});

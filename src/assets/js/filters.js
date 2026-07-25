// Filtros de /portfolio: motor real de filtrado sobre el grid.
// OR dentro de cada eje (estilo, zona, artista, tipo, estado, sesiones), AND entre ejes.
document.addEventListener('DOMContentLoaded', () => {
  // ---- Drawer abrir/cerrar (siempre, aunque no haya grid) ----
  const drawer = document.querySelector('[data-drawer]');
  const backdrop = document.querySelector('[data-drawer-backdrop]');
  const openBtn = document.querySelector('[data-open-drawer]');
  if (drawer && backdrop) {
    const openDrawer = () => { drawer.classList.add('open'); backdrop.classList.add('open'); backdrop.setAttribute('aria-hidden', 'false'); };
    const closeDrawer = () => { drawer.classList.remove('open'); backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden', 'true'); };
    if (openBtn) openBtn.addEventListener('click', openDrawer);
    backdrop.addEventListener('click', closeDrawer);
    document.querySelectorAll('.drawer-footer .apply').forEach((b) => b.addEventListener('click', closeDrawer));
  }

  const grid = document.querySelector('.grid-section .grid');
  const cards = grid ? Array.from(grid.querySelectorAll('.grid-card')) : [];
  if (!cards.length) return;

  // ---- Estado ----
  const state = { parte: new Set(), estilo: new Set(), tematica: new Set(), artista: new Set(), tipo: new Set() };
  const MULTI = ['tematica', 'tipo']; // campos array en la card (lógica "has")
  const anyActive = () => Object.values(state).some((s) => s.size);

  // Etiquetas legibles por dim|val (tomadas del texto del chip, sin el contador)
  const labelMap = {};
  document.querySelectorAll('[data-dim][data-val]').forEach((c) => {
    const k = c.dataset.dim + '|' + c.dataset.val;
    if (!labelMap[k]) labelMap[k] = (c.childNodes[0].textContent || c.dataset.val).trim();
  });

  const cardMatches = (card) => {
    for (const dim of Object.keys(state)) {
      const set = state[dim];
      if (!set.size) continue;
      let ok;
      if (MULTI.includes(dim)) {
        const tokens = (card.dataset[dim] || '').split(' ');
        ok = [...set].some((v) => tokens.includes(v));
      } else {
        ok = set.has(card.dataset[dim] || '');
      }
      if (!ok) return false;
    }
    return true;
  };

  const visibleStrong = document.querySelector('[data-visible]');
  const hint = document.querySelector('.load-more-hint');
  const appliedRow = document.querySelector('.applied-row');

  const syncChips = () => {
    document.querySelectorAll('[data-dim][data-val]').forEach((c) => {
      c.classList.toggle('active', state[c.dataset.dim] && state[c.dataset.dim].has(c.dataset.val));
    });
    const todo = document.querySelector('[data-quick="todo"]');
    if (todo) todo.classList.toggle('active', !anyActive());
  };

  const renderApplied = () => {
    if (!appliedRow) return;
    appliedRow.innerHTML = '';
    Object.keys(state).forEach((dim) => {
      state[dim].forEach((val) => {
        const chip = document.createElement('span');
        chip.className = 'applied-chip';
        chip.innerHTML = (labelMap[dim + '|' + val] || val) + '<button aria-label="Quitar filtro">×</button>';
        chip.querySelector('button').addEventListener('click', () => { state[dim].delete(val); apply(); });
        appliedRow.appendChild(chip);
      });
    });
    if (anyActive()) {
      const clr = document.createElement('button');
      clr.className = 'applied-clear';
      clr.textContent = 'Limpiar todo';
      clr.addEventListener('click', resetAll);
      appliedRow.appendChild(clr);
    }
  };

  const apply = () => {
    let visible = 0;
    cards.forEach((card) => {
      const show = cardMatches(card);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (visibleStrong) visibleStrong.textContent = visible;
    if (hint) hint.innerHTML = 'Mostrando <strong>' + visible + '</strong> de <strong>' + cards.length + '</strong>';
    syncChips();
    renderApplied();
  };

  const toggle = (dim, val) => {
    const set = state[dim];
    if (set.has(val)) set.delete(val); else set.add(val);
    apply();
  };
  function resetAll() { Object.values(state).forEach((s) => s.clear()); apply(); }

  // ---- Wiring ----
  document.querySelectorAll('[data-dim][data-val]').forEach((c) => {
    c.addEventListener('click', () => toggle(c.dataset.dim, c.dataset.val));
  });
  const todo = document.querySelector('[data-quick="todo"]');
  if (todo) todo.addEventListener('click', resetAll);
  document.querySelectorAll('.drawer-footer .reset').forEach((b) => b.addEventListener('click', resetAll));

  // Pre-aplicar filtros desde la URL, ej. /portfolio/?estado=cicatrizado&estilo=realismo
  new URLSearchParams(location.search).forEach((raw, dim) => {
    if (!state[dim]) return;
    raw.split(',').forEach((v) => state[dim].add(v.trim().toLowerCase()));
  });

  apply();
});

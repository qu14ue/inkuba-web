# InKuba Tatto&Art Studio — sitio web (Eleventy)

## Cómo correrlo

```
npm install
npm start        # servidor local con recarga automática en http://localhost:8080
npm run build     # genera el sitio final en /_site
```

## Estructura

```
src/
  _includes/
    layouts/base.html        # <head>, header, footer, scripts — todas las páginas pasan por acá
    partials/header.html
    partials/footer.html
    macros/grid-card.html    # gridCard() y carouselSlide() — una pieza del portfolio → HTML, reutilizado en 3 lugares
  _data/
    site.json                # WhatsApp, Instagram, dirección, nav — datos globales
    portfolio.json           # única fuente de verdad de todas las piezas (home, /portfolio, galería de Armelio)
    artistas.json             # datos de Armelio/Lyvan/Macerll (nombre, rol, años, piezas, bio corta)
  assets/css/
    tokens.css                # paleta y tipografía (única fuente de verdad de la identidad visual)
    base.css                  # reset, header, footer, tipografía compartida
    components.css            # todo lo demás: carruseles, slider comparativo, stepper, FAQ, filtros, galería, lightbox
  assets/js/                  # un archivo por componente interactivo
  index.html                  # Home              → /
  portfolio.html              # Portfolio          → /portfolio/
  artistas/armelio.html       # Perfil de Armelio  → /artistas/armelio/
```

Los templates son `.html` (no `.njk`) a propósito: Eleventy los procesa igual (`htmlTemplateEngine: "njk"` en `.eleventy.js`), pero así VS Code aplica resaltado de sintaxis HTML normal.

### Cómo agregar una pieza nueva al portfolio

Editar `src/_data/portfolio.json` (una pieza por línea) y agregar un objeto con estos campos:

- `slug`, `titulo`, `artistaSlug` (`armelio` | `lyvan` | `macerll` — Franco usa el slug `macerll`), `artista` (nombre visible)
- **`estilo`** (eje de filtro, valor único). Valores válidos: `Realismo B&N`, `Realismo con color`, `Puntillismo`, `Fine Line`, `Blackwork`.
- **`parte`** (ubicación, filtro): `brazo` | `pierna` | `espalda` | `otro`
- **`tamano`** (filtro): `Chico` | `Mediano` | `Grande` | `Media manga` | `Manga completa`
- **`tematica`** (array, filtro): p. ej. `retrato`, `mitologia`, `animal`, `alegoria`
- **`tipo`** (array, filtro): `nuevo` | `cover-up` | `retoque`
- `zona` (texto libre solo para la ficha), `sesiones`, `estado` (`cicatrizado` | `reciente`), `semanas`, `imagen` (ruta en `src/assets/img/portfolio/{artista}/`), `destacadoHome` (si aparece en el carrusel "La obra" de la home).

Los conteos de los chips de `/portfolio` y de la galería de cada artista se recalculan solos — no hay números para tocar a mano. El match de filtros es case-insensitive (`filters.js` compara en minúsculas).

## Estado (11-jul-2026)

Migradas y ahora data-driven las 3 páginas que existían como mockups en `website/html/`: portfolio y galerías leen de `portfolio.json`/`artistas.json` en vez de tener contenido y conteos a mano. **Los conteos que se ven hoy son reales** (14 piezas cargadas, no la cifra "142" que era decorativa en el mockup) — van a crecer a medida que se agreguen piezas reales al JSON.

Pendiente (no hecho todavía):

- **`artistas.json`: los campos `anios`, `piezasTerminadas` e `instagram` de Lyvan y Macerll son datos ficticios de placeholder** (pedido explícito para completar el diseño), marcados con `"datosPlaceholder": true`. Reemplazar por los reales antes de publicar — están señalados también con un comentario en `src/artistas/lyvan.html` y `src/artistas/macerll.html`.
- `/cover-ups`, `/retoques`, `/primer-tatuaje`, `/cuidados`, `/faq`, `/privacidad`, `/blog`
- Los chips/filtros de `/portfolio` y de la galería de Armelio muestran conteos reales pero clickearlos todavía no filtra el grid visualmente (solo cambia el estado activo) — falta la lógica de filtrado en `filters.js`
- El lightbox de las cards del portfolio es funcional pero básico (sin fotos reales todavía, muestra el mismo placeholder en grande)
- Fotos reales: `img/catalogo/` tiene 43 fotos sin curar/etiquetar todavía

## Responsive (11-jul-2026)

Agregado `src/assets/css/responsive.css` con 3 breakpoints, mobile-first (todo lo que no está en un `@media` es el diseño mobile original, sin tocar):

- **Tablet `>= 768px`:** más aire, grids de portfolio/galería pasan a 3 columnas.
- **Desktop `>= 1024px`:** header con nav horizontal (se oculta la hamburguesa), grids a 4 columnas, hero con más tipografía y aire, "El estudio" pasa a foto+texto lado a lado, equipo en una fila de 3, footer multi-columna, el drawer de filtros de `/portfolio` pasa de bottom-sheet a panel lateral. El texto denso (bio, garantía, inversión, stepper) se mantiene en una columna de lectura angosta (~680px) en vez de estirarse a todo el ancho — criterio editorial, no de dashboard.
- **Wide `>= 1440px`:** solo sube el tope de ancho del contenedor, sin más cambios de layout.

Para verlo: con `npm start` corriendo, achicar/agrandar la ventana del navegador (o el panel de responsive design del inspector). No se generó preview automático porque las herramientas de mockup disponibles no reproducen fielmente una identidad visual custom (tipografía Cormorant Garamond, dark mode propio) — mejor verlo directo en el navegador real.

## Bug corregido durante la migración

`home-mobile-backdrop.html` tenía secciones (Garantía, CTA final, footer, pin del mapa, antes/después) con tonos sepia/naranja (`#d68966`, `#221812`, `rgba(196,120,90,...)`) que eran un resto de haber probado la paleta "sepia" — no coincidían con el resto del sitio ni con el accent único (`#9db8c9`). Se corrigieron a la paleta fría "Backdrop estudio" que usan `artistas-armelio-mobile.html` y `portfolio-mobile.html` correctamente.

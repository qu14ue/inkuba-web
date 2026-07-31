// dataLayer push en el primer play de videos con controles (entrevista Armelio, video de cuidados).
// Los videos del home son autoplay mudos (decorativos) → NO se miden.
document.addEventListener('DOMContentLoaded', () => {
  window.dataLayer = window.dataLayer || [];
  document.querySelectorAll('video[controls]').forEach((v) => {
    v.addEventListener('play', function onPlay() {
      const file = (v.currentSrc || v.querySelector('source')?.src || '').split('/').pop();
      window.dataLayer.push({
        event: 'video_play',
        video_title: file,
        page_path: location.pathname
      });
      v.removeEventListener('play', onPlay); // solo el primer play
    });
  });
});

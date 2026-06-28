// Pre-paint boot. External (not inline) so the deployed Content-Security-Policy
// can forbid inline scripts (`script-src 'self'`).
//
// 1. Apply the saved theme before first paint to avoid a flash of the wrong
//    palette, and seed the PWA theme-color to match.
// 2. Register the service worker for installability + an offline app shell.
// 3. Block pinch-to-zoom on iOS Safari, which ignores the viewport's
//    user-scalable=no. (Android/others are handled by the viewport meta and
//    `touch-action` in styles.css.)
(function () {
  // Safari-only gesture events fire for pinch; preventing them stops page zoom.
  // Passive:false is required so preventDefault is honoured.
  var blockGesture = function (e) {
    e.preventDefault();
  };
  document.addEventListener('gesturestart', blockGesture, { passive: false });
  document.addEventListener('gesturechange', blockGesture, { passive: false });
  document.addEventListener('gestureend', blockGesture, { passive: false });

  try {
    var pref = localStorage.getItem('omnyshell.theme') || 'system';
    var dark =
      pref === 'dark' ||
      (pref === 'system' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    var meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', dark ? '#0f1318' : '#f6f7f9');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('service_worker.js').catch(function (e) {
        // eslint-disable-next-line no-console
        console.warn('Service worker registration failed:', e);
      });
    });
  }
})();

// Pre-paint boot. External (not inline) so the deployed Content-Security-Policy
// can forbid inline scripts (`script-src 'self'`).
//
// 1. Apply the saved theme before first paint to avoid a flash of the wrong
//    palette, and seed the PWA theme-color to match.
// 2. Register the service worker for installability + an offline app shell.
(function () {
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

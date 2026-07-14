// Pre-paint boot. External (not inline) so the deployed Content-Security-Policy
// can forbid inline scripts (`script-src 'self'`).
//
// 1. Apply the saved theme before first paint to avoid a flash of the wrong
//    palette, and seed the PWA theme-color to match.
// 2. Register the service worker for installability + an offline app shell.
// 3. Block pinch-to-zoom on iOS Safari, which ignores the viewport's
//    user-scalable=no. (Android/others are handled by the viewport meta and
//    `touch-action` in kit.css.)
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

// Track the visual viewport so the terminal UI can sit above the on-screen
// keyboard. The soft keyboard overlays content rather than resizing the layout
// viewport, so we expose the visible height (--vvh) and keyboard inset (--kb)
// as CSS custom properties and flag `.keyboard-open` once the keyboard is up.
// (terminal.css binds the terminal screen to --vvh; the Dart side re-fits xterm
// on the same visualViewport resize.)
(function () {
  var vv = window.visualViewport;
  if (!vv) return;
  var root = document.documentElement;
  var queued = 0;
  function apply() {
    queued = 0;
    var visible = vv.height;
    // The keyboard inset is measured against the layout viewport — the same box
    // `position: fixed` (and `bottom: var(--kb)`) resolves against. On iOS the
    // layout viewport does NOT shrink for the keyboard, while window.innerHeight
    // sometimes does, so take the larger as the stable full-height reference.
    var full = Math.max(window.innerHeight, document.documentElement.clientHeight);
    var keyboard = Math.max(0, full - visible - vv.offsetTop);
    root.style.setProperty('--vvh', visible + 'px');
    root.style.setProperty('--kb', keyboard + 'px');
    // A small threshold avoids flagging an accessory/suggestion bar as the
    // keyboard; a hardware keyboard reports ~0 and stays "closed".
    root.classList.toggle('keyboard-open', keyboard > 80);
  }
  function onChange() {
    if (!queued) queued = requestAnimationFrame(apply);
  }
  vv.addEventListener('resize', onChange);
  vv.addEventListener('scroll', onChange);
  apply();
})();

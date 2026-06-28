// OmnyShell PWA service worker.
//
// Strategy:
//  - Precache the app shell (incl. the self-hosted xterm) so the app installs
//    and the terminal launches offline.
//  - Same-origin GETs: network-first (fresh app code online; cache fallback
//    offline). Navigations fall back to the cached shell.
//  - Cross-origin GETs: cache-first (caching opaque responses). Everything the
//    app needs is now same-origin, so this only matters for incidental requests.
//
// Bump CACHE_VERSION to invalidate old caches when the shell changes.
const CACHE_VERSION = 'omnyshell-v2';

const SHELL = [
  './',
  './styles.css',
  './boot.js',
  './manifest.json',
  './vendor/xterm/xterm.min.css',
  './vendor/xterm/xterm.min.js',
  './vendor/xterm/addon-fit.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      // Cache shell entries best-effort: a single missing file must not abort
      // the whole install.
      Promise.allSettled(SHELL.map((url) => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const shell = await cache.match('./');
      if (shell) return shell;
    }
    throw err;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  // Cache successful or opaque (cross-origin no-cors) responses.
  if (response && (response.ok || response.type === 'opaque')) {
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (request.mode === 'navigate' || sameOrigin) {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

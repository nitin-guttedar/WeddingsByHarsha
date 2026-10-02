// High-Performance Cache Service Worker for Weddings by Harsha
const CACHE_NAME = 'wbharsha-cache-v1';

// Static assets to pre-cache on service worker install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/logo.jpeg',
  '/favicon.ico',
  '/public/utsav.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Let browser handle Range requests (video streaming) natively without SW intervention
  if (event.request.headers.get('range') || url.pathname.endsWith('.mp4')) {
    return;
  }

  // Non-GET requests pass through
  if (event.request.method !== 'GET') {
    return;
  }

  // Cache-First strategy for images, fonts, and local assets
  const isImageOrAsset =
    url.pathname.includes('/assets/') ||
    url.pathname.includes('/bundled-assets/') ||
    /\.(?:png|jpg|jpeg|svg|webp|gif|ico|woff2?|ttf|eot)$/i.test(url.pathname);

  if (isImageOrAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // If offline/error and cached version exists
          return cachedResponse;
        });
      })
    );
    return;
  }

  // Stale-While-Revalidate strategy for CSS, JS, and HTML
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

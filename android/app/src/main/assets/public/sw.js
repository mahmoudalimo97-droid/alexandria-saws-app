/**
 * Service Worker for Alexandria Saws Catalog PWA
 * Strategy:
 * - Network-First for HTML and JS/CSS bundles to ensure immediate updates
 * - Cache-First for static media assets (images, icons)
 * - Automatic cleanup of old caches on version change
 * - Bypass dev server and hot-module-reload traffic
 */

const CACHE_VERSION = 'v2.1.0';
const CACHE_NAME = `alex-catalog-${CACHE_VERSION}`;

// Core assets to precache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Precache partial fallback:', err);
      });
    }).then(() => {
      // Force waiting service worker to become the active service worker immediately
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Clearing old PWA cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never intercept Vite dev server requests, websocket, or hot-updates
  if (
    url.pathname.includes('@vite') ||
    url.pathname.includes('/src/') ||
    url.pathname.includes('node_modules') ||
    url.search.includes('t=') ||
    url.port === '3000' ||
    url.port === '5173'
  ) {
    return;
  }

  // 1) HTML Navigation & JS/CSS application code: Network-First with Cache Fallback
  // This guarantees that code updates (like adding the 4th tab) show up immediately!
  const isHtml = request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');
  const isCode = url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.includes('/assets/index-');

  if (isHtml || isCode) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            if (isHtml) {
              return caches.match('./index.html') || caches.match('./');
            }
            return null;
          });
        })
    );
    return;
  }

  // 2) Media assets (images, icons, fonts): Cache-First with Network Fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      }).catch(() => null);
    })
  );
});

// Listen for message to skip waiting when user clicks "Update"
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

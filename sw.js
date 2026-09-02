const CACHE_NAME = 'attendance-cache-v3';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
        CORE_ASSETS.map(function(url) {
          return fetch(url).then(function(res) {
            return cache.put(url, res);
          }).catch(function() {
            // agar first install ke time internet na ho to skip, baad me runtime cache se bhar jayega
          });
        })
      );
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) { return caches.delete(n); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(res) {
      // Internet available — response ko cache me bhi save kar do taaki agli baar offline chale
      const resClone = res.clone();
      caches.open(CACHE_NAME).then(function(cache) {
        cache.put(e.request, resClone);
      });
      return res;
    }).catch(function() {
      // Internet nahi hai — cache se serve karo
      return caches.match(e.request).then(function(cached) {
        if (cached) return cached;
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

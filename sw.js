// Réseau d'abord : l'application affiche toujours la dernière version publiée quand il y a du réseau,
// et la copie en cache sert uniquement hors ligne.
const VERSION = 'v3';
const APP = `hernie-${VERSION}`;
const FONTS = 'hernie-fonts';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  // cache: 'reload' contourne le cache HTTP du navigateur pour récupérer les fichiers à jour
  e.waitUntil(
    caches.open(APP)
      .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== APP && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // Polices Google : servies depuis le cache, mises à jour en arrière-plan
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(e.request);
      const net = fetch(e.request).then(r => { c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // Fichiers de l'application : réseau d'abord (en revalidant auprès du serveur), cache si hors ligne
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(url.href, { cache: 'no-cache' })
        .then(r => {
          if (r.ok) { const copy = r.clone(); caches.open(APP).then(c => c.put(e.request, copy)); }
          return r;
        })
        .catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
  }
});

// شارع الحياة: بيخزّن ملفات اللعبة عشان تشتغل من غير نت
const VERSION = 'life-street-v81';
const HUMAN = 'life-street-human-v1';   // ملفات الناس الحقيقيين (١٢ ميجا): ليها كاش لوحدها مابيتمسحش مع كل تحديث
const FILES = ["./", "index.html", "three.min.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "fonts/f00.woff2", "fonts/f01.woff2", "fonts/f02.woff2", "fonts/f03.woff2", "fonts/f04.woff2", "fonts/f05.woff2", "fonts/f06.woff2", "fonts/f07.woff2", "fonts/fonts.css"];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== HUMAN).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  // الصفحة نفسها: من النت لو موجود (عشان التحديثات) ولو مفيش نت من الكاش
  if (req.mode === 'navigate') { e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put('index.html', c)); return r; }).catch(() => caches.match('index.html'))); return; }
  if (new URL(req.url).pathname.includes('/human/')) { e.respondWith(caches.open(HUMAN).then(c => c.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; })))); return; }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok && new URL(req.url).origin === location.origin) { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return r; })));
});

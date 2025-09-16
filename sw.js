const CACHE_NAME = 'daryen-card-game-v1.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/cards.json',
    '/card_back.jpeg',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png',
    'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap'
];

// Instalar o service worker e cachear recursos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.log('Erro ao cachear recursos:', error);
                // Cachear recursos individualmente se algum falhar
                return caches.open(CACHE_NAME).then(cache => {
                    return Promise.allSettled(
                        urlsToCache.map(url => cache.add(url))
                    );
                });
            })
    );
    self.skipWaiting();
});

// Ativar o service worker e limpar caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Interceptar requisições e servir do cache quando offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache se encontrado
                if (response) {
                    return response;
                }

                // Tenta buscar da rede
                return fetch(event.request).then(response => {
                    // Verifica se a resposta é válida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clona a resposta para cachear
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(() => {
                    // Se falhar, tenta servir uma página offline básica para navegação
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// Notificar sobre atualizações
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});


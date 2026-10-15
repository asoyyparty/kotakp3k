const CACHE_NAME = 'p3k-monitoring-v3';
const ASSETS_TO_CACHE = [
    'index.php',
    'manifest.json',
    'assets/css/style.css',
    'assets/images/p3k-logo.png',
    'assets/images/icon-512.png',
    'assets/images/icon-192.png',
    'assets/images/apple-touch-icon.png',
    'assets/images/favicon-32x32.png',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://unpkg.com/lucide@latest',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});

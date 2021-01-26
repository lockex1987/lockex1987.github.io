const cacheName = 'lichcuatoi-20200528-1710';
const folder = '/archive/project%20-%20lich%20cua%20toi';
const filesToCache = [
    '/',
    '/index.html',
    '/offline.html',

    '/manifest.json',

    '/images/favicon.png',
    '/images/icon-128.png',
    '/images/icon-144.png',
    '/images/icon-152.png',
    '/images/icon-192.png',
    '/images/icon-256.png',
    '/images/pwa.png',

    '/css/calendar.css',

    '/js/a2hs.js',
    '/js/calendar.js',
    '/js/new_moon_days.js',
    '/js/script.js',
    '/js/warning.js',

    '/libs/libs.1590642245736.css',
    '/libs/libs.1590642245736.js',
    '/libs/ajax-loader.gif',

    '/fonts/la-solid-900.woff2'
].map(s => folder + s);


async function addFilesToCache() {
    const cache = await caches.open(cacheName);
    console.log('Thêm các file vào cache');
    return cache.addAll(filesToCache);
}

self.addEventListener('install', (evt) => {
    evt.waitUntil(addFilesToCache());
});

async function getLiveVersionFirst(request) {
    // Cách 1: Lấy trên mạng trước
    try {
        const response = await fetch(request);

        // Don't cache response unless it's 2xx status
        if (!response || !response.ok) {
            return response;
        }

        // Clone it to allow us to cache it
        const responseToCache = response.clone();
        const cache = await caches.open(cacheName);
        cache.put(request, responseToCache);
        return response;
    } catch (err) {
        // Fetch failed, maybe we are offline. Try cache...
        // NOTE: On a patchy network, it could take a long time for the fetch
        // to fail and for us to get here. TO DO: introduce a timeout.
        const response = await caches.match(request);
        return response;
    }
}

async function getCachedVersionFirst(request) {
    // Cách 2: Lấy ở cache trước
    const response = await caches.match(request);
    if (response) {
        // console.log('Load từ cache', evt.request);
        return response;
    }
    return fetch(request);
}

self.addEventListener('fetch', (evt) => {
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        // return;
    }

    // evt.respondWith(getLiveVersionFirst(evt.request));
    evt.respondWith(getCachedVersionFirst(evt.request));
});


function deleteOldCaches() {
    caches.keys((cacheNames) => {
        console.log(cacheNames);
        return Promise.all(
            cacheNames.map((key) => {
                if (key != cacheName) {
                    console.log('Xóa cache', key);
                    return caches.delete(key);
                }
            })
        );
    });
}

// Xóa các cache cũ
self.addEventListener('activate', (evt) => {
    // console.log('Xóa các cache cũ');
    evt.waitUntil(deleteOldCaches());
});



function receivePushNotification(evt) {
    console.log('Push received', evt);
    const body = evt.data.text();
    const title = 'Thông báo';

    // const { image, tag, url, title, text } = evt.data.json();

    const options = {
        // data: 'url',
        body: body,
        icon: '/archive/project%20-%20lich%20cua%20toi/images/icon-128.png',
        vibrate: [200, 100, 200],
        // tag: 'tag',
        // image: 'image',
        badge: 'https://spyna.it/icons/favicon.ico',
        actions: [
            {
                action: 'Detail',
                title: 'View',
                icon: 'https://via.placeholder.com/128/ff0000'
            }
        ]
    };
    evt.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(evt) {
    console.log('Notification clicked', evt.notification.data);
    evt.notification.close();
    evt.waitUntil(clients.openWindow(evt.notification.data));
}

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', openPushNotification);

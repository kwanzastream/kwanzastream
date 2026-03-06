// Kwanza Stream — Service Worker for Push Notifications
// This file must be in the /public directory for the browser to register it

self.addEventListener('push', function (event) {
    if (!event.data) return;

    let data;
    try {
        data = event.data.json();
    } catch {
        data = {
            title: 'Kwanza Stream',
            body: event.data.text(),
            icon: '/icons/icon-192x192.png',
        };
    }

    const options = {
        body: data.body || '',
        icon: data.icon || '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/',
            dateOfArrival: Date.now(),
            type: data.type || 'general',
        },
        actions: [],
        tag: data.tag || 'kwanza-notification',
        renotify: true,
    };

    // Add actions based on notification type
    if (data.type === 'live_started') {
        options.actions = [
            { action: 'watch', title: '🎬 Assistir' },
            { action: 'dismiss', title: 'Depois' },
        ];
    } else if (data.type === 'donation_received') {
        options.actions = [
            { action: 'open', title: '💰 Ver' },
        ];
    }

    event.waitUntil(
        self.registration.showNotification(data.title || 'Kwanza Stream', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    const url = event.notification.data?.url || '/';

    if (event.action === 'dismiss') return;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            // If a window is already open, focus it and navigate
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    client.focus();
                    client.navigate(url);
                    return;
                }
            }
            // Otherwise open a new window
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

// Handle push subscription change
self.addEventListener('pushsubscriptionchange', function (event) {
    event.waitUntil(
        self.registration.pushManager.subscribe(event.oldSubscription.options).then(function (subscription) {
            // Re-register with server
            return fetch('/api/push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ subscription: subscription.toJSON() }),
            });
        })
    );
});

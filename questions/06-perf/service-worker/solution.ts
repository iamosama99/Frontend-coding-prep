import { useEffect, useState } from 'react';

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

export const PRECACHE_URLS = ['/', '/index.html', '/static/main.css', '/static/main.js'];

export function handleInstall(event: ExtendableEvent): void {
  event.waitUntil(
    (async () => {
      const cache = await (caches as any).open(STATIC_CACHE);
      await cache.addAll(PRECACHE_URLS);
      // Activate immediately — no need to wait for old clients to close.
      await (self as any).skipWaiting();
    })()
  );
}

export function handleActivate(event: ExtendableEvent): void {
  event.waitUntil(
    (async () => {
      const keys = await (caches as any).keys();
      await Promise.all(
        keys
          .filter((key: string) => !key.endsWith(CACHE_VERSION))
          .map((key: string) => (caches as any).delete(key))
      );
      // Take control of all open pages immediately.
      await (self as any).clients.claim();
    })()
  );
}

export function handleFetch(event: FetchEvent): void {
  const { request } = event;
  const url = request.url;

  // Cache-first: static assets (JS, CSS, fonts bundled under /static/)
  if (url.includes('/static/')) {
    event.respondWith(
      (caches as any).match(request).then((cached: Response | undefined) =>
        cached ??
        fetch(request).then((response) => {
          const clone = response.clone();
          (caches as any).open(STATIC_CACHE).then((cache: Cache) => cache.put(request, clone));
          return response;
        })
      )
    );
    return;
  }

  // Network-first: API calls
  if (url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          (caches as any).open(API_CACHE).then((cache: Cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => (caches as any).match(request))
    );
    return;
  }

  // Stale-while-revalidate: images
  if (/\.(jpe?g|png|webp|gif|svg)(\?.*)?$/.test(url)) {
    event.respondWith(
      (caches as any).open(IMAGE_CACHE).then(async (cache: Cache) => {
        const cached = await cache.match(request);
        const fetchPromise = fetch(request).then((response) => {
          cache.put(request, response.clone());
          return response;
        });
        return cached ?? fetchPromise;
      })
    );
    return;
  }

  // Navigation fallback to /offline.html when both network and cache fail
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        (caches as any).match('/offline.html') ?? new Response('Offline', { status: 503 })
      )
    );
    return;
  }

  // Default: pass through
  event.respondWith(fetch(request));
}

type SWStatus = 'unsupported' | 'registering' | 'active' | 'waiting' | 'error';

export function useServiceWorker(swPath: string): {
  status: SWStatus;
  updateAvailable: boolean;
  update: () => void;
} {
  const [status, setStatus] = useState<SWStatus>(() =>
    typeof navigator !== 'undefined' && 'serviceWorker' in navigator ? 'registering' : 'unsupported'
  );
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    let reg: ServiceWorkerRegistration;

    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        reg = registration;
        setStatus(registration.active ? 'active' : 'waiting');

        registration.onupdatefound = () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.onstatechange = () => {
            if (installing.state === 'installed' && registration.active) {
              setWaitingWorker(installing);
              setUpdateAvailable(true);
              setStatus('waiting');
            }
          };
        };
      })
      .catch(() => setStatus('error'));
  }, [swPath]);

  function update() {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }

  return { status, updateAvailable, update };
}

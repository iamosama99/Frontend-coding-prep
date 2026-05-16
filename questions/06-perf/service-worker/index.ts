import { useEffect, useState } from 'react';

// --- Service Worker logic (would live in a separate sw.ts in production) ---

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

export const PRECACHE_URLS = ['/', '/index.html', '/static/main.css', '/static/main.js'];

// TODO 1: Implement handleInstall.
//         - Call event.waitUntil(...)
//         - Open STATIC_CACHE and cache all PRECACHE_URLS.
//         - Call self.skipWaiting() so the SW activates immediately without waiting for old clients.

export function handleInstall(event: ExtendableEvent): void {
  throw new Error('Not implemented');
}

// TODO 2: Implement handleActivate.
//         - Delete all caches that don't match the current CACHE_VERSION.
//         - Call clients.claim() so existing pages are controlled by the new SW immediately.

export function handleActivate(event: ExtendableEvent): void {
  throw new Error('Not implemented');
}

// TODO 3: Implement handleFetch.
//         Apply the correct caching strategy based on the request URL:
//         - /static/ → cache-first (check cache first, fall back to network, cache the response)
//         - /api/    → network-first (try network, on failure return cached response)
//         - *.jpg / *.png / *.webp → stale-while-revalidate (return cache immediately, fetch in background)
//         - anything else → pass through (just fetch, no caching)
//         For navigation requests with no cache and no network, return a cached /offline.html fallback.

export function handleFetch(event: FetchEvent): void {
  throw new Error('Not implemented');
}

// --- Main thread hook ---

type SWStatus = 'unsupported' | 'registering' | 'active' | 'waiting' | 'error';

interface UseServiceWorkerResult {
  status: SWStatus;
  updateAvailable: boolean;
  update: () => void;
}

// TODO 4: Implement useServiceWorker.
//         - If 'serviceWorker' not in navigator, return status 'unsupported'.
//         - Call navigator.serviceWorker.register(swPath).
//         - On success, check registration.active vs registration.waiting to set initial status.
//         - Listen to registration.onupdatefound → new worker installing → when state changes to
//           'installed' and there's an existing active worker, set updateAvailable = true.
//         - update(): post { type: 'SKIP_WAITING' } to the waiting worker, then reload the page.

export function useServiceWorker(swPath: string): UseServiceWorkerResult {
  throw new Error('Not implemented');
}

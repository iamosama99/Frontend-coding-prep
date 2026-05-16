# Service Worker + Caching Strategies

## Problem

Implement a Service Worker that applies three different caching strategies for different resource types. Also build a `useServiceWorker` hook that reports SW registration status and whether an update is available.

## API Signature

```ts
// Service Worker file (sw.ts) — runs in SW context
// Exported for testing; in production this is a separate file registered via navigator.serviceWorker.register

export function handleFetch(event: FetchEvent): void
export function handleInstall(event: ExtendableEvent): void
export function handleActivate(event: ExtendableEvent): void

// Hook — runs in main thread
type SWStatus = 'unsupported' | 'registering' | 'active' | 'waiting' | 'error';

interface UseServiceWorkerResult {
  status: SWStatus;
  updateAvailable: boolean;
  update: () => void;  // triggers skipWaiting on the waiting SW
}

export function useServiceWorker(swPath: string): UseServiceWorkerResult
```

## Usage Example

```tsx
function App() {
  const { status, updateAvailable, update } = useServiceWorker('/sw.js');

  return (
    <>
      {updateAvailable && (
        <div>
          New version available!
          <button onClick={update}>Reload</button>
        </div>
      )}
    </>
  );
}
```

## Caching Strategies to Implement

| Resource type | URL pattern | Strategy |
|---|---|---|
| Static assets (JS/CSS) | `/static/` prefix | **Cache-first**: serve from cache, fall back to network |
| API data | `/api/` prefix | **Network-first**: try network, fall back to cache on failure |
| Images | `.jpg`, `.png`, `.webp` | **Stale-while-revalidate**: serve cached immediately, update cache in background |
| Everything else | — | Pass through to network, no caching |

## Constraints

- Cache names must include a version string (e.g. `'static-v1'`) so old caches can be cleaned up on activate
- `handleActivate` must delete caches from previous versions
- `handleInstall` pre-caches a list of shell assets (passed as a constant `PRECACHE_URLS`)
- `useServiceWorker` detects the 'waiting' state by listening to `registration.onupdatefound`
- `update()` posts a `{ type: 'SKIP_WAITING' }` message to the waiting worker

## Edge Cases

- Browser doesn't support Service Workers — `status` is 'unsupported' immediately
- SW registration fails (e.g. invalid path) — `status` is 'error'
- SW is already active on first load (subsequent visits) — `status` is 'active', no waiting state
- `update()` called when no waiting SW — no-op
- Network request fails AND there's no cache entry — return a fallback offline page for navigation requests

# Analytics / Tracking SDK

## Problem

Implement an `Analytics` class that batches events, flushes them to a server at regular intervals (or when the batch is full), and uses `navigator.sendBeacon` on page unload so events are not lost.

## TypeScript Signature

```ts
interface AnalyticsConfig {
  endpoint: string;         // URL to POST batches to
  batchSize?: number;       // flush when queue reaches this, default 10
  flushInterval?: number;   // ms between auto-flushes, default 5000
  maxRetries?: number;      // per-batch retry count, default 2
}

interface EventPayload {
  type: 'track' | 'identify' | 'page';
  event?: string;           // for 'track' events
  userId?: string;          // set after identify()
  properties?: Record<string, unknown>;
  timestamp: number;        // Date.now() at time of call
  sessionId: string;        // generated once per SDK instance
}

class Analytics {
  constructor(config: AnalyticsConfig)

  // Queue a track event with optional properties.
  track(event: string, properties?: Record<string, unknown>): void

  // Set the current user. All subsequent events include userId.
  identify(userId: string, traits?: Record<string, unknown>): void

  // Queue a page-view event using document.title and location.href.
  page(properties?: Record<string, unknown>): void

  // Immediately flush the current queue to the endpoint. Returns a promise
  // that resolves when the batch is delivered (or retries exhausted).
  flush(): Promise<void>

  // Stop the auto-flush interval and clear the queue.
  reset(): void
}
```

## Usage Example

```ts
const analytics = new Analytics({
  endpoint: 'https://api.example.com/events',
  batchSize: 20,
  flushInterval: 10_000,
});

analytics.identify('user-123', { plan: 'pro' });
analytics.track('Button Clicked', { buttonId: 'signup' });
analytics.page({ referrer: document.referrer });

// Manual flush (e.g. before SPA navigation)
await analytics.flush();

// Clean up on logout
analytics.reset();
```

## Constraints

- Auto-flush fires every `flushInterval` ms using `setInterval`
- Batch flush when `queue.length >= batchSize`
- On `visibilitychange` to `'hidden'` (tab switch/close): use `navigator.sendBeacon(endpoint, JSON.stringify(queue))` to send remaining events synchronously
- `flush()` must drain the queue atomically: snapshot the queue, clear it, then POST the snapshot
- If `flush()` is already in-flight, a second call should not send the same events twice — use an in-flight guard or queue the extra call
- Failed flushes retry up to `maxRetries` times; after that, events are dropped (not re-queued)
- `sessionId` is a random UUID generated once in the constructor

## Edge Cases

- `track()` called after `reset()` — events should re-queue (SDK is reusable)
- `flush()` called with an empty queue — resolve immediately with no HTTP call
- `identify()` called multiple times — only the latest `userId` is attached to events
- `batchSize` is 1 — every single event triggers an immediate flush
- `visibilitychange` fires before any events are queued — sendBeacon is a no-op
- Page is reloaded during a pending `flush()` — the `sendBeacon` fallback should cover this

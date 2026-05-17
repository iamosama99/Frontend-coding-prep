export interface AnalyticsConfig {
  endpoint: string;
  batchSize?: number;
  flushInterval?: number;
  maxRetries?: number;
}

export interface EventPayload {
  type: 'track' | 'identify' | 'page';
  event?: string;
  userId?: string;
  properties?: Record<string, unknown>;
  timestamp: number;
  sessionId: string;
}

// TODO 1: In the constructor:
//   - Generate a sessionId (use crypto.randomUUID() or a simple random string).
//   - Set up the auto-flush interval using setInterval.
//   - Register a 'visibilitychange' event listener on document that calls
//     navigator.sendBeacon when document.visibilityState === 'hidden'.
//   - Store userId as null initially.

// TODO 2: implement track(event, properties?).
//   Push an EventPayload of type 'track' onto the queue.
//   If queue.length >= batchSize, call flush() (don't await it).

// TODO 3: implement identify(userId, traits?).
//   Store the userId. Push an EventPayload of type 'identify' with traits as properties.

// TODO 4: implement page(properties?).
//   Push an EventPayload of type 'page'. In a browser context, merge in
//   { title: document.title, url: location.href } with any caller-supplied properties.

// TODO 5: implement flush(): Promise<void>.
//   a) If queue is empty, return Promise.resolve().
//   b) If a flush is already in-flight (use a boolean flag), wait for it
//      instead of sending a duplicate request. Simplest approach: chain a new
//      promise onto the in-flight one.
//   c) Snapshot the queue (copy it) and clear the queue immediately.
//   d) POST the snapshot to the endpoint as JSON. Retry up to maxRetries times
//      on failure. After retries exhausted, drop silently.

// TODO 6: implement reset().
//   Clear the queue, clear the interval, and remove the visibilitychange listener.

export class Analytics {
  constructor(_config: AnalyticsConfig) {
    throw new Error('Not implemented');
  }

  track(_event: string, _properties?: Record<string, unknown>): void {
    throw new Error('Not implemented');
  }

  identify(_userId: string, _traits?: Record<string, unknown>): void {
    throw new Error('Not implemented');
  }

  page(_properties?: Record<string, unknown>): void {
    throw new Error('Not implemented');
  }

  flush(): Promise<void> {
    throw new Error('Not implemented');
  }

  reset(): void {
    throw new Error('Not implemented');
  }
}

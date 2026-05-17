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

function randomId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export class Analytics {
  private endpoint: string;
  private batchSize: number;
  private maxRetries: number;
  private sessionId: string;
  private userId: string | null = null;
  private queue: EventPayload[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;
  private flushPromise: Promise<void> | null = null;
  private visibilityHandler: () => void;

  constructor(config: AnalyticsConfig) {
    this.endpoint = config.endpoint;
    this.batchSize = config.batchSize ?? 10;
    this.maxRetries = config.maxRetries ?? 2;
    this.sessionId = randomId();

    this.timer = setInterval(() => { this.flush(); }, config.flushInterval ?? 5000);

    this.visibilityHandler = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden' && this.queue.length > 0) {
        navigator.sendBeacon(this.endpoint, JSON.stringify(this.queue));
        this.queue = [];
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.visibilityHandler);
    }
  }

  private makePayload(type: EventPayload['type'], extras: Partial<EventPayload>): EventPayload {
    return {
      type,
      userId: this.userId ?? undefined,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      ...extras,
    };
  }

  track(event: string, properties?: Record<string, unknown>): void {
    this.queue.push(this.makePayload('track', { event, properties }));
    if (this.queue.length >= this.batchSize) this.flush();
  }

  identify(userId: string, traits?: Record<string, unknown>): void {
    this.userId = userId;
    this.queue.push(this.makePayload('identify', { properties: traits }));
  }

  page(properties?: Record<string, unknown>): void {
    const pageProps: Record<string, unknown> = {
      title: typeof document !== 'undefined' ? document.title : '',
      url: typeof location !== 'undefined' ? location.href : '',
      ...properties,
    };
    this.queue.push(this.makePayload('page', { properties: pageProps }));
  }

  flush(): Promise<void> {
    if (this.queue.length === 0) return Promise.resolve();

    if (this.flushPromise) return this.flushPromise;

    const batch = [...this.queue];
    this.queue = [];

    this.flushPromise = this.send(batch, this.maxRetries).finally(() => {
      this.flushPromise = null;
    });

    return this.flushPromise;
  }

  private async send(batch: EventPayload[], retriesLeft: number): Promise<void> {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batch),
      });
      if (!res.ok && retriesLeft > 0) {
        return this.send(batch, retriesLeft - 1);
      }
    } catch {
      if (retriesLeft > 0) return this.send(batch, retriesLeft - 1);
      // silently drop after retries exhausted
    }
  }

  reset(): void {
    this.queue = [];
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
  }
}

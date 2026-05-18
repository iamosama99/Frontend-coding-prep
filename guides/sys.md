# System Design (Frontend) — Guide

## Core Mental Model

Frontend system design interviews test whether you can reason about architecture at scale: not just "does it work" but "does it work for 10 million users, offline, with partial failures, and zero layout shift". The interviewer is looking for a structured thought process — requirements → API surface → data flow → edge cases → trade-offs.

The canonical frontend system design topics cluster around five areas: component library architecture, real-time communication, file handling, offline-first, and observability/analytics. Know one pattern well in each area.

---

## Component Library Architecture

A well-designed component library has three layers:

1. **Design tokens** — CSS custom properties (`--color-primary`, `--spacing-4`) that map semantic names to values. Never hardcode hex codes or pixel values in components.
2. **Primitive components** — headless or minimally styled: `Button`, `Input`, `Dialog`. They accept an `as` prop (polymorphic rendering) so callers control the HTML element.
3. **Pattern components** — composed from primitives: `SearchInput`, `ConfirmDialog`.

```ts
// Polymorphic `as` prop — TypeScript version
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & React.ComponentPropsWithRef<E>;

function Button<E extends React.ElementType = 'button'>({
  as,
  children,
  ...props
}: PolymorphicProps<E>) {
  const Tag = as ?? 'button';
  return <Tag {...props}>{children}</Tag>;
}
// <Button as="a" href="/path"> renders an <a> with button styles
```

**Key trade-off:** peer dependencies vs bundling. Publish React as a peer dep — bundling it doubles the consumer's React.

---

## Real-Time Communication: WebSocket vs SSE

| | WebSocket | Server-Sent Events |
|---|---|---|
| Direction | Bidirectional | Server → client only |
| Protocol | ws:// | HTTP |
| Reconnect | Manual | Built-in |
| Use case | Chat, multiplayer, live cursors | Activity feeds, notifications |

For most "live activity feed" use cases, SSE is simpler and sufficient. WebSocket is the right call when the client also needs to send high-frequency messages (typing indicators, cursor positions, collaborative editing ops).

```ts
// SSE with auto-reconnect cursor
function connectFeed(lastEventId?: string) {
  const url = lastEventId ? `/feed?lastId=${lastEventId}` : '/feed';
  const source = new EventSource(url);
  source.onmessage = (e) => processEvent(JSON.parse(e.data));
  source.onerror = () => { source.close(); setTimeout(connectFeed, 3000); };
}
```

---

## Chunked File Uploader

Large file uploads must be resumable. The pattern:
1. Slice the file with `File.prototype.slice(start, end)` into N chunks.
2. Upload each chunk as `FormData` with chunk index and total.
3. Track progress per chunk; sum for overall progress.
4. On failure: retry only the failed chunk, not the whole file.
5. Provide an abort controller so the user can cancel mid-upload.

```ts
async function uploadChunk(
  file: File, start: number, end: number, index: number,
  signal: AbortSignal
): Promise<void> {
  const chunk = file.slice(start, end);
  const form = new FormData();
  form.append('chunk', chunk);
  form.append('index', String(index));
  form.append('filename', file.name);
  await fetch('/upload/chunk', { method: 'POST', body: form, signal });
}
```

---

## Offline-First with IndexedDB

Offline-first means: optimistic writes to a local queue, sync to server when online, resolve conflicts.

Key APIs:
- `IndexedDB` (via `idb` wrapper) — structured storage with indexes, survives page reload
- `navigator.onLine` / `window.addEventListener('online', ...)` — detect connectivity
- Background Sync API — browser re-runs a sync registration after connectivity returns

Conflict resolution strategies:
- **Last-write-wins** — timestamp-based, simplest
- **Server-wins** — overwrite local on conflict, safest
- **CRDT** — merge without conflict, complex, needed for collaborative editing

---

## Analytics / Tracking SDK

The SDK must: batch events, flush on page unload, handle offline gracefully.

```ts
class AnalyticsSDK {
  private queue: Event[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;

  track(event: Event): void {
    this.queue.push(event);
    if (!this.timer) this.timer = setTimeout(() => this.flush(), 5000);
  }

  flush(): void {
    if (!this.queue.length) return;
    const batch = this.queue.splice(0);
    // Use navigator.sendBeacon for unload — doesn't get cancelled
    navigator.sendBeacon('/analytics', JSON.stringify(batch));
    this.timer = null;
  }
}

// Flush on tab close — fetch gets cancelled, sendBeacon does not
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') sdk.flush();
});
```

---

## Common Gotchas & Interview Mistakes

- **Forgetting SSE auto-reconnect is on by default** — but it doesn't pass the last event ID unless you wire it up. Always pass `Last-Event-ID` for resumable feeds.
- **Using `window.onbeforeunload` for analytics flush** — unreliable in mobile browsers. Use `visibilitychange` + `sendBeacon`.
- **Chunked upload without a session ID** — the server can't reassemble chunks across requests unless there's a shared upload ID.
- **IndexedDB on iOS Safari private mode** — throws a quota exception even on first write. Always wrap in try/catch and degrade gracefully.
- **Component library with bundled peer deps** — ships a second React instance, breaks hooks. Lint for this with `webpack-bundle-analyzer`.

---

## Interview Framing

Open with requirements clarification:
> "A few questions before I design: Are we optimising for consistency or availability? What's the expected write volume? Do we need to support offline?"

Then walk the data flow top-to-bottom:
> "The client writes to a local queue → syncs to the server on reconnect → the server returns a diff → the client reconciles. The hard part is conflict resolution — I'd start with last-write-wins and flag it as a known limitation."

Always name the trade-off explicitly before the interviewer asks:
> "WebSocket gives us bidirectionality we don't need here, so I'd use SSE — simpler, HTTP-native, and easier to debug with standard tools."

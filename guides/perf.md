# Performance — Guide

## Core Mental Model

Performance in frontend means: **render less, load less, measure first.** Every optimization has a cost (complexity, code size, time). Without measuring, you're guessing. The browser's rendering pipeline is: JavaScript → Style → Layout → Paint → Composite. The earlier you interrupt unnecessary work, the cheaper it is.

Three axes drive all performance decisions:
- **Network**: how much do we transfer? (bundle size, lazy loading, caching)
- **Parse/execute**: how much JS do we run on startup? (code splitting, tree shaking)
- **Runtime**: how much work happens per frame? (memoization, rAF, workers)

---

## Key APIs and Patterns

### Core Web Vitals

Google's three user-centric metrics:
- **LCP** (Largest Contentful Paint) — how fast is the biggest visible element loaded? Target < 2.5s. Root causes: unoptimized images, render-blocking resources.
- **CLS** (Cumulative Layout Shift) — do elements jump around? Target < 0.1. Root causes: images without dimensions, late-injected content.
- **INP** (Interaction to Next Paint) — how responsive are clicks/taps? Target < 200ms. Root causes: long tasks on main thread, heavy event handlers.

### React Memoization

```tsx
// React.memo — prevents re-render when props are same by reference
const Item = React.memo(({ label }: { label: string }) => <div>{label}</div>);

// useMemo — memoize expensive computed value
const sorted = useMemo(() => [...items].sort(), [items]);

// useCallback — stable function reference for child props
const handleClick = useCallback(() => doThing(id), [id]);
```

**The trap**: `useMemo` / `useCallback` add overhead. Only use when:
1. The dependency array is stable most renders, AND
2. The wrapped computation is actually expensive (> ~1ms) or the reference identity matters (passed to memo'd child)

### Code Splitting

```tsx
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  );
}
```

Rule of thumb: split at route boundaries and for components > ~30KB that aren't always needed.

### requestAnimationFrame Loop

```ts
let rafId: number;

function animate(timestamp: number) {
  // update state based on timestamp delta
  rafId = requestAnimationFrame(animate);
}

rafId = requestAnimationFrame(animate);
// cleanup
cancelAnimationFrame(rafId);
```

rAF fires ~60 times/second (synced to display refresh). Never use `setInterval` for animations — it doesn't sync to the display and causes jank.

### Web Worker

```ts
// worker.ts
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

// main.ts
const worker = new Worker(new URL('./worker.ts', import.meta.url));
worker.postMessage(input);
worker.onmessage = (e) => setResult(e.data);
```

Move tasks that block the main thread for > 50ms to a worker. Common candidates: large sort/filter, image processing, CSV parsing.

### Service Worker

```ts
// cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(
      (cached) => cached ?? fetch(event.request)
    )
  );
});
```

Strategies: **cache-first** (static assets), **network-first** (API data), **stale-while-revalidate** (data that can be slightly stale).

---

## Common Gotchas

- **Premature memoization**: wrapping everything in `useMemo` makes code harder to read and can be slower for cheap operations due to overhead.
- **Wrong React.memo usage**: `React.memo` only shallow-compares props. Passing a new object/array literal each render (`style={{ color: 'red' }}`) defeats it.
- **CLS from fonts**: use `font-display: swap` or `size-adjust` to prevent layout shift when web fonts load.
- **Missing cleanup in rAF loop**: if you don't call `cancelAnimationFrame` on unmount, the loop keeps running and references stale state.
- **Service Worker gotcha**: SW updates don't take effect until all tabs running the old SW are closed. Use `skipWaiting()` + `clients.claim()` to force update.
- **Bundle size**: importing `import { merge } from 'lodash'` pulls in all of lodash. Use `import merge from 'lodash/merge'` or `lodash-es`.

---

## Interview Framing

When asked to optimize something, always structure the answer as:
1. **Measure first**: "I'd open DevTools Performance tab / Lighthouse and identify the actual bottleneck."
2. **State the metric**: "The issue seems to be LCP — the hero image is 800KB uncompressed."
3. **Apply the fix**: "I'd add `srcset` with WebP versions, set explicit width/height to prevent CLS, and add `loading="lazy"` for below-fold images."
4. **Quantify the win**: "This should cut image transfer by ~70% and bring LCP under 2.5s."

For React-specific questions: mention the React Profiler, explain _why_ a component re-renders before reaching for `memo`, and flag when NOT to memoize.

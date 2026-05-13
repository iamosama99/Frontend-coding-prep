# React Hooks — Interview Guide

## Core Mental Model

Custom hooks are functions that let you extract stateful logic out of components and share it across the tree without changing component hierarchy. The critical insight is that hooks are **just JavaScript functions** that happen to call built-in React hooks internally — React's rules of hooks (call only at the top level, only from React functions) apply all the way down the call chain.

Understanding hooks well means understanding two things: **the render cycle** and **the stale closure trap**.

Each render is a snapshot. When a component renders, React calls your function and captures the values of all variables at that moment. Effects and event handlers created during that render close over those captured values. This is why the stale closure trap exists: an interval or event listener set up in one render can reference state or props from that render — even after newer values exist. The fix is almost always `useRef`: store the latest value in a ref so event handlers always read the current thing without needing to re-subscribe.

```ts
// Stale closure trap in useInterval
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);
  // Always keep the ref current — no stale read inside setInterval
  useEffect(() => { savedCallback.current = callback; });
  useEffect(() => {
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

## Key APIs and Patterns

**useRef** stores a mutable value that persists across renders without causing re-renders. Use it for: DOM node references, interval/timeout IDs, previous values, and "escape hatches" from the stale closure trap.

**useEffect cleanup** runs before the next effect fires and on unmount. Every subscription, listener, or async operation that can outlive the component needs a cleanup. Missing cleanup = memory leak.

```ts
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal }).then(setData);
  return () => controller.abort();  // cleanup cancels the in-flight request
}, [url]);
```

**Dependency arrays** are about _values_, not types. An object or function created inline during render is a new reference every render — it will re-trigger effects even if the data is the same. Stable refs, primitive state values, and memoized callbacks are safe deps.

**SSR guard** — `typeof window === 'undefined'` (or lazy initial state) is required for any hook that reads browser-only globals like `window`, `localStorage`, or `matchMedia`. Forgetting this breaks server rendering.

## Common Gotchas and Interview Mistakes

1. **Forgetting cleanup** — especially for `addEventListener`, `setInterval`, `IntersectionObserver`, and `AbortController`. Interviewers watch for this.
2. **Object/function in dep array without `useMemo`/`useCallback`** — creates infinite re-render loops.
3. **Reading state inside a timeout/interval without a ref** — stale closure; the interval sees the value from when it was created.
4. **`useEffect` with an async function** — you can't make the effect callback itself async (it would return a Promise instead of a cleanup function). Wrap: `useEffect(() => { async function run() {...} run(); }, [])`.
5. **`useLayoutEffect` vs `useEffect`** — `useLayoutEffect` fires synchronously after DOM mutations, before paint. Use it only for measuring DOM nodes. Everything else: `useEffect`.

## Core Patterns in Code

```ts
// Pattern 1: event listener with cleanup
function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (e: WindowEventMap[K]) => void,
  element: EventTarget = window
) {
  const handlerRef = useRef(handler);
  useEffect(() => { handlerRef.current = handler; });
  useEffect(() => {
    const listener = (e: Event) => handlerRef.current(e as WindowEventMap[K]);
    element.addEventListener(type, listener);
    return () => element.removeEventListener(type, listener);
  }, [type, element]);
}

// Pattern 2: async state machine
type AsyncState<T> = { status: 'idle' } | { status: 'loading' } |
  { status: 'success'; data: T } | { status: 'error'; error: Error };

function useAsync<T>(fn: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });
  const run = useCallback(() => {
    setState({ status: 'loading' });
    fn().then(data => setState({ status: 'success', data }))
        .catch(error => setState({ status: 'error', error }));
  }, [fn]);
  return { ...state, run };
}
```

## Interview Framing

Always **name the rule of hooks** if the interviewer asks why you're not calling a hook conditionally. Say: "Hooks must be called in the same order every render — React uses call order to track state, so conditional calls break that."

When implementing a custom hook, talk through: **"What state does this manage? What side effects does it set up? What does cleanup look like?"** This structure maps directly to useState → useEffect → cleanup function.

Flag SSR compatibility explicitly: "I'm guarding the `window` access because this hook might run server-side." Interviewers at companies using Next.js or Remix will reward that.

For `useDebounce` and `useThrottle`, distinguish between debouncing the **value** (returns a lagged value) versus debouncing a **callback** (returns a stable function). Most interviewers want both — ask which they need.

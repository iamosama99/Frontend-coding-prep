# React Hooks API Cheatsheet

## useState

```ts
const [state, setState] = useState<T>(initialValue)
const [state, setState] = useState<T>(() => expensiveInit()) // lazy init
```

**When to use:** Local component state that, when changed, should trigger a re-render.  
**Pitfall:** Setting state with an object reference you mutated in place — React bails out of re-render if the reference is the same (`Object.is` comparison). Always return a new object.

---

## useEffect

```ts
useEffect(() => {
  // side effect
  return () => { /* cleanup */ };
}, [dep1, dep2]);
```

**When to use:** Synchronising with external systems — fetching, subscriptions, DOM manipulation.  
**Pitfall:** Missing cleanup causes memory leaks. Empty dep array `[]` = run once after mount. No dep array = run after every render.

---

## useRef

```ts
const ref = useRef<HTMLDivElement>(null)     // DOM node ref
const timerRef = useRef<ReturnType<typeof setTimeout>>()  // mutable value
```

**When to use:** DOM access, storing mutable values that shouldn't trigger re-render, escaping stale closures.  
**Pitfall:** Mutating `ref.current` does not cause a re-render — don't use it for values that should update the UI.

---

## useMemo

```ts
const computed = useMemo(() => expensiveCalc(a, b), [a, b])
```

**When to use:** Expensive derived computations; stabilising object/array identity passed as props or deps.  
**Pitfall:** Every memo adds overhead. Don't memo cheap computations or values that change on every render anyway.

---

## useCallback

```ts
const handler = useCallback((e: Event) => doThing(dep), [dep])
```

**When to use:** Stabilising function identity passed to `React.memo` children or used as a dep in other hooks.  
**Pitfall:** Same as `useMemo` — don't wrap everything. If the child isn't memoised, `useCallback` buys nothing.

---

## useContext

```ts
const value = useContext(MyContext)
```

**When to use:** Reading shared data that many components need (theme, auth, locale).  
**Pitfall:** Every context consumer re-renders when context value changes. Split contexts by update frequency.

---

## useReducer

```ts
const [state, dispatch] = useReducer(reducer, initialState)
// reducer: (state: S, action: A) => S
```

**When to use:** Complex state with multiple sub-values, or next state depends on previous in non-trivial ways.  
**Pitfall:** Reducer must be a pure function — no side effects, no async.

---

## useLayoutEffect

```ts
useLayoutEffect(() => {
  // runs synchronously after DOM mutation, before paint
  return () => { /* cleanup */ };
}, [deps]);
```

**When to use:** Reading DOM measurements (getBoundingClientRect) before the browser paints to avoid flicker.  
**Pitfall:** Blocks paint — keep it fast. Breaks on SSR (fires client-only); prefer `useEffect` unless you have a real flicker problem.

---

## useId

```ts
const id = useId()  // e.g. ":r0:"
```

**When to use:** Generating stable, unique IDs for accessibility (aria-labelledby, htmlFor) in SSR-safe way.  
**Pitfall:** Don't use as list keys — `useId` is not meant for that.

---

## useDeferredValue

```ts
const deferred = useDeferredValue(value)
```

**When to use:** Defer re-rendering of a slow part of the UI (e.g. a large filtered list) while keeping input responsive.  
**Pitfall:** Doesn't throttle input events — it defers React rendering. Pair with `React.memo` on the slow child so it only re-renders when deferred value settles.

---

## useTransition

```ts
const [isPending, startTransition] = useTransition()
startTransition(() => setSlowState(newValue))
```

**When to use:** Marking a state update as non-urgent so React can interrupt it for urgent updates (e.g. typing).  
**Pitfall:** Can't wrap updates to inputs or other controlled components — those must stay synchronous.

---

## useSyncExternalStore

```ts
const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

**When to use:** Reading from external stores (Redux, Zustand, browser APIs like `navigator.onLine`) in a concurrent-safe way.  
**Pitfall:** `getSnapshot` must return the same reference if the data hasn't changed (memoize expensive derivations). `getServerSnapshot` is required for SSR.

---

## Quick Decision Tree

| Need | Hook |
|------|------|
| Local UI state | `useState` |
| Complex / multi-step state | `useReducer` |
| Stable mutable ref | `useRef` |
| Expensive calculation | `useMemo` |
| Stable callback identity | `useCallback` |
| External side effect | `useEffect` |
| DOM measurement before paint | `useLayoutEffect` |
| Shared global state | `useContext` |
| External store subscription | `useSyncExternalStore` |
| Accessible IDs | `useId` |
| Defer slow rendering | `useDeferredValue` / `useTransition` |

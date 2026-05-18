# Live Interview Set 2 — Closures + Hooks

**Difficulty:** Medium  
**Focus:** Closures applied to timing utilities, stale closures in React  
**Total time:** 45 minutes  
**Questions:** 3

---

## Session Overview

This set tests the relationship between closures and React hooks — a pattern that trips up many
mid-level candidates. A strong candidate sees `debounce` and `useDebounce` as the same concept
at two different layers of abstraction. The interviewer will explicitly connect the dots.

---

## Question 1 — Implement Debounce (15 min)

**Prompt:**
> Implement a `debounce(fn, delay)` function. The returned function, when called repeatedly,
> delays invoking `fn` until `delay` milliseconds have passed since the last call.

**What to implement:**
```ts
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void
```

**Interviewer watches for:**
- Uses a closure to store the timer ID
- Clears the timer on every call before starting a new one
- Preserves `this` context if needed (less critical for arrow function users)
- Asks: "Should this be leading-edge or trailing-edge?" (trailing is default)
- Handles the edge case: what if delay is 0?

**Follow-up questions:**
1. "How would you add a `cancel()` method to the returned function?"
2. "What's the difference between debounce and throttle? When do you use each?"
3. "Imagine you pass an arrow function as `fn` — does `this` context matter? Why?"

---

## Question 2 — Event Emitter / Pub-Sub (15 min)

**Prompt:**
> Implement an `EventEmitter` class with `on`, `off`, `emit`, and `once` methods.

**What to implement:**
```ts
class EventEmitter {
  on(event: string, listener: (...args: any[]) => void): this
  off(event: string, listener: (...args: any[]) => void): this
  emit(event: string, ...args: any[]): this
  once(event: string, listener: (...args: any[]) => void): this
}
```

**Interviewer watches for:**
- Uses `Map<string, Set<Function>>` or `Map<string, Function[]>` for O(1) event lookup
- `off` removes the correct listener by reference equality
- `once` wraps the listener so it auto-removes itself after first call
- Returns `this` from `on`, `off`, `emit` for chaining
- Handles emitting an event with no listeners without throwing

**Follow-up questions:**
1. "Your `once` wrapper creates a new function — how does `off` remove a `once` listener before it fires?"
2. "What happens if a listener calls `emit` on the same event? Is that safe?"
3. "How would you add a `removeAllListeners(event?)` method?"

---

## Question 3 — `useDebounce` hook (10 min)

**Prompt:**
> Implement `useDebounce<T>(value: T, delay: number): T` — a React hook that returns a debounced
> version of `value`. The returned value only updates after `delay` ms of stability.

**What to implement:**
```ts
function useDebounce<T>(value: T, delay: number): T
```

**Interviewer watches for:**
- Uses `useState` for the debounced value (triggering re-render when it settles)
- Uses `useEffect` with a `setTimeout` + `clearTimeout` cleanup
- Returns stale value during debounce window (not the current value)
- Explains why `useRef` is *not* sufficient here (no re-render)

**Follow-up questions:**
1. "What happens if `delay` changes between renders? Does your implementation handle that?"
2. "How is `useDebounce` different from calling your `debounce` utility inside a `useRef` in a component?"
3. "If I type quickly in a search input wired to this hook, describe exactly what happens to the state."

---

## Interviewer Notes (do not share with candidate)

**Passing bar:**
- Q1: clearTimeout + setTimeout, closes over timer ID. TypeScript correct.
- Q2: Map + array/Set listeners, `once` wraps and auto-removes, chaining.
- Q3: useState + useEffect cleanup. Explains the timing correctly.

**Stretch signals (strong candidate):**
- Q1: adds `cancel()`, discusses leading vs trailing edge, handles delay=0
- Q2: explains the `once` removal problem and solves it with a wrapper reference variable
- Q3: correctly handles changing `delay` (dependency array), discusses useMemo vs useState for debounced value

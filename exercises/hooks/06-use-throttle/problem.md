# useThrottle

## Problem

Implement a `useThrottle` hook that returns a throttled copy of a value — one that updates **at most once per `interval` milliseconds**, no matter how frequently the source value changes.

Unlike `useDebounce` (which delays until changes stop), throttle guarantees the value updates periodically while changes are ongoing.

## TypeScript Signature

```ts
function useThrottle<T>(value: T, interval: number): T
```

## Usage Example

```tsx
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 100);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Only re-renders at most 10 times per second despite frequent scroll events
  return <p>Scroll: {throttledScrollY}px</p>;
}
```

## Constraints

- The throttled value starts as the **initial value** (not `undefined`).
- Use either the **timestamp approach** (`Date.now()` diff) or the **inThrottle boolean flag** approach — both are valid; be ready to explain both in an interview.
- The value must update **at most once per interval**; it should NOT wait for changes to stop (that's debounce).
- Store mutable timer/timestamp data in a `useRef` to avoid re-renders.

## Edge Cases

- `interval` of 0: effectively no throttle — every update should pass through.
- Component unmounts while a pending timer is active — clear it to prevent setState after unmount.
- `value` changes back to a previous value: the throttled value should still respect the timing constraint.
- Multiple rapid value changes within one interval: only the **first** (leading edge) value in each window should propagate (trailing edge is debounce territory).

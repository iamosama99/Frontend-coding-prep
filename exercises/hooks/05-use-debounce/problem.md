# useDebounce

## Problem

Implement a `useDebounce` hook that returns a **debounced copy of a value** — one that only updates after the specified delay has elapsed without the original value changing.

This differs from a debounced callback: this hook debounces the **value itself**, so consumers can use it in dependency arrays or render it directly.

## TypeScript Signature

```ts
function useDebounce<T>(value: T, delay: number): T
```

## Usage Example

```tsx
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

The user types and `query` updates on every keystroke, but `debouncedQuery` only updates 300ms after the user stops typing. This prevents a fetch on every keystroke.

## Constraints

- Use `setTimeout` / `clearTimeout` inside `useEffect`.
- Store the timer ID in a `useRef` so the same timer ID is accessible across renders without causing re-renders.
- The debounced value starts as the **initial value** passed in, not `undefined`.
- Changing `delay` mid-component should reset the timer with the new delay.

## Edge Cases

- Rapid value changes: only the last value should propagate after the delay.
- `delay` of 0: should still be asynchronous (fired in the next microtask/macrotask).
- Component unmounts before delay fires: must cancel the pending timeout to avoid a setState-on-unmounted-component warning.
- Value changes back to previous value before the delay fires: the debounced value should update to the current value when the timer fires.

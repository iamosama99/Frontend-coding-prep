# usePrevious

## Problem

Implement a `usePrevious` hook that returns the **previous render's value** of any variable. On the first render it should return `undefined`.

This is the classic one-liner that demonstrates mastery of `useRef`'s persistence across renders.

## TypeScript Signature

```ts
function usePrevious<T>(value: T): T | undefined
```

## Usage Example

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <p>
      Now: {count}, Before: {prevCount ?? 'none'}
    </p>
  );
}
```

After the first render: `Now: 0, Before: none`  
After clicking increment: `Now: 1, Before: 0`  
After clicking again: `Now: 2, Before: 1`

## Constraints

- Must use `useRef` — not `useState` (storing previous values in state causes extra re-renders).
- The ref must be updated **after** render, not before — otherwise the "previous" value is actually the current one.
- No `useEffect` dep arrays needed; this should re-run every render.

## Edge Cases

- First render: returns `undefined` (no previous value exists yet).
- Value changes from `undefined` to a real value: previous should be `undefined`.
- Works for any type `T`: primitives, objects, arrays, functions.
- Rapid consecutive renders: always returns the value from the immediately preceding render, not an older one.

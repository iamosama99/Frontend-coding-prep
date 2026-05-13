# useLocalStorage

## Problem

Implement a `useLocalStorage` hook that behaves like `useState` but persists the value to `localStorage`. Reading the stored value on mount should initialise the state, and writing to state should write through to `localStorage`.

The hook must also **sync across browser tabs**: if another tab writes to the same key, the value in this hook should update automatically.

## TypeScript Signature

```ts
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void]
```

## Usage Example

```tsx
function Counter() {
  const [count, setCount] = useLocalStorage('count', 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(n => n + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

After clicking "+", refreshing the page should show the updated count. Opening the page in a second tab and incrementing there should update both tabs.

## Constraints

- The `setter` must support both a direct value and an updater function, matching the `useState` API exactly.
- Serialise with `JSON.stringify` / deserialise with `JSON.parse`.
- The hook must be **SSR-safe**: do not access `window` or `localStorage` during server-side rendering.
- Do not throw on `localStorage` errors (e.g. private browsing mode quota exceeded); fall back to in-memory state silently.

## Edge Cases

- `localStorage` is unavailable (SSR environment, private browsing with storage disabled).
- The stored value is corrupt JSON (manual edits, third-party writes).
- The `key` prop changes after mount — the hook should read the new key's value.
- Two instances use the same key: updating one should trigger a re-render in the other via the `storage` event.
- `initialValue` is a function (same lazy-init pattern as `useState`).

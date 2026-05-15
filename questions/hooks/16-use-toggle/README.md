# useToggle

## Problem

Implement a `useToggle` hook that manages a boolean state with a stable toggle function. The hook should also accept an optional argument to force the state to a specific value rather than flipping it.

## TypeScript Signature

```ts
function useToggle(
  initialValue?: boolean
): [boolean, (forcedValue?: boolean) => void]
```

## Usage Example

```tsx
function Menu() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={() => toggle()}>Toggle menu</button>
      <button onClick={() => toggle(false)}>Close</button>
      <button onClick={() => toggle(true)}>Open</button>
      {isOpen && <nav>Menu items here</nav>}
    </div>
  );
}
```

Clicking "Toggle menu" flips the state. Clicking "Close" always sets it to `false` regardless of current state. Clicking "Open" always sets it to `true`.

## Constraints

- `initialValue` defaults to `false` if not provided.
- Calling `toggle()` with no argument must flip the current value.
- Calling `toggle(true)` or `toggle(false)` must set the value exactly — no flipping.
- The toggle function reference must be **stable** across re-renders (use `useCallback`).
- The forced-value overload is the key distinction from a plain `useState` + `() => setState(v => !v)`.

## Edge Cases

- `toggle()` called with `undefined` explicitly should still flip (treat like no argument).
- `toggle(0)` or `toggle(null)` — non-boolean truthy/falsy values passed by accident; decide on behaviour and document it.
- The hook is called inside another hook or conditionally — standard rules of hooks apply, no special handling needed.
- `initialValue` changes after mount — should be ignored (same as `useState` initial value).

# useWhyDidYouUpdate

## Problem

Implement a `useWhyDidYouUpdate` hook that helps debug unnecessary re-renders by logging to the console whenever a component re-renders and showing **which props/values changed** and what they changed from and to.

This is a debugging hook — it has no production value and should be removed before shipping.

## TypeScript Signature

```ts
function useWhyDidYouUpdate(name: string, props: Record<string, unknown>): void
```

## Usage Example

```tsx
function ExpensiveComponent(props: { count: number; label: string; onClick: () => void }) {
  useWhyDidYouUpdate('ExpensiveComponent', props);
  return <div onClick={props.onClick}>{props.label}: {props.count}</div>;
}
```

When `count` changes, the console prints:
```
[useWhyDidYouUpdate] ExpensiveComponent changed:
  count: { from: 0, to: 1 }
```

When only `onClick` changes (same logic, different reference), it prints:
```
[useWhyDidYouUpdate] ExpensiveComponent changed:
  onClick: { from: [Function], to: [Function] }
```

## Constraints

- Store the previous props in a `useRef` (updated at the end of each render).
- On every render, compare each key using `Object.is` (same as React's comparison).
- Log only the keys that changed, showing `{ from: prevValue, to: newValue }`.
- Do NOT log on the first render (the ref is empty — there's nothing to compare against).
- The `name` parameter is just a label for the console output.

## Edge Cases

- First render: no previous props — skip logging entirely.
- A prop is added (key didn't exist before) — log it as a change from `undefined`.
- A prop is removed — log it as a change to `undefined`.
- No props changed (same component re-renders for a different reason) — log nothing or log an empty changes object; be consistent.
- Values that are not `Object.is`-equal but print the same (e.g. two different `{}` objects) — log them anyway, noting that reference changed.

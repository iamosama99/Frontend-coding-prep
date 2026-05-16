# HOC (Higher-Order Component)

Implement a `withLogger` Higher-Order Component that wraps any React component and logs mount, unmount, and prop change events to the console.

## TypeScript Signature

```ts
interface LoggerOptions {
  logMount?: boolean      // default true
  logUnmount?: boolean    // default true
  logPropChanges?: boolean // default true
}

function withLogger<P extends object>(
  Component: ComponentType<P>,
  options?: LoggerOptions
): ComponentType<P>
```

## Usage Example

```tsx
function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return <button onClick={onClick}>{label}</button>
}

const LoggedButton = withLogger(Button)

// In your app:
<LoggedButton label="Click me" onClick={() => {}} />
// Console: [withLogger(Button)] mounted
// When label prop changes:
// Console: [withLogger(Button)] prop changed: label "Click me" → "Submit"
// On unmount:
// Console: [withLogger(Button)] unmounted
```

## Constraints

- The returned component must forward all props to the wrapped component unchanged
- Must set `displayName` on the returned component: `withLogger(ComponentName)`
- Must use `useEffect` for mount/unmount logging
- Must use `useRef` to track previous props for change detection
- Should not affect the rendered output — pure pass-through wrapper

## Edge Cases

- Component without a `displayName` or `name` — fall back to `'Component'`
- All options disabled (`logMount: false`, etc.) — no console output
- Props that are functions (callbacks) — these change reference every render; log them or skip them?
- Wrapping an already-HOC-wrapped component (double wrapping)
- Component receives no props (empty props object)
- Prop value changes from `undefined` to a defined value

# useClickOutside

## Problem

Implement a `useClickOutside` hook that fires a callback whenever the user clicks **outside** a referenced DOM element. This pattern is used to close dropdowns, modals, and popups when the user clicks away.

## TypeScript Signature

```ts
function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T>
```

The hook returns a ref that the caller attaches to the element they want to watch. The callback fires on any click that did **not** originate inside that element.

## Usage Example

```tsx
function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && <ul><li>Item 1</li><li>Item 2</li></ul>}
    </div>
  );
}
```

Clicking inside the `<div>` does nothing. Clicking anywhere else on the page closes the dropdown.

## Constraints

- Use `mousedown` not `click` — `mousedown` fires before focus changes so it doesn't interfere with controlled inputs.
- Use `ref.contains(event.target)` to determine if the click was inside.
- Add the listener to `document`, not `window`, so it works correctly with portals.
- Clean up the listener on unmount.
- The callback should be stable — wrap it in a ref to avoid re-registering the listener when the callback changes identity.

## Edge Cases

- The ref is `null` on the first render (before the element mounts) — guard against this.
- The element is unmounted while the listener is active — cleanup must prevent calling the callback after unmount.
- The callback identity changes on every parent render — the listener must not be re-registered each time.
- Clicking on a child element that is a portal (rendered outside the DOM tree) — `contains` will return false; note this as a known limitation.

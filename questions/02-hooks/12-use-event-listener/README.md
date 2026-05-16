# useEventListener

## Problem

Implement a generic `useEventListener` hook that adds a typed event listener to any `EventTarget` (defaulting to `window`) and cleans up on unmount.

## TypeScript Signature

```ts
function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: EventTarget
): void

// Overload for custom events on arbitrary targets:
function useEventListener(
  type: string,
  handler: (event: Event) => void,
  element?: EventTarget
): void
```

## Usage Example

```tsx
function KeyboardShortcuts() {
  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  return null;
}

function ClickTracker({ buttonRef }: { buttonRef: React.RefObject<HTMLButtonElement> }) {
  useEventListener('click', (e) => {
    console.log('button clicked', e);
  }, buttonRef.current ?? undefined);

  return <button ref={buttonRef}>Click me</button>;
}
```

## Constraints

- Default `element` to `window` (guard against SSR where `window` doesn't exist).
- Store `handler` in a `useRef` and update it on every render — this prevents re-registering the listener when the handler identity changes.
- The listener registered on the element should call `handlerRef.current(e)` — so it always invokes the latest handler without being re-registered.
- Dependencies for the setup effect: `[type, element]` — NOT `[handler]`.
- Clean up with `removeEventListener` in the effect return.

## Edge Cases

- `element` is `null` (e.g. a ref before mount) — skip adding the listener.
- `element` changes (e.g. a conditional ref) — the effect should remove the old listener and add a new one.
- `handler` changes identity every render without memo — must NOT re-register the listener (ref pattern handles this).
- SSR: `window` is undefined — guard with `typeof window !== 'undefined'`.
- `type` changes — old listener removed, new one added.

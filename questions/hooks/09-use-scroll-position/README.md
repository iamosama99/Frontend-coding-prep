# useScrollPosition

## Problem

Implement a `useScrollPosition` hook that tracks the current scroll position of the page and exposes `x`, `y`, and the **scroll direction** (`up` | `down` | `none`).

## TypeScript Signature

```ts
interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'none';
}

function useScrollPosition(): ScrollPosition
```

## Usage Example

```tsx
function Header() {
  const { y, direction } = useScrollPosition();
  const isHidden = direction === 'down' && y > 100;

  return (
    <header style={{ transform: isHidden ? 'translateY(-100%)' : 'translateY(0)' }}>
      Navigation
    </header>
  );
}
```

The header hides when the user scrolls down past 100px and reappears when they scroll up.

## Constraints

- Use `window.scrollX` / `window.scrollY` (or `pageXOffset` / `pageYOffset` for legacy support).
- Must be **SSR-safe**: return `{ x: 0, y: 0, direction: 'none' }` when `window` is unavailable.
- Add the `scroll` event listener to `window` with `{ passive: true }` for better performance.
- Clean up the listener on unmount.
- Direction is determined by comparing the new `y` to the previous `y`.

## Edge Cases

- Initial render before any scrolling: direction is `'none'`.
- Scrolling back to the top: direction becomes `'up'`.
- Horizontal-only scroll: `y` unchanged so direction stays `'none'`.
- SSR: return fallback values without accessing `window`.
- Rapid scroll events: each event updates position; consider throttling for production but implement without throttle for the exercise.

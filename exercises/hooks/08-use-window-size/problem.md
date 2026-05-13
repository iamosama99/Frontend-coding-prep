# useWindowSize

## Problem

Implement a `useWindowSize` hook that returns the current `width` and `height` of the browser window and updates whenever the window is resized.

## TypeScript Signature

```ts
interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize
```

## Usage Example

```tsx
function ResponsiveLayout() {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div>
      <p>{width} × {height}</p>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
```

## Constraints

- Must be **SSR-safe**: return sensible defaults (e.g. `{ width: 0, height: 0 }`) when `window` is not available.
- Add and remove the `resize` event listener correctly — no listener leaks.
- The initial value on mount should match the actual window size (read it once on mount).
- Consider throttling the resize handler to avoid excessive re-renders (optional but mention it in an interview).

## Edge Cases

- SSR environment (`typeof window === 'undefined'`) — must not throw.
- Browser zoom — `window.innerWidth` / `window.innerHeight` reflect the visual viewport, which changes with zoom on some browsers. Note this as expected behaviour.
- Orientation change on mobile — `resize` fires on modern browsers; no extra handling needed.
- Window closed or `null` — not a realistic case in-browser, but the SSR guard covers it.

# useMediaQuery

## Problem

Implement a `useMediaQuery` hook that returns `true` when the given CSS media query matches and `false` when it doesn't. It should update reactively when the match status changes (e.g. window resize, orientation change).

## TypeScript Signature

```ts
function useMediaQuery(query: string): boolean
```

## Usage Example

```tsx
function Layout() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className={prefersDark ? 'dark' : 'light'}>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
```

## Constraints

- Use `window.matchMedia(query)` to create a `MediaQueryList`.
- Read the initial `matches` value synchronously.
- Listen for changes using `MediaQueryList.addEventListener('change', handler)` (use `addListener` as the legacy fallback, though `addEventListener` is preferred).
- Clean up the listener on unmount or when `query` changes.
- Must be **SSR-safe**: return `false` when `window` is not defined.

## Edge Cases

- SSR: `window.matchMedia` doesn't exist — return `false` without throwing.
- `query` changes after mount — remove the old listener, create a new `MediaQueryList`, and add a new listener.
- Invalid query string — `matchMedia` won't throw; `matches` will be `false`.
- `addListener` is deprecated in modern browsers but still needed for Safari < 14 — you may implement with `addEventListener` only and note the compatibility consideration.

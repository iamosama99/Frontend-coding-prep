# useIntersectionObserver

## Problem

Implement a `useIntersectionObserver` hook that wraps the `IntersectionObserver` API. It should return a ref to attach to a DOM element and a boolean indicating whether that element is currently intersecting (visible in the viewport).

## TypeScript Signature

```ts
interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

function useIntersectionObserver(
  options?: IntersectionOptions
): { ref: React.RefObject<HTMLElement>; isIntersecting: boolean }
```

## Usage Example

```tsx
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div ref={ref}>
      {isIntersecting && <img src={src} alt={alt} />}
    </div>
  );
}
```

The image only loads when the container enters the viewport by at least 10%.

## Constraints

- Create the `IntersectionObserver` inside `useEffect` (not at the top level) so it has access to the ref's DOM node.
- Observe `ref.current` — it will be null on first render, so guard against that.
- Disconnect the observer in the cleanup function.
- Start with `isIntersecting: false`.
- The observer callback receives an array of entries — use `entries[0].isIntersecting`.

## Edge Cases

- Ref is null when effect runs (element not yet mounted) — skip observation.
- `options` object changes identity on every render — memoising options in the caller is their responsibility; document this.
- `IntersectionObserver` not supported (old browsers) — add a fallback of `isIntersecting: true` or note the limitation.
- Element is removed from the DOM while being observed — cleanup disconnects automatically.
- `threshold` array vs single number — the API handles both; pass through as-is.

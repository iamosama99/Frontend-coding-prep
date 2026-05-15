# Back-to-Top Button

## Problem

Build a `BackToTop` component that renders a floating button which becomes visible once the user scrolls past a configurable threshold. Clicking it smoothly scrolls the page back to the top. The button must be keyboard accessible and work correctly on pages with custom scroll containers.

## TypeScript Signature

```ts
interface BackToTopProps {
  threshold?: number;          // scroll distance in px before button appears, default: 300
  scrollTarget?: HTMLElement | null; // custom scroll container, default: window
  smooth?: boolean;            // smooth scroll vs instant, default: true
  label?: string;              // accessible label, default: "Back to top"
}

function BackToTop(props: BackToTopProps): JSX.Element
```

## Usage Example

```tsx
// Default: watches window scroll
<BackToTop />

// Custom threshold and label
<BackToTop threshold={500} label="Scroll to top" />

// Custom scroll container
const containerRef = useRef<HTMLDivElement>(null);
<div ref={containerRef} style={{ overflowY: 'auto', height: '400px' }}>
  {/* long content */}
  <BackToTop scrollTarget={containerRef.current} threshold={100} />
</div>
```

**Expected behaviour:** the button is hidden (`display: none` or `opacity: 0` + `pointer-events: none`) when scroll position is below the threshold, and visible above it. Clicking scrolls to `{ top: 0, behavior: 'smooth' }`. After scrolling to top, focus returns to the top of the page or a designated skip-link.

## Constraints

- Listen for `scroll` events and update visibility; throttle or debounce the listener for performance.
- Remove the scroll event listener on component unmount.
- The button must be reachable by keyboard (`Tab`) only when visible; use `tabindex="-1"` or CSS visibility/display to remove it from the tab order when hidden.
- `smooth` defaults to `true`; when `false`, use instant scroll (`behavior: 'auto'`).
- The component must not crash if `scrollTarget` is `null` (e.g. during SSR or before ref is attached).

## Edge Cases

- Component mounts when already scrolled past threshold — button should appear immediately.
- `scrollTarget` changes from `null` to a valid element after mount — re-attach the listener.
- User resizes the window, making the page content shorter — hide the button if scroll position drops below threshold.
- `threshold` of 0 — button is always visible.
- Page has no scrollable content — button must not flash briefly on mount.
- SSR environment — `window` is undefined; guard all DOM accesses.

# Resizable Panels

## Problem

Build a `ResizablePanels` component that renders two adjacent panels with a draggable divider between them. Dragging the divider resizes both panels simultaneously. The layout can be horizontal (side by side) or vertical (stacked).

## TypeScript Signature

```ts
interface ResizablePanelsProps {
  children: [React.ReactNode, React.ReactNode];  // exactly two panels
  direction?: 'horizontal' | 'vertical';         // default: 'horizontal'
  defaultSplit?: number;          // initial split as percentage 0–100, default: 50
  minSize?: number;               // minimum size in px for each panel, default: 100
  maxSize?: number;               // maximum size in px for one panel (optional)
  onResize?: (split: number) => void;  // called with new split % during drag
  className?: string;
}

function ResizablePanels(props: ResizablePanelsProps): JSX.Element
```

## Usage Example

```tsx
<ResizablePanels direction="horizontal" defaultSplit={40} minSize={150}>
  <div>Left panel</div>
  <div>Right panel</div>
</ResizablePanels>

<ResizablePanels direction="vertical" defaultSplit={60}>
  <div>Top panel</div>
  <div>Bottom panel</div>
</ResizablePanels>
```

**Expected behaviour:** the divider (drag handle) sits between the two panels. Clicking and dragging moves the divider, and both panels resize in real time. `split` is stored as a percentage (0–100) so the layout is responsive. `minSize` clamps the split so neither panel becomes smaller than `minSize` pixels.

## Constraints

- Listen for `mousemove` and `mouseup` on `document` (not on the handle itself) during drag so it is not cancelled by leaving the handle.
- Remove document listeners on drag end and on unmount.
- Convert `minSize` to a percentage based on the container's current width/height.
- The handle must be keyboard accessible: Arrow keys adjust the split by 1% increments.
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on the handle for screen readers.
- Set `user-select: none` on the body during drag to prevent text selection.

## Edge Cases

- Container width is 0 on mount (SSR, hidden container) — set a safe default and recalculate on first drag.
- `minSize` larger than 50% of the container — clamp split to allow both panels to meet the minimum.
- Mouse released outside the browser window — `mouseup` on `document` still fires; clean up correctly.
- `direction` prop changes after mount — reset split to `defaultSplit`.
- Rapid mouse movements beyond container edges — clamp split to [minPercent, 100 - minPercent].
- Touch support (optional) — use pointer events or touch events for mobile resize.

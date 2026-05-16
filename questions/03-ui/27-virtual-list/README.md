# Virtualized List (Windowing)

## Problem

Build a `VirtualList` component that renders only the visible rows in a long list, maintaining placeholder space for off-screen rows. This is the core windowing technique that powers react-window and react-virtual. The implementation uses a fixed container height with scroll tracking to compute which rows are in the viewport.

## TypeScript Signature

```ts
interface VirtualListProps<T> {
  items: T[];
  itemHeight: number | ((index: number) => number);  // fixed or variable height
  containerHeight: number;                            // visible container height in px
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;      // extra rows to render beyond viewport, default: 3
  onScroll?: (scrollTop: number) => void;
  className?: string;
  itemKey?: (item: T, index: number) => string;
}

function VirtualList<T>(props: VirtualListProps<T>): JSX.Element
```

## Usage Example

```tsx
const items = Array.from({ length: 10_000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

<VirtualList
  items={items}
  itemHeight={50}
  containerHeight={400}
  renderItem={(item, i) => <div>{item.name}</div>}
  overscan={5}
/>
```

**Expected behaviour:** the container has a fixed height with `overflow-y: scroll`. An inner wrapper has a height of `totalHeight = items.length * itemHeight` to maintain the correct scrollbar size. Only the visible rows plus `overscan` rows above and below are rendered. Each rendered row is absolutely positioned using `top = index * itemHeight`.

## Constraints

- The component must support both fixed `itemHeight` (number) and variable height (function).
- For variable heights, pre-compute an array of cumulative offsets to calculate row positions.
- Track `scrollTop` in state via an `onScroll` handler on the container div.
- Compute `startIndex` and `endIndex` from `scrollTop`, `containerHeight`, and item heights.
- Apply `overscan` to extend the window: `startIndex = Math.max(0, startIndex - overscan)`.
- The inner positioning div must have `position: relative`; each item div has `position: absolute; top: N; width: 100%`.

## Edge Cases

- `items` array is empty — render an empty container with height 0 or `containerHeight`.
- `itemHeight` function returns 0 for some items — those items are effectively invisible; handle without division by zero.
- `containerHeight` larger than `totalHeight` — render all items (no windowing needed).
- Scroll to bottom very quickly — `startIndex` and `endIndex` are clamped to valid bounds.
- `items` prop changes (data update) — re-compute offsets; do not reset scroll position unnecessarily.
- `overscan` of 0 — only visible rows rendered; acceptable but may cause flicker on fast scroll.

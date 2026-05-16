# Responsive CSS Grid

## Problem

Implement a `ResponsiveGrid` component that creates a fully responsive card grid using CSS Grid's `auto-fit` + `minmax()` — no media queries required. Also export a `getGridStyles` utility that returns the CSS style object.

## TypeScript Signatures

```typescript
interface ResponsiveGridProps {
  minColumnWidth?: number   // minimum column width in px, default 250
  gap?: number | string     // gap between cells, default 16
  children: React.ReactNode
  style?: React.CSSProperties
}

function ResponsiveGrid(props: ResponsiveGridProps): React.ReactElement

function getGridStyles(config: {
  minColumnWidth: number
  gap: number | string
}): React.CSSProperties
```

## Usage Example

```tsx
<ResponsiveGrid minColumnWidth={280} gap={24}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  {/* Automatically wraps — no media queries needed */}
</ResponsiveGrid>
```

Expected grid CSS:
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 16px;
```

## Constraints

- The grid must use `auto-fit` (not `auto-fill`) so empty columns collapse
- The `1fr` maximum ensures columns grow to fill remaining space
- `minColumnWidth` must be in the `minmax()` minimum, not the maximum
- `gap` accepts both numbers (px) and strings (`"1rem"`, `"8px 16px"`)
- The component wraps children in a `div` with the grid styles applied

## Edge Cases

- `minColumnWidth` larger than the container — all items stack to one column (correct browser behaviour)
- `auto-fill` vs `auto-fit`: `auto-fill` creates empty tracks for unfilled columns; `auto-fit` collapses them — this component must use `auto-fit`
- `gap={0}` — valid, no gap between items
- Very large `minColumnWidth` — all cards stack to single column (graceful degradation)
- String gap like `"8px 16px"` — row-gap 8px, column-gap 16px; pass through as-is

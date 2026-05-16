# CSS Masonry Layout

## Problem

Implement a `MasonryGrid` component with two approaches: (1) the CSS `columns` trick for a simple masonry approximation, and (2) the experimental `grid: masonry` value. Export utilities for both approaches.

## TypeScript Signatures

```typescript
type MasonryApproach = 'columns' | 'grid-masonry'

interface MasonryGridProps {
  columns?: number           // number of columns, default 3
  gap?: number               // gap in px, default 16
  approach?: MasonryApproach // default 'columns'
  children: React.ReactNode
  style?: React.CSSProperties
}

function MasonryGrid(props: MasonryGridProps): React.ReactElement

function getColumnsMasonryStyles(columns: number, gap: number): React.CSSProperties

function getGridMasonryStyles(columns: number, gap: number): React.CSSProperties

// For the columns approach, items need break-inside: avoid
function getMasonryItemStyles(): React.CSSProperties
```

## Usage Example

```tsx
<MasonryGrid columns={3} gap={16}>
  <Card height={200}>Short card</Card>
  <Card height={350}>Tall card</Card>
  <Card height={150}>Short card</Card>
  <Card height={400}>Very tall card</Card>
</MasonryGrid>
```

CSS columns approach:
```css
.masonry {
  columns: 3;
  column-gap: 16px;
}
.masonry > * {
  break-inside: avoid;
  margin-bottom: 16px;
}
```

CSS Grid masonry approach (experimental):
```css
.masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;
  gap: 16px;
}
```

## Constraints

- **Columns approach**: uses CSS `columns` property; items flow top-to-bottom in each column (not left-to-right rows)
- **Grid masonry**: uses `grid-template-rows: masonry` — currently only in Firefox with a flag and Safari TP
- Items in the columns approach need `break-inside: avoid` to prevent cards from splitting across columns
- The `gap` in the columns approach is `column-gap` for between-column gaps; row gap is handled by `margin-bottom` on items
- The `MasonryGrid` component wraps children in a masonry container; items are rendered as-is

## Edge Cases

- **Source order**: columns approach flows top→bottom then left→right (like a newspaper); grid masonry flows left→right (like a grid) — this affects visual order and accessibility
- `columns={1}` — single column, no masonry effect (just a stacked list)
- Varying child heights — the core requirement; masonry eliminates vertical gaps between short items
- Responsive columns: document that `columns` can accept a string (`"3"` or `"auto"`) and that `column-width` is the responsive alternative
- Browser support for `grid-template-rows: masonry` — note it is behind a flag in Firefox and experimental in Safari; use the columns approach as the production default

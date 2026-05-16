# Box Model (content-box vs border-box)

## Problem

Implement a `computeRenderedWidth` function that calculates the actual rendered pixel width of an element given its CSS box model properties. Also implement a `BoxModelDemo` component that shows the visual difference between `content-box` and `border-box`.

## TypeScript Signatures

```typescript
type BoxSizing = 'content-box' | 'border-box'

function computeRenderedWidth(config: {
  boxSizing: BoxSizing
  width: number       // the CSS width value in px
  paddingLeft: number
  paddingRight: number
  borderLeft: number
  borderRight: number
}): number

interface BoxModelDemoProps {
  boxSizing: BoxSizing
  width: number
  padding: number  // applied equally on both sides
  border: number   // applied equally on both sides
  label?: string
}

function BoxModelDemo(props: BoxModelDemoProps): React.ReactElement
```

## Usage Example

```typescript
computeRenderedWidth({
  boxSizing: 'content-box',
  width: 200,
  paddingLeft: 20, paddingRight: 20,
  borderLeft: 2, borderRight: 2,
})
// → 244  (200 + 40 padding + 4 border)

computeRenderedWidth({
  boxSizing: 'border-box',
  width: 200,
  paddingLeft: 20, paddingRight: 20,
  borderLeft: 2, borderRight: 2,
})
// → 200  (width already includes padding + border)
```

## Constraints

- For `content-box`: rendered width = `width + paddingLeft + paddingRight + borderLeft + borderRight`
- For `border-box`: rendered width = `width` (no addition needed)
- Margin is NOT included in rendered width calculations
- The `BoxModelDemo` component should visually distinguish the content, padding, and border areas using different background colors

## Edge Cases

- Width of 0 with padding — `content-box` renders at padding width, `border-box` may produce negative content area (browser clamps to 0)
- Negative `width` — invalid CSS, treat as 0
- `border-box` where `padding + border > width` — content width is 0 (browsers don't go negative)
- Fractional pixel values — return as-is; do not round

# Flexbox Layout Fundamentals

## Problem

Implement a `FlexContainer` component that accepts the core flex container properties as props and applies them as inline styles. Also implement a `FlexItem` component for child items with flex-specific props.

## TypeScript Signatures

```typescript
interface FlexContainerProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around'
  gap?: number | string
  inline?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
}

interface FlexItemProps {
  grow?: number
  shrink?: number
  basis?: number | string
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  order?: number
  children: React.ReactNode
  style?: React.CSSProperties
}

function FlexContainer(props: FlexContainerProps): React.ReactElement
function FlexItem(props: FlexItemProps): React.ReactElement
```

## Usage Example

```tsx
<FlexContainer justify="space-between" align="center" gap={16}>
  <FlexItem grow={1}>Left content</FlexItem>
  <FlexItem basis={200}>Fixed width</FlexItem>
</FlexContainer>

<FlexContainer direction="column" gap="1rem">
  <div>Stack item 1</div>
  <div>Stack item 2</div>
</FlexContainer>
```

## Constraints

- `FlexContainer` must set `display: flex` (or `inline-flex` when `inline={true}`)
- The `gap` prop accepts a number (treated as pixels) or a string (e.g., `"1rem"`)
- All props are optional — unset props do not override browser defaults
- Pass-through `style` prop should merge with the computed flex styles (user styles win on conflict)
- `FlexItem` wraps children in a `div` with the computed flex item styles

## Edge Cases

- `gap={0}` — still a valid value, must be applied
- Omitting `align` — browser default (`stretch`) applies, not an explicit value in the style object
- `inline={true}` — `display: inline-flex`
- `grow={0}` — valid, prevents item from growing; must not be omitted
- `basis="auto"` — valid string value
- `order` negative values — valid CSS (items render before order-0 items)

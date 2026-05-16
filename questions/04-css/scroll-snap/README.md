# CSS Scroll Snap

## Problem

Implement `ScrollSnapContainer` and `ScrollSnapItem` components that create a snapping scroll experience. The container should support both horizontal and vertical scroll directions with mandatory snap points.

## TypeScript Signatures

```typescript
type SnapDirection = 'x' | 'y'
type SnapAlign = 'start' | 'center' | 'end'
type SnapType = 'mandatory' | 'proximity'

interface ScrollSnapContainerProps {
  direction?: SnapDirection    // default 'x'
  snapType?: SnapType          // default 'mandatory'
  children: React.ReactNode
  style?: React.CSSProperties
}

interface ScrollSnapItemProps {
  snapAlign?: SnapAlign        // default 'start'
  children: React.ReactNode
  style?: React.CSSProperties
}

function ScrollSnapContainer(props: ScrollSnapContainerProps): React.ReactElement
function ScrollSnapItem(props: ScrollSnapItemProps): React.ReactElement

function getSnapContainerStyles(direction: SnapDirection, snapType: SnapType): React.CSSProperties
function getSnapItemStyles(snapAlign: SnapAlign): React.CSSProperties
```

## Usage Example

```tsx
{/* Horizontal image carousel */}
<ScrollSnapContainer direction="x" style={{ width: '100%', height: 300 }}>
  <ScrollSnapItem style={{ minWidth: '100%' }}>Slide 1</ScrollSnapItem>
  <ScrollSnapItem style={{ minWidth: '100%' }}>Slide 2</ScrollSnapItem>
  <ScrollSnapItem style={{ minWidth: '100%' }}>Slide 3</ScrollSnapItem>
</ScrollSnapContainer>

{/* Vertical full-page scroll */}
<ScrollSnapContainer direction="y" style={{ height: '100vh' }}>
  <ScrollSnapItem style={{ height: '100vh' }}>Section 1</ScrollSnapItem>
  <ScrollSnapItem style={{ height: '100vh' }}>Section 2</ScrollSnapItem>
</ScrollSnapContainer>
```

Expected CSS:
```css
/* Container */
scroll-snap-type: x mandatory;
overflow-x: auto;
display: flex;              /* for x direction */

/* Item */
scroll-snap-align: start;
flex-shrink: 0;             /* for x direction */
```

## Constraints

- Container: `scroll-snap-type: [direction] [snapType]`
- Container: `overflow-x: auto` (horizontal) or `overflow-y: auto` (vertical)
- Item: `scroll-snap-align: [snapAlign]`
- For horizontal direction: container must be `display: flex` and items `flex-shrink: 0`
- `mandatory` snapping: always snaps to the nearest snap point even without completing the scroll gesture
- `proximity` snapping: only snaps if the scroll position is close enough to a snap point

## Edge Cases

- Only one item — still snaps (no effect since there's nowhere to snap)
- Items of varying heights (vertical) — `snap-align: start` anchors to the top of each item
- `snapAlign="center"` — items center in the viewport on snap; useful for carousels showing partial adjacent items
- Scrolling programmatically (e.g., for prev/next buttons) — use `scrollTo({ behavior: 'smooth' })` on the container ref
- Overscroll behavior — add `overscroll-behavior: contain` to prevent scroll propagation to the parent

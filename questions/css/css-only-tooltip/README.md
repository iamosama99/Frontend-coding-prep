# CSS-Only Tooltip

## Problem

Implement a `Tooltip` component that shows a tooltip on hover using only CSS pseudo-elements (`::before` / `::after`) — no JavaScript, no state, no event handlers. The tooltip should support four placement positions.

## TypeScript Signatures

```typescript
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  text: string
  position?: TooltipPosition   // default 'top'
  children: React.ReactNode
  delay?: string               // CSS transition delay, e.g. '0.2s'
}

function Tooltip(props: TooltipProps): React.ReactElement

// Returns the CSS string for the tooltip styles (for style-tag injection or CSS modules)
function getTooltipCSS(position: TooltipPosition, text: string): string
```

## Usage Example

```tsx
<Tooltip text="Copy to clipboard" position="top">
  <button>Copy</button>
</Tooltip>

<Tooltip text="Keyboard shortcut: ⌘K" position="bottom" delay="0.3s">
  <span>Help</span>
</Tooltip>
```

The tooltip should appear when the wrapper div is hovered, using:
- `::before` — the tooltip bubble (background + border-radius)
- `::after` — the arrow pointing toward the trigger
- `:hover ::before, :hover ::after` — toggle `opacity` and `visibility`

## Constraints

- No JavaScript or React state — purely CSS-driven visibility
- Use `opacity: 0` + `visibility: hidden` (not `display: none`) so transitions work
- Use `position: absolute` on the tooltip relative to a `position: relative` wrapper
- The tooltip text is set via `content: attr(data-tooltip)` on the `::before` pseudo-element using a `data-tooltip` attribute
- The arrow (`::after`) is the CSS triangle trick: a zero-width/height element with colored borders

## Edge Cases

- Long tooltip text — tooltip box should have `max-width` and `white-space: nowrap` to prevent overflow
- Tooltip near viewport edge — clipping is acceptable at this level; no JS repositioning needed
- `delay` prop — applied as `transition-delay` on hover so the tooltip doesn't flash on quick mouse-overs
- Nested interactive elements as children — the hover trigger wraps the children, so all child hover events propagate correctly
- Touch devices — `:hover` doesn't work reliably; tooltip is simply hidden (acceptable limitation)

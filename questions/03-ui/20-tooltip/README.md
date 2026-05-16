# Tooltip Component

## Problem

Build a `Tooltip` component that shows a floating text label near a trigger element on hover and focus. The tooltip positions itself automatically (above, below, left, or right of the trigger) and uses a portal to escape overflow clipping. It appears after a configurable delay and disappears on mouse-leave or blur.

## TypeScript Signature

```ts
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'auto';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;    // must be a single element (the trigger)
  placement?: TooltipPlacement;    // default: 'top'
  delay?: number;                  // ms before showing, default: 300
  disabled?: boolean;
  maxWidth?: number;               // default: 200 (px)
}

function Tooltip(props: TooltipProps): JSX.Element
```

## Usage Example

```tsx
<Tooltip content="Copy to clipboard" placement="top">
  <button>Copy</button>
</Tooltip>

<Tooltip content="This feature is coming soon" placement="auto" delay={500}>
  <span>Beta feature</span>
</Tooltip>
```

**Expected behaviour:** hovering or focusing the trigger starts a `delay` ms timer. After the delay, the tooltip appears. Moving the mouse away or blurring cancels the timer and hides the tooltip. `placement="auto"` detects which side of the viewport has the most space and positions there.

## Constraints

- Use `getBoundingClientRect()` on the trigger to compute the tooltip's CSS `top` and `left`.
- Render the tooltip via `createPortal` into `document.body`.
- The trigger element gets `aria-describedby` pointing to the tooltip's id.
- The tooltip element gets `role="tooltip"` and the matching `id`.
- Do not render the tooltip in the DOM when hidden — return null for the portal content.
- Clear the delay timer on cleanup to prevent showing a tooltip after the trigger is destroyed.

## Edge Cases

- Trigger near the viewport edge — `placement="auto"` must flip to avoid clipping.
- Tooltip content is very long — respect `maxWidth` with word wrap.
- `disabled` prop — tooltip never shows, not even on focus.
- Trigger is removed from DOM while timer is running — cleanup must prevent state update.
- Multiple Tooltips on the same page — each manages its own visibility state independently.
- `content` is null or empty string — do not show the tooltip at all.

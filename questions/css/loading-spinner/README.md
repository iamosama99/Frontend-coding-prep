# CSS Loading Spinner

## Problem

Implement a `Spinner` component using the CSS border trick: a circular div where three sides of the border are transparent and one side is colored, animated with `@keyframes rotate`. The spinner should be accessible and configurable.

## TypeScript Signatures

```typescript
interface SpinnerProps {
  size?: number        // diameter in px, default 40
  color?: string       // spinner color, default '#3b82f6'
  thickness?: number   // border width in px, default 4
  speed?: string       // animation duration, default '0.75s'
  label?: string       // aria-label for screen readers, default 'Loading'
}

function Spinner(props: SpinnerProps): React.ReactElement

// Returns the keyframe CSS string for injection into a <style> tag
function getSpinnerKeyframes(): string
```

## Usage Example

```tsx
<Spinner />
<Spinner size={24} color="#ef4444" speed="0.5s" label="Saving..." />
<Spinner size={64} thickness={6} />
```

The rendered HTML should be:
```html
<div
  role="status"
  aria-label="Loading"
  style="
    width: 40px; height: 40px;
    border: 4px solid rgba(59, 130, 246, 0.2);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  "
></div>
```

## Constraints

- Use the **border trick**: full border with low-opacity base color, then `border-top-color` set to the full spinner color
- `border-radius: 50%` makes the div circular
- `animation` shorthand: `spin [speed] linear infinite`
- Must include `role="status"` and `aria-label` for accessibility
- The `@keyframes spin` animation rotates from `0deg` to `360deg`

## Edge Cases

- `size={0}` — render nothing or a 1px minimum
- Very small `thickness` relative to `size` — renders as a thin ring (correct)
- `speed="0"` — freezes the animation; still renders the spinner shape
- `color` with alpha (e.g., `rgba(...)`) — use as-is for the solid color; derive the track color by reducing opacity
- Multiple spinners on the page — the `@keyframes` name `spin` may collide; document this limitation

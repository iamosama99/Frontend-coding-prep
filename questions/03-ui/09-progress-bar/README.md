# Progress Bar

## Problem

Build a `ProgressBar` component that visualises a numeric value within a range. It must support a **determinate** mode (known value/max) with an animated fill, and an **indeterminate** mode (unknown progress) with a looping shimmer or sliding animation. ARIA attributes must be correctly set for both modes.

## TypeScript Signature

```ts
interface ProgressBarProps {
  value?: number;           // current progress (determinate when provided)
  min?: number;             // default: 0
  max?: number;             // default: 100
  label?: string;           // visible or sr-only description
  showValue?: boolean;      // render the numeric value as text, default: false
  animated?: boolean;       // enable fill animation, default: true
  color?: string;           // fill color, default: system/CSS class
  className?: string;
}

function ProgressBar(props: ProgressBarProps): JSX.Element
```

## Usage Example

```tsx
// Determinate — 75% complete
<ProgressBar value={75} label="File upload progress" showValue />

// Indeterminate — unknown duration
<ProgressBar label="Loading..." />

// Custom range
<ProgressBar value={300} min={0} max={500} label="Words written" showValue />
```

**Expected behaviour:** in determinate mode, the fill width is `((value - min) / (max - min)) * 100`%. In indeterminate mode, a CSS animation (sliding bar or shimmer) plays indefinitely. `showValue` renders the computed percentage or raw value next to the bar.

## Constraints

- The outer container must have `role="progressbar"`.
- Determinate mode: set `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Indeterminate mode (no `value` prop): omit `aria-valuenow` — this is the ARIA spec signal for indeterminate.
- `aria-label` or `aria-labelledby` is required for all progress bars.
- The fill should use a CSS `width` transition (not JS animation) for smoothness.
- Clamp `value` to `[min, max]` — never render a fill outside 0–100%.

## Edge Cases

- `value` equal to `min` — 0% fill (empty bar), still rendered.
- `value` equal to `max` — 100% fill (full bar), correct aria-valuenow.
- `value` below `min` or above `max` — clamp silently, do not throw.
- `min` equals `max` — renders as full or empty; do not divide by zero.
- `showValue` in indeterminate mode — show a loading indicator text, not a percentage.
- `animated={false}` — remove the CSS transition; fill jumps to value immediately.

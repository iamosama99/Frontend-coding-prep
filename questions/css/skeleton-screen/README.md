# Skeleton Screen Animation

## Problem

Implement a `Skeleton` component that renders a shimmer loading placeholder. The shimmer effect uses a moving `linear-gradient` animated with `@keyframes`. Also implement a `SkeletonText` variant for multi-line text placeholders.

## TypeScript Signatures

```typescript
interface SkeletonProps {
  width?: number | string    // e.g. 200 (px) or '100%', default '100%'
  height?: number            // in px, default 16
  borderRadius?: number      // in px, default 4
  className?: string
  style?: React.CSSProperties
}

interface SkeletonTextProps {
  lines?: number             // number of text lines, default 3
  lastLineWidth?: string     // width of the last line, default '60%' (for natural look)
  lineHeight?: number        // height per line in px, default 14
  gap?: number               // gap between lines in px, default 8
}

function Skeleton(props: SkeletonProps): React.ReactElement
function SkeletonText(props: SkeletonTextProps): React.ReactElement

// Returns the CSS animation string for the shimmer keyframes
function getShimmerCSS(): string
```

## Usage Example

```tsx
// Card skeleton
<div>
  <Skeleton height={200} borderRadius={8} />    {/* image placeholder */}
  <SkeletonText lines={3} lastLineWidth="40%" />  {/* text placeholder */}
  <Skeleton width={80} height={32} borderRadius={16} /> {/* button placeholder */}
</div>
```

The shimmer animation:
```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
```

## Constraints

- The shimmer is a `linear-gradient` moving left-to-right using `background-position`
- `background-size: 200% 100%` makes the gradient wide enough to create the moving effect
- `SkeletonText` renders multiple `Skeleton` rows with the last one at `lastLineWidth`
- The component must be purely presentational — no `aria-busy`, no role (parent should handle semantics)

## Edge Cases

- `width="100%"` — parent container controls the width; Skeleton fills it
- `lines={1}` in SkeletonText — renders a single line at full width (ignores `lastLineWidth`)
- Dark mode — the gradient colors should be swapped for dark backgrounds (document this; no auto-detection required)
- Reduced motion — `animation` should be removed when `prefers-reduced-motion: reduce` is set (add CSS media query)
- `borderRadius` applied to all four corners equally

# CSS Aspect Ratio Box

## Problem

Implement an `AspectRatioBox` component that maintains a fixed aspect ratio as its width changes. Support the modern `aspect-ratio` CSS property and the legacy padding-top percentage trick as a fallback.

## TypeScript Signatures

```typescript
interface AspectRatioBoxProps {
  ratio?: [number, number]   // [width, height], default [16, 9]
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  useLegacy?: boolean        // use padding-top trick instead of aspect-ratio, default false
}

function AspectRatioBox(props: AspectRatioBoxProps): React.ReactElement

// Returns the style object using the modern approach
function getAspectRatioStyle(ratio: [number, number]): React.CSSProperties

// Returns the padding-top percentage for the legacy approach
function getPaddingTopPercent(ratio: [number, number]): number
```

## Usage Example

```tsx
<AspectRatioBox ratio={[16, 9]}>
  <img src="video-thumbnail.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</AspectRatioBox>

<AspectRatioBox ratio={[1, 1]}>
  <ProfileAvatar />
</AspectRatioBox>

<AspectRatioBox ratio={[4, 3]} useLegacy>
  <EmbeddedVideo />
</AspectRatioBox>
```

Modern approach output:
```css
aspect-ratio: 16 / 9;
width: 100%;
```

Legacy approach output:
```css
position: relative;
width: 100%;
padding-top: 56.25%;   /* (9/16) * 100 */
/* children positioned absolutely: */
position: absolute; top: 0; left: 0; width: 100%; height: 100%;
```

## Constraints

- Modern approach: `aspect-ratio: [w] / [h]` — simple and clean (Chrome 88+, Firefox 89+)
- Legacy approach: `padding-top: (height/width * 100)%` on a relative container; children are `position: absolute; inset: 0`
- `ratio` is `[width, height]` — the order matches how aspect ratios are spoken ("16 by 9")
- Children must fill the box completely in both approaches

## Edge Cases

- `ratio=[1, 1]` — square; padding-top = 100%
- `ratio=[2, 1]` — wide; padding-top = 50%
- `ratio=[9, 16]` — portrait (taller than wide); padding-top = 177.78%
- No children — renders an empty box at the correct ratio (useful as a video placeholder)
- `width: 100%` on the container — the ratio applies relative to the parent's width
- `getPaddingTopPercent([16, 9])` → `56.25` (not rounded, full precision)

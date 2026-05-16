# CSS Keyframe Animation

## Problem

Implement an `Animated` component that wraps children with a configurable CSS keyframe animation. Also implement a `getAnimationCSS` utility that returns the `@keyframes` definition string for each named animation.

## TypeScript Signatures

```typescript
type AnimationName = 'fadeIn' | 'slideUp' | 'slideDown' | 'bounce' | 'pulse' | 'shake'

interface AnimatedProps {
  animation: AnimationName
  duration?: string          // CSS duration, default '0.3s'
  delay?: string             // CSS delay, default '0s'
  easing?: string            // CSS timing function, default 'ease'
  iterations?: number | 'infinite'  // default 1
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'  // default 'both'
  children: React.ReactNode
  style?: React.CSSProperties
}

function Animated(props: AnimatedProps): React.ReactElement

// Returns the @keyframes CSS block as a string
function getAnimationCSS(name: AnimationName): string

// Returns the full animation shorthand value
function getAnimationValue(props: Pick<AnimatedProps,
  'animation' | 'duration' | 'delay' | 'easing' | 'iterations' | 'fillMode'>
): string
```

## Usage Example

```tsx
<Animated animation="fadeIn" duration="0.5s">
  <div>Fades in on mount</div>
</Animated>

<Animated animation="bounce" iterations="infinite" duration="1s">
  <span>↓</span>
</Animated>

getAnimationCSS('fadeIn')
// → '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }'

getAnimationValue({ animation: 'slideUp', duration: '0.4s', easing: 'ease-out', fillMode: 'both' })
// → 'slideUp 0.4s ease-out 0s 1 both'
```

## Constraints

Define these keyframes:
- `fadeIn`: `opacity: 0` → `opacity: 1`
- `slideUp`: `transform: translateY(20px); opacity: 0` → `transform: translateY(0); opacity: 1`
- `slideDown`: `transform: translateY(-20px); opacity: 0` → `transform: translateY(0); opacity: 1`
- `bounce`: `0% translateY(0)` → `50% translateY(-20px)` → `100% translateY(0)`, with easing
- `pulse`: `opacity: 1` → `opacity: 0.5` → `opacity: 1`
- `shake`: `0% translateX(0)` → `25% translateX(-8px)` → `75% translateX(8px)` → `100% translateX(0)`

## Edge Cases

- `delay` with `fillMode: 'backwards'` — element starts in the `from` state during the delay; this is the correct behaviour for entrance animations
- `iterations: 0` — animation plays once immediately and goes to fill state
- `iterations: 'infinite'` — `fillMode` has no meaningful effect (document this)
- `Animated` re-render — animation replays if the component unmounts/remounts; for single-play, use `fillMode: 'forwards'`
- `prefers-reduced-motion` — the animation should be disabled; set `animation: none` via a CSS media query or runtime check

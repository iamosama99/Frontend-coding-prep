# Scroll-Driven Animation

## Problem

Implement a `ScrollAnimated` component that animates its children based on scroll progress using the modern CSS `animation-timeline: scroll()` or `view()` API. Also implement a JavaScript fallback using `IntersectionObserver` for browsers that don't support the CSS feature yet.

## TypeScript Signatures

```typescript
type ScrollTimelineType = 'scroll' | 'view'

interface ScrollAnimatedProps {
  animation: 'fadeIn' | 'slideUp' | 'scaleIn' | 'revealLeft'
  timelineType?: ScrollTimelineType   // default 'view'
  threshold?: number                  // for JS fallback, 0–1, default 0.1
  useCSSNative?: boolean              // use CSS animation-timeline, default true
  children: React.ReactNode
  className?: string
}

function ScrollAnimated(props: ScrollAnimatedProps): React.ReactElement

// Returns the CSS for the scroll-driven animation
function getScrollDrivenCSS(animation: string, timelineType: ScrollTimelineType): string

// JavaScript fallback using IntersectionObserver
function useScrollReveal(
  ref: React.RefObject<HTMLElement>,
  threshold?: number
): { isVisible: boolean }
```

## Usage Example

```tsx
{/* CSS-native approach (modern browsers) */}
<ScrollAnimated animation="fadeIn">
  <section>Content that fades in as you scroll</section>
</ScrollAnimated>

{/* With JS fallback for older browsers */}
<ScrollAnimated animation="slideUp" useCSSNative={false} threshold={0.2}>
  <Card>Slides up when scrolled into view</Card>
</ScrollAnimated>
```

Expected CSS for native approach:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.scroll-animated {
  animation: fadeIn linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

## Constraints

- Native CSS: use `animation-timeline: view()` for scroll-into-view animations
- `animation-range` controls when in the scroll range the animation plays
- JS fallback: use `IntersectionObserver` to add/remove a `visible` class
- The component detects native support and chooses the approach automatically when `useCSSNative` is not specified
- `useScrollReveal` hook cleans up the observer on unmount

## Edge Cases

- Browser support: `animation-timeline` requires Chrome 115+, not yet in Firefox stable — the JS fallback is important
- `animation-timeline: scroll()` — animates based on the document scroll progress (0% = top, 100% = bottom); the element animates the entire time the page is scrolled
- `animation-timeline: view()` — animates based on the element's position within the viewport; better for reveal effects
- `prefers-reduced-motion` — disable the animation entirely; render children as static
- Multiple animated elements — each has its own `view()` timeline; animations are independent

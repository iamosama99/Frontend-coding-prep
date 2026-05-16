# Sticky + Shrinking Header

## Problem

Implement a `StickyHeader` component that sticks to the top of the viewport and visually shrinks (reduces padding and font size) after the user scrolls past a threshold. Use a scroll event listener to toggle a CSS class.

## TypeScript Signatures

```typescript
interface StickyHeaderProps {
  threshold?: number          // scroll distance in px before shrinking, default 80
  normalHeight?: number       // header height before scrolling, in px, default 80
  shrunkHeight?: number       // header height after scrolling, in px, default 48
  children: React.ReactNode
  className?: string
}

interface StickyHeaderState {
  isScrolled: boolean
  scrollY: number
}

function StickyHeader(props: StickyHeaderProps): React.ReactElement

// Hook extracted from the component for reuse
function useStickyHeader(threshold?: number): StickyHeaderState
```

## Usage Example

```tsx
<StickyHeader threshold={60} normalHeight={80} shrunkHeight={48}>
  <nav>
    <Logo />
    <NavLinks />
  </nav>
</StickyHeader>

// The header gets a 'scrolled' class when scrollY > threshold
// CSS handles the visual transition:
// .header { height: 80px; transition: height 0.3s ease; }
// .header.scrolled { height: 48px; }
```

## Constraints

- Use `position: sticky; top: 0` — do NOT use `position: fixed` (sticky keeps the header in document flow)
- Attach a scroll event listener to `window` and clean it up on unmount
- Toggle a boolean state (`isScrolled`) based on `window.scrollY > threshold`
- Smooth shrinking is done via CSS `transition` — the component only toggles a class/inline style; no JS animation
- The component applies both `normalHeight` and `shrunkHeight` as CSS custom properties so that CSS transitions can smoothly interpolate

## Edge Cases

- Fast scrolling — the scroll event fires many times; `isScrolled` state must only change when the boolean value changes (avoid unnecessary re-renders)
- Scroll back to top — header must restore to full size when `scrollY <= threshold`
- `threshold={0}` — header is always in the shrunk state (shrinks immediately on any scroll)
- SSR — `window` is unavailable; initialize `isScrolled` as `false` and add listener only on the client
- Scroll events on a custom scrollable container — the hook targets `window` by default; document that override requires a `ref`

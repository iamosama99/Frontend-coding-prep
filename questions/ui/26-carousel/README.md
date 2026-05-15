# Carousel / Slider

## Problem

Build a `Carousel` component that cycles through a set of slides with prev/next controls, dot navigation, optional auto-play, and touch swipe support. It must follow the ARIA carousel pattern with a live region for screen readers.

## TypeScript Signature

```ts
interface CarouselSlide {
  id: string;
  content: React.ReactNode;
  label?: string;               // accessible name for this slide
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;           // default: false
  autoPlayInterval?: number;    // ms between auto-advances, default: 5000
  loop?: boolean;               // wrap around at boundaries, default: true
  showDots?: boolean;           // show dot navigation, default: true
  showArrows?: boolean;         // show prev/next arrows, default: true
  pauseOnHover?: boolean;       // pause auto-play on hover, default: true
  onChange?: (index: number) => void;
}

function Carousel(props: CarouselProps): JSX.Element
```

## Usage Example

```tsx
<Carousel autoPlay autoPlayInterval={3000} loop showDots>
  <CarouselSlide id="s1" content={<img src="a.jpg" alt="Slide 1" />} label="Slide 1" />
  ...
</Carousel>
// Or via the slides prop:
<Carousel slides={[{ id: '1', content: <img src="a.jpg" alt="" />, label: 'Slide 1' }]} />
```

**Expected behaviour:** slides transition left/right. Auto-play advances every N ms and pauses on hover/focus. Prev/Next arrows are disabled (or hidden) when not looping and at boundaries. Dot navigation shows the active dot. Arrow keys (left/right) work when the carousel is focused.

## Constraints

- The carousel region has `aria-roledescription="carousel"` and `aria-label`.
- Each slide has `role="group"` and `aria-roledescription="slide"` and `aria-label="N of M"`.
- The slides container has `aria-live="polite"` when auto-play is off; `"off"` when auto-playing.
- Auto-play must pause when any element inside the carousel receives focus.
- Auto-play timer must be cleared on unmount.
- Touch support: `onTouchStart` records X; `onTouchEnd` computes delta; swipe threshold is 50px.

## Edge Cases

- Single slide — no dots, arrows disabled, no auto-play needed.
- `loop={false}` at the first slide — Prev arrow is disabled; at last slide — Next is disabled.
- Auto-play while user is interacting via keyboard — must pause.
- Rapid arrow-key presses while auto-play is running — do not accumulate; debounce or cancel previous timer.
- `slides` prop changes — reset to slide 0; cancel auto-play timer.
- `onChange` fires on every slide change including auto-play advances.

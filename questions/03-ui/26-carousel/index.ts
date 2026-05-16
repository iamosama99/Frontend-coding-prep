import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface CarouselSlide {
  id: string;
  content: ReactNode;
  label?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  onChange?: (index: number) => void;
}

// TODO 1: Set up state: currentIndex (number), isPaused (boolean).
//   Also track touchStartX in a ref for swipe detection.
//   The slide advance function: goTo(index), goNext(), goPrev().

// TODO 2: Implement goNext / goPrev.
//   - goNext: if loop, wrap to 0 when at last slide; else stop at last.
//   - goPrev: if loop, wrap to last slide when at index 0; else stop at 0.
//   - Both call onChange?.(newIndex).

// TODO 3: Implement auto-play with useEffect.
//   - Set up a setInterval(goNext, autoPlayInterval) when autoPlay is true and not isPaused.
//   - Clear the interval in the cleanup function.
//   - Re-run when [autoPlay, autoPlayInterval, isPaused, goNext] change.
//   - Pause on mouse enter: setIsPaused(true); resume on mouse leave: setIsPaused(false).
//   - Also pause when any child element receives focus.

// TODO 4: Handle touch swipe.
//   - onTouchStart: record e.touches[0].clientX into touchStartX ref.
//   - onTouchEnd: compute delta = e.changedTouches[0].clientX - touchStartX.current.
//     If delta < -50: goNext(); if delta > 50: goPrev().

// TODO 5: Render the carousel structure.
//   - Container: role="region", aria-roledescription="carousel", aria-label.
//   - Slides wrapper: aria-live="polite" (or "off" during auto-play).
//   - Each slide: role="group", aria-roledescription="slide", aria-label="{i+1} of {total}",
//     hidden for non-current slides.
//   - Prev/Next buttons: aria-label, disabled logic based on loop and boundary.
//   - Dot buttons: aria-label="Slide {i+1}", aria-current="true" for active dot.

export function Carousel(_props: CarouselProps): JSX.Element {
  throw new Error('Not implemented');
}

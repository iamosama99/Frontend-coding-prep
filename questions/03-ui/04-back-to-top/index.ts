import { useState, useEffect } from 'react';

export interface BackToTopProps {
  threshold?: number;
  scrollTarget?: HTMLElement | null;
  smooth?: boolean;
  label?: string;
}

// TODO 1: Track whether the button should be visible.
//   - Use a `visible` boolean state, initialised to false.
//   - Compute visibility by comparing scroll position to `threshold` (default 300).

// TODO 2: Attach a scroll listener to the correct target.
//   - If `scrollTarget` is provided and non-null, listen on that element.
//   - Otherwise listen on `window` (but guard against SSR with typeof window check).
//   - Get the current scroll position: element.scrollTop for elements, window.scrollY for window.
//   - Clean up the listener in the useEffect return function.

// TODO 3: Run the visibility check immediately on mount (not just on scroll events).
//   - If the page is already scrolled past the threshold when the component mounts,
//     the button should be visible right away without waiting for a scroll event.

// TODO 4: Implement the scroll-to-top handler.
//   - Call scrollTarget.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
//     for a custom container.
//   - Call window.scrollTo({ top: 0, behavior: ... }) for the window target.

// TODO 5: Render the button with correct accessibility attributes.
//   - Use aria-label for the accessible name.
//   - Set tabIndex={-1} (or display:none) when not visible to remove from tab order.
//   - Position with CSS fixed or absolute depending on the scroll target type.

export function BackToTop(_props: BackToTopProps): JSX.Element {
  throw new Error('Not implemented');
}

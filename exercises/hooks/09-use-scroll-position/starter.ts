import { useState, useEffect, useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'none';
}

// TODO 1: Write a helper getScrollPosition() that returns the current
//   window.scrollX and window.scrollY. Guard against SSR.

// TODO 2: Initialise state with getScrollPosition() + direction: 'none'.

// TODO 3: Store the previous Y value in a ref (not state — updating
//   state to track previous would cause an extra re-render).

// TODO 4: Inside useEffect, add a 'scroll' event listener to window.
//   Use { passive: true } as the listener options (better scroll performance).
//   In the handler:
//   - Read new x, y from window.
//   - Determine direction by comparing new y to prevY.current.
//   - Update prevY.current with the new y.
//   - Call setState.

// TODO 5: Return cleanup (removeEventListener).

// TODO 6: Return the scroll position state.

export function useScrollPosition(): ScrollPosition {
  throw new Error('Not implemented');
}

import { useState, useRef, useEffect } from 'react';

export interface ReadMoreProps {
  children: string;
  lines?: number;
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
}

// TODO 1: Set up an `expanded` boolean state (default false) and a ref
//   attached to the text container element so you can measure overflow.

// TODO 2: Detect whether the text actually overflows.
//   - After render, compare ref.current.scrollHeight > ref.current.clientHeight.
//   - Store the result in a `isOverflowing` boolean state.
//   - Re-check on resize: attach a ResizeObserver (or a window resize listener)
//     and update `isOverflowing` whenever the container dimensions change.
//   - Clean up the observer on unmount.

// TODO 3: Apply the CSS clamp styles.
//   - When NOT expanded: style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical',
//       WebkitLineClamp: lines, overflow: 'hidden' }}
//   - When expanded: remove all clamp styles (plain div with no overflow constraint).

// TODO 4: Render the toggle button only when `isOverflowing` is true.
//   - Use aria-expanded on the button to communicate state to screen readers.
//   - The button label should be `lessLabel` when expanded, `moreLabel` otherwise.

// TODO 5: Handle the `lines` prop defaulting to 3.
//   - Ensure the inline style uses the actual numeric value, not a string.
//   - Reassess overflow when `lines` changes (include in the useEffect deps array).

export function ReadMore(_props: ReadMoreProps): JSX.Element {
  throw new Error('Not implemented');
}

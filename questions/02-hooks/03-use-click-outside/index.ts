import { useRef, useEffect } from 'react';

// TODO 1: Create a ref for the DOM element. This is what callers attach
//   to their element: <div ref={ref}>.

// TODO 2: Store the callback in a separate ref so the listener doesn't
//   need to be re-registered every time the callback changes identity.
//   Update this ref in a useEffect with no dep array (or dep on callback).

// TODO 3: Add a mousedown listener to `document` inside a useEffect.
//   - Check: if the click target is NOT inside the element ref, call the callback.
//   - Guard: ref.current might be null — check before calling contains().

// TODO 4: Return a cleanup function from the useEffect that removes
//   the mousedown listener from document.

// TODO 5: Return the element ref so callers can attach it to their element.

export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  throw new Error('Not implemented');
}

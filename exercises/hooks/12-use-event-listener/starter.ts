import { useEffect, useRef } from 'react';

// TODO 1: Store handler in a ref. Update it in a useEffect with no dep array
//   (or dep on [handler]) so it's always current.
//   This avoids re-registering the listener when the handler changes.

// TODO 2: Determine the target element.
//   - Default to window if no element is passed.
//   - Guard against SSR: if typeof window === 'undefined' and no element, do nothing.
//   - If the element is null/undefined after defaulting, bail out.

// TODO 3: In a second useEffect with deps [type, element]:
//   - Add the event listener to the target using a stable wrapper:
//       const listener = (e: Event) => handlerRef.current(e as any)
//   - Return a cleanup that removes the listener.

// TODO 4: The wrapper function (listener) must be the same reference for
//   add and remove — create it once per effect invocation, not inline.

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: EventTarget | null
): void {
  throw new Error('Not implemented');
}

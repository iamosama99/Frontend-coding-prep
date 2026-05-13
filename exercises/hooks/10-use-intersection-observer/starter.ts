import { useRef, useState, useEffect } from 'react';

interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

// TODO 1: Create a ref for the DOM element — this is what callers attach
//   to their element: <div ref={ref}>.

// TODO 2: Create state for isIntersecting (initialise to false).

// TODO 3: Inside useEffect:
//   a. Guard: if ref.current is null, return early (element not mounted yet).
//   b. Check if IntersectionObserver is supported; if not, fall back to
//      setting isIntersecting to true and returning.
//   c. Create a new IntersectionObserver with a callback that reads
//      entries[0].isIntersecting and calls setIsIntersecting.
//   d. Call observer.observe(ref.current).

// TODO 4: Return a cleanup from useEffect that calls observer.disconnect().

// TODO 5: List the correct dependencies. Think: which values change and
//   should re-create the observer? (Hint: the options fields.)

// TODO 6: Return { ref, isIntersecting }.

export function useIntersectionObserver(
  options?: IntersectionOptions
): { ref: React.RefObject<HTMLElement>; isIntersecting: boolean } {
  throw new Error('Not implemented');
}

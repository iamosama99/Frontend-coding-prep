import { useState, useEffect } from 'react';

// TODO 1: Guard against SSR at the top of the hook.
//   If typeof window === 'undefined', return false immediately.

// TODO 2: Create the MediaQueryList: window.matchMedia(query).

// TODO 3: Initialise state with mediaQueryList.matches so the component
//   gets the correct value on the first render (not a flash of false).

// TODO 4: Inside useEffect, define a change handler that calls
//   setMatches(e.matches).
//   Add it to the MediaQueryList using addEventListener('change', handler).
//   Return a cleanup that calls removeEventListener('change', handler).

// TODO 5: Add [query] as the dependency array so a new MediaQueryList
//   is created and a new listener is registered when the query changes.
//   This also ensures the cleanup removes the old listener correctly.

// TODO 6: Return the matches boolean.

export function useMediaQuery(query: string): boolean {
  throw new Error('Not implemented');
}

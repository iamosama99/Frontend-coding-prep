import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

// TODO 1: Write a helper getSize() that returns window.innerWidth and
//   window.innerHeight. Guard against SSR by checking typeof window.
//   Return { width: 0, height: 0 } as the SSR fallback.

// TODO 2: Initialise state using the helper (lazy init with a function
//   passed to useState is ideal here — or just call it directly).

// TODO 3: Add a useEffect that registers a 'resize' event listener
//   on window. The handler should call setSize(getSize()).
//   Return a cleanup function that removes the listener.

// TODO 4: The effect should run only once on mount ([]).
//   (The handler always reads the latest window size so no stale closure issue.)

// TODO 5: Return the size state object.

export function useWindowSize(): WindowSize {
  throw new Error('Not implemented');
}

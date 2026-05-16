import { useState, useEffect } from 'react';

// TODO 1: Create state to hold the debounced value.
//   Initialise it with the `value` parameter so the first render
//   returns the initial value immediately (not undefined).

// TODO 2: Inside useEffect, start a setTimeout that updates the
//   debounced state to `value` after `delay` ms.

// TODO 3: Return a cleanup function from useEffect that calls
//   clearTimeout on the timer. This ensures:
//   - rapid value changes cancel the pending timer and restart it
//   - unmounting before the timer fires does not update state

// TODO 4: Add [value, delay] as the effect's dependency array.
//   Think about why BOTH need to be deps.

// TODO 5: Return the debounced value.

export function useDebounce<T>(value: T, delay: number): T {
  throw new Error('Not implemented');
}

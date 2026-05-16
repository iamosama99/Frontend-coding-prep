import { useState, useEffect, useRef } from 'react';

// TODO 1: Initialise state with the current value (same as useDebounce).

// TODO 2: Choose an approach:
//   Option A (timestamp): Store lastUpdated = Date.now() in a ref.
//     In useEffect, compare Date.now() - lastUpdated vs interval.
//     If enough time has passed, update state and reset lastUpdated.
//     Otherwise, schedule a timeout for the remaining time.
//
//   Option B (boolean flag): Store inThrottle ref (starts false).
//     In useEffect, if !inThrottle: update state, set inThrottle = true,
//     schedule a timeout to reset it after interval.

// TODO 3: Store timer IDs in a ref. Return a cleanup that clears
//   any pending timer when the component unmounts or deps change.

// TODO 4: Add [value, interval] to the dependency array.

// TODO 5: Return the throttled value.

export function useThrottle<T>(value: T, interval: number): T {
  throw new Error('Not implemented');
}

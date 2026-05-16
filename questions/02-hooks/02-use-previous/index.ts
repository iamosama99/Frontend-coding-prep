import { useRef, useEffect } from 'react';

// TODO 1: Create a ref to hold the previous value.
//   - Initial value of the ref should be undefined.

// TODO 2: After the component renders (useEffect with no dep array
//   acts as "after every render"), update the ref to the current value.
//   - Think about timing: should you update the ref before or after return?
//   - The ref update must happen AFTER the return so callers get the old value.

// TODO 3: Return the ref's current value (which is still the previous
//   render's value at the time this function runs).

export function usePrevious<T>(value: T): T | undefined {
  throw new Error('Not implemented');
}

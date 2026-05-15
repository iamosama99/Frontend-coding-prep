import { useState, useCallback } from 'react';

// TODO 1: Initialise a boolean state with `initialValue` (default false).

// TODO 2: Implement the toggle function with useCallback so its reference
//   is stable across renders. The function takes an optional `forcedValue`:
//   - If forcedValue is a boolean, set state to that exact value.
//   - Otherwise (undefined / no arg), flip the current state.

// TODO 3: Think about the dependency array for useCallback — what must be
//   in it, and what can you avoid putting in it by using the functional
//   form of setState?

// TODO 4: Return [state, toggle] as a tuple with a const assertion or
//   explicit return type so callers get the right types.

export function useToggle(
  initialValue: boolean = false
): [boolean, (forcedValue?: boolean) => void] {
  throw new Error('Not implemented');
}

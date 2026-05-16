import { useState, useEffect, useCallback } from 'react';

// TODO 1: Write a helper that safely reads from localStorage.
//   - Guard against SSR (typeof window === 'undefined').
//   - Wrap JSON.parse in try/catch; return initialValue on any error.

// TODO 2: Initialise useState lazily using the helper so the read
//   happens only once on mount, not on every render.

// TODO 3: Implement the setter. It must:
//   - Accept a direct value OR an updater function (mirror useState).
//   - Write the new value to localStorage with JSON.stringify.
//   - Update the React state so the component re-renders.

// TODO 4: Add a useEffect that listens for the 'storage' window event.
//   - Only react to events matching `key`.
//   - Parse the event's newValue and update local state.
//   - Clean up the listener on unmount.
//   - Guard against SSR here too.

// TODO 5: Handle key changes — if the `key` prop changes after mount,
//   re-read from localStorage with the new key.

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  throw new Error('Not implemented');
}

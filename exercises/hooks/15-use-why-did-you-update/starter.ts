import { useRef, useEffect } from 'react';

// TODO 1: Create a ref to store the previous props:
//   const prevProps = useRef<Record<string, unknown>>({});

// TODO 2: After every render (useEffect with no dep array), compare
//   the current props to prevProps.current.
//   - Collect all unique keys from both objects (some may be added/removed).
//   - For each key, compare with Object.is(prev[key], current[key]).
//   - If they differ, record { from: prev[key], to: current[key] }.

// TODO 3: If prevProps.current has no keys (first render), skip logging.
//   Otherwise, if any changes were found, log them with a clear label:
//   console.log(`[useWhyDidYouUpdate] ${name} changed:`, changesObject)

// TODO 4: At the end of the effect, update prevProps.current = props.
//   Order matters: update AFTER comparing, not before.

// TODO 5: This hook returns nothing — it's side-effect-only.

export function useWhyDidYouUpdate(
  name: string,
  props: Record<string, unknown>
): void {
  throw new Error('Not implemented');
}

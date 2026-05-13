import { useEffect, useRef } from 'react';

// TODO 1: Create a ref for the callback: const savedCallback = useRef(callback).

// TODO 2: Add a useEffect (no dep array) that updates savedCallback.current
//   to the latest callback on every render. This solves the stale closure problem:
//   the interval always calls savedCallback.current, which is always fresh.

// TODO 3: Add a second useEffect with [delay] as its dependency.
//   - If delay is null, return early (don't start the interval).
//   - Otherwise, start a setInterval that calls savedCallback.current().
//   - Return clearInterval(id) as the cleanup.

// No return value — this hook is side-effect-only.

export function useInterval(callback: () => void, delay: number | null): void {
  throw new Error('Not implemented');
}

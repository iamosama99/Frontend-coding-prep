import { useState, useCallback, useRef, useEffect } from 'react';

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseAsyncReturn<T> {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  run: (...args: any[]) => Promise<void>;
  reset: () => void;
}

// TODO 1: Define initial state: { status: 'idle', data: null, error: null }.
//   Use a single state object so transitions are atomic.

// TODO 2: Add an isMounted ref. Set it to true on mount, false on unmount
//   via useEffect cleanup. Check it before any setState call inside `run`.

// TODO 3: Implement `run`:
//   - Set status to 'loading' immediately.
//   - Await asyncFn(...args).
//   - On success: set status 'success', data = result, error = null.
//   - On failure: set status 'error', error = wrapped Error, data = null.
//   - In both cases, check isMounted.current before setState.

// TODO 4: Implement `reset`: set state back to initial idle state.

// TODO 5: Derive boolean helpers from status:
//   isLoading, isSuccess, isError — these prevent callers from comparing strings.

// TODO 6: Wrap `run` in useCallback. What should its dependency array be?

export function useAsync<T>(
  asyncFn: (...args: any[]) => Promise<T>
): UseAsyncReturn<T> {
  throw new Error('Not implemented');
}

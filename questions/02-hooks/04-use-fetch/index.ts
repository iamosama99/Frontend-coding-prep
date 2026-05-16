import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// TODO 1: Initialise state with { data: null, loading: true, error: null }.
//   Use a single state object (not separate useState calls) so updates
//   are atomic and you don't get a brief flash of stale data + new loading.

// TODO 2: Add a `fetchCount` ref (or similar) to allow `refetch` to
//   re-trigger the effect without changing the URL dep.
//   Hint: incrementing a counter in state also works — pick one approach.

// TODO 3: Inside useEffect, create an AbortController and pass its
//   signal to fetch(). Set loading: true at the start of each fetch.

// TODO 4: On success, parse JSON and set data. On failure, set error.
//   Check `error.name === 'AbortError'` and bail out early — don't set
//   error state for intentional cancellations.

// TODO 5: Return the controller.abort() as the useEffect cleanup.
//   This cancels the request if the component unmounts or url/refetch trigger changes.

// TODO 6: Implement refetch: a stable function that re-triggers the effect.

export interface FetchResult<T> extends FetchState<T> {
  refetch: () => void;
}

export function useFetch<T = unknown>(url: string): FetchResult<T> {
  throw new Error('Not implemented');
}

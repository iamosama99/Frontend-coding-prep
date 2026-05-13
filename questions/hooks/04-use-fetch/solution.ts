import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface FetchResult<T> extends FetchState<T> {
  refetch: () => void;
}

// TODO: implement solution
export function useFetch<T = unknown>(url: string): FetchResult<T> {
  throw new Error('Not implemented');
}

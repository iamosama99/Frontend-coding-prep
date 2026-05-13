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

// TODO: implement solution
export function useAsync<T>(
  asyncFn: (...args: any[]) => Promise<T>
): UseAsyncReturn<T> {
  throw new Error('Not implemented');
}

import React from 'react';

// TODO: implement solution
export function useWorker<T>(_workerFactory: () => Worker): {
  result: T | null;
  status: 'idle' | 'running' | 'done' | 'error';
  error: Error | null;
  run: (input: unknown) => void;
  cancel: () => void;
} {
  throw new Error('Not implemented');
}

export const sortWorkerCode = `
  // TODO: implement sort worker
`;

export function SortDemo(_props: { initialData: number[] }): JSX.Element {
  throw new Error('Not implemented');
}

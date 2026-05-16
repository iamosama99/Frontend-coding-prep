import React, { useEffect, useRef, useState, useMemo } from 'react';

type WorkerStatus = 'idle' | 'running' | 'done' | 'error';

export function useWorker<T>(workerFactory: () => Worker): {
  result: T | null;
  status: WorkerStatus;
  error: Error | null;
  run: (input: unknown) => void;
  cancel: () => void;
} {
  const workerRef = useRef<Worker | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [status, setStatus] = useState<WorkerStatus>('idle');
  const [error, setError] = useState<Error | null>(null);

  function createWorker() {
    const w = workerFactory();
    w.onmessage = (e: MessageEvent) => {
      setResult(e.data as T);
      setStatus('done');
    };
    w.onerror = (e: ErrorEvent) => {
      setError(new Error(e.message));
      setStatus('error');
    };
    return w;
  }

  useEffect(() => {
    workerRef.current = createWorker();
    return () => { workerRef.current?.terminate(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function run(input: unknown) {
    setStatus('running');
    setError(null);
    workerRef.current?.postMessage(input);
  }

  function cancel() {
    workerRef.current?.terminate();
    workerRef.current = createWorker();
    setStatus('idle');
    setResult(null);
    setError(null);
  }

  return { result, status, error, run, cancel };
}

export const sortWorkerCode = `
self.onmessage = function(e) {
  const arr = e.data.slice();
  arr.sort(function(a, b) { return a - b; });
  self.postMessage(arr);
};
`;

export function SortDemo({ initialData }: { initialData: number[] }): JSX.Element {
  const workerUrl = useMemo(() => {
    if (typeof Blob === 'undefined' || typeof URL === 'undefined') return null;
    const blob = new Blob([sortWorkerCode], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
  }, []);

  const { result, status, error, run, cancel } = useWorker<number[]>(
    () => (workerUrl ? new Worker(workerUrl) : ({ postMessage: () => {}, terminate: () => {}, onmessage: null, onerror: null } as any))
  );

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCounter((c) => c + 1), 100);
    return () => clearInterval(id);
  }, []);

  return React.createElement(
    'div',
    null,
    React.createElement('p', null, `UI tick: ${counter}`),
    React.createElement('p', null, `Status: ${status}`),
    error && React.createElement('p', { style: { color: 'red' } }, error.message),
    result && React.createElement('p', null, `First 5: ${result.slice(0, 5).join(', ')}`),
    React.createElement('button', { onClick: () => run(initialData), disabled: status === 'running' }, 'Sort'),
    status === 'running' && React.createElement('button', { onClick: cancel }, 'Cancel')
  );
}

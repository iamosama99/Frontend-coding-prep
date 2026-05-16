import React, { useEffect, useRef, useState } from 'react';

type WorkerStatus = 'idle' | 'running' | 'done' | 'error';

interface UseWorkerResult<T> {
  result: T | null;
  status: WorkerStatus;
  error: Error | null;
  run: (input: unknown) => void;
  cancel: () => void;
}

// TODO 1: Implement useWorker<T>.
//         - Call workerFactory() to create the Worker instance (do this once in useEffect or useRef).
//         - `run(input)` posts a message to the worker and sets status to 'running'.
//         - On worker.onmessage, set result = event.data, status = 'done'.
//         - On worker.onerror, set error, status = 'error'.
//         - `cancel()` calls worker.terminate(), then recreates the worker, resets to 'idle'.
//         - On unmount, terminate the worker to prevent memory leaks.

export function useWorker<T>(workerFactory: () => Worker): UseWorkerResult<T> {
  throw new Error('Not implemented');
}

// TODO 2: Write the inline worker code as a string.
//         This string will be used to create a Blob URL:
//           const blob = new Blob([sortWorkerCode], { type: 'application/javascript' });
//           const url = URL.createObjectURL(blob);
//           const worker = new Worker(url);
//         The worker should:
//         - Listen to self.onmessage
//         - Receive an array of numbers in event.data
//         - Sort them with Array.prototype.sort (or your own algorithm)
//         - Post back the sorted array with self.postMessage(sorted)

export const sortWorkerCode = `
  // TODO: implement sort worker
`;

interface SortDemoProps {
  initialData: number[];
}

// TODO 3: Implement SortDemo using useWorker.
//         - Create a Blob URL from sortWorkerCode in a useMemo or useEffect.
//         - Display a counter (useEffect + setInterval at 100ms) to prove UI is not blocked.
//         - Show status, result preview (first 5 numbers), and error if present.
//         - Cancel button should be visible when status === 'running'.

export function SortDemo({ initialData }: SortDemoProps): JSX.Element {
  throw new Error('Not implemented');
}

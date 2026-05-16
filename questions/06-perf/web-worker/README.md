# Web Worker for Heavy Computation

## Problem

Implement a `useWorker` hook that offloads expensive computations to a Web Worker. Then build a `SortWorker` that sorts large arrays off the main thread, keeping the UI responsive while sorting runs.

## API Signature

```ts
type WorkerStatus = 'idle' | 'running' | 'done' | 'error';

interface UseWorkerResult<T> {
  result: T | null;
  status: WorkerStatus;
  error: Error | null;
  run: (input: unknown) => void;
  cancel: () => void;
}

export function useWorker<T>(workerFactory: () => Worker): UseWorkerResult<T>

// The worker script (runs in worker thread)
// Receives: { data: number[] }
// Posts back: { sorted: number[] }
export const sortWorkerCode: string  // inline worker code as a string (for Blob URL creation)

// Component that uses the worker
interface SortDemoProps {
  initialData: number[];
}
export function SortDemo({ initialData }: SortDemoProps): JSX.Element
```

## Usage Example

```tsx
function App() {
  const workerFactory = () => new Worker(new URL('./sort.worker.ts', import.meta.url));
  const { result, status, run, cancel } = useWorker<number[]>(workerFactory);

  return (
    <>
      <button onClick={() => run(largeArray)} disabled={status === 'running'}>
        Sort 1M numbers
      </button>
      {status === 'running' && <p>Sorting in background...</p>}
      {status === 'done' && <p>First 5: {result?.slice(0, 5).join(', ')}</p>}
    </>
  );
}
```

Expected: clicking "Sort" does not freeze the UI. A counter or animation keeps running while the sort executes.

## Constraints

- The worker is created via `workerFactory` (injected) so the hook works in test environments
- `cancel()` terminates the worker and resets status to 'idle'
- The hook cleans up the worker on unmount (calls `worker.terminate()`)
- `sortWorkerCode` is a self-contained string that can be turned into a Blob URL
- Do NOT use `Comlink` — use raw `postMessage` / `onmessage`

## Edge Cases

- `run()` called while already running — cancels the current job and starts a new one
- Worker throws an error — `status` becomes 'error', `error` is populated
- Component unmounts while worker is running — worker is terminated, no setState after unmount
- Empty array passed to sort worker — posts back empty array without error
- `workerFactory` returns a worker that immediately errors on creation — caught and reflected in status

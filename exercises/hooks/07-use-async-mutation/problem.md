# useAsync / useMutation

## Problem

Implement a `useAsync` hook that wraps any async function and exposes a state machine with four statuses: `idle`, `loading`, `success`, and `error`. It should expose a `run` function to trigger the async operation, and reset cleanly between calls.

## TypeScript Signature

```ts
type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

interface UseAsyncReturn<T> {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  run: (...args: any[]) => Promise<void>;
  reset: () => void;
}

function useAsync<T>(asyncFn: (...args: any[]) => Promise<T>): UseAsyncReturn<T>
```

## Usage Example

```tsx
function SaveButton({ userId }: { userId: string }) {
  const { isLoading, isSuccess, error, run } = useAsync(saveUser);

  return (
    <div>
      <button onClick={() => run(userId, formData)} disabled={isLoading}>
        {isLoading ? 'Saving…' : 'Save'}
      </button>
      {isSuccess && <p>Saved!</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

## Constraints

- The async function is passed in at hook creation time; `run` forwards its arguments to it.
- Transitions: idle → loading (on run) → success (on resolve) or error (on reject).
- `reset` returns to `idle` state.
- Wrap the async function in `useCallback` so `run` has a stable identity.
- Guard against updating state after unmount — use an `isMounted` ref or similar.

## Edge Cases

- Component unmounts while the async operation is in flight — must not setState.
- `run` called again before the first call resolves — the second call's result should win (or cancel the first, your choice — document it).
- `asyncFn` throws a non-Error value — wrap in `new Error(String(e))` for type safety.
- `reset` called while loading — should return to idle and subsequent completion should be ignored.
- `data` should be `null` in error/idle/loading states; `error` should be `null` in idle/loading/success states.

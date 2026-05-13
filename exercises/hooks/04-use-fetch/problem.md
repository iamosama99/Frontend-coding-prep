# useFetch

## Problem

Implement a `useFetch` hook that fetches a URL and exposes `data`, `loading`, `error`, and a `refetch` function. The hook should cancel the in-flight request when the component unmounts or when the URL changes before the previous request completes.

## TypeScript Signature

```ts
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T = unknown>(url: string): FetchState<T> & { refetch: () => void }
```

## Usage Example

```tsx
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error, refetch } = useFetch<User>(`/api/users/${userId}`);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message} <button onClick={refetch}>Retry</button></p>;
  return <p>{data?.name}</p>;
}
```

When `userId` changes, the previous fetch is cancelled and a new one starts. Clicking "Retry" re-runs the fetch with the same URL.

## Constraints

- Use `AbortController` to cancel in-flight requests on cleanup.
- Ignore `AbortError` (it's not a real error — it means cleanup fired).
- The `loading` state must be `true` between request start and completion.
- `refetch` must re-run the fetch without changing the URL.
- Reset `error` to `null` at the start of each new fetch.

## Edge Cases

- Component unmounts while fetch is in flight — must not call `setState` after unmount (AbortController handles this).
- URL changes rapidly — only the latest fetch's result should update state (previous aborted).
- Fetch returns a non-2xx status — decide whether to treat as error or leave to caller; document your choice.
- Network error (no connection) — should populate the `error` field.
- Empty string URL — behaviour should be documented; either skip the fetch or error immediately.

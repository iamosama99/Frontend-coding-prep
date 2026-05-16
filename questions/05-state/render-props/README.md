# Render Props Pattern

Implement a `MouseTracker` component that uses the render props pattern to expose the current mouse position. Also implement a `DataFetcher` component that uses render props to expose loading, error, and data states.

## TypeScript Signature

```ts
interface MousePosition {
  x: number
  y: number
}

interface MouseTrackerProps {
  render: (position: MousePosition) => ReactNode
}

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface DataFetcherProps<T> {
  url: string
  render: (state: FetchState<T>) => ReactNode
  // Alternative: children as function
  children?: (state: FetchState<T>) => ReactNode
}
```

## Usage Example

```tsx
// MouseTracker usage
<MouseTracker render={({ x, y }) => (
  <p>Mouse is at ({x}, {y})</p>
)} />

// DataFetcher usage — render prop
<DataFetcher url="/api/users" render={({ data, loading, error }) => {
  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  return <UserList users={data} />
}} />

// DataFetcher usage — children as function (alternative pattern)
<DataFetcher url="/api/users">
  {({ data, loading }) => loading ? <Spinner /> : <UserList users={data} />}
</DataFetcher>
```

## Constraints

- `MouseTracker` must attach `mousemove` event listener to the `window` and clean it up on unmount
- `DataFetcher` must support both `render` prop and `children` as function (prefer `render` if both provided)
- `DataFetcher` must handle fetch abort on unmount (AbortController)
- Both components render nothing directly — they delegate all UI to the caller

## Edge Cases

- `MouseTracker` unmounts before first mouse move (x and y default to 0)
- `DataFetcher` receives a new URL while a fetch is in-flight — must abort old request
- Network error vs HTTP error (status >= 400) — both should set `error`
- `render` prop returns `null` — component renders nothing
- `DataFetcher` called with no `render` and no `children` — should throw or render null

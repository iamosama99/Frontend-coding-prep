# Code Splitting with React.lazy

## Problem

Implement a route-based code splitting setup where each page component is loaded lazily. Add a reusable `AsyncBoundary` wrapper that handles both the Suspense fallback and error boundary for lazy-loaded routes.

## API Signature

```tsx
interface AsyncBoundaryProps {
  fallback?: React.ReactNode;  // shown while loading, default: <Spinner />
  children: React.ReactNode;
}

export function AsyncBoundary({ fallback, children }: AsyncBoundaryProps): JSX.Element

// Lazily loaded page components
export const DashboardPage: React.LazyExoticComponent<() => JSX.Element>
export const SettingsPage: React.LazyExoticComponent<() => JSX.Element>
export const ReportsPage: React.LazyExoticComponent<() => JSX.Element>

// Router that renders the right page based on current path
interface AppRouterProps {
  path: string;
}
export function AppRouter({ path }: AppRouterProps): JSX.Element
```

## Usage Example

```tsx
// Each page is in its own chunk — only downloaded when first visited
function App() {
  const [path, setPath] = useState('/dashboard');
  return (
    <AsyncBoundary fallback={<p>Loading page...</p>}>
      <AppRouter path={path} />
    </AsyncBoundary>
  );
}
```

Expected: navigating to `/settings` for the first time downloads `SettingsPage`'s chunk. Navigating back to `/dashboard` (already cached) is instant.

## Constraints

- Use `React.lazy(() => import(...))` for each page — no static imports of page components
- `AsyncBoundary` must include an error boundary (class component or `react-error-boundary`) for chunk load failures
- Fallback renders immediately — do not wait for the lazy component to start loading before showing it
- Unknown routes render a 404 message without a lazy load

## Edge Cases

- Chunk fails to download (network error) — error boundary catches the rejection and shows an error message, not a blank screen
- User navigates quickly between routes before the first chunk finishes loading — Suspense handles this gracefully
- `fallback` prop is not provided — a default spinner is used
- Preloading: clicking a nav link should ideally start the import before the route changes (stretch goal — comment how you'd do it)
- Same route navigated twice — second visit uses the cached module, not a new network request

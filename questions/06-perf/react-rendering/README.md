# React Rendering Optimization

## Problem

You're given a slow `DataDashboard` component that re-renders excessively. Profile it, identify the causes, and refactor it to use correct optimization strategies. Also implement a `useRenderCount` debug hook that tracks how many times a component re-renders.

## API Signature

```tsx
// Debug hook — returns the number of times the component has rendered
export function useRenderCount(): number

// Optimized dashboard
interface DashboardData {
  id: string;
  label: string;
  value: number;
  trend: 'up' | 'down' | 'flat';
}

interface DataDashboardProps {
  data: DashboardData[];
  refreshInterval?: number;  // ms, default 5000
  onRowClick: (id: string) => void;
}

export function DataDashboard({ data, refreshInterval, onRowClick }: DataDashboardProps): JSX.Element

// Memoized row — renders only when its own data changes
export const DashboardRow: React.MemoExoticComponent<(props: {
  item: DashboardData;
  onClick: (id: string) => void;
}) => JSX.Element>
```

## Usage Example

```tsx
function App() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState('');  // unrelated state

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <DataDashboard data={data} onRowClick={(id) => console.log(id)} />
    </>
  );
}
```

Expected: changing `filter` does NOT cause `DashboardRow` components to re-render because `data` hasn't changed.

## Constraints

- `useRenderCount` uses a `useRef` to track render count (not state — it must not trigger re-renders itself)
- `DashboardRow` must be wrapped in `React.memo`
- `onRowClick` must be stabilized with `useCallback` inside `DataDashboard`
- Use `useTransition` to mark the data refresh as a non-urgent update (stretch goal: add comment explaining why)
- Do NOT use `useLayoutEffect` — `useEffect` is sufficient here

## Edge Cases

- `onRowClick` changes identity every render from the parent — `useCallback` must absorb this
- `data` has 1000+ rows — only rows whose `item` reference changed should re-render
- `refreshInterval` changes at runtime — the interval should update without restarting the whole component
- Empty `data` — renders a "No data" message, no rows
- A row's `value` goes from positive to negative — `trend` indicator must update correctly

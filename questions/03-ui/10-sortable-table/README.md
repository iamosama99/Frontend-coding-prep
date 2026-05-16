# Sortable Table

## Problem

Build a `SortableTable` component that renders tabular data with clickable column headers. Clicking a header sorts the data by that column ascending; clicking again reverses to descending; clicking a third time clears the sort (returns to original order). A sort-direction indicator (arrow or icon) must be shown on the active column header.

## TypeScript Signature

```ts
type SortDirection = 'asc' | 'desc' | null;

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;           // default: true
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface SortableTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  defaultSortKey?: keyof T;
  defaultSortDir?: SortDirection;
  rowKey: (row: T) => string;   // unique key per row
}

function SortableTable<T extends Record<string, unknown>>(
  props: SortableTableProps<T>
): JSX.Element
```

## Usage Example

```tsx
const users = [
  { id: '1', name: 'Alice', age: 30, joined: '2021-03-15' },
  { id: '2', name: 'Bob', age: 25, joined: '2022-07-01' },
];

const columns: Column<typeof users[0]>[] = [
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
  { key: 'joined', header: 'Joined', render: (v) => new Date(v as string).toLocaleDateString() },
];

<SortableTable
  data={users}
  columns={columns}
  rowKey={(r) => r.id}
  defaultSortKey="name"
  defaultSortDir="asc"
/>
```

**Expected behaviour:** clicking "Name" header once sorts ascending (A–Z), again descending (Z–A), again returns to original order. The sort indicator arrow points up for ascending and down for descending. Non-sortable columns (`sortable: false`) show no indicator and do not respond to clicks.

## Constraints

- Sorting must be a **stable sort** — rows with equal values retain their original relative order.
- The sorted data must be computed with `useMemo` to avoid resorting on every render.
- String comparison should be case-insensitive.
- Number and date-string comparison should be numeric/chronological.
- `render` function in Column allows custom cell formatting without affecting sort order (sort uses the raw data value).

## Edge Cases

- Column with `sortable: false` — header is not a button, has no aria-sort, no indicator.
- All values in a column are equal — order is determined by original data order (stable sort).
- `data` array is empty — render the table headers but an empty `<tbody>` with no rows.
- `defaultSortKey` references a key not in `columns` — ignore; no sort applied.
- Numeric strings (e.g. "10", "9") — sort numerically if all values are numeric strings.
- `data` prop changes (refetch) while sort is active — reapply the same sort to the new data.

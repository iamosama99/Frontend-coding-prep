# Table with Sort + Filter

## Problem

Build a `DataTable` component that combines column sorting, per-column filtering, and pagination in a single controlled component. The data flow is: filter → sort → paginate. State is managed internally but exposed via optional controlled props.

## TypeScript Signature

```ts
interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'range';
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: DataTableColumn<T>[];
  pageSize?: number;            // default: 10
  rowKey: (row: T) => string;
  emptyMessage?: string;        // default: "No data"
}

function DataTable<T extends Record<string, unknown>>(props: DataTableProps<T>): JSX.Element
```

## Usage Example

```tsx
const columns: DataTableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true, filterable: true },
  { key: 'role', header: 'Role', filterable: true, filterType: 'select' },
  { key: 'age', header: 'Age', sortable: true, filterable: true, filterType: 'range' },
];

<DataTable data={users} columns={columns} rowKey={(u) => u.id} pageSize={5} />
```

**Expected behaviour:** filter inputs appear below each column header. Typing in a text filter immediately filters the data. Clicking a header sorts the filtered data. Pagination shows the current page of the sorted+filtered results.

## Constraints

- Filter, sort, and page states all live in the component's internal state.
- The pipeline order is always: filter → sort → paginate.
- When the filter changes, the page resets to 1.
- `filterType: 'select'` derives options from unique values in that column.
- `filterType: 'range'` shows min/max number inputs for numeric filtering.
- Sorting follows the same direction-cycle as the Sortable Table question.

## Edge Cases

- Filter removes all rows — show `emptyMessage` in the tbody.
- Filter + sort + page interaction: all must remain consistent.
- `pageSize` larger than filtered results — show one page with fewer rows.
- Column added or removed — filter and sort state for the removed column should be cleared.
- `data` prop changes (e.g. after server refresh) — filters/sort remain, results recompute.
- Range filter with non-numeric values in the column — coerce to number or treat as unfiltered.

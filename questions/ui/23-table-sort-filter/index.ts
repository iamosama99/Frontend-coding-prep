import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'range';
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: DataTableColumn<T>[];
  pageSize?: number;
  rowKey: (row: T) => string;
  emptyMessage?: string;
}

// TODO 1: Set up state.
//   - filters: Record<string, string | [number, number]> — keyed by column key.
//   - sortKey: keyof T | null, sortDir: 'asc' | 'desc' | null.
//   - page: number (1-indexed), reset to 1 whenever filters change.
//   Use useReducer if the state transitions are complex.

// TODO 2: Compute the filtered dataset using useMemo.
//   - For each filterable column: apply the filter value.
//   - Text filter: case-insensitive includes check on the string value.
//   - Select filter: exact equality check.
//   - Range filter: numeric value >= min && <= max (ignore non-numeric rows).
//   - Depend on [data, filters].

// TODO 3: Compute the sorted dataset using useMemo.
//   - Apply sort to the filtered dataset (not the original).
//   - Depend on [filteredData, sortKey, sortDir].

// TODO 4: Compute the paginated slice.
//   - totalPages = Math.ceil(sortedData.length / pageSize).
//   - pageData = sortedData.slice((page - 1) * pageSize, page * pageSize).

// TODO 5: Render the full table.
//   - <thead> with column headers (sort buttons for sortable columns) and
//     filter inputs below the headers (one row for filters).
//   - Select filter: build options from unique values via useMemo.
//   - Range filter: two <input type="number"> for min and max.
//   - <tbody> with paginated rows, or a single full-width cell with emptyMessage.
//   - A Pagination control below the table (reuse the logic from 07-pagination).

export function DataTable<T extends Record<string, unknown>>(
  _props: DataTableProps<T>
): JSX.Element {
  throw new Error('Not implemented');
}

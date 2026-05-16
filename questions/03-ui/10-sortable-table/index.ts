import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface SortableTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  defaultSortKey?: keyof T;
  defaultSortDir?: SortDirection;
  rowKey: (row: T) => string;
}

// TODO 1: Set up state for `sortKey` (keyof T | null) and `sortDir` (SortDirection).
//   Initialise from `defaultSortKey` and `defaultSortDir` (which default to null / null).

// TODO 2: Implement the header click handler.
//   - If the clicked column is not currently sorted: set sortKey and sortDir = 'asc'.
//   - If currently sorted asc: set sortDir = 'desc'.
//   - If currently sorted desc: clear both (sortKey = null, sortDir = null).
//   - Skip this logic if the column's `sortable` is false.

// TODO 3: Compute `sortedData` using useMemo.
//   - If sortKey is null or sortDir is null: return [...data] (original order, shallow copy).
//   - Otherwise: sort a copy using the compare function below.
//   - Compare strings: localCompare (case-insensitive).
//   - Compare numbers: numeric difference.
//   - Compare date-like strings: Date.parse comparison.
//   - Invert comparison if sortDir === 'desc'.
//   - Depend on [data, sortKey, sortDir] for recomputation.

// TODO 4: Render the <table> structure.
//   - <thead> with <tr> and <th> per column.
//   - Sortable headers: render as <button> with aria-sort="ascending/descending/none".
//   - Active column: show a direction indicator (▲ or ▼ text, or an SVG arrow).
//   - <tbody> with <tr> per row, <td> per cell; use render() if provided, otherwise raw value.

// TODO 5: Apply the rowKey function for React's key prop on each <tr>.
//   Do not use the row index as the key — use rowKey(row) for stable reconciliation.

export function SortableTable<T extends Record<string, unknown>>(
  _props: SortableTableProps<T>
): JSX.Element {
  throw new Error('Not implemented');
}

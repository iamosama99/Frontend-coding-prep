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

// TODO: implement solution
export function DataTable<T extends Record<string, unknown>>(
  _props: DataTableProps<T>
): JSX.Element {
  throw new Error('Not implemented');
}

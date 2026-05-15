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

// TODO: implement solution
export function SortableTable<T extends Record<string, unknown>>(
  _props: SortableTableProps<T>
): JSX.Element {
  throw new Error('Not implemented');
}

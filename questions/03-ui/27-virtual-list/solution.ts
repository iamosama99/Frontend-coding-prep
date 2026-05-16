import { useState, useRef, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface VirtualListProps<T> {
  items: T[];
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number;
  onScroll?: (scrollTop: number) => void;
  className?: string;
  itemKey?: (item: T, index: number) => string;
}

// TODO: implement solution
export function VirtualList<T>(_props: VirtualListProps<T>): JSX.Element {
  throw new Error('Not implemented');
}

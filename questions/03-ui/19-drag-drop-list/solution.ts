import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface DragDropItem {
  id: string;
  [key: string]: unknown;
}

export interface DragDropListProps<T extends DragDropItem> {
  items: T[];
  onReorder: (reorderedItems: T[]) => void;
  renderItem: (item: T, index: number, isDragging: boolean) => ReactNode;
  keyExtractor?: (item: T) => string;
  disabled?: boolean;
}

// TODO: implement solution
export function DragDropList<T extends DragDropItem>(
  _props: DragDropListProps<T>
): JSX.Element {
  throw new Error('Not implemented');
}

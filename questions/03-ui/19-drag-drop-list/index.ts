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

// TODO 1: Set up state for `draggedId` (string | null) and `dragOverId` (string | null).
//   These power the visual feedback: the dragged item gets a "dragging" class,
//   the drag-over target gets a "drag-over" class.

// TODO 2: Implement the reorder algorithm.
//   - Find the source index (item with draggedId) and destination index (item with dragOverId).
//   - If source === destination, return items unchanged (no-op).
//   - Create a new array: remove the item from the source index, insert at destination index.
//   - This is the "move" operation: arr.splice(destIndex, 0, arr.splice(srcIndex, 1)[0]).
//   - Call onReorder with the new array.

// TODO 3: Implement drag event handlers.
//   - onDragStart(id): set draggedId = id.
//   - onDragOver(e, id): e.preventDefault() (required to enable drop), set dragOverId = id.
//   - onDrop(e, id): e.preventDefault(), run reorder, clear both ids.
//   - onDragEnd: clear both ids (handles drops outside a valid target).

// TODO 4: Implement keyboard accessibility.
//   - Track a `grabbedId` state separately from drag state.
//   - Space on an item: set grabbedId = that item's id (announce via aria-live: "Grabbed").
//   - ArrowUp/ArrowDown when grabbed: move the item one position, announce new position.
//   - Space/Enter when grabbed: drop in place, clear grabbedId (announce: "Dropped").
//   - Escape: cancel, restore original position, clear grabbedId.

// TODO 5: Render the list.
//   - A <ul> container with onDragLeave to clear dragOverId when leaving the list.
//   - Each item as a <li> with draggable={!disabled}, the drag handlers, and
//     the appropriate CSS classes based on draggedId/dragOverId.
//   - Pass isDragging = (item.id === draggedId) to renderItem.
//   - Add aria-live="assertive" region for keyboard drag announcements.

export function DragDropList<T extends DragDropItem>(
  _props: DragDropListProps<T>
): JSX.Element {
  throw new Error('Not implemented');
}

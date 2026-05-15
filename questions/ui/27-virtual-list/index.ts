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

// TODO 1: Pre-compute item offsets and total height using useMemo.
//   - If itemHeight is a number: offset[i] = i * itemHeight, totalHeight = items.length * itemHeight.
//   - If itemHeight is a function: offsets = [], totalHeight = 0; iterate and accumulate.
//     offsets[i] = totalHeight before adding itemHeight(i).
//   - Depend on [items, itemHeight].

// TODO 2: Track scrollTop in state.
//   - Attach an onScroll handler to the container div.
//   - Handler: setScrollTop(e.currentTarget.scrollTop), call props.onScroll?.(scrollTop).
//   - Initialise scrollTop to 0.

// TODO 3: Compute startIndex and endIndex from scrollTop.
//   - For fixed heights: startIndex = Math.floor(scrollTop / itemHeight).
//   - For variable heights: binary search in offsets array for the first index
//     where offset >= scrollTop (or linear scan for simplicity).
//   - endIndex: first index where offset > scrollTop + containerHeight.
//   - Apply overscan: start = Math.max(0, startIndex - overscan).
//     end = Math.min(items.length - 1, endIndex + overscan).

// TODO 4: Build the list of visible items.
//   - Slice items from start to end+1.
//   - Map to { item, index, top, height } objects for rendering.

// TODO 5: Render the structure.
//   - Outer <div ref={containerRef}> with containerHeight, overflow-y: scroll, position: relative.
//   - Inner <div> with height: totalHeight, position: relative (the scroll height spacer).
//   - Visible items: each <div> with position: absolute, top: offset[index], width: 100%.
//   - Use itemKey(item, index) or String(index) as the key.

export function VirtualList<T>(_props: VirtualListProps<T>): JSX.Element {
  throw new Error('Not implemented');
}

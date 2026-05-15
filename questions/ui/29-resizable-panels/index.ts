import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface ResizablePanelsProps {
  children: [ReactNode, ReactNode];
  direction?: 'horizontal' | 'vertical';
  defaultSplit?: number;
  minSize?: number;
  maxSize?: number;
  onResize?: (split: number) => void;
  className?: string;
}

// TODO 1: Set up state: split (number, 0–100 percentage), isDragging (boolean).
//   Refs: containerRef (the outer wrapper), and a flag to track drag start position.

// TODO 2: Implement drag start (onMouseDown on the handle).
//   - Set isDragging = true.
//   - Record the starting mouse position (clientX or clientY based on direction).
//   - Record the starting split value.
//   - Add mousemove and mouseup listeners to document.
//   - Set document.body.style.userSelect = 'none' to prevent text selection.
//   - Set cursor on document.body to 'col-resize' or 'row-resize'.

// TODO 3: Implement drag move (mousemove handler).
//   - If not isDragging, return.
//   - Compute delta = currentPos - startPos.
//   - Get container size: containerRef.current.getBoundingClientRect().width (or height).
//   - Compute newSplit = startSplit + (delta / containerSize) * 100.
//   - Compute minPercent = (minSize ?? 100) / containerSize * 100.
//   - Clamp newSplit to [minPercent, 100 - minPercent].
//   - Set split = newSplit, call onResize?.(newSplit).

// TODO 4: Implement drag end (mouseup handler).
//   - Set isDragging = false.
//   - Remove document mousemove and mouseup listeners.
//   - Restore document.body.style.userSelect and cursor.

// TODO 5: Render the layout.
//   - Container ref={containerRef}: display flex, direction based on `direction` prop.
//   - First panel: flex: 0 0 `${split}%` or `${split}%` width/height.
//   - Divider handle: width/height of 4–8px, cursor: col-resize/row-resize.
//     role="separator", aria-orientation, aria-valuenow={Math.round(split)},
//     aria-valuemin=0, aria-valuemax=100.
//   - Second panel: flex: 1 (takes remaining space).
//   - Keyboard: onKeyDown on the handle, ArrowLeft/Right or Up/Down adjusts split by 1%.

export function ResizablePanels(_props: ResizablePanelsProps): JSX.Element {
  throw new Error('Not implemented');
}

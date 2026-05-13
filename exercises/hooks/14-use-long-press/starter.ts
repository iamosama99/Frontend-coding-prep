import { useRef, useCallback, useEffect } from 'react';

interface LongPressOptions {
  duration?: number;
  onStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
}

// TODO 1: Create a timer ref to store the setTimeout ID.

// TODO 2: Implement the start handler (used for both mousedown + touchstart):
//   - Call options.onStart?.() if provided.
//   - Set timerRef.current = setTimeout(() => { callback(); options.onFinish?.() }, duration).

// TODO 3: Implement the cancel handler (used for mouseup, mouseleave, touchend, touchmove):
//   - If timerRef.current is set (timer is running), clear it and call options.onCancel?.().
//   - Reset timerRef.current to null.

// TODO 4: Wrap start and cancel in useCallback.
//   Think carefully: do these functions close over anything that changes?

// TODO 5: Add a useEffect cleanup to clear the timer on unmount.

// TODO 6: Return an object with all required event handlers:
//   onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd, onTouchMove.
//   Map each to either the start or cancel handler as appropriate.

export function useLongPress(
  callback: () => void,
  options: LongPressOptions = {}
) {
  throw new Error('Not implemented');
}

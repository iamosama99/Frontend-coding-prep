# useLongPress

## Problem

Implement a `useLongPress` hook that detects when a user presses and holds on an element for longer than a specified duration. It should return event handlers to spread onto the target element.

## TypeScript Signature

```ts
interface LongPressOptions {
  duration?: number;        // ms to hold before firing (default 500)
  onStart?: () => void;     // fires on press start
  onFinish?: () => void;    // fires when long press completes
  onCancel?: () => void;    // fires if press ends before duration
}

function useLongPress(
  callback: () => void,
  options?: LongPressOptions
): {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
}
```

## Usage Example

```tsx
function HoldButton() {
  const handlers = useLongPress(() => {
    console.log('Long press triggered!');
  }, { duration: 800 });

  return <button {...handlers}>Hold me</button>;
}
```

## Constraints

- Start a `setTimeout` on `mousedown` / `touchstart`.
- Clear it on `mouseup`, `mouseleave`, `touchend`, `touchmove` (any of these cancels the press).
- Call `callback` when the timeout fires (long press completed).
- Call `onCancel` when the press is released early.
- Store the timer in a `useRef`.
- The returned handlers must be stable across renders (wrap in `useCallback` or return from `useMemo`).

## Edge Cases

- User starts a press and moves their finger (`touchmove`) — cancels the long press.
- User presses then drags the mouse away (`mouseleave`) — cancels the long press.
- Component unmounts while a timer is pending — clear the timer.
- Multiple rapid presses — each new `mousedown` should reset the timer.
- `duration` of 0 — fires on the next tick; test that it fires.

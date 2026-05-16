# requestAnimationFrame Loop

## Problem

Implement two things:
1. A `useAnimationLoop` hook that runs a callback every frame using `requestAnimationFrame`, providing a delta time so animations are frame-rate independent.
2. A `ProgressBar` component that uses the hook to animate smoothly from 0 to a target value.

## API Signature

```ts
// Callback receives delta time in milliseconds since the last frame
type AnimationCallback = (deltaMs: number) => void;

interface UseAnimationLoopOptions {
  paused?: boolean;  // default false — pause/resume without unmounting
}

export function useAnimationLoop(
  callback: AnimationCallback,
  options?: UseAnimationLoopOptions
): void

// Animated progress bar
interface AnimatedProgressBarProps {
  target: number;     // 0–100
  duration?: number;  // ms to reach target, default 500
  paused?: boolean;
}

export function AnimatedProgressBar({ target, duration, paused }: AnimatedProgressBarProps): JSX.Element
```

## Usage Example

```tsx
// Raw loop — move a box 100px/second regardless of frame rate
function MovingBox() {
  const [x, setX] = useState(0);
  useAnimationLoop((deltaMs) => {
    setX(prev => Math.min(prev + (100 * deltaMs / 1000), 500));
  });
  return <div style={{ transform: `translateX(${x}px)` }} />;
}

// Animated bar
<AnimatedProgressBar target={75} duration={800} />
// Bar smoothly fills to 75% over 800ms
```

## Constraints

- Use `requestAnimationFrame` and `cancelAnimationFrame` — never `setInterval` for animation
- The hook must cancel the rAF on unmount to prevent memory leaks
- Delta time must be calculated from the timestamp argument rAF provides, not `Date.now()`
- The `callback` ref must be kept fresh (use `useRef`) to avoid stale closure issues
- When `paused` changes from false → true, the animation stops immediately (no in-flight frame completes)
- When `paused` changes from true → false, the animation resumes from the current state (no jump)

## Edge Cases

- Component unmounts while animation is in flight — rAF is cancelled, no setState after unmount
- `paused` starts as `true` — loop never starts until unpaused
- `target` changes mid-animation — bar smoothly transitions to new target from current position
- `deltaMs` on the first frame — the previous timestamp doesn't exist; use 0 for the first delta
- Frame rate is 120fps — animation must still take the correct `duration` regardless
- `duration` of 0 — bar jumps immediately to target value

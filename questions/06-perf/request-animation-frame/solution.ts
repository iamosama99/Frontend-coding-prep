import React, { useEffect, useRef, useState } from 'react';

type AnimationCallback = (deltaMs: number) => void;

export function useAnimationLoop(
  callback: AnimationCallback,
  options: { paused?: boolean } = {}
): void {
  const { paused = false } = options;
  // Store callback in a ref so the rAF loop always calls the latest version
  // without needing to restart the loop when the callback identity changes.
  const callbackRef = useRef<AnimationCallback>(callback);
  useEffect(() => { callbackRef.current = callback; });

  useEffect(() => {
    if (paused) return;

    let rafId: number;
    let prevTimestamp: number | null = null;

    function loop(timestamp: number) {
      const delta = prevTimestamp === null ? 0 : timestamp - prevTimestamp;
      prevTimestamp = timestamp;
      callbackRef.current(delta);
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);
}

export function AnimatedProgressBar({
  target,
  duration = 500,
  paused = false,
}: {
  target: number;
  duration?: number;
  paused?: boolean;
}): JSX.Element {
  const clampedTarget = Math.min(100, Math.max(0, target));
  const [current, setCurrent] = useState<number>(() =>
    duration === 0 ? clampedTarget : 0
  );

  // When target changes, don't reset — animate from wherever we are.
  const targetRef = useRef(clampedTarget);
  useEffect(() => { targetRef.current = clampedTarget; }, [clampedTarget]);

  useAnimationLoop(
    (deltaMs) => {
      if (duration === 0) {
        setCurrent(targetRef.current);
        return;
      }
      setCurrent((prev) => {
        const step = (deltaMs / duration) * 100;
        const next =
          targetRef.current > prev
            ? Math.min(prev + step, targetRef.current)
            : Math.max(prev - step, targetRef.current);
        return next;
      });
    },
    { paused }
  );

  const display = Math.round(current);

  return React.createElement(
    'div',
    { role: 'progressbar', 'aria-valuenow': display, 'aria-valuemin': 0, 'aria-valuemax': 100,
      style: { background: '#e5e7eb', borderRadius: 4, overflow: 'hidden', height: 12 } },
    React.createElement('div', {
      style: { width: `${display}%`, height: '100%', background: '#3b82f6', transition: 'none' },
    })
  );
}

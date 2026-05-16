import React from 'react';

type AnimationCallback = (deltaMs: number) => void;

// TODO: implement solution
export function useAnimationLoop(
  _callback: AnimationCallback,
  _options?: { paused?: boolean }
): void {
  throw new Error('Not implemented');
}

export function AnimatedProgressBar(_props: {
  target: number;
  duration?: number;
  paused?: boolean;
}): JSX.Element {
  throw new Error('Not implemented');
}

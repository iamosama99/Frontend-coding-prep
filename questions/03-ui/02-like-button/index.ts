import { useState } from 'react';

export interface LikeButtonProps {
  initialCount?: number;
  initialLiked?: boolean;
  onLike?: (liked: boolean) => Promise<void>;
  disabled?: boolean;
}

// TODO 1: Set up state for `liked` (boolean) and `count` (number), both
//   initialised from props with sensible defaults (false and 0).

// TODO 2: Implement the click handler with optimistic update.
//   - Immediately flip `liked` and adjust `count` (+1 or -1).
//   - Snapshot the previous values BEFORE updating state.
//   - If disabled or already loading, return early.

// TODO 3: Handle the async `onLike` callback.
//   - Track a `loading` boolean to block double-clicks.
//   - Wrap the call in try/catch; on failure, restore the snapshotted values.
//   - Always clear `loading` in a finally block.

// TODO 4: Render a <button> with the heart icon and count.
//   - Apply a CSS class that triggers scale animation when switching to liked.
//   - Use `aria-label` and `aria-pressed` to communicate state to screen readers.
//   - Show a subtle loading indicator (opacity or spinner) while the async call runs.

// TODO 5: Guard the count from going below zero.
//   - When unliking, the new count should be Math.max(0, count - 1).

export function LikeButton(_props: LikeButtonProps): JSX.Element {
  throw new Error('Not implemented');
}

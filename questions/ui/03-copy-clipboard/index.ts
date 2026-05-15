import { useState, useEffect, useRef } from 'react';

export interface CopyButtonProps {
  text: string;
  label?: string;
  successLabel?: string;
  successDuration?: number;
  onCopy?: (text: string) => void;
  onError?: (err: unknown) => void;
}

// TODO 1: Set up a `copied` boolean state. The button label shows `label`
//   normally and `successLabel` when `copied` is true.

// TODO 2: Implement the copy handler.
//   - Try navigator.clipboard.writeText(text) first.
//   - If that throws (API unavailable or permission denied), fall back to the
//     document.execCommand('copy') technique using a temporary <textarea>.
//   - On success: set copied = true, call onCopy?.(), start a timer.
//   - On failure: call onError?.() — optionally show a brief error state.

// TODO 3: Clear the success timer properly.
//   - Store the timer id in a useRef so you can clear it if a new click comes
//     in before the previous timer expires (reset-on-click behaviour).
//   - Also clear on unmount via useEffect cleanup to avoid memory leaks.

// TODO 4: Disable the button while `copied` is true to prevent double-copies.
//   Apply aria-label reflecting the current state so screen readers announce
//   the change without needing an additional aria-live region.

// TODO 5: Apply default values for label ("Copy"), successLabel ("Copied!"),
//   and successDuration (2000). Handle the edge case where successDuration
//   is 0 by reverting state synchronously (or via setTimeout(..., 0)).

export function CopyButton(_props: CopyButtonProps): JSX.Element {
  throw new Error('Not implemented');
}

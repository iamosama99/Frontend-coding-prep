import { useState, useRef, useEffect } from 'react';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  inputMode?: 'numeric' | 'text';
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

// TODO 1: Manage an internal array of characters (string[]) of length `length`.
//   - In controlled mode: derive the array from the `value` prop string.
//   - In uncontrolled mode: use useState(['', '', ..., '']) of the correct length.
//   - Store refs for all inputs in a useRef array for programmatic focus.

// TODO 2: Implement the onChange handler for individual boxes.
//   - Filter non-numeric characters when inputMode='numeric'.
//   - On a valid character: update the array at index i, join to a string,
//     call onChange?.() with the new full string, auto-focus index i+1.
//   - If the box already had a character (user is replacing), overwrite it.

// TODO 3: Implement the onKeyDown handler.
//   - Backspace on non-empty box: clear it, stay on same box.
//   - Backspace on empty box: move focus to index i-1 and clear that box.
//   - ArrowLeft/ArrowRight: move focus between boxes.
//   - Do not call the native input's value change for navigation keys.

// TODO 4: Implement the onPaste handler.
//   - Call e.preventDefault() to suppress default paste behaviour.
//   - Get pasted text from e.clipboardData.getData('text').
//   - Filter to valid characters (digits if numeric mode), take first `length` chars.
//   - Fill the array starting at the focused index (or from 0 for a full paste).
//   - Move focus to the next empty box or the last box.

// TODO 5: Call onComplete when all boxes are filled.
//   - After any change, check if the joined string's length equals `length` and all chars are non-empty.
//   - Call onComplete?.(fullValue) once per completion (not on every render).

export function OTPInput(_props: OTPInputProps): JSX.Element {
  throw new Error('Not implemented');
}

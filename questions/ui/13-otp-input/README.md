# OTP Input

## Problem

Build an `OTPInput` component that renders N separate single-character input boxes for entering a one-time password or PIN. The component auto-advances focus to the next box on a valid character entry, moves focus back on Backspace, and handles paste by splitting the pasted string across the boxes.

## TypeScript Signature

```ts
interface OTPInputProps {
  length?: number;                       // number of boxes, default: 6
  value?: string;                        // controlled full OTP string
  onChange?: (value: string) => void;    // called with full OTP string on each change
  onComplete?: (value: string) => void;  // called when all boxes are filled
  inputMode?: 'numeric' | 'text';        // default: 'numeric'
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;                  // single char, shown in empty boxes
}

function OTPInput(props: OTPInputProps): JSX.Element
```

## Usage Example

```tsx
const [otp, setOtp] = useState('');

<OTPInput
  length={6}
  value={otp}
  onChange={setOtp}
  onComplete={(code) => verifyOTP(code)}
  inputMode="numeric"
  autoFocus
/>
```

**Expected behaviour:** the user sees 6 individual text inputs. Typing a digit fills that box and moves focus to the next. Backspace on an empty box moves focus to the previous box and clears it. Pasting "123456" fills all boxes at once. `onComplete` fires only when all boxes have a non-empty value.

## Constraints

- Each box is an `<input type="text" maxLength={1}>` — not a single hidden input.
- The `inputMode` prop should be applied to each input so mobile keyboards show the correct keyboard.
- `autoComplete="one-time-code"` should be on the first input.
- Wrap all inputs in a `<fieldset>` with a `<legend>` for screen reader context.
- Each input needs `aria-label="Digit N of M"` (1-indexed).
- In controlled mode, split the `value` string across the boxes: `value[i] ?? ''`.

## Edge Cases

- Pasting a string shorter than `length` — fill as many boxes as possible; focus the next empty box.
- Pasting a string longer than `length` — use only the first `length` characters.
- Typing a non-numeric character in `inputMode="numeric"` — reject silently (do not fill the box).
- Backspace on the first box — clear it but do not move focus out of the component.
- User clicks a middle box directly — allow it; do not force sequential fill.
- `disabled` — all inputs are disabled; no focus or value changes.
- Controlled `value` shorter than `length` — remaining boxes show placeholder or empty string.

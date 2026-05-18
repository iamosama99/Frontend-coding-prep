# Machine Round Set 2 — OTP Input

**Difficulty:** Medium  
**Time limit:** 90 minutes  
**Components:** 1 (but deceptively complex)

---

## Full Spec

Build a one-time-password (OTP) input component — the kind used in two-factor authentication flows.

**Requirements:**
- Render N separate single-character input boxes (default: 6)
- Typing a digit auto-focuses the next input
- Pressing Backspace on an empty input moves focus to the previous input and clears it
- Pasting a string (e.g. from SMS) distributes characters across inputs, then focuses the input after the last filled box
- All inputs have a visible character limit of 1 (no overflow)
- Emit the full OTP string to a callback when all boxes are filled
- Show a visual "complete" state (e.g. green border) when all boxes are filled

**Props interface:**
```ts
interface OTPInputProps {
  length?: number              // number of boxes (default: 6)
  onComplete: (value: string) => void
  onChange?: (value: string) => void  // fired on every change
  autoFocus?: boolean          // focus first box on mount
  disabled?: boolean
}
```

**Stretch goals (if time allows):**
- Accept only numeric input (reject letters)
- Support alphanumeric mode via a `mode: 'numeric' | 'alphanumeric'` prop
- Add a `value` prop for controlled mode

**Evaluation criteria:**
- Auto-advance on type: character entered → move to next input
- Backspace behavior: if current input is empty, move to previous and clear it
- Paste handling: `e.clipboardData.getData('text')` split across inputs correctly
- `onComplete` called exactly once when last box is filled
- No controlled/uncontrolled conflict (either stick to uncontrolled refs or fully controlled)
- TypeScript: refs array typed correctly (`useRef<(HTMLInputElement | null)[]>`)

---

## Edge Cases to Handle

| Scenario | Expected behavior |
|----------|-------------------|
| Paste longer than length | Truncate to `length` characters |
| Paste shorter than length | Fill from current position, stop at end of paste |
| Backspace on first input | Clear it, stay on first input (don't try to go to index -1) |
| Type non-digit in numeric mode | Reject silently, don't advance |
| Tab navigation | Should work naturally (inputs are focusable) |
| `disabled` prop | All inputs are disabled, no interaction |

---

## Check-in at 45 min

> "Quick check-in — where are you? Do you have basic typing and auto-advance working?"

Expected at 45 min: Typing + auto-advance working. Backspace partially done.

## Check-in at 80 min

> "10 minutes left — what's your priority? Paste handling or completion callback?"

Expected at 80 min: Typing + Backspace + completion callback done. Paste may be incomplete.

---

## Reviewer Checklist

- [ ] Renders N separate inputs
- [ ] Typing moves focus forward correctly
- [ ] Backspace on empty input: focus backward + clear previous
- [ ] Paste distributes correctly (happy path)
- [ ] `onComplete` fires when all boxes filled
- [ ] Refs array typed correctly
- [ ] No off-by-one on focus management (min 0, max length-1)
- [ ] `disabled` prop disables all inputs
- [ ] No controlled/uncontrolled React warning in console

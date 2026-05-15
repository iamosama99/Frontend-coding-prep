# Toggle Switch

## Problem

Build a `ToggleSwitch` component that renders an accessible on/off toggle. The visual design uses a pill-shaped track with an animated circular thumb that slides left (off) or right (on). Underneath the hood it should be driven by a native `<input type="checkbox">` so it gets browser accessibility for free.

The component must support both **controlled** (caller owns `checked` + `onChange`) and **uncontrolled** (internal `defaultChecked`) modes.

## TypeScript Signature

```ts
interface ToggleSwitchProps {
  checked?: boolean;           // controlled mode
  defaultChecked?: boolean;    // uncontrolled mode
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;              // visible or sr-only label
  id?: string;
}

function ToggleSwitch(props: ToggleSwitchProps): JSX.Element
```

## Usage Example

```tsx
// Controlled
const [isOn, setIsOn] = useState(false);
<ToggleSwitch checked={isOn} onChange={setIsOn} label="Enable notifications" />

// Uncontrolled
<ToggleSwitch defaultChecked={true} label="Dark mode" />

// Disabled
<ToggleSwitch checked={true} disabled label="Locked setting" />
```

**Expected behaviour:** clicking anywhere on the component (track, thumb, or label) toggles the state. The thumb animates smoothly between positions. When disabled, the component is visually muted and cannot be interacted with.

## Constraints

- Must be keyboard accessible: `Space` toggles, `Tab` focuses the control.
- The hidden `<input type="checkbox">` must never be `display: none` or `visibility: hidden` (use `sr-only` styling instead) to preserve browser focus handling.
- When both `checked` and `defaultChecked` are provided, `checked` wins (controlled mode).
- The `onChange` callback receives the new boolean value, not a DOM event.
- Transition duration should be 200–300 ms using CSS transitions (not JS animation).

## Edge Cases

- Controlled with no `onChange` handler — component becomes read-only; do not throw.
- `disabled` + controlled: clicking must be a no-op even if `onChange` is provided.
- Very long `label` string — must not break the pill layout; label should wrap or truncate gracefully.
- Rapid clicking — state must not get out of sync with the controlled `checked` prop.
- No `label` provided — the input still needs an accessible name (use `aria-label` fallback).
- `id` not provided — generate a stable unique id internally to link the label and input.

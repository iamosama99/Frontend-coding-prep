import { useState, useId } from 'react';

export interface ToggleSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
}

// TODO 1: Determine whether the component is in controlled or uncontrolled mode.
//   - If `checked` is provided (not undefined), treat it as controlled and always
//     render from the prop value.
//   - Otherwise use internal useState initialised with `defaultChecked ?? false`.

// TODO 2: Build the click/change handler.
//   - If disabled, return early without doing anything.
//   - In uncontrolled mode, update internal state.
//   - In both modes, call `onChange?.(newValue)`.

// TODO 3: Generate a stable id for the label-input association.
//   - Use the `id` prop if provided; otherwise fall back to React's `useId()`.
//   - Pass this id to both the <input> and the <label htmlFor=...>.

// TODO 4: Render the visual structure.
//   - A visually-hidden <input type="checkbox"> that is still in the tab order.
//   - A pill-shaped track <span> that changes class based on checked state.
//   - A circular thumb <span> that translates via CSS based on checked state.
//   - A <label> wrapping or adjacent to the track so clicks propagate.

// TODO 5: Handle missing accessible name.
//   - If no `label` prop is provided, add aria-label="Toggle" to the input
//     so screen readers still have something to announce.

export function ToggleSwitch(_props: ToggleSwitchProps): JSX.Element {
  throw new Error('Not implemented');
}

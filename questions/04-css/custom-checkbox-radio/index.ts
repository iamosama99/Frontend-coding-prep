import React from 'react'

export interface CustomCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
  id?: string
}

export interface CustomRadioProps {
  value: string
  checked: boolean
  onChange: (value: string) => void
  label: string
  name: string
  disabled?: boolean
  id?: string
}

export interface RadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string; disabled?: boolean }>
}

// TODO 1: Implement CustomCheckbox.
//         Keep the real <input type="checkbox"> in the DOM (hidden with CSS but present).
//         Associate it with the label via htmlFor + id.
//         Call onChange(e.target.checked) in the input's onChange handler.
// TODO 2: Style the checkbox with appearance: none, then use :checked to show a checkmark.
//         Inject the CSS via a <style> tag or use inline styles for the container.
//         The visual indicator should be a div/span positioned over the input.
// TODO 3: Forward disabled state — set pointer-events: none and reduce opacity.
export function CustomCheckbox(props: CustomCheckboxProps): React.ReactElement {
  throw new Error('Not implemented')
}

// TODO 4: Implement CustomRadio — same pattern as CustomCheckbox but for radio inputs.
//         Use a filled circle as the visual indicator when checked.
//         The 'name' prop groups radios so only one can be selected at a time (browser native).
export function CustomRadio(props: CustomRadioProps): React.ReactElement {
  throw new Error('Not implemented')
}

// TODO 5: Implement RadioGroup — render a list of CustomRadio components.
//         Pass the name prop to all radios.
//         A radio is checked when its value === the group's value prop.
export function RadioGroup(props: RadioGroupProps): React.ReactElement {
  throw new Error('Not implemented')
}

export function getCustomInputCSS(): string {
  throw new Error('Not implemented')
}

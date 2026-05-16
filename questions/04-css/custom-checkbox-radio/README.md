# Custom Checkbox / Radio

## Problem

Implement `CustomCheckbox` and `CustomRadio` components that visually replace the browser default inputs using CSS (`appearance: none`) while remaining fully accessible and keyboard-navigable. The actual `<input>` element stays in the DOM.

## TypeScript Signatures

```typescript
interface CustomCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
  id?: string
}

interface CustomRadioProps {
  value: string
  checked: boolean
  onChange: (value: string) => void
  label: string
  name: string         // radio group name
  disabled?: boolean
  id?: string
}

interface RadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string; disabled?: boolean }>
}

function CustomCheckbox(props: CustomCheckboxProps): React.ReactElement
function CustomRadio(props: CustomRadioProps): React.ReactElement
function RadioGroup(props: RadioGroupProps): React.ReactElement

// Returns the CSS string needed to style the inputs
function getCustomInputCSS(): string
```

## Usage Example

```tsx
const [checked, setChecked] = useState(false)
<CustomCheckbox
  checked={checked}
  onChange={setChecked}
  label="Accept terms"
/>

const [selected, setSelected] = useState('a')
<RadioGroup
  name="options"
  value={selected}
  onChange={setSelected}
  options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]}
/>
```

## Constraints

- The real `<input>` must be present (not replaced with a div) — screen readers and form submission depend on it
- Use `appearance: none` to remove the native styling
- The label must be associated with the input via `htmlFor` / `id` pair — clicking the label must toggle the input
- `:checked` pseudo-class drives the visual checked state (checkmark or filled circle)
- `:focus-visible` must show a visible focus ring
- `:disabled` must grey out the component and set `cursor: not-allowed`

## Edge Cases

- Click on the label — must toggle the checkbox (label click trick via `htmlFor`)
- Keyboard navigation — Tab to focus, Space to toggle checkbox, arrow keys to move between radio group options
- `disabled` — visually greyed out, `pointer-events: none`, still in tab order with `aria-disabled`
- Form submission — the `<input>` value is submitted (hidden but present)
- Controlled vs uncontrolled — these are controlled components; `checked` and `onChange` are required

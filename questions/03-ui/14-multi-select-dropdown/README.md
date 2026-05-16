# Multi-Select Dropdown

## Problem

Build a `MultiSelect` dropdown component that allows the user to select multiple options from a searchable list. Selected options are shown as dismissible chip tags inside the trigger. The dropdown uses the ARIA listbox pattern.

## TypeScript Signature

```ts
interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: Option[];
  value?: string[];                       // controlled selected values
  defaultValue?: string[];                // uncontrolled initial selection
  onChange?: (selected: string[]) => void;
  placeholder?: string;                   // default: "Select..."
  searchPlaceholder?: string;             // default: "Search..."
  maxSelected?: number;                   // cap on selections
  disabled?: boolean;
  label?: string;
}

function MultiSelect(props: MultiSelectProps): JSX.Element
```

## Usage Example

```tsx
const [selected, setSelected] = useState<string[]>([]);
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

<MultiSelect
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Pick frameworks"
  maxSelected={3}
/>
```

**Expected behaviour:** clicking the trigger opens the dropdown. Typing in the search box filters options. Clicking an option toggles it. Selected options appear as chip tags that can be individually removed with their X button. `maxSelected` prevents adding more options when the limit is reached.

## Constraints

- The trigger element must have `role="combobox"` and `aria-expanded`.
- The dropdown list must have `role="listbox"` and `aria-multiselectable="true"`.
- Each option must have `role="option"` and `aria-selected`.
- Keyboard: Down arrow opens and navigates list; Space/Enter toggles selection; Escape closes; Backspace on empty search removes the last selected chip.
- Close the dropdown when clicking outside (use a `useClickOutside`-style effect).
- The search input must be inside the trigger area (not a separate element above the list).

## Edge Cases

- All options filtered out by search — show "No results found" message.
- `maxSelected` reached — remaining options in the list get `aria-disabled="true"` and cannot be selected.
- Removing a chip via X while the dropdown is open — dropdown stays open.
- `disabled` prop on the whole component — chips are not dismissible, trigger does not open.
- Options list changes (new options prop) — re-filter with the current search query.
- Selected values include a value no longer in options — keep the chip (stale data) or remove it (document the choice).

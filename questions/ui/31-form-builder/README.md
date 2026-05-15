# Form Builder

## Problem

Build a `FormBuilder` component that renders a dynamic form from a JSON configuration schema. Each field definition specifies the input type, validation rules, and error messages. The form tracks field values and errors and calls a submit handler with validated data.

## TypeScript Signature

```ts
type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;  // return error string or null
}

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  defaultValue?: unknown;
  placeholder?: string;
  options?: { value: string; label: string }[];  // for select and radio
  validation?: ValidationRule;
  helperText?: string;
}

interface FormBuilderProps {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  submitLabel?: string;          // default: "Submit"
  resetOnSubmit?: boolean;
  className?: string;
}

function FormBuilder(props: FormBuilderProps): JSX.Element
```

## Usage Example

```tsx
<FormBuilder
  fields={[
    { name: 'email', label: 'Email', type: 'email', validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } },
    { name: 'age', label: 'Age', type: 'number', validation: { min: 18, max: 99 } },
    { name: 'role', label: 'Role', type: 'select', options: [{ value: 'admin', label: 'Admin' }] },
  ]}
  onSubmit={(values) => console.log(values)}
/>
```

**Expected behaviour:** the form renders all fields in order. On submit, each field's value is validated. Fields with errors show inline error messages and `aria-invalid`. The submit button is only disabled during async submission. If all validations pass, `onSubmit` is called with the collected values.

## Constraints

- Validate fields on submit; optionally also on blur (validate-on-blur).
- Each field's error message is specific to the failing rule (e.g. "Must be at least 8 characters").
- Errors are shown below the relevant input with `role="alert"` or linked via `aria-describedby`.
- The `custom` validation function runs last and can override or supplement built-in rules.
- `required` checkbox: checked = has value, unchecked = no value (or false).
- `onSubmit` async: show a loading state on the submit button while it runs.

## Edge Cases

- `pattern` validation on empty string when not required — skip pattern check if field is empty.
- Nested field names (e.g. `address.city`) — the form values object should be deeply nested.
- Two fields with the same `name` — second one wins (document the behaviour).
- `fields` array changes after mount — merge new field configs with existing values.
- `resetOnSubmit=true` — after successful submit, all fields reset to their `defaultValue`.
- `custom` validator returns a non-null string — treat as an error regardless of other rules.

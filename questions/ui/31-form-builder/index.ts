import { useState, useCallback } from 'react';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  defaultValue?: unknown;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: ValidationRule;
  helperText?: string;
}

export interface FormBuilderProps {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  submitLabel?: string;
  resetOnSubmit?: boolean;
  className?: string;
}

// TODO 1: Initialise form values from fields[].defaultValue.
//   - Use useMemo or useState initialiser to build: { [field.name]: field.defaultValue ?? '' }.
//   - Track errors: Record<string, string | null> (field name → error message or null).
//   - Track submitting: boolean.

// TODO 2: Implement the validateField function.
//   - Run each applicable rule in order: required → minLength → maxLength → min → max → pattern → custom.
//   - Return the first error message encountered, or null if valid.
//   - Skip pattern/length checks if the value is empty and required is false.

// TODO 3: Implement the validateAll function.
//   - Iterate all fields, call validateField for each.
//   - Collect errors into a Record<string, string | null>.
//   - Return { isValid: boolean, errors: Record }.

// TODO 4: Implement the submit handler.
//   - Call validateAll(). If not valid: set errors state and scroll to first error, return.
//   - If valid: set submitting = true.
//   - Await onSubmit(values).
//   - If resetOnSubmit: reset values to defaults.
//   - Always: set submitting = false in finally.

// TODO 5: Render the form.
//   - Map over fields and render the appropriate input type:
//     text/email/password/number: <input type={field.type}>.
//     textarea: <textarea>.
//     select: <select> with <option> per item.
//     checkbox: <input type="checkbox">.
//     radio: multiple <input type="radio"> per option.
//   - Each input: value from values state, onChange updates values[field.name].
//   - Each input: aria-invalid={!!errors[field.name]}, aria-describedby pointing to error/helper.
//   - Error message: <p role="alert" id="{name}-error">{errors[field.name]}</p>.

export function FormBuilder(_props: FormBuilderProps): JSX.Element {
  throw new Error('Not implemented');
}

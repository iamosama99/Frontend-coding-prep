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

// TODO: implement solution
export function FormBuilder(_props: FormBuilderProps): JSX.Element {
  throw new Error('Not implemented');
}

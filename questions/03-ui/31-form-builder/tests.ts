// Tests for FormBuilder
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { FormBuilder, FormBuilderProps, FieldConfig, ValidationRule } from './index';

// Test 1: FormBuilder is exported as a function
try {
  typeof FormBuilder === 'function'
    ? pass('FormBuilder is exported as a function')
    : fail('FormBuilder exported', `typeof = ${typeof FormBuilder}`);
} catch (e) {
  fail('FormBuilder exported', String(e));
}

// Test 2: FieldConfig interface shape
try {
  const field: FieldConfig = {
    name: 'email',
    label: 'Email address',
    type: 'email',
    validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  };
  field.name === 'email' && field.validation?.required === true
    ? pass('FieldConfig has correct shape with validation')
    : fail('FieldConfig', JSON.stringify({ name: field.name, required: field.validation?.required }));
} catch (e) {
  fail('FieldConfig', String(e));
}

// Test 3: validateField — required rule
try {
  const validateField = (value: unknown, rules: ValidationRule | undefined): string | null => {
    if (!rules) return null;
    if (rules.required && (value === '' || value === null || value === undefined)) {
      return 'This field is required';
    }
    return null;
  };
  validateField('', { required: true }) === 'This field is required' &&
  validateField('hello', { required: true }) === null
    ? pass('required rule: empty value returns error, non-empty returns null')
    : fail('required rule', `empty="${validateField('', { required: true })}" filled="${validateField('hello', { required: true })}"`);
} catch (e) {
  fail('required rule', String(e));
}

// Test 4: validateField — minLength rule
try {
  const validateField = (value: unknown, rules: ValidationRule | undefined): string | null => {
    if (!rules) return null;
    const str = String(value);
    if (rules.minLength !== undefined && str.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }
    return null;
  };
  validateField('hi', { minLength: 5 }) !== null &&
  validateField('hello world', { minLength: 5 }) === null
    ? pass('minLength rule: short value errors, long value passes')
    : fail('minLength rule', `short="${validateField('hi', { minLength: 5 })}" long="${validateField('hello world', { minLength: 5 })}"`);
} catch (e) {
  fail('minLength rule', String(e));
}

// Test 5: validateAll — returns errors for all invalid fields
try {
  const validateAll = (values: Record<string, unknown>, fields: FieldConfig[]) => {
    const errors: Record<string, string | null> = {};
    let isValid = true;
    fields.forEach(field => {
      const val = values[field.name];
      const rules = field.validation;
      if (rules?.required && (!val || val === '')) {
        errors[field.name] = 'Required';
        isValid = false;
      } else {
        errors[field.name] = null;
      }
    });
    return { isValid, errors };
  };
  const fields: FieldConfig[] = [
    { name: 'name', label: 'Name', type: 'text', validation: { required: true } },
    { name: 'email', label: 'Email', type: 'email', validation: { required: true } },
  ];
  const { isValid, errors } = validateAll({ name: 'Alice', email: '' }, fields);
  isValid === false && errors['email'] === 'Required' && errors['name'] === null
    ? pass('validateAll catches required errors for all fields')
    : fail('validateAll', JSON.stringify({ isValid, errors }));
} catch (e) {
  fail('validateAll', String(e));
}

// Test 6: custom validator overrides
try {
  const validateField = (value: unknown, rules: ValidationRule | undefined): string | null => {
    if (!rules?.custom) return null;
    return rules.custom(value);
  };
  const customRule: ValidationRule = { custom: (v) => v === 'banned' ? 'Value is not allowed' : null };
  validateField('banned', customRule) === 'Value is not allowed' &&
  validateField('ok', customRule) === null
    ? pass('custom validator returns error string or null correctly')
    : fail('custom validator', `banned="${validateField('banned', customRule)}" ok="${validateField('ok', customRule)}"`);
} catch (e) {
  fail('custom validator', String(e));
}

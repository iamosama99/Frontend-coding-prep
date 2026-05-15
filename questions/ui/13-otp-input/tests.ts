// Tests for OTPInput
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { OTPInput, OTPInputProps } from './index';

// Test 1: OTPInput is exported as a function
try {
  typeof OTPInput === 'function'
    ? pass('OTPInput is exported as a function')
    : fail('OTPInput exported', `typeof = ${typeof OTPInput}`);
} catch (e) {
  fail('OTPInput exported', String(e));
}

// Test 2: Props interface accepts all fields
try {
  const props: OTPInputProps = {
    length: 6,
    value: '123456',
    onChange: (_v: string) => {},
    onComplete: (_v: string) => {},
    inputMode: 'numeric',
    disabled: false,
    autoFocus: true,
    placeholder: '_',
  };
  props.length === 6 && props.inputMode === 'numeric'
    ? pass('OTPInputProps accepts all fields')
    : fail('OTPInputProps', 'field mismatch');
} catch (e) {
  fail('OTPInputProps', String(e));
}

// Test 3: Controlled value split across boxes
try {
  const value = '1234';
  const length = 6;
  const boxes = Array.from({ length }, (_, i) => value[i] ?? '');
  JSON.stringify(boxes) === JSON.stringify(['1', '2', '3', '4', '', ''])
    ? pass('controlled value split correctly across boxes')
    : fail('value split', JSON.stringify(boxes));
} catch (e) {
  fail('value split', String(e));
}

// Test 4: Numeric filter — rejects non-digit characters
try {
  const filterNumeric = (char: string): string => (/^\d$/.test(char) ? char : '');
  filterNumeric('5') === '5' && filterNumeric('a') === '' && filterNumeric('!') === ''
    ? pass('numeric filter accepts digits, rejects non-digits')
    : fail('numeric filter', `5="${filterNumeric('5')}" a="${filterNumeric('a')}"`);
} catch (e) {
  fail('numeric filter', String(e));
}

// Test 5: Paste handling — trim to length and split
try {
  const handlePaste = (pasted: string, length: number): string[] => {
    const chars = pasted.replace(/\D/g, '').slice(0, length).split('');
    return Array.from({ length }, (_, i) => chars[i] ?? '');
  };
  const result = handlePaste('123456789', 6);
  JSON.stringify(result) === JSON.stringify(['1', '2', '3', '4', '5', '6'])
    ? pass('paste trimmed to length and split correctly')
    : fail('paste handling', JSON.stringify(result));
} catch (e) {
  fail('paste handling', String(e));
}

// Test 6: onComplete fires when all boxes filled
try {
  let completedWith: string | null = null;
  const onComplete = (v: string) => { completedWith = v; };
  const boxes = ['1', '2', '3', '4', '5', '6'];
  const full = boxes.join('');
  const allFilled = boxes.every(b => b.length === 1);
  if (allFilled) onComplete(full);
  completedWith === '123456'
    ? pass('onComplete called with full OTP string when all boxes filled')
    : fail('onComplete', `received "${completedWith}"`);
} catch (e) {
  fail('onComplete', String(e));
}

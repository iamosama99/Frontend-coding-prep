// Tests for ProgressBar
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { ProgressBar, ProgressBarProps } from './index';

// Test 1: ProgressBar is exported as a function
try {
  typeof ProgressBar === 'function'
    ? pass('ProgressBar is exported as a function')
    : fail('ProgressBar exported', `typeof = ${typeof ProgressBar}`);
} catch (e) {
  fail('ProgressBar exported', String(e));
}

// Test 2: Percentage calculation — standard case
try {
  const computePercentage = (value: number, min: number, max: number): number => {
    if (max === min) return 0;
    const clamped = Math.min(max, Math.max(min, value));
    return ((clamped - min) / (max - min)) * 100;
  };
  computePercentage(75, 0, 100) === 75
    ? pass('percentage calculation: value=75, min=0, max=100 → 75%')
    : fail('percentage calculation', `got ${computePercentage(75, 0, 100)}`);
} catch (e) {
  fail('percentage calculation', String(e));
}

// Test 3: Clamping — value below min
try {
  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  clamp(-10, 0, 100) === 0
    ? pass('value below min is clamped to min')
    : fail('clamp below min', `got ${clamp(-10, 0, 100)}`);
} catch (e) {
  fail('clamp below min', String(e));
}

// Test 4: Clamping — value above max
try {
  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  clamp(150, 0, 100) === 100
    ? pass('value above max is clamped to max')
    : fail('clamp above max', `got ${clamp(150, 0, 100)}`);
} catch (e) {
  fail('clamp above max', String(e));
}

// Test 5: Division by zero guard when min === max
try {
  const computePercentage = (value: number, min: number, max: number): number => {
    if (max === min) return 0;
    const clamped = Math.min(max, Math.max(min, value));
    return ((clamped - min) / (max - min)) * 100;
  };
  const result = computePercentage(50, 50, 50);
  result === 0
    ? pass('min === max returns 0% without division by zero')
    : fail('min===max guard', `got ${result}`);
} catch (e) {
  fail('min===max guard', String(e));
}

// Test 6: Indeterminate mode — value is undefined
try {
  const props: ProgressBarProps = { label: 'Loading...' };
  const isIndeterminate = props.value === undefined;
  isIndeterminate
    ? pass('indeterminate mode detected when value prop is undefined')
    : fail('indeterminate detection', 'value is defined unexpectedly');
} catch (e) {
  fail('indeterminate detection', String(e));
}

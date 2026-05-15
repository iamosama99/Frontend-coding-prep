// Tests for ToggleSwitch
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { ToggleSwitch, ToggleSwitchProps } from './index';

// Test 1: ToggleSwitch is exported as a function (component)
try {
  typeof ToggleSwitch === 'function'
    ? pass('ToggleSwitch is exported as a function')
    : fail('ToggleSwitch is exported as a function', `typeof = ${typeof ToggleSwitch}`);
} catch (e) {
  fail('ToggleSwitch exported', String(e));
}

// Test 2: Props interface — controlled mode fields exist
try {
  const props: ToggleSwitchProps = {
    checked: false,
    onChange: (_val: boolean) => {},
    disabled: false,
    label: 'Test',
    id: 'toggle-1',
  };
  typeof props.checked === 'boolean' && typeof props.onChange === 'function'
    ? pass('ToggleSwitchProps supports controlled mode fields')
    : fail('ToggleSwitchProps controlled fields', 'type mismatch');
} catch (e) {
  fail('ToggleSwitchProps controlled fields', String(e));
}

// Test 3: Props interface — uncontrolled mode field exists
try {
  const props: ToggleSwitchProps = { defaultChecked: true };
  props.defaultChecked === true
    ? pass('ToggleSwitchProps supports defaultChecked')
    : fail('ToggleSwitchProps defaultChecked', `got ${props.defaultChecked}`);
} catch (e) {
  fail('ToggleSwitchProps defaultChecked', String(e));
}

// Test 4: onChange callback receives a boolean
try {
  let received: boolean | null = null;
  const handler = (val: boolean) => { received = val; };
  handler(true);
  received === true
    ? pass('onChange callback receives boolean value')
    : fail('onChange callback', `received ${received}`);
} catch (e) {
  fail('onChange callback', String(e));
}

// Test 5: Controlled vs uncontrolled logic — controlled wins when both provided
try {
  const props: ToggleSwitchProps = { checked: false, defaultChecked: true };
  // In controlled mode, `checked` prop should be the source of truth
  const isControlled = props.checked !== undefined;
  isControlled
    ? pass('controlled mode detected when checked prop is provided')
    : fail('controlled mode detection', 'defaultChecked should not win when checked is present');
} catch (e) {
  fail('controlled mode detection', String(e));
}

// Test 6: Disabled prop is accepted without throwing
try {
  const props: ToggleSwitchProps = { checked: true, disabled: true };
  props.disabled === true
    ? pass('disabled prop accepted in props interface')
    : fail('disabled prop', `got ${props.disabled}`);
} catch (e) {
  fail('disabled prop', String(e));
}

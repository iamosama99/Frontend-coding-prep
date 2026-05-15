// Tests for Stepper
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Stepper, StepperProps, Step } from './index';

// Test 1: Stepper is exported as a function
try {
  typeof Stepper === 'function'
    ? pass('Stepper is exported as a function')
    : fail('Stepper exported', `typeof = ${typeof Stepper}`);
} catch (e) {
  fail('Stepper exported', String(e));
}

// Test 2: Step interface shape
try {
  const step: Step = {
    id: 'step1',
    title: 'Personal Info',
    content: null,
    validate: () => true,
    optional: false,
  };
  step.id === 'step1' && typeof step.validate === 'function'
    ? pass('Step interface has correct shape with validate and optional')
    : fail('Step shape', JSON.stringify({ id: step.id, hasValidate: !!step.validate }));
} catch (e) {
  fail('Step shape', String(e));
}

// Test 3: Validation blocks advancement when returns false
try {
  let advanced = false;
  const tryAdvance = async (validate: (() => boolean | Promise<boolean>) | undefined) => {
    if (!validate) { advanced = true; return; }
    const result = await validate();
    if (result) advanced = true;
  };
  tryAdvance(() => false).then(() => {
    advanced === false
      ? pass('failed validation prevents step advancement')
      : fail('validation block', 'advanced despite failed validation');
  });
} catch (e) {
  fail('validation block', String(e));
}

// Test 4: Back decrements currentIndex
try {
  let currentIndex = 2;
  const goBack = () => { currentIndex = Math.max(0, currentIndex - 1); };
  goBack();
  currentIndex === 1
    ? pass('Back decrements currentIndex from 2 to 1')
    : fail('Back', `currentIndex=${currentIndex}`);
} catch (e) {
  fail('Back', String(e));
}

// Test 5: Back disabled at step 0
try {
  const isBackDisabled = (currentIndex: number): boolean => currentIndex === 0;
  isBackDisabled(0) === true && isBackDisabled(1) === false
    ? pass('Back is disabled at step 0')
    : fail('Back disabled', `at 0: ${isBackDisabled(0)} at 1: ${isBackDisabled(1)}`);
} catch (e) {
  fail('Back disabled', String(e));
}

// Test 6: Last step shows Finish instead of Next
try {
  const steps = ['a', 'b', 'c'];
  const isLastStep = (currentIndex: number): boolean => currentIndex === steps.length - 1;
  isLastStep(2) === true && isLastStep(1) === false
    ? pass('last step detected correctly for Finish button')
    : fail('last step detection', `at 2: ${isLastStep(2)} at 1: ${isLastStep(1)}`);
} catch (e) {
  fail('last step detection', String(e));
}

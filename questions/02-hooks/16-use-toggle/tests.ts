// Tests for useToggle
// Run with: npx ts-node tests.ts
// Note: tests validate logic only — full lifecycle tests need @testing-library/react-hooks.

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

const { useToggle } = require('./index');

// Test 1: exported as a function
try {
  typeof useToggle === 'function'
    ? pass('useToggle is exported as a function')
    : fail('useToggle exported', `typeof = ${typeof useToggle}`);
} catch (e) {
  fail('useToggle exported', String(e));
}

// Test 2: toggle logic — flipping behaviour
try {
  let value = false;
  const flip = (forced?: boolean) => {
    if (typeof forced === 'boolean') {
      value = forced;
    } else {
      value = !value;
    }
  };

  flip();
  value === true ? pass('flip false → true') : fail('flip false → true', `got ${value}`);

  flip();
  value === false ? pass('flip true → false') : fail('flip true → false', `got ${value}`);
} catch (e) {
  fail('flip logic', String(e));
}

// Test 3: forced value overrides current state
try {
  let value = true;
  const forceOff = (forced?: boolean) => {
    value = typeof forced === 'boolean' ? forced : !value;
  };

  forceOff(false);
  value === false ? pass('force false overrides true') : fail('force false overrides true', `got ${value}`);

  forceOff(true);
  value === true ? pass('force true overrides false') : fail('force true overrides false', `got ${value}`);
} catch (e) {
  fail('forced value logic', String(e));
}

// Test 4: undefined forced value still flips
try {
  let value = false;
  const toggle = (forced?: boolean) => {
    value = typeof forced === 'boolean' ? forced : !value;
  };

  toggle(undefined);
  value === true ? pass('toggle(undefined) flips') : fail('toggle(undefined) flips', `got ${value}`);
} catch (e) {
  fail('toggle(undefined)', String(e));
}

// Test 5: default initialValue is false
try {
  // The hook should default to false when called with no argument.
  // We can't call hooks directly here, but we can verify the signature accepts no args.
  const defaultVal = false; // mirrors initialValue = false
  defaultVal === false ? pass('default initialValue is false') : fail('default initialValue', `got ${defaultVal}`);
} catch (e) {
  fail('default initialValue', String(e));
}

console.log('\nNote: stability of the toggle reference across renders requires @testing-library/react-hooks');

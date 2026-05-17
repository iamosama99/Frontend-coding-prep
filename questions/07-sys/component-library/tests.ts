// Tests for Button (component-library)
// Run: npx ts-node questions/07-sys/component-library/tests.ts

import React from 'react';
import { Button, tokens } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: Button is exported as a function
assert(typeof Button === 'function', 'Button is exported as a function');

// Test 2: tokens object is exported with expected keys
assert(typeof tokens === 'object' && tokens !== null, 'tokens is exported as an object');
assert('colorPrimary' in tokens, 'tokens has colorPrimary');
assert('borderRadius' in tokens, 'tokens has borderRadius');

// Test 3: renders without crashing with minimal props
try {
  const el = Button({ children: 'Click me' });
  assert(el !== null && el !== undefined, 'renders with children only');
} catch {
  assert(false, 'renders with children only');
}

// Test 4: renders with each variant
for (const variant of ['primary', 'secondary', 'ghost', 'danger'] as const) {
  try {
    const el = Button({ children: 'x', variant });
    assert(el !== null, `renders variant=${variant}`);
  } catch {
    assert(false, `renders variant=${variant}`);
  }
}

// Test 5: renders with each size
for (const size of ['sm', 'md', 'lg'] as const) {
  try {
    const el = Button({ children: 'x', size });
    assert(el !== null, `renders size=${size}`);
  } catch {
    assert(false, `renders size=${size}`);
  }
}

// Test 6: isLoading — button must not throw
try {
  const el = Button({ children: 'Saving', isLoading: true });
  assert(el !== null, 'renders with isLoading=true');
} catch {
  assert(false, 'renders with isLoading=true');
}

// Test 7: as="a" — must not throw
try {
  const el = Button({ as: 'a' as any, href: '/home', children: 'Home' });
  assert(el !== null, 'renders as anchor element');
} catch {
  assert(false, 'renders as anchor element');
}

// Test 8: disabled prop does not crash
try {
  const el = Button({ children: 'x', disabled: true });
  assert(el !== null, 'renders with disabled=true');
} catch {
  assert(false, 'renders with disabled=true');
}

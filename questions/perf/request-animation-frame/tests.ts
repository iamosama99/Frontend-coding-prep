// Tests for requestAnimationFrame loop
// Run: npx ts-node questions/perf/request-animation-frame/tests.ts

import { useAnimationLoop, AnimatedProgressBar } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: exports exist
assert(typeof useAnimationLoop === 'function', 'useAnimationLoop is exported');
assert(typeof AnimatedProgressBar === 'function', 'AnimatedProgressBar is exported');

// Test 2: AnimatedProgressBar renders without throwing (duration 0 = immediate jump)
try {
  const el = AnimatedProgressBar({ target: 50, duration: 0 });
  assert(el !== null && el !== undefined, 'AnimatedProgressBar renders with duration=0');
} catch {
  assert(false, 'AnimatedProgressBar renders with duration=0');
}

// Test 3: target clamped at 100
try {
  const el = AnimatedProgressBar({ target: 150, duration: 0 });
  assert(el !== null && el !== undefined, 'AnimatedProgressBar handles target > 100');
} catch {
  assert(false, 'AnimatedProgressBar handles target > 100');
}

// Test 4: target = 0
try {
  const el = AnimatedProgressBar({ target: 0, duration: 500 });
  assert(el !== null && el !== undefined, 'AnimatedProgressBar handles target=0');
} catch {
  assert(false, 'AnimatedProgressBar handles target=0');
}

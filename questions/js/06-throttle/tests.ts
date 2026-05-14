import { throttle } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

// Test 1: first call fires immediately
let count = 0;
const t = throttle(() => count++, 100);
t();
assert('first call fires immediately', count, 1);

// Test 2: rapid calls — only first fires within interval
t(); t(); t();
assert('rapid calls throttled to 1', count, 1);

// Test 3: fires again after interval
setTimeout(() => {
  t();
  assert('fires again after interval', count, 2);
}, 150);

// Test 4: uses args from the call that fires
let lastArg = '';
const t2 = throttle((s: string) => { lastArg = s; }, 100);
t2('first');
t2('ignored');
assert('uses args from the call that fires', lastArg, 'first');

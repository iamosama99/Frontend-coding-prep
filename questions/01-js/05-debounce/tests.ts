import { debounce } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

// Test 1: fires once after rapid calls
let count = 0;
const d = debounce(() => count++, 50);
d(); d(); d();
setTimeout(() => {
  assert('fires once after rapid calls', count, 1);
}, 100);

// Test 2: fires with latest args
let lastArg = '';
const d2 = debounce((s: string) => { lastArg = s; }, 50);
d2('a'); d2('b'); d2('c');
setTimeout(() => {
  assert('uses args from last call', lastArg, 'c');
}, 100);

// Test 3: fires again after delay has passed
let count2 = 0;
const d3 = debounce(() => count2++, 50);
d3();
setTimeout(() => {
  d3(); // new call after first has fired
  setTimeout(() => assert('fires again after delay', count2, 2), 100);
}, 100);

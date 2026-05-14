import { curry } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

const add3 = (a: number, b: number, c: number) => a + b + c;
const c = curry(add3);

assert('one at a time', c(1)(2)(3), 6);
assert('two then one', c(1, 2)(3), 6);
assert('one then two', c(1)(2, 3), 6);
assert('all at once', c(1, 2, 3), 6);

// Partial results are independent
const addTo1 = c(1);
assert('partial (1)(2)(3)', addTo1(2)(3), 6);
assert('partial (1)(3)(5)', addTo1(3)(5), 9);

// Single-arg function
const double = curry((x: number) => x * 2);
assert('single-arg curried', double(5), 10);

import { chunk } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

assert('size 2, remainder 1', chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
assert('size equals length', chunk([1, 2, 3], 3), [[1, 2, 3]]);
assert('size 1', chunk([1, 2, 3], 1), [[1], [2], [3]]);
assert('empty array', chunk([], 2), []);
assert('size larger than array', chunk([1, 2], 10), [[1, 2]]);
assert('evenly divisible', chunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);

import { flattenArray } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

assert('deeply nested', flattenArray([1, [2, [3, [4]], 5]]), [1, 2, 3, 4, 5]);
assert('two-level nested', flattenArray([[1, 2], [3, [4, 5]]]), [1, 2, 3, 4, 5]);
assert('empty array', flattenArray([]), []);
assert('already flat', flattenArray([1, 2, 3]), [1, 2, 3]);
assert('single deep', flattenArray([[[42]]]), [42]);

import { flattenObject } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

assert(
  'nested two levels',
  flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } }),
  { a: 1, 'b.c': 2, 'b.d.e': 3 }
);

assert('already flat', flattenObject({ x: 1, y: 2 }), { x: 1, y: 2 });
assert('empty object', flattenObject({}), {});
assert('null value', flattenObject({ a: null }), { a: null });
assert('array value not flattened', flattenObject({ a: [1, 2, 3] }), { a: [1, 2, 3] });
assert(
  'three levels',
  flattenObject({ a: { b: { c: { d: 42 } } } }),
  { 'a.b.c.d': 42 }
);

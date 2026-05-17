// Tests for flattenArray and flattenObject
// Run: npx ts-node questions/08-ds/flatten-nested/tests.ts

import { flattenArray, flattenObject } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

// --- flattenArray ---
assert(deepEqual(flattenArray([1, [2, [3, [4]], 5]]), [1, 2, 3, 4, 5]), 'flattenArray: deeply nested');
assert(deepEqual(flattenArray([1, 2, 3]), [1, 2, 3]), 'flattenArray: already flat');
assert(deepEqual(flattenArray([]), []), 'flattenArray: empty array');
assert(deepEqual(flattenArray([[[], []], []]), []), 'flattenArray: empty nested arrays disappear');
assert(deepEqual(flattenArray([1, 'two', true, null, [3]]), [1, 'two', true, null, 3]), 'flattenArray: mixed types');
assert(deepEqual(flattenArray([[1], [2, [3]]]), [1, 2, 3]), 'flattenArray: multiple top-level subarrays');

// --- flattenObject ---
assert(
  deepEqual(flattenObject({ a: { b: { c: 1 } }, d: 2 }), { 'a.b.c': 1, d: 2 }),
  'flattenObject: deep nesting with dot keys',
);
assert(
  deepEqual(flattenObject({}), {}),
  'flattenObject: empty object → empty object',
);
assert(
  deepEqual(flattenObject({ x: null }), { x: null }),
  'flattenObject: null value treated as leaf',
);
assert(
  deepEqual(flattenObject({ x: 0, y: false }), { x: 0, y: false }),
  'flattenObject: falsy non-null values appear in output',
);
assert(
  deepEqual(flattenObject({ arr: [1, 2], nested: { z: 3 } }), { arr: [1, 2], 'nested.z': 3 }),
  'flattenObject: arrays are leaf values, not recursed',
);
assert(
  deepEqual(flattenObject({ a: {} }), {}),
  'flattenObject: empty nested object produces no keys',
);
assert(
  deepEqual(flattenObject({ a: { b: 1 }, c: { d: { e: 2 } } }), { 'a.b': 1, 'c.d.e': 2 }),
  'flattenObject: multiple nested paths',
);

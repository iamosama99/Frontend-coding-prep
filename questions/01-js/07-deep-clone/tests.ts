import { deepClone } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

function assertNotSame(label: string, a: object, b: object) {
  const pass = a !== b;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log('  expected different references, got same');
}

const orig = { a: 1, b: { c: 2 }, d: [3, 4] };
const clone = deepClone(orig);

assert('cloned values are equal', clone, orig);
assertNotSame('top-level object is a new reference', clone, orig);
assertNotSame('nested object is a new reference', clone.b, orig.b);
assertNotSame('nested array is a new reference', clone.d, orig.d);

// Mutating clone does not affect original
clone.b.c = 99;
assert('original nested value unchanged after mutation', orig.b.c, 2);

assert('primitive passthrough', deepClone(42), 42);
assert('null passthrough', deepClone(null), null);
assert('empty object', deepClone({}), {});
assert('empty array', deepClone([]), []);

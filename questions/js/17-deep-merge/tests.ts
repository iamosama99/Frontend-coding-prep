import { deepMerge } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

assert(
  'nested object merge',
  deepMerge({ a: 1, b: { c: 2, d: 3 } }, { b: { c: 99 } }),
  { a: 1, b: { c: 99, d: 3 } }
);

assert(
  'arrays replaced not merged',
  deepMerge({ arr: [1, 2, 3] }, { arr: [4, 5] }),
  { arr: [4, 5] }
);

assert(
  'source adds new keys',
  deepMerge({ a: 1 }, { b: 2 } as any),
  { a: 1, b: 2 }
);

assert(
  'empty source returns target copy',
  deepMerge({ a: 1, b: 2 }, {}),
  { a: 1, b: 2 }
);

// Target not mutated
const t = { x: { y: 1 } };
deepMerge(t, { x: { y: 99 } });
assert('target not mutated', t.x.y, 1);

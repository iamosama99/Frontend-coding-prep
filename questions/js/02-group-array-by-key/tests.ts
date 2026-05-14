import { groupBy } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

const people = [
  { name: 'Alice', city: 'NY' },
  { name: 'Bob',   city: 'LA' },
  { name: 'Carol', city: 'NY' },
];

assert(
  'group by city',
  groupBy(people, 'city'),
  { NY: [{ name: 'Alice', city: 'NY' }, { name: 'Carol', city: 'NY' }], LA: [{ name: 'Bob', city: 'LA' }] }
);

assert('empty array', groupBy([], 'city'), {});

assert(
  'all same group',
  groupBy([{ x: 1, t: 'a' }, { x: 2, t: 'a' }], 't'),
  { a: [{ x: 1, t: 'a' }, { x: 2, t: 'a' }] }
);

assert(
  'all unique groups',
  groupBy([{ v: 1, k: 'x' }, { v: 2, k: 'y' }], 'k'),
  { x: [{ v: 1, k: 'x' }], y: [{ v: 2, k: 'y' }] }
);

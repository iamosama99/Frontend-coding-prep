import { intersection, difference } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify([...(actual as any[])].sort());
  const e = JSON.stringify([...(expected as any[])].sort());
  const pass = a === e;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${e}\n  got:      ${a}`);
}

assert('intersection basic', intersection([1,2,3,4], [2,4,6]), [2,4]);
assert('intersection empty a', intersection([], [1,2]), []);
assert('intersection empty b', intersection([1,2], []), []);
assert('intersection no overlap', intersection([1,3], [2,4]), []);

assert('difference basic', difference([1,2,3,4], [2,4,6]), [1,3]);
assert('difference empty a', difference([], [1,2]), []);
assert('difference empty b', difference([1,2], []), [1,2]);
assert('difference full overlap', difference([1,2], [1,2]), []);

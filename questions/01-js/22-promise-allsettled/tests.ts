import { promiseAllSettled } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

promiseAllSettled([
  Promise.resolve(1),
  Promise.reject('err'),
  Promise.resolve(3),
]).then(results => {
  assert('fulfilled entry', results[0], { status: 'fulfilled', value: 1 });
  assert('rejected entry', results[1], { status: 'rejected', reason: 'err' });
  assert('second fulfilled', results[2], { status: 'fulfilled', value: 3 });
});

// All reject — outer still resolves
let resolved = false;
promiseAllSettled([Promise.reject('a'), Promise.reject('b')])
  .then(() => { resolved = true; })
  .finally(() => assert('outer resolves even when all reject', resolved, true));

// Empty
promiseAllSettled([]).then(r => assert('empty array', r, []));

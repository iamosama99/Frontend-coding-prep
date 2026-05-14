import { promiseAny } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

// First fulfillment wins
promiseAny([Promise.reject('a'), Promise.resolve(2), Promise.resolve(3)])
  .then(v => assert('first fulfill wins', v, 2));

// All reject → AggregateError
promiseAny([Promise.reject('x'), Promise.reject('y')])
  .catch(e => {
    assert('rejects when all reject', e instanceof AggregateError || Array.isArray(e.errors), true);
  });

// Single resolve
promiseAny([Promise.resolve('only')])
  .then(v => assert('single resolve', v, 'only'));

// Empty array rejects
promiseAny([])
  .catch(e => assert('empty array rejects', e instanceof AggregateError || Array.isArray(e.errors), true));

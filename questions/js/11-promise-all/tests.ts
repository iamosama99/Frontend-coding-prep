import { promiseAll } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

// All resolve
promiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
  .then(v => assert('all resolve — values in order', v, [1, 2, 3]));

// Empty array
promiseAll([])
  .then(v => assert('empty array resolves with []', v, []));

// First rejection rejects the whole thing
promiseAll([Promise.resolve(1), Promise.reject(new Error('fail')), Promise.resolve(3)])
  .catch(e => assert('rejects on first failure', (e as Error).message, 'fail'));

// Order preserved even when faster promises resolve later
const slow = new Promise<number>(res => setTimeout(() => res(1), 50));
const fast = new Promise<number>(res => setTimeout(() => res(2), 10));
promiseAll([slow, fast])
  .then(v => assert('order matches input, not resolution speed', v, [1, 2]));

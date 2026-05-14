import { promiseRace } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

// Fastest resolve wins
const slow = new Promise<string>(res => setTimeout(() => res('slow'), 100));
const fast = new Promise<string>(res => setTimeout(() => res('fast'), 10));
promiseRace([slow, fast]).then(v => assert('fastest resolve wins', v, 'fast'));

// Fastest reject wins (even over a slower resolve)
const faster = new Promise<string>((_, rej) => setTimeout(() => rej(new Error('fail')), 5));
promiseRace([slow, faster]).catch(e => assert('fastest reject wins', (e as Error).message, 'fail'));

// Already-resolved wins
promiseRace([Promise.resolve('instant'), slow])
  .then(v => assert('already-resolved wins', v, 'instant'));

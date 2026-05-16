import { memoize } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

let calls = 0;
const add = memoize((a: number, b: number) => { calls++; return a + b; });

assert('first call computes result', add(1, 2), 3);
assert('second call returns cache', add(1, 2), 3);
assert('different args compute fresh', add(2, 3), 5);
assert('fn called only twice (not 3 times)', calls, 2);

// No-args
let noCalls = 0;
const noArg = memoize(() => { noCalls++; return 42; });
noArg(); noArg(); noArg();
assert('no-arg: fn called once', noCalls, 1);

// Argument order matters
let ordCalls = 0;
const ord = memoize((a: number, b: number) => { ordCalls++; return a - b; });
ord(1, 2);
ord(2, 1);
assert('different arg order = different cache keys', ordCalls, 2);

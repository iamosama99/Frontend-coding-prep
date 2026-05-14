import { once } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

let callCount = 0;
const fn = once((x: number) => { callCount++; return x * 2; });

assert('first call returns result', fn(5), 10);
assert('second call returns cached result', fn(99), 10);
assert('third call returns cached result', fn(0), 10);
assert('original fn called exactly once', callCount, 1);

// No-arg version
const noArg = once(() => 'hello');
assert('no-arg first call', noArg(), 'hello');
assert('no-arg second call', noArg(), 'hello');

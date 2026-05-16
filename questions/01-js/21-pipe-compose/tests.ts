import { pipe, compose } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

const add1   = (n: number) => n + 1;
const double = (n: number) => n * 2;
const square = (n: number) => n * n;

assert('pipe: left to right', pipe(add1, double)(3), 8);        // (3+1)*2 = 8
assert('pipe: three fns', pipe(add1, double, square)(3), 64);   // ((3+1)*2)^2 = 64
assert('pipe: single fn', pipe(add1)(5), 6);
assert('pipe: no fns (identity)', pipe<number>()(7), 7);

assert('compose: right to left', compose(double, add1)(3), 8);  // double(add1(3)) = double(4) = 8
assert('compose: three fns', compose(square, double, add1)(3), 64);
assert('compose: single fn', compose(add1)(5), 6);
assert('compose: no fns (identity)', compose<number>()(7), 7);

# Implement pipe / compose

## Problem

Write `pipe` and `compose` — functions that chain a series of unary functions together.

- `pipe(f, g, h)(x)` → `h(g(f(x)))` — left to right (f first)
- `compose(f, g, h)(x)` → `f(g(h(x)))` — right to left (h first)

## API

```ts
function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T
function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T
```

## Example

```ts
const add1   = (n: number) => n + 1;
const double = (n: number) => n * 2;
const square = (n: number) => n * n;

pipe(add1, double, square)(3);    // square(double(add1(3))) = square(double(4)) = square(8) = 64
compose(square, double, add1)(3); // square(double(add1(3))) = 64 — same result, different order
```

## Constraints

- Both implemented using `Array.prototype.reduce`
- `pipe` uses `reduce` (left to right); `compose` uses `reduceRight` (right to left)
- Handle the case where zero functions are passed — return an identity function

## Edge Cases

- No functions passed → returns `(x) => x` (identity)
- Single function passed → equivalent to calling that function directly
- Functions must receive the output of the previous function as input

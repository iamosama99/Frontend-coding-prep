# Implement Curry

## Problem

Write a `curry` function that transforms a function of multiple arguments into a series of single-argument functions. A curried function can be called with partial arguments and will keep returning functions until all required arguments are collected.

## API

```ts
function curry(fn: (...args: any[]) => any): (...args: any[]) => any
```

## Example

```ts
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3);   // 6
curriedAdd(1, 2)(3);   // 6 — multiple args per call is allowed
curriedAdd(1)(2, 3);   // 6
curriedAdd(1, 2, 3);   // 6 — all at once also works
```

## Constraints

- `fn.length` gives you the number of expected parameters — use this
- Once enough arguments have accumulated, call the original function
- Each partial application returns a new function (do not mutate the accumulated args)

## Edge Cases

- Function with 0 or 1 arguments → returns the function called with that argument immediately
- Extra arguments beyond `fn.length` are passed through
- Multiple calls to the same partial result with different args produce independent chains

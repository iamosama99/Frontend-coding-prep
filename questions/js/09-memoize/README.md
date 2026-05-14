# Memoize Function

## Problem

Write a `memoize` function that caches the results of a function call. If the function is called again with the same arguments, return the cached result without calling the function again.

## API

```ts
function memoize<T extends (...args: any[]) => any>(fn: T): T
```

## Example

```ts
let callCount = 0;
const expensiveAdd = memoize((a: number, b: number) => {
  callCount++;
  return a + b;
});

expensiveAdd(1, 2); // 3  — fn called (callCount = 1)
expensiveAdd(1, 2); // 3  — cached  (callCount = 1)
expensiveAdd(2, 3); // 5  — fn called (callCount = 2)
expensiveAdd(2, 3); // 5  — cached  (callCount = 2)
```

## Constraints

- Use `JSON.stringify(args)` as the cache key
- Cache using a `Map`
- The memoized function must have the same return type as the original

## Edge Cases

- No arguments → cache key is `"[]"` — still works
- `null` or `undefined` arguments → JSON.stringify handles these
- Different argument order → treated as different calls: `fn(1,2)` ≠ `fn(2,1)`
- Functions or circular objects as arguments → `JSON.stringify` will fail; don't handle this case

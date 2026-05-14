# once(fn) Utility

## Problem

Write a higher-order function `once` that wraps a function so it can only be called once. Subsequent calls return the result of the first call without invoking the original function again.

## API

```ts
function once<T extends (...args: any[]) => any>(fn: T): T
```

## Example

```ts
const init = once(() => {
  console.log('initialising...');
  return 42;
});

init(); // logs "initialising...", returns 42
init(); // returns 42 silently — fn NOT called again
init(); // returns 42 silently — fn NOT called again
```

```ts
const addOnce = once((a: number, b: number) => a + b);
addOnce(1, 2); // 3
addOnce(10, 20); // still 3 — original args used
```

## Constraints

- The wrapper must preserve the original function's argument types and return type
- After the first call, the original function reference should be released (set to null)

## Edge Cases

- Called with no arguments → still runs once, caches result
- Original function throws → the error propagates on the first call; subsequent calls return `undefined`
- Called multiple times rapidly → only the first invocation wins

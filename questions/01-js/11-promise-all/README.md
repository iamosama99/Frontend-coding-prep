# Promise.all from Scratch

## Problem

Implement `promiseAll` that mirrors the behaviour of `Promise.all`: resolves with an array of all fulfilled values (in input order), or rejects immediately when any promise rejects.

## API

```ts
function promiseAll<T>(promises: Promise<T>[]): Promise<T[]>
```

## Example

```ts
promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(values => console.log(values)); // [1, 2, 3]

promiseAll([
  Promise.resolve(1),
  Promise.reject(new Error('oops')),
  Promise.resolve(3),
]).catch(err => console.log(err.message)); // "oops"
```

## Constraints

- Results must be in the **same order** as the input array, regardless of resolution order
- Reject immediately on the first failure — do not wait for others
- An empty array input resolves with `[]`

## Edge Cases

- Empty array → resolves with `[]` immediately
- All reject → only the first rejection is propagated
- Promises that resolve at different speeds → result order matches input order, not resolution order
- Mixed already-resolved and pending promises in the same array

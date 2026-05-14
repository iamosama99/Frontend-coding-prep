# Promise.allSettled from Scratch

## Problem

Implement `promiseAllSettled` that mirrors `Promise.allSettled`: always resolves (never rejects) with an array of result descriptors — one per input promise — indicating whether each settled as fulfilled or rejected.

## API

```ts
type SettledResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: any }

function promiseAllSettled<T>(promises: Promise<T>[]): Promise<SettledResult<T>[]>
```

## Example

```ts
promiseAllSettled([
  Promise.resolve(1),
  Promise.reject(new Error('oops')),
  Promise.resolve(3),
]).then(results => console.log(results));
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected',  reason: Error('oops') },
//   { status: 'fulfilled', value: 3 },
// ]
```

## Constraints

- The outer promise **always resolves** — even if every input promise rejects
- Results are in the same order as the input array
- Empty array input resolves with `[]`

## Edge Cases

- All fulfill → all entries have `status: 'fulfilled'`
- All reject → all entries have `status: 'rejected'`, outer promise still resolves
- Empty array → resolves with `[]`
- Mix of fast and slow promises → order in result matches input order

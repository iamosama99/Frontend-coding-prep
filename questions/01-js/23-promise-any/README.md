# Implement Promise.any

## Problem

Implement `promiseAny` that mirrors `Promise.any`: resolves with the value of the **first** fulfilled promise. Rejects only if **all** promises reject, with an `AggregateError` containing all rejection reasons.

## API

```ts
function promiseAny<T>(promises: Promise<T>[]): Promise<T>
```

## Example

```ts
promiseAny([
  Promise.reject(new Error('a')),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(v => console.log(v)); // 2 — first one to fulfill

promiseAny([
  Promise.reject(new Error('a')),
  Promise.reject(new Error('b')),
]).catch(e => console.log(e.errors)); // [Error('a'), Error('b')]
```

## Constraints

- Resolves with the **first** fulfilled value (not necessarily the fastest to settle)
- Rejects with an `AggregateError` only when all promises reject
- If `AggregateError` is unavailable, throw a plain Error with `errors` array attached

## Edge Cases

- Empty array → rejects immediately with an AggregateError (no promises to fulfill)
- Single promise that fulfills → resolves with its value
- Single promise that rejects → rejects with AggregateError
- Mix of rejections and fulfillments → first fulfillment wins regardless of position

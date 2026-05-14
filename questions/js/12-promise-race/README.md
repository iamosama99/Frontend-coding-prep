# Promise.race from Scratch

## Problem

Implement `promiseRace` that mirrors `Promise.race`: the returned promise settles (resolves or rejects) as soon as the **first** input promise settles — in either direction.

## API

```ts
function promiseRace<T>(promises: Promise<T>[]): Promise<T>
```

## Example

```ts
const slow = new Promise(res => setTimeout(() => res('slow'), 100));
const fast = new Promise(res => setTimeout(() => res('fast'), 10));

promiseRace([slow, fast]).then(v => console.log(v)); // "fast"

const failing = new Promise((_, rej) => setTimeout(() => rej(new Error('boom')), 5));
promiseRace([slow, failing]).catch(e => console.log(e.message)); // "boom"
```

## Constraints

- Once the first promise settles, the outer promise settles and subsequent settlements are ignored
- A rejection from the first settler causes the outer promise to reject
- A resolution from the first settler causes the outer promise to resolve

## Edge Cases

- Empty array → the returned promise never settles (pending forever) — this matches native behaviour
- Multiple promises reject — only the first rejection propagates
- Already-resolved promise in the array → that promise wins (microtask queue, but still first)

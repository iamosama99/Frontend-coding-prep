# Group Array by Key

## Problem

Write a function that groups an array of objects by the value of a given key, returning an object where each key maps to an array of items that share that value.

## API

```ts
function groupBy<T extends Record<string, unknown>>(
  arr: T[],
  key: keyof T
): Record<string, T[]>
```

## Example

```ts
const people = [
  { name: 'Alice', city: 'NY' },
  { name: 'Bob',   city: 'LA' },
  { name: 'Carol', city: 'NY' },
];

groupBy(people, 'city');
// → { NY: [{ name: 'Alice', city: 'NY' }, { name: 'Carol', city: 'NY' }], LA: [{ name: 'Bob', city: 'LA' }] }

groupBy([1.1, 1.2, 2.1, 2.2], Math.floor);
// Not required — key is always a property name here
```

## Constraints

- Use `Array.prototype.reduce`
- Do not mutate the input array
- Key values will always be strings or numbers (safe to use as object keys)

## Edge Cases

- Empty array → `{}`
- All items share the same key value → one group with all items
- Each item has a unique key value → one group per item
- Key value is a number → coerced to string as an object key

# Deep Merge Objects

## Problem

Write a function that deep-merges two objects. Properties from the second object override the first at every level. Arrays are **replaced**, not merged.

## API

```ts
function deepMerge<T extends object>(target: T, source: Partial<T>): T
```

## Example

```ts
deepMerge(
  { a: 1, b: { c: 2, d: 3 } },
  { b: { c: 99 }, e: 4 }
);
// → { a: 1, b: { c: 99, d: 3 }, e: 4 }

deepMerge(
  { arr: [1, 2, 3] },
  { arr: [4, 5] }
);
// → { arr: [4, 5] } — arrays replaced, not merged
```

## Constraints

- Do not mutate the `target` object — return a new merged object
- Recurse into nested plain objects
- Arrays and primitives from `source` replace the corresponding value in `target` entirely

## Edge Cases

- Source key is `null` → replaces the target value with `null`
- Nested source object where target has a primitive → source value wins
- Nested target object where source has a primitive → source primitive replaces the whole object
- Empty source → returns a deep copy of target
- Empty target → returns a deep copy of source

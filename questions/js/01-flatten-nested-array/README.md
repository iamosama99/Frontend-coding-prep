# Flatten Nested Array

## Problem

Write a function that takes a deeply-nested array and returns a new flat array containing all values in order.

## API

```ts
function flattenArray(arr: NestedArray<number>): number[]
```

Where `NestedArray<T>` is defined as:

```ts
type NestedArray<T> = (T | NestedArray<T>)[]
```

## Example

```ts
flattenArray([1, [2, [3, [4]], 5]]);
// → [1, 2, 3, 4, 5]

flattenArray([[1, 2], [3, [4, 5]]]);
// → [1, 2, 3, 4, 5]

flattenArray([]);
// → []
```

## Constraints

- Do not use `Array.prototype.flat` or `Array.prototype.flatMap` (implement the logic yourself)
- Input values are numbers only
- Input may be arbitrarily deeply nested

## Edge Cases

- Empty array → `[]`
- Already flat array → same values in a new array
- Single element wrapped in many layers → `[[[42]]]` → `[42]`
- Mixed depth: some elements flat, some deeply nested

# Array Intersection & Difference

## Problem

Write two functions:
- `intersection`: returns elements that appear in **both** arrays
- `difference`: returns elements that appear in the **first** array but **not** the second

## API

```ts
function intersection<T>(a: T[], b: T[]): T[]
function difference<T>(a: T[], b: T[]): T[]
```

## Example

```ts
intersection([1, 2, 3, 4], [2, 4, 6]);  // [2, 4]
difference([1, 2, 3, 4], [2, 4, 6]);    // [1, 3]
```

## Constraints

- Use a `Set` for O(1) lookup — do not use nested loops
- No duplicates in the output (each value appears at most once)
- Do not mutate the input arrays

## Edge Cases

- Either array empty → `intersection` returns `[]`; `difference` returns a copy of `a` (or `[]` if `a` is empty)
- No overlap → `intersection` returns `[]`
- Full overlap → `difference` returns `[]`
- Arrays with duplicate values in the input — output should still be deduplicated

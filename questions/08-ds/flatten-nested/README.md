# Flatten Nested Object / Array

## Problem

Implement two functions:

1. **`flattenArray`** — recursively flatten a nested array to any depth
2. **`flattenObject`** — recursively flatten a nested object into dot-key notation

## TypeScript Signatures

```ts
// Flatten array to any depth
function flattenArray(arr: unknown[]): unknown[]

// Flatten object — nested keys become dot-separated paths
// e.g. { a: { b: 1 } } → { 'a.b': 1 }
function flattenObject(
  obj: Record<string, unknown>,
  prefix?: string,
): Record<string, unknown>
```

## Usage Example

```ts
flattenArray([1, [2, [3, [4]], 5]])          // → [1, 2, 3, 4, 5]
flattenArray([1, 2, 3])                       // → [1, 2, 3] (already flat)
flattenArray([])                              // → []
flattenArray([[[[]]]])                        // → []

flattenObject({ a: { b: { c: 1 } }, d: 2 })
// → { 'a.b.c': 1, d: 2 }

flattenObject({ x: [1, 2], y: { z: 3 } })
// → { 'x': [1, 2], 'y.z': 3 }
// Note: arrays are treated as leaf values, not recursed into
```

## Constraints

### flattenArray
- Do NOT use `Array.prototype.flat` — implement recursively or with a stack
- Works with arrays nested to any depth
- Preserves element order

### flattenObject
- Only plain objects (not arrays) are recursed — arrays are leaf values
- Keys are joined with `'.'`
- Optional `prefix` parameter is used for internal recursion (default `''`)
- Empty objects `{}` as values produce no keys in the output

## Edge Cases

- `flattenArray`: mixed types (numbers, strings, booleans, null) — preserve as-is
- `flattenArray`: empty nested arrays — disappear in the output
- `flattenObject`: empty input object — return `{}`
- `flattenObject`: value is `null` — treat as a leaf, key appears with value `null`
- `flattenObject`: value is `0` or `false` — falsy but not empty, must appear in output
- `flattenObject`: key collision unlikely given valid input, but dots in original keys would cause ambiguity — assume input keys contain no dots

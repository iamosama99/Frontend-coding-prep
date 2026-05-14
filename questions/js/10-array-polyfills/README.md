# Array.map / filter / reduce Polyfills

## Problem

Implement `map`, `filter`, and `reduce` as standalone functions that replicate the behaviour of their `Array.prototype` equivalents — without using the built-in methods.

## API

```ts
function myMap<T, U>(arr: T[], callback: (item: T, index: number, array: T[]) => U): U[]

function myFilter<T>(arr: T[], callback: (item: T, index: number, array: T[]) => boolean): T[]

function myReduce<T, U>(arr: T[], callback: (acc: U, item: T, index: number, array: T[]) => U, initialValue: U): U
```

## Example

```ts
myMap([1, 2, 3], x => x * 2);        // [2, 4, 6]
myFilter([1, 2, 3, 4], x => x % 2 === 0); // [2, 4]
myReduce([1, 2, 3, 4], (acc, x) => acc + x, 0); // 10
```

## Constraints

- Do not use `Array.prototype.map`, `filter`, or `reduce` in your implementation
- The callback receives `(item, index, array)` — all three arguments
- `myReduce` always takes an `initialValue` (no need to handle the no-initialValue case)

## Edge Cases

- Empty array → `myMap` and `myFilter` return `[]`, `myReduce` returns `initialValue`
- Callback returns `false` for all items → `myFilter` returns `[]`
- `myMap` callback transforms to a different type (e.g., number → string)
- Index passed to callback is correct (0-based)

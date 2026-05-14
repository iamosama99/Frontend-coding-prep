# Deep Clone Object

## Problem

Write a function that creates a deep clone of a value — returning a new value with no shared references to the original.

## API

```ts
function deepClone<T>(value: T): T
```

## Example

```ts
const original = { a: 1, b: { c: 2 }, d: [3, 4] };
const clone = deepClone(original);

clone.b.c = 99;
console.log(original.b.c); // 2 — not affected

clone.d.push(5);
console.log(original.d); // [3, 4] — not affected
```

## Constraints

- Handle: plain objects, arrays, primitives (number, string, boolean, null, undefined)
- You may use `structuredClone` if available, but also implement the recursive fallback
- Do not handle: functions, Dates, Maps, Sets, circular references (unless you want the bonus challenge)

## Edge Cases

- Primitive value (string, number) → return as-is
- `null` → return `null`
- Empty object `{}` → return `{}`
- Empty array `[]` → return `[]`
- Nested arrays inside objects, and objects inside arrays
- Mutating the clone must not affect the original at any depth

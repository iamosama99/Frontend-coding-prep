# Flatten Nested Object (Dot Keys)

## Problem

Write a function that flattens a deeply-nested object into a single-level object where nested keys are joined with dots.

## API

```ts
function flattenObject(obj: Record<string, any>, prefix?: string): Record<string, any>
```

## Example

```ts
flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } });
// → { 'a': 1, 'b.c': 2, 'b.d.e': 3 }

flattenObject({ x: { y: { z: 42 } } });
// → { 'x.y.z': 42 }
```

## Constraints

- Recurse into nested plain objects only
- Arrays are treated as leaf values — do not recurse into them
- `null` values are treated as leaf values
- Do not include the prefix separator for top-level keys

## Edge Cases

- Empty object → `{}`
- Already flat object → same key-value pairs
- Value is `null` → `{ 'key': null }`
- Value is an array → `{ 'key': [1,2,3] }` — not flattened further
- Three or more levels of nesting

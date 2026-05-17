# Group By + Frequency Map

## Problem

Implement two utility functions:

1. **`groupBy`** — group an array of objects by the value of a key
2. **`frequencyMap`** — count occurrences of each element and return top-K

## TypeScript Signatures

```ts
// Group array elements by the return value of the key function
function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]>

// Count occurrences of each element (or key-projected value).
// Returns all entries sorted by count descending.
// If topK is provided, return only the top K entries.
function frequencyMap<T>(
  arr: T[],
  key?: (item: T) => string,
  topK?: number,
): Array<{ value: string; count: number }>
```

## Usage Example

```ts
const people = [
  { name: 'Alice', dept: 'eng' },
  { name: 'Bob',   dept: 'eng' },
  { name: 'Carol', dept: 'hr'  },
];

groupBy(people, p => p.dept)
// → { eng: [{ name: 'Alice', … }, { name: 'Bob', … }], hr: [{ name: 'Carol', … }] }

groupBy([1.1, 1.2, 2.3, 2.4], n => Math.floor(n).toString())
// → { '1': [1.1, 1.2], '2': [2.3, 2.4] }

frequencyMap(['a', 'b', 'a', 'c', 'b', 'a'])
// → [{ value: 'a', count: 3 }, { value: 'b', count: 2 }, { value: 'c', count: 1 }]

frequencyMap(['a', 'b', 'a', 'c', 'b', 'a'], undefined, 2)
// → [{ value: 'a', count: 3 }, { value: 'b', count: 2 }]

frequencyMap(people, p => p.dept)
// → [{ value: 'eng', count: 2 }, { value: 'hr', count: 1 }]
```

## Constraints

- `groupBy`: preserve original element order within each group
- `frequencyMap`: when two values have the same count, preserve insertion order (stable sort)
- `frequencyMap`: if `key` is omitted, call `String(item)` on each element
- Neither function mutates the input array

## Edge Cases

- Empty array — both functions return empty result (`{}` and `[]`)
- All elements in the same group — one key with all items
- `topK` larger than the number of unique values — return all entries
- `topK = 0` — return `[]`
- Key function returns the same string for all items — one bucket with count = arr.length

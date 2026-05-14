# chunk(array, size)

## Problem

Write a function that splits an array into chunks of a given size. The last chunk may be smaller if the array doesn't divide evenly.

## API

```ts
function chunk<T>(arr: T[], size: number): T[][]
```

## Example

```ts
chunk([1, 2, 3, 4, 5], 2);
// → [[1, 2], [3, 4], [5]]

chunk([1, 2, 3], 3);
// → [[1, 2, 3]]

chunk([1, 2, 3, 4], 1);
// → [[1], [2], [3], [4]]
```

## Constraints

- Do not mutate the input array
- `size` will always be a positive integer
- Return a new array of arrays

## Edge Cases

- Empty array → `[]`
- `size` larger than array length → one chunk containing all elements
- `size` equal to 1 → each element in its own chunk
- Array length exactly divisible by size → all chunks same size

# LRU Cache Class

## Problem

Implement a Least Recently Used (LRU) cache with a fixed capacity. When the cache is full and a new key is inserted, evict the **least recently used** entry.

## API

```ts
class LRUCache {
  constructor(capacity: number)
  get(key: number): number        // returns -1 if not found
  put(key: number, value: number): void
}
```

## Example

```ts
const cache = new LRUCache(2);

cache.put(1, 1);   // cache: {1=1}
cache.put(2, 2);   // cache: {1=1, 2=2}
cache.get(1);      // 1  — also marks key 1 as most recently used
cache.put(3, 3);   // evicts key 2 (LRU), cache: {1=1, 3=3}
cache.get(2);      // -1 — evicted
cache.get(3);      // 3
```

## Constraints

- `get` and `put` must both be **O(1)** time complexity
- `capacity` will always be a positive integer
- Keys and values are integers

## Edge Cases

- `get` on a missing key → `-1`
- `put` an existing key → update its value and mark it as most recently used
- `put` when cache is full → evict the LRU entry before inserting
- `capacity` of 1 → every `put` after the first evicts the previous entry
- Accessing a key via `get` makes it most recently used (protected from eviction)

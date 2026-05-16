# Big-O Cheatsheet

## Data Structure Operations

| Structure | Operation | Average | Worst | Notes |
|-----------|-----------|---------|-------|-------|
| Array | push / pop | O(1) | O(1) | Amortized for dynamic arrays |
| Array | shift / unshift | O(n) | O(n) | Shifts all elements |
| Array | indexOf / find | O(n) | O(n) | Linear scan |
| Array | splice(i, 1) | O(n) | O(n) | Shifts elements after index |
| Array | slice | O(k) | O(k) | k = number of elements copied |
| Array | sort | O(n log n) | O(n log n) | V8 uses Timsort |
| Object | get / set / delete | O(1) | O(n) | Hash collision worst case |
| Object | hasOwnProperty | O(1) | — | |
| Object | Object.keys/values | O(n) | O(n) | Must enumerate all |
| Map | get / set / has / delete | O(1) | O(n) | Same as Object, preserves order |
| Map | iteration | O(n) | O(n) | |
| Set | add / has / delete | O(1) | O(n) | |
| Set | iteration | O(n) | O(n) | |

## Space Complexity

| Structure | Space |
|-----------|-------|
| Array of n items | O(n) |
| Map / Set of n items | O(n) |
| Call stack depth d | O(d) |
| Recursive DFS on tree of n nodes | O(h) — h = height |
| BFS on graph of n nodes | O(n) — queue |

---

## Common Interview Patterns

| Pattern | Time | Space | When to use |
|---------|------|-------|-------------|
| Two-pointer | O(n) | O(1) | Sorted array, find pair with target sum |
| Sliding window | O(n) | O(k) | Contiguous subarray, max/min in window |
| Hash map lookup | O(n) | O(n) | "Have we seen this before?" — two-sum, frequency |
| BFS on graph/tree | O(V+E) | O(V) | Shortest path, level-order traversal |
| DFS on graph/tree | O(V+E) | O(h) | All paths, detect cycle, topological sort |
| Binary search | O(log n) | O(1) | Sorted array, search by condition |
| Merge sort / Timsort | O(n log n) | O(n) | Stable sort with guaranteed time |
| DP (1D table) | O(n) | O(n) | Fibonacci, coin change, longest incr. subseq. |
| DP (2D table) | O(n²) | O(n²) | LCS, edit distance, grid paths |
| Trie insert/search | O(L) | O(L) | L = word length; prefix search, autocomplete |

---

## Sorting Algorithm Reference

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| Bubble sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Merge sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |
| Radix sort | O(nk) | O(nk) | O(nk) | O(n+k) | Yes |

`Array.prototype.sort` in V8 uses Timsort — O(n log n) average, O(n) for nearly-sorted data.

---

## Frontend-Specific Patterns

| Task | Naive | Optimized |
|------|-------|-----------|
| Find item in list | O(n) linear scan | O(1) with Map/Set lookup |
| Deduplicate array | O(n²) nested loop | O(n) with `new Set(arr)` |
| Group items by key | O(n²) nested loop | O(n) with `reduce` to Map |
| Flatten nested array | O(n) per level | O(n) single pass with stack |
| Deep clone | O(n) with recursion | O(n) with `structuredClone` |
| DOM traversal | O(n) BFS/DFS | O(n) — unavoidable |
| Debounce/throttle | O(1) per event | O(1) — timer overhead only |

---

## When to Care vs When to Skip

- **Skip micro-optimization** for < 1000 items — user won't notice. Readability wins.
- **Care** when: rendering 10k+ list items, processing large files, 60fps animation loops.
- **Virtualization** (windowing) turns O(n) DOM nodes into O(visible rows) — critical for large lists.
- **Web Workers** move O(n) work off the main thread — doesn't change Big-O, but unblocks UI.

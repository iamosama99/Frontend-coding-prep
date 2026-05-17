# Sliding Window (Max, Sum)

## Problem

Implement two sliding-window problems:

1. **`maxSlidingWindow`** — for each position of a window of size `k`, return the maximum value. Use a monotonic deque for O(n) time.
2. **`minSubarrayLen`** — find the minimum length of a contiguous subarray whose sum ≥ `target`. Use the expand/shrink two-pointer approach for O(n) time.

## TypeScript Signatures

```ts
// Return an array of the maximum value in each window of size k.
// Result length = nums.length - k + 1
function maxSlidingWindow(nums: number[], k: number): number[]

// Return the minimum length of a subarray with sum >= target.
// Return 0 if no such subarray exists.
function minSubarrayLen(target: number, nums: number[]): number
```

## Usage Example

```ts
maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)
// → [3,3,5,5,6,7]

maxSlidingWindow([1], 1)
// → [1]

maxSlidingWindow([1,2,3,4,5], 5)
// → [5]

minSubarrayLen(7, [2,3,1,2,4,3])
// → 2  (subarray [4,3])

minSubarrayLen(4, [1,4,4])
// → 1  (subarray [4])

minSubarrayLen(11, [1,1,1,1,1,1,1,1])
// → 0  (no subarray sums to 11)
```

## Constraints

### maxSlidingWindow
- Use a monotonic deque (double-ended queue) storing **indices**, not values
- The deque stores indices of elements in the window in decreasing order of value
- When sliding: pop indices that are out of the current window from the front; pop indices from the back whose values are ≤ the new element (they can never be the max)
- Result has `n - k + 1` elements

### minSubarrayLen
- Use two pointers: `left` and `right` both start at 0
- Expand `right` to grow the window; when `sum >= target`, record the length and shrink from `left`
- O(n) — each pointer moves at most n steps

## Edge Cases

- `maxSlidingWindow`: `k === nums.length` — single window covering all elements, return `[max]`
- `maxSlidingWindow`: `k === 1` — every element is its own window, return a copy of nums
- `maxSlidingWindow`: all negative numbers — still find the largest negative
- `minSubarrayLen`: single element ≥ target — return 1
- `minSubarrayLen`: all elements smaller than target — return 0
- `minSubarrayLen`: target is 0 — return 1 (any single-element window satisfies sum ≥ 0)
- `minSubarrayLen`: empty array — return 0

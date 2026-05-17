# Two Sum / Three Sum

## Problem

**Two Sum:** Given an array of integers and a target, return the indices of the two numbers that add up to the target. Assume exactly one solution exists, no element may be used twice.

**Three Sum:** Given an array of integers, return all unique triplets that sum to zero.

## TypeScript Signatures

```ts
// Two Sum — O(n) hash map approach
function twoSum(nums: number[], target: number): [number, number]

// Three Sum — O(n²) sorted + two-pointer approach
function threeSum(nums: number[]): [number, number, number][]
```

## Usage Example

```ts
twoSum([2, 7, 11, 15], 9)   // → [0, 1]
twoSum([3, 2, 4], 6)        // → [1, 2]
twoSum([3, 3], 6)           // → [0, 1]

threeSum([-1, 0, 1, 2, -1, -4])  // → [[-1,-1,2],[-1,0,1]]
threeSum([0, 0, 0])              // → [[0,0,0]]
threeSum([1, 2, -2, -1])         // → []
```

## Constraints

### Two Sum
- Exactly one solution exists — you don't need to handle zero or multiple solutions
- Return the earlier index first

### Three Sum
- The solution set must not contain duplicate triplets
- The order within each triplet does not matter (but sort numerically for consistency)
- Return the triplets in any order

## Edge Cases

- `twoSum`: element used twice (e.g. `[3, 3]` with target 6) — indices must differ
- `twoSum`: negative numbers and target
- `threeSum`: all zeros `[0,0,0,0]` — return exactly one `[0,0,0]`
- `threeSum`: array shorter than 3 elements — return `[]`
- `threeSum`: all positive numbers — no valid triplets, return `[]`
- `threeSum`: duplicate values after sorting — skip them to avoid duplicate triplets

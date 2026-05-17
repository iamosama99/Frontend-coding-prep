// TODO 1: implement twoSum using a Map for O(n) time.
//   For each num at index i, check if (target - num) is already in the map.
//   If yes, return [map.get(complement)!, i].
//   Otherwise, map.set(num, i) and continue.

export function twoSum(_nums: number[], _target: number): [number, number] {
  throw new Error('Not implemented');
}

// TODO 2: implement threeSum using sort + two pointers for O(n²) time.
//   a) Sort the array in ascending order.
//   b) For each index i (skip duplicates), set lo = i+1, hi = nums.length - 1.
//   c) While lo < hi:
//      - sum = nums[i] + nums[lo] + nums[hi]
//      - If sum === 0: push [nums[i], nums[lo], nums[hi]], advance lo and hi,
//        skip duplicates on both sides.
//      - If sum < 0: lo++
//      - If sum > 0: hi--
//   d) Early exit: if nums[i] > 0, break (sorted array, no triplet can sum to 0).

export function threeSum(_nums: number[]): [number, number, number][] {
  throw new Error('Not implemented');
}

// TODO 1: implement maxSlidingWindow using a monotonic deque.
//   The deque holds indices. For each index i:
//   a) Remove indices from the FRONT that are out of the current window (i - k).
//   b) Remove indices from the BACK while nums[deque.back] <= nums[i]
//      (the element at the back can never be the max since nums[i] is larger and newer).
//   c) Push i to the back of the deque.
//   d) Once i >= k - 1 (window is full), record nums[deque.front] as the max.

export function maxSlidingWindow(_nums: number[], _k: number): number[] {
  throw new Error('Not implemented');
}

// TODO 2: implement minSubarrayLen using the shrinking-window two-pointer approach.
//   left = 0, sum = 0, minLen = Infinity.
//   For each right from 0 to n-1:
//     sum += nums[right]
//     While sum >= target:
//       minLen = Math.min(minLen, right - left + 1)
//       sum -= nums[left]
//       left++
//   Return minLen === Infinity ? 0 : minLen.

export function minSubarrayLen(_target: number, _nums: number[]): number {
  throw new Error('Not implemented');
}

// Tests for maxSlidingWindow and minSubarrayLen
// Run: npx ts-node questions/08-ds/sliding-window/tests.ts

import { maxSlidingWindow, minSubarrayLen } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

// --- maxSlidingWindow ---
assert(deepEqual(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3), [3,3,5,5,6,7]), 'maxSlidingWindow: classic example k=3');
assert(deepEqual(maxSlidingWindow([1], 1), [1]), 'maxSlidingWindow: single element k=1');
assert(deepEqual(maxSlidingWindow([1,2,3,4,5], 5), [5]), 'maxSlidingWindow: k = array length');
assert(deepEqual(maxSlidingWindow([1,2,3,4,5], 1), [1,2,3,4,5]), 'maxSlidingWindow: k=1 returns copy');
assert(deepEqual(maxSlidingWindow([-3,-1,-2], 2), [-1,-1]), 'maxSlidingWindow: all negatives');
assert(deepEqual(maxSlidingWindow([9,11], 2), [11]), 'maxSlidingWindow: two elements k=2');

// --- minSubarrayLen ---
assert(minSubarrayLen(7, [2,3,1,2,4,3]) === 2, 'minSubarrayLen: [2,3,1,2,4,3] target=7 → 2');
assert(minSubarrayLen(4, [1,4,4]) === 1, 'minSubarrayLen: single element meets target → 1');
assert(minSubarrayLen(11, [1,1,1,1,1,1,1,1]) === 0, 'minSubarrayLen: impossible → 0');
assert(minSubarrayLen(15, [1,2,3,4,5]) === 5, 'minSubarrayLen: needs full array');
assert(minSubarrayLen(0, [1,2,3]) === 1, 'minSubarrayLen: target=0 → 1');
assert(minSubarrayLen(100, []) === 0, 'minSubarrayLen: empty array → 0');
assert(minSubarrayLen(3, [3]) === 1, 'minSubarrayLen: exact match single element → 1');

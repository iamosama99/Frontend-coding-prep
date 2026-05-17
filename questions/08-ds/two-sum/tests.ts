// Tests for twoSum and threeSum
// Run: npx ts-node questions/08-ds/two-sum/tests.ts

import { twoSum, threeSum } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function arraysEqual(a: unknown[], b: unknown[]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

// --- twoSum ---
const ts1 = twoSum([2, 7, 11, 15], 9);
assert(arraysEqual(ts1, [0, 1]), 'twoSum: basic case [2,7,11,15] target=9');

const ts2 = twoSum([3, 2, 4], 6);
assert(arraysEqual(ts2, [1, 2]), 'twoSum: [3,2,4] target=6');

const ts3 = twoSum([3, 3], 6);
assert(arraysEqual(ts3, [0, 1]), 'twoSum: [3,3] target=6 (same value, different indices)');

const ts4 = twoSum([-3, 4, 3, 90], 0);
assert(arraysEqual(ts4, [0, 2]), 'twoSum: negative numbers [-3,4,3,90] target=0');

// --- threeSum ---
const r1 = threeSum([-1, 0, 1, 2, -1, -4]);
r1.forEach(t => t.sort((a, b) => a - b));
r1.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
assert(
  arraysEqual(r1, [[-1, -1, 2], [-1, 0, 1]]),
  'threeSum: [-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]',
);

const r2 = threeSum([0, 0, 0]);
assert(arraysEqual(r2, [[0, 0, 0]]), 'threeSum: [0,0,0] → [[0,0,0]]');

const r3 = threeSum([0, 0, 0, 0]);
assert(arraysEqual(r3, [[0, 0, 0]]), 'threeSum: [0,0,0,0] → exactly one triplet');

const r4 = threeSum([1, 2, -2, -1]);
assert(arraysEqual(r4, []), 'threeSum: no valid triplets → []');

const r5 = threeSum([1, 2]);
assert(arraysEqual(r5, []), 'threeSum: fewer than 3 elements → []');

const r6 = threeSum([1, 1, 1]);
assert(arraysEqual(r6, []), 'threeSum: all positive, no zero sum → []');

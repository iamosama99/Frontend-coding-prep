// Tests for groupBy and frequencyMap
// Run: npx ts-node questions/08-ds/group-frequency-map/tests.ts

import { groupBy, frequencyMap } from './index';

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

// --- groupBy ---
const people = [
  { name: 'Alice', dept: 'eng' },
  { name: 'Bob', dept: 'eng' },
  { name: 'Carol', dept: 'hr' },
];

const grouped = groupBy(people, (p) => p.dept);
assert(Array.isArray(grouped['eng']) && grouped['eng'].length === 2, 'groupBy: eng group has 2 items');
assert(Array.isArray(grouped['hr']) && grouped['hr'].length === 1, 'groupBy: hr group has 1 item');
assert(grouped['eng'][0].name === 'Alice', 'groupBy: preserves order within group');

assert(deepEqual(groupBy([], () => 'x'), {}), 'groupBy: empty array → {}');

const numGrouped = groupBy([1.1, 1.2, 2.3, 2.4], (n) => Math.floor(n).toString());
assert(deepEqual(numGrouped['1'], [1.1, 1.2]), 'groupBy: number floor grouping');
assert(deepEqual(numGrouped['2'], [2.3, 2.4]), 'groupBy: number floor grouping second group');

// --- frequencyMap ---
const fm1 = frequencyMap(['a', 'b', 'a', 'c', 'b', 'a']);
assert(fm1[0].value === 'a' && fm1[0].count === 3, 'frequencyMap: top element is most frequent');
assert(fm1[1].value === 'b' && fm1[1].count === 2, 'frequencyMap: second element correct');
assert(fm1[2].value === 'c' && fm1[2].count === 1, 'frequencyMap: third element correct');

const fm2 = frequencyMap(['a', 'b', 'a', 'c', 'b', 'a'], undefined, 2);
assert(fm2.length === 2, 'frequencyMap: topK=2 returns 2 elements');
assert(fm2[0].value === 'a', 'frequencyMap: topK=2 first is a');

const fm3 = frequencyMap(people, (p) => p.dept);
assert(fm3[0].value === 'eng' && fm3[0].count === 2, 'frequencyMap: key function on objects');
assert(fm3[1].value === 'hr' && fm3[1].count === 1, 'frequencyMap: key function second entry');

assert(deepEqual(frequencyMap([]), []), 'frequencyMap: empty array → []');

const fm5 = frequencyMap(['x', 'x', 'x'], undefined, 5);
assert(fm5.length === 1, 'frequencyMap: topK larger than unique count returns all');

const fm6 = frequencyMap(['a', 'b'], undefined, 0);
assert(fm6.length === 0, 'frequencyMap: topK=0 returns []');

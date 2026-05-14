import { myMap, myFilter, myReduce } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

// myMap
assert('map doubles', myMap([1, 2, 3], x => x * 2), [2, 4, 6]);
assert('map empty', myMap([], x => x), []);
assert('map with index', myMap(['a', 'b'], (v, i) => `${i}:${v}`), ['0:a', '1:b']);

// myFilter
assert('filter evens', myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]);
assert('filter empty', myFilter([], x => true), []);
assert('filter all false', myFilter([1, 3, 5], x => x % 2 === 0), []);

// myReduce
assert('reduce sum', myReduce([1, 2, 3, 4], (acc, x) => acc + x, 0), 10);
assert('reduce empty', myReduce([], (acc, x) => acc + x, 0), 0);
assert('reduce with index', myReduce([10, 20], (acc, x, i) => acc + i, 0), 1);

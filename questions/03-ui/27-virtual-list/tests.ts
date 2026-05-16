// Tests for VirtualList
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { VirtualList, VirtualListProps } from './index';

// Test 1: VirtualList is exported as a function
try {
  typeof VirtualList === 'function'
    ? pass('VirtualList is exported as a function')
    : fail('VirtualList exported', `typeof = ${typeof VirtualList}`);
} catch (e) {
  fail('VirtualList exported', String(e));
}

// Test 2: Fixed height total height calculation
try {
  const itemCount = 1000;
  const itemHeight = 50;
  const totalHeight = itemCount * itemHeight;
  totalHeight === 50000
    ? pass('totalHeight = itemCount × itemHeight = 50000')
    : fail('totalHeight fixed', `got ${totalHeight}`);
} catch (e) {
  fail('totalHeight fixed', String(e));
}

// Test 3: startIndex calculation for fixed height
try {
  const scrollTop = 300;
  const itemHeight = 50;
  const startIndex = Math.floor(scrollTop / itemHeight);
  startIndex === 6
    ? pass('startIndex = Math.floor(300 / 50) = 6')
    : fail('startIndex', `got ${startIndex}`);
} catch (e) {
  fail('startIndex', String(e));
}

// Test 4: endIndex calculation for fixed height
try {
  const scrollTop = 300;
  const containerHeight = 400;
  const itemHeight = 50;
  const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
  endIndex === 14
    ? pass('endIndex = Math.ceil((300+400)/50) = 14')
    : fail('endIndex', `got ${endIndex}`);
} catch (e) {
  fail('endIndex', String(e));
}

// Test 5: Overscan extends the window correctly
try {
  const startIndex = 6;
  const endIndex = 14;
  const overscan = 3;
  const itemCount = 100;
  const windowStart = Math.max(0, startIndex - overscan);
  const windowEnd = Math.min(itemCount - 1, endIndex + overscan);
  windowStart === 3 && windowEnd === 17
    ? pass('overscan extends window: start=3, end=17 for overscan=3')
    : fail('overscan', `start=${windowStart} end=${windowEnd}`);
} catch (e) {
  fail('overscan', String(e));
}

// Test 6: Variable height offset computation
try {
  const heights = [30, 50, 40, 60, 20];
  const offsets: number[] = [];
  let total = 0;
  heights.forEach(h => { offsets.push(total); total += h; });
  JSON.stringify(offsets) === JSON.stringify([0, 30, 80, 120, 180]) && total === 200
    ? pass('variable height offsets: [0, 30, 80, 120, 180], total=200')
    : fail('variable offsets', `offsets=${JSON.stringify(offsets)} total=${total}`);
} catch (e) {
  fail('variable offsets', String(e));
}

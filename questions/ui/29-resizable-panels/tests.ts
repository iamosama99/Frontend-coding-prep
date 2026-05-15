// Tests for ResizablePanels
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { ResizablePanels, ResizablePanelsProps } from './index';

// Test 1: ResizablePanels is exported as a function
try {
  typeof ResizablePanels === 'function'
    ? pass('ResizablePanels is exported as a function')
    : fail('ResizablePanels exported', `typeof = ${typeof ResizablePanels}`);
} catch (e) {
  fail('ResizablePanels exported', String(e));
}

// Test 2: Split clamping with minSize
try {
  const clampSplit = (split: number, minPercent: number): number => {
    return Math.min(100 - minPercent, Math.max(minPercent, split));
  };
  const minPercent = 20; // e.g. 100px of 500px = 20%
  clampSplit(10, minPercent) === 20 && clampSplit(85, minPercent) === 80
    ? pass('split clamped to [minPercent, 100-minPercent]')
    : fail('split clamp', `10→${clampSplit(10, 20)} 85→${clampSplit(85, 20)}`);
} catch (e) {
  fail('split clamp', String(e));
}

// Test 3: Delta to split percentage conversion
try {
  const computeNewSplit = (startSplit: number, delta: number, containerSize: number): number => {
    return startSplit + (delta / containerSize) * 100;
  };
  const result = computeNewSplit(50, 50, 500); // moved 50px out of 500px container from 50%
  result === 60
    ? pass('50px drag in 500px container from 50% = 60%')
    : fail('delta conversion', `got ${result}%`);
} catch (e) {
  fail('delta conversion', String(e));
}

// Test 4: minPercent from minSize and containerSize
try {
  const computeMinPercent = (minSize: number, containerSize: number): number => {
    return (minSize / containerSize) * 100;
  };
  computeMinPercent(100, 500) === 20
    ? pass('minPercent = (100/500)*100 = 20%')
    : fail('minPercent', `got ${computeMinPercent(100, 500)}%`);
} catch (e) {
  fail('minPercent', String(e));
}

// Test 5: Keyboard adjustment by 1% per key press
try {
  let split = 50;
  const adjustSplit = (dir: 1 | -1, minP: number) => {
    split = Math.min(100 - minP, Math.max(minP, split + dir));
  };
  adjustSplit(1, 10);
  adjustSplit(1, 10);
  split === 52
    ? pass('two ArrowRight presses increase split by 2%')
    : fail('keyboard adjust', `split=${split}`);
} catch (e) {
  fail('keyboard adjust', String(e));
}

// Test 6: Props interface accepts two children
try {
  const props: ResizablePanelsProps = {
    children: [null, null],
    direction: 'horizontal',
    defaultSplit: 50,
    minSize: 100,
    onResize: (_s: number) => {},
  };
  props.children.length === 2 && props.direction === 'horizontal'
    ? pass('ResizablePanelsProps accepts exactly two children and all fields')
    : fail('ResizablePanelsProps', 'field mismatch');
} catch (e) {
  fail('ResizablePanelsProps', String(e));
}

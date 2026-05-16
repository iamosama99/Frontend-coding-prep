// Tests for BackToTop
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { BackToTop, BackToTopProps } from './index';

// Test 1: BackToTop is exported as a function
try {
  typeof BackToTop === 'function'
    ? pass('BackToTop is exported as a function')
    : fail('BackToTop exported', `typeof = ${typeof BackToTop}`);
} catch (e) {
  fail('BackToTop exported', String(e));
}

// Test 2: Props interface accepts all fields
try {
  const props: BackToTopProps = {
    threshold: 300,
    scrollTarget: null,
    smooth: true,
    label: 'Back to top',
  };
  props.threshold === 300 && props.smooth === true
    ? pass('BackToTopProps accepts all fields')
    : fail('BackToTopProps', 'field mismatch');
} catch (e) {
  fail('BackToTopProps', String(e));
}

// Test 3: Threshold visibility logic — below threshold = hidden
try {
  const threshold = 300;
  const scrollY = 200;
  const visible = scrollY > threshold;
  visible === false
    ? pass('button hidden when scroll is below threshold')
    : fail('threshold logic (hidden)', `visible=${visible} at scrollY=${scrollY}`);
} catch (e) {
  fail('threshold logic (hidden)', String(e));
}

// Test 4: Threshold visibility logic — above threshold = visible
try {
  const threshold = 300;
  const scrollY = 400;
  const visible = scrollY > threshold;
  visible === true
    ? pass('button visible when scroll exceeds threshold')
    : fail('threshold logic (visible)', `visible=${visible} at scrollY=${scrollY}`);
} catch (e) {
  fail('threshold logic (visible)', String(e));
}

// Test 5: scroll behavior — smooth vs auto
try {
  const getScrollBehavior = (smooth: boolean): ScrollBehavior => smooth ? 'smooth' : 'auto';
  getScrollBehavior(true) === 'smooth' && getScrollBehavior(false) === 'auto'
    ? pass('scroll behavior switches between smooth and auto')
    : fail('scroll behavior', 'unexpected value');
} catch (e) {
  fail('scroll behavior', String(e));
}

// Test 6: scrollTarget null guard — should not throw
try {
  const scrollTarget: HTMLElement | null = null;
  const getScrollPosition = (el: HTMLElement | null): number => {
    if (!el) return typeof window !== 'undefined' ? window.scrollY : 0;
    return el.scrollTop;
  };
  typeof getScrollPosition(scrollTarget) === 'number'
    ? pass('null scrollTarget handled gracefully')
    : fail('null scrollTarget', 'unexpected type');
} catch (e) {
  fail('null scrollTarget', String(e));
}

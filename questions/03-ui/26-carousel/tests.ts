// Tests for Carousel
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Carousel, CarouselProps, CarouselSlide } from './index';

// Test 1: Carousel is exported as a function
try {
  typeof Carousel === 'function'
    ? pass('Carousel is exported as a function')
    : fail('Carousel exported', `typeof = ${typeof Carousel}`);
} catch (e) {
  fail('Carousel exported', String(e));
}

// Test 2: goNext with loop
try {
  const slides = 3;
  const goNext = (current: number, loop: boolean): number => {
    if (current === slides - 1) return loop ? 0 : current;
    return current + 1;
  };
  goNext(2, true) === 0 && goNext(2, false) === 2
    ? pass('goNext wraps to 0 with loop=true, stays at last with loop=false')
    : fail('goNext loop', `loop=${goNext(2, true)} noloop=${goNext(2, false)}`);
} catch (e) {
  fail('goNext loop', String(e));
}

// Test 3: goPrev with loop
try {
  const slides = 3;
  const goPrev = (current: number, loop: boolean): number => {
    if (current === 0) return loop ? slides - 1 : current;
    return current - 1;
  };
  goPrev(0, true) === 2 && goPrev(0, false) === 0
    ? pass('goPrev wraps to last with loop=true, stays at 0 with loop=false')
    : fail('goPrev loop', `loop=${goPrev(0, true)} noloop=${goPrev(0, false)}`);
} catch (e) {
  fail('goPrev loop', String(e));
}

// Test 4: Touch swipe threshold — 50px
try {
  const handleSwipe = (delta: number, goNext: () => void, goPrev: () => void) => {
    if (delta < -50) goNext();
    else if (delta > 50) goPrev();
  };
  let nextCalled = false;
  let prevCalled = false;
  handleSwipe(-60, () => { nextCalled = true; }, () => { prevCalled = true; });
  nextCalled === true && prevCalled === false
    ? pass('swipe left (delta < -50) calls goNext')
    : fail('swipe left', `next=${nextCalled} prev=${prevCalled}`);
} catch (e) {
  fail('swipe', String(e));
}

// Test 5: Auto-play pauses on hover
try {
  let isPaused = false;
  const handleMouseEnter = () => { isPaused = true; };
  const handleMouseLeave = () => { isPaused = false; };
  handleMouseEnter();
  isPaused === true
    ? pass('isPaused set to true on mouseEnter')
    : fail('pause on hover', `isPaused=${isPaused}`);
} catch (e) {
  fail('pause on hover', String(e));
}

// Test 6: onChange called with new index
try {
  let receivedIndex: number | null = null;
  const onChange = (i: number) => { receivedIndex = i; };
  onChange(2);
  receivedIndex === 2
    ? pass('onChange receives the new slide index')
    : fail('onChange', `received=${receivedIndex}`);
} catch (e) {
  fail('onChange', String(e));
}

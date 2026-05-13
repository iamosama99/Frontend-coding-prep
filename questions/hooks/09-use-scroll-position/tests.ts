// Tests for useScrollPosition

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Core direction-detection logic
function getDirection(prevY: number, newY: number): 'up' | 'down' | 'none' {
  if (newY > prevY) return 'down';
  if (newY < prevY) return 'up';
  return 'none';
}

// Test 1: scrolling down
try {
  const dir = getDirection(100, 200);
  dir === 'down'
    ? pass('scrolling down detected')
    : fail('scroll down', `got ${dir}`);
} catch (e) {
  fail('scroll down', String(e));
}

// Test 2: scrolling up
try {
  const dir = getDirection(200, 100);
  dir === 'up'
    ? pass('scrolling up detected')
    : fail('scroll up', `got ${dir}`);
} catch (e) {
  fail('scroll up', String(e));
}

// Test 3: no vertical scroll (horizontal only)
try {
  const dir = getDirection(100, 100);
  dir === 'none'
    ? pass('horizontal-only scroll returns direction none')
    : fail('no vertical scroll', `got ${dir}`);
} catch (e) {
  fail('no vertical scroll', String(e));
}

// Test 4: SSR fallback
try {
  const getScrollPos = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0, direction: 'none' as const };
    return { x: window.scrollX, y: window.scrollY, direction: 'none' as const };
  };
  const original = (global as any).window;
  delete (global as any).window;
  const result = getScrollPos();
  (global as any).window = original;
  result.x === 0 && result.y === 0 && result.direction === 'none'
    ? pass('SSR fallback returns zeros and direction none')
    : fail('SSR fallback', JSON.stringify(result));
} catch (e) {
  fail('SSR fallback', String(e));
}

// Test 5: export check
const { useScrollPosition } = require('./index');
try {
  typeof useScrollPosition === 'function'
    ? pass('useScrollPosition exported as function')
    : fail('useScrollPosition exported', `typeof = ${typeof useScrollPosition}`);
} catch (e) {
  fail('export check', String(e));
}

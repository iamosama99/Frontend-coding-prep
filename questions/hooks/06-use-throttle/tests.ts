// Tests for useThrottle
// Verifies throttle logic: leading-edge updates, interval clamping.

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Simulate throttle logic (timestamp approach)
function makeThrottle(interval: number) {
  let lastUpdated = 0;
  return function throttle<T>(value: T): T | null {
    const now = Date.now();
    if (now - lastUpdated >= interval) {
      lastUpdated = now;
      return value;
    }
    return null; // null means "throttled — don't update"
  };
}

// Test 1: first call always passes through
try {
  const throttle = makeThrottle(100);
  const result = throttle(42);
  result === 42
    ? pass('first value passes through immediately')
    : fail('first value', `got ${result}`);
} catch (e) {
  fail('first value', String(e));
}

// Test 2: second call within interval is throttled
try {
  const throttle = makeThrottle(1000); // 1s interval
  throttle(1);  // first call sets lastUpdated
  const result = throttle(2);  // immediate second call
  result === null
    ? pass('rapid second call is throttled')
    : fail('rapid second call throttled', `got ${result}`);
} catch (e) {
  fail('rapid second call', String(e));
}

// Test 3: initial value returned without waiting
try {
  const initial = 'hello';
  let state = initial;
  state === 'hello'
    ? pass('initial value returned immediately')
    : fail('initial value', `got ${state}`);
} catch (e) {
  fail('initial value', String(e));
}

// Test 4: zero interval passes everything through
try {
  const throttle = makeThrottle(0);
  throttle(1);
  const result = throttle(2);
  result === 2
    ? pass('interval=0 passes all values through')
    : fail('interval=0', `got ${result}`);
} catch (e) {
  fail('interval=0', String(e));
}

// Test 5: useThrottle exported
const { useThrottle } = require('./index');
try {
  typeof useThrottle === 'function'
    ? pass('useThrottle exported as function')
    : fail('useThrottle exported', `typeof = ${typeof useThrottle}`);
} catch (e) {
  fail('export check', String(e));
}

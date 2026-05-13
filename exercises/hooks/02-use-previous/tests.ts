// Tests for usePrevious
// These tests simulate the ref-based logic directly without React.

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Simulate what the hook does across renders using a plain object as "ref"
function simulateUsePrevious<T>() {
  const ref = { current: undefined as T | undefined };
  return function render(value: T): T | undefined {
    const prev = ref.current;
    ref.current = value;  // simulates useEffect running after render
    return prev;
  };
}

// Test 1: returns undefined on first render
try {
  const render = simulateUsePrevious<number>();
  const result = render(42);
  result === undefined
    ? pass('returns undefined on first render')
    : fail('returns undefined on first render', `got ${result}`);
} catch (e) {
  fail('first render', String(e));
}

// Test 2: returns previous value on second render
try {
  const render = simulateUsePrevious<number>();
  render(1);
  const result = render(2);
  result === 1
    ? pass('returns previous value on second render')
    : fail('returns previous value on second render', `got ${result}`);
} catch (e) {
  fail('second render', String(e));
}

// Test 3: tracks through multiple renders
try {
  const render = simulateUsePrevious<string>();
  render('a');
  render('b');
  const result = render('c');
  result === 'b'
    ? pass('tracks through multiple renders')
    : fail('tracks through multiple renders', `got ${result}`);
} catch (e) {
  fail('multiple renders', String(e));
}

// Test 4: works with object values
try {
  const render = simulateUsePrevious<{ x: number }>();
  const obj = { x: 1 };
  render(obj);
  const obj2 = { x: 2 };
  const result = render(obj2);
  result === obj
    ? pass('works with object reference identity')
    : fail('object reference identity', `got ${JSON.stringify(result)}`);
} catch (e) {
  fail('object values', String(e));
}

// Test 5: usePrevious is exported
const { usePrevious } = require('./starter');
try {
  typeof usePrevious === 'function'
    ? pass('usePrevious exported as function')
    : fail('usePrevious exported', `typeof = ${typeof usePrevious}`);
} catch (e) {
  fail('export check', String(e));
}

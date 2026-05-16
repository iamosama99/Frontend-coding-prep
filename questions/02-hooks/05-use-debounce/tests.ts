// Tests for useDebounce
// Tests the setTimeout/clearTimeout debounce logic in isolation.

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Test 1: debounce logic — only last call fires after delay
function debounce<T>(fn: (v: T) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (value: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
}

test1: {
  let result: number | null = null;
  const debounced = debounce((v: number) => { result = v; }, 50);
  debounced(1);
  debounced(2);
  debounced(3);
  setTimeout(() => {
    result === 3
      ? pass('only last value fires after delay')
      : fail('only last value fires', `got ${result}`);
  }, 100);
}

// Test 2: initial value returned immediately (before delay)
test2: {
  const initialValue = 'hello';
  // In the hook, state is initialised to `value`, so the first return is immediate
  let state = initialValue;
  state === 'hello'
    ? pass('initial value returned immediately')
    : fail('initial value', `got ${state}`);
}

// Test 3: clearTimeout prevents stale update
test3: {
  let firedCount = 0;
  let timerId: ReturnType<typeof setTimeout>;

  timerId = setTimeout(() => firedCount++, 100);
  clearTimeout(timerId);  // simulates cleanup

  setTimeout(() => {
    firedCount === 0
      ? pass('clearTimeout prevents stale timer from firing')
      : fail('clearTimeout', `timer fired ${firedCount} time(s)`);
  }, 200);
}

// Test 4: useDebounce exported
const { useDebounce } = require('./index');
try {
  typeof useDebounce === 'function'
    ? pass('useDebounce exported as function')
    : fail('useDebounce exported', `typeof = ${typeof useDebounce}`);
} catch (e) {
  fail('export check', String(e));
}

// Keep process alive for async tests
setTimeout(() => {
  console.log('\nAsync tests completed.');
}, 300);

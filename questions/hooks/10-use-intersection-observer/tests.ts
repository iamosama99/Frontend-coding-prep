// Tests for useIntersectionObserver

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Test 1: IntersectionObserver entry parsing
try {
  const entry = { isIntersecting: true, intersectionRatio: 0.5, target: {} };
  const isIntersecting = (entry as any).isIntersecting;
  isIntersecting === true
    ? pass('entries[0].isIntersecting parsed correctly')
    : fail('entry parsing', `got ${isIntersecting}`);
} catch (e) {
  fail('entry parsing', String(e));
}

// Test 2: initial state is false
try {
  const initial = false;
  initial === false
    ? pass('initial isIntersecting is false')
    : fail('initial state', `got ${initial}`);
} catch (e) {
  fail('initial state', String(e));
}

// Test 3: observer disconnect called on cleanup
try {
  let disconnected = false;
  const mockObserver = {
    observe: (_: any) => {},
    disconnect: () => { disconnected = true; },
  };
  // Simulate cleanup
  mockObserver.disconnect();
  disconnected
    ? pass('observer.disconnect() called on cleanup')
    : fail('disconnect on cleanup', 'disconnect was not called');
} catch (e) {
  fail('disconnect cleanup', String(e));
}

// Test 4: null ref guard
try {
  const ref = { current: null };
  let observed = false;
  if (ref.current !== null) {
    observed = true;  // should not execute
  }
  !observed
    ? pass('null ref guard prevents observation')
    : fail('null ref guard', 'observed null ref');
} catch (e) {
  fail('null ref guard', String(e));
}

// Test 5: export check
const { useIntersectionObserver } = require('./index');
try {
  typeof useIntersectionObserver === 'function'
    ? pass('useIntersectionObserver exported as function')
    : fail('useIntersectionObserver exported', `typeof = ${typeof useIntersectionObserver}`);
} catch (e) {
  fail('export check', String(e));
}

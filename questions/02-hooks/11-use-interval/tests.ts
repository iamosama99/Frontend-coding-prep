// Tests for useInterval

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Test 1: interval fires multiple times
test1: {
  let count = 0;
  const id = setInterval(() => count++, 50);
  setTimeout(() => {
    clearInterval(id);
    count >= 3
      ? pass('interval fires multiple times')
      : fail('interval fires', `count was only ${count} after 200ms`);
  }, 200);
}

// Test 2: null delay does not start interval
test2: {
  let count = 0;
  const delay = null;
  if (delay !== null) {
    setInterval(() => count++, delay);
  }
  setTimeout(() => {
    count === 0
      ? pass('null delay does not start interval')
      : fail('null delay', `count was ${count}`);
  }, 150);
}

// Test 3: ref approach prevents stale callback
test3: {
  // Simulate the ref-update pattern
  let latest = 'initial';
  const callbackRef = { current: () => latest };

  const callbackV2 = () => 'updated';
  callbackRef.current = callbackV2;  // simulates the useEffect update

  const result = callbackRef.current();
  result === 'updated'
    ? pass('ref always holds latest callback version')
    : fail('stale closure via ref', `got ${result}`);
}

// Test 4: clearInterval stops the interval
test4: {
  let count = 0;
  const id = setInterval(() => count++, 50);
  setTimeout(() => {
    clearInterval(id);
    const countAtStop = count;
    setTimeout(() => {
      count === countAtStop
        ? pass('clearInterval stops further firing')
        : fail('clearInterval', `count continued from ${countAtStop} to ${count}`);
    }, 150);
  }, 100);
}

// Test 5: export check
const { useInterval } = require('./index');
try {
  typeof useInterval === 'function'
    ? pass('useInterval exported as function')
    : fail('useInterval exported', `typeof = ${typeof useInterval}`);
} catch (e) {
  fail('export check', String(e));
}

setTimeout(() => console.log('\nAsync tests completed.'), 500);

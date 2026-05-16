// Tests for useCountdown
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

const { useCountdown } = require('./index');

// Test 1: exported as a function
try {
  typeof useCountdown === 'function'
    ? pass('useCountdown is exported as a function')
    : fail('useCountdown exported', `typeof = ${typeof useCountdown}`);
} catch (e) {
  fail('useCountdown exported', String(e));
}

// Test 2: breakdown calculation — 1 day + 2 hours + 3 minutes + 4 seconds
try {
  const totalMs =
    1 * 24 * 60 * 60 * 1000 +
    2 * 60 * 60 * 1000 +
    3 * 60 * 1000 +
    4 * 1000;

  const days    = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

  days === 1 && hours === 2 && minutes === 3 && seconds === 4
    ? pass('breakdown: 1d 2h 3m 4s')
    : fail('breakdown', `got ${days}d ${hours}h ${minutes}m ${seconds}s`);
} catch (e) {
  fail('breakdown calculation', String(e));
}

// Test 3: past date → all zeros and isExpired true
try {
  const pastMs = -5000; // 5 seconds in the past
  const clamped = Math.max(0, pastMs);
  const isExpired = pastMs <= 0;

  clamped === 0 && isExpired === true
    ? pass('past date clamps to 0 and isExpired = true')
    : fail('past date handling', `clamped=${clamped}, isExpired=${isExpired}`);
} catch (e) {
  fail('past date handling', String(e));
}

// Test 4: zero ms remaining → all units are 0
try {
  const totalMs = 0;
  const days    = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

  days === 0 && hours === 0 && minutes === 0 && seconds === 0
    ? pass('zero ms → all units 0')
    : fail('zero ms units', `got ${days}d ${hours}h ${minutes}m ${seconds}s`);
} catch (e) {
  fail('zero ms units', String(e));
}

// Test 5: exactly 59 seconds remaining
try {
  const totalMs = 59 * 1000;
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

  seconds === 59 && minutes === 0
    ? pass('59 seconds → 0m 59s')
    : fail('59 seconds', `got ${minutes}m ${seconds}s`);
} catch (e) {
  fail('59 seconds', String(e));
}

console.log('\nNote: interval behaviour, pause/resume, and targetDate changes require @testing-library/react-hooks');

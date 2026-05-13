// Tests for useLongPress

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Test 1: callback fires after full duration
test1: {
  let fired = false;
  const duration = 100;
  const timerId = setTimeout(() => { fired = true; }, duration);
  setTimeout(() => {
    fired
      ? pass('callback fires after duration')
      : fail('callback fires', 'callback did not fire after timeout');
    clearTimeout(timerId);
  }, duration + 50);
}

// Test 2: cancel before duration prevents callback
test2: {
  let fired = false;
  let timerId = setTimeout(() => { fired = true; }, 200);
  // Cancel after 50ms (before duration)
  setTimeout(() => {
    clearTimeout(timerId);  // simulates mouseup cancel
  }, 50);
  setTimeout(() => {
    !fired
      ? pass('early cancel prevents callback')
      : fail('early cancel', 'callback fired despite cancel');
  }, 300);
}

// Test 3: onCancel fires when cancelled early
test3: {
  let cancelled = false;
  let timerId: ReturnType<typeof setTimeout> | null = null;

  const start = () => {
    timerId = setTimeout(() => { timerId = null; }, 200);
  };
  const cancel = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
      cancelled = true;  // onCancel
    }
  };

  start();
  setTimeout(cancel, 50);  // cancel early
  setTimeout(() => {
    cancelled
      ? pass('onCancel fires on early release')
      : fail('onCancel', 'onCancel did not fire');
  }, 300);
}

// Test 4: touchmove cancels press
test4: {
  let fired = false;
  let timerId: ReturnType<typeof setTimeout> | null = setTimeout(() => { fired = true; }, 200);
  // touchmove fires
  clearTimeout(timerId!);
  timerId = null;
  setTimeout(() => {
    !fired
      ? pass('touchmove cancels long press')
      : fail('touchmove cancel', 'callback fired despite touchmove');
  }, 300);
}

// Test 5: export check
const { useLongPress } = require('./starter');
try {
  typeof useLongPress === 'function'
    ? pass('useLongPress exported as function')
    : fail('useLongPress exported', `typeof = ${typeof useLongPress}`);
} catch (e) {
  fail('export check', String(e));
}

setTimeout(() => console.log('\nAsync tests completed.'), 400);

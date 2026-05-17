// Tests for Analytics SDK
// Run: npx ts-node questions/07-sys/analytics-sdk/tests.ts

import { Analytics } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: Analytics is a class
assert(typeof Analytics === 'function', 'Analytics is exported as a class');

// Test 2: instantiates without error
let analytics: Analytics;
try {
  analytics = new Analytics({ endpoint: 'https://example.com/events', flushInterval: 9999999 });
  assert(true, 'Analytics instantiates without error');
} catch {
  assert(false, 'Analytics instantiates without error');
  process.exit(1);
}

// Test 3: track() does not throw
try {
  analytics!.track('page_view', { path: '/home' });
  assert(true, 'track() does not throw');
} catch {
  assert(false, 'track() does not throw');
}

// Test 4: identify() does not throw
try {
  analytics!.identify('user-1', { plan: 'pro' });
  assert(true, 'identify() does not throw');
} catch {
  assert(false, 'identify() does not throw');
}

// Test 5: page() does not throw
try {
  analytics!.page({ referrer: 'https://google.com' });
  assert(true, 'page() does not throw');
} catch {
  assert(false, 'page() does not throw');
}

// Test 6: flush() returns a Promise
let flushResult: unknown;
try {
  flushResult = analytics!.flush();
  assert(flushResult instanceof Promise, 'flush() returns a Promise');
} catch {
  assert(false, 'flush() returns a Promise');
}

// Test 7: flush() with empty queue resolves immediately
const emptyAnalytics = new Analytics({ endpoint: 'https://example.com/events', flushInterval: 9999999 });
emptyAnalytics.flush()
  .then(() => assert(true, 'flush() with empty queue resolves without error'))
  .catch(() => assert(false, 'flush() with empty queue resolves without error'));

// Test 8: reset() does not throw
try {
  analytics!.reset();
  assert(true, 'reset() does not throw');
} catch {
  assert(false, 'reset() does not throw');
}

// Test 9: track() after reset() does not throw (SDK is reusable)
try {
  analytics!.track('after_reset');
  assert(true, 'track() after reset() does not throw');
} catch {
  assert(false, 'track() after reset() does not throw');
}

// Cleanup
emptyAnalytics.reset();

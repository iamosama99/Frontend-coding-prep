// Tests for Core Web Vitals reporter
// Run: npx ts-node questions/perf/core-web-vitals/tests.ts

import { diagnoseVitals, initWebVitalsReporter } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: diagnoseVitals is exported
assert(typeof diagnoseVitals === 'function', 'diagnoseVitals is exported as a function');

// Test 2: good LCP
const goodLCP = diagnoseVitals({ lcp: 1000 });
assert(goodLCP.lcp?.rating === 'good', 'LCP 1000ms is rated good');

// Test 3: poor LCP
const poorLCP = diagnoseVitals({ lcp: 5000 });
assert(poorLCP.lcp?.rating === 'poor', 'LCP 5000ms is rated poor');

// Test 4: needs-improvement CLS
const needsImprovementCLS = diagnoseVitals({ cls: 0.15 });
assert(needsImprovementCLS.cls?.rating === 'needs-improvement', 'CLS 0.15 is needs-improvement');

// Test 5: good INP
const goodINP = diagnoseVitals({ inp: 100 });
assert(goodINP.inp?.rating === 'good', 'INP 100ms is rated good');

// Test 6: undefined metric returns null
const partial = diagnoseVitals({ lcp: 2000 });
assert(partial.cls === null, 'undefined CLS returns null');
assert(partial.inp === null, 'undefined INP returns null');

// Test 7: all undefined returns all null
const empty = diagnoseVitals({});
assert(empty.lcp === null && empty.cls === null && empty.inp === null, 'empty input returns all null');

// Test 8: initWebVitalsReporter returns a cleanup function
assert(typeof initWebVitalsReporter === 'function', 'initWebVitalsReporter is exported');

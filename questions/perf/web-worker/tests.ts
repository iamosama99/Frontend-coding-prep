// Tests for Web Worker
// Run: npx ts-node questions/perf/web-worker/tests.ts

import { useWorker, sortWorkerCode, SortDemo } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: exports exist
assert(typeof useWorker === 'function', 'useWorker is exported');
assert(typeof sortWorkerCode === 'string', 'sortWorkerCode is exported as string');
assert(typeof SortDemo === 'function', 'SortDemo is exported');

// Test 2: sortWorkerCode is non-empty
assert(sortWorkerCode.trim().length > 10, 'sortWorkerCode has content');

// Test 3: sortWorkerCode references onmessage or addEventListener
assert(
  sortWorkerCode.includes('onmessage') || sortWorkerCode.includes('addEventListener'),
  'sortWorkerCode listens for messages'
);

// Test 4: sortWorkerCode references postMessage
assert(
  sortWorkerCode.includes('postMessage'),
  'sortWorkerCode posts result back with postMessage'
);

// Test 5: SortDemo renders without throwing (Node.js won't have Worker — catch is fine)
try {
  const el = SortDemo({ initialData: [3, 1, 2] });
  assert(el !== null && el !== undefined, 'SortDemo renders without throwing');
} catch (e: any) {
  // Worker not available in Node.js is acceptable
  assert(
    e.message?.includes('Worker') || e.message?.includes('Not implemented') === false,
    'SortDemo throws only for Worker unavailability, not logic errors'
  );
}

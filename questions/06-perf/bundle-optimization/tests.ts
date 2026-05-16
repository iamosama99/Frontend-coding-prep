// Tests for Bundle Size Optimization
// Run: npx ts-node questions/perf/bundle-optimization/tests.ts

import { getBundleStats } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const chunks = [
  {
    name: 'main',
    sizeBytes: 500_000,
    sizeParsed: 480_000,
    sizeGzip: 120_000,
    modules: [
      { name: 'lodash/lodash.js', size: 200_000 },
      { name: './src/App.tsx', size: 50_000 },
    ],
  },
  {
    name: 'vendor',
    sizeBytes: 300_000,
    sizeParsed: 290_000,
    sizeGzip: 80_000,
    modules: [
      { name: 'react-dom', size: 130_000 },
      { name: 'lodash/lodash.js', size: 200_000 }, // duplicate!
    ],
  },
];

// Test 1: totalSizeBytes sums correctly
const stats = getBundleStats(chunks);
assert(stats.totalSizeBytes === 800_000, 'totalSizeBytes is sum of all chunks');

// Test 2: totalGzipBytes sums correctly
assert(stats.totalGzipBytes === 200_000, 'totalGzipBytes is sum of all gzip sizes');

// Test 3: largestChunks sorted by gzip descending
assert(stats.largestChunks[0].name === 'main', 'largestChunks[0] is main (120KB gzip)');
assert(stats.largestChunks.length <= 5, 'largestChunks has at most 5 items');

// Test 4: duplicate modules detected
assert(stats.duplicateModules.includes('lodash/lodash.js'), 'detects lodash as duplicate');
assert(!stats.duplicateModules.includes('react-dom'), 'react-dom not flagged (appears once)');

// Test 5: empty chunks
const empty = getBundleStats([]);
assert(empty.totalSizeBytes === 0, 'empty chunks: totalSizeBytes is 0');
assert(empty.largestChunks.length === 0, 'empty chunks: largestChunks is empty');
assert(empty.suggestions.length === 0, 'empty chunks: suggestions is empty');

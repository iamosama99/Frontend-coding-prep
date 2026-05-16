// Tests for LazyImageGrid
// Run: npx ts-node questions/perf/image-lazy-loading/tests.ts

import React from 'react';
import { LazyImageGrid } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: component exists and is a function
assert(typeof LazyImageGrid === 'function', 'LazyImageGrid is exported as a function');

// Test 2: columns prop defaults to 3
const images = [
  { src: '/a.jpg', alt: 'A', width: 400, height: 300 },
  { src: '/b.jpg', alt: 'B', width: 400, height: 300 },
];

try {
  const el = LazyImageGrid({ images });
  assert(el !== null && el !== undefined, 'renders without explicit columns prop');
} catch {
  assert(false, 'renders without explicit columns prop');
}

// Test 3: negative columns clamped to 1
try {
  const el = LazyImageGrid({ images, columns: -1 });
  assert(el !== null && el !== undefined, 'handles columns <= 0 without throwing');
} catch {
  assert(false, 'handles columns <= 0 without throwing');
}

// Test 4: empty images array renders without error
try {
  const el = LazyImageGrid({ images: [], columns: 3 });
  assert(el !== null && el !== undefined, 'renders empty images array without error');
} catch {
  assert(false, 'renders empty images array without error');
}

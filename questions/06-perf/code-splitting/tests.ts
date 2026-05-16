// Tests for Code Splitting with React.lazy
// Run: npx ts-node questions/perf/code-splitting/tests.ts

import { AsyncBoundary, AppRouter, DashboardPage, SettingsPage, ReportsPage } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: lazy components are exported
assert(DashboardPage !== undefined, 'DashboardPage is exported');
assert(SettingsPage !== undefined, 'SettingsPage is exported');
assert(ReportsPage !== undefined, 'ReportsPage is exported');

// Test 2: lazy components have the React.lazy shape
assert(
  typeof (DashboardPage as any)._payload !== 'undefined' || typeof DashboardPage === 'object',
  'DashboardPage has React.lazy structure'
);

// Test 3: AsyncBoundary is a function
assert(typeof AsyncBoundary === 'function', 'AsyncBoundary is exported as a function');

// Test 4: AppRouter is a function
assert(typeof AppRouter === 'function', 'AppRouter is exported as a function');

// Test 5: AppRouter renders 404 for unknown paths without throwing
try {
  const el = AppRouter({ path: '/unknown' });
  assert(el !== null && el !== undefined, 'AppRouter handles unknown path without throwing');
} catch {
  assert(false, 'AppRouter handles unknown path without throwing');
}

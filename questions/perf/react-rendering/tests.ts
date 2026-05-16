// Tests for React Rendering Optimization
// Run: npx ts-node questions/perf/react-rendering/tests.ts

import { useRenderCount, DashboardRow, DataDashboard } from './index';
import React from 'react';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: exports exist
assert(typeof useRenderCount === 'function', 'useRenderCount is exported');
assert(typeof DashboardRow === 'function' || typeof DashboardRow === 'object', 'DashboardRow is exported');
assert(typeof DataDashboard === 'function', 'DataDashboard is exported');

// Test 2: DashboardRow is memoized (React.memo wraps it in an object with $$typeof)
const rowType = (DashboardRow as any).$$typeof?.toString() ?? '';
assert(
  rowType.includes('memo') || typeof (DashboardRow as any).compare !== 'undefined' || typeof DashboardRow === 'object',
  'DashboardRow appears to be wrapped in React.memo'
);

// Test 3: DataDashboard renders without throwing with empty data
try {
  const el = DataDashboard({ data: [], onRowClick: () => {} });
  assert(el !== null && el !== undefined, 'DataDashboard renders with empty data');
} catch {
  assert(false, 'DataDashboard renders with empty data');
}

// Test 4: DataDashboard renders with valid data
const mockData = [
  { id: '1', label: 'Revenue', value: 1000, trend: 'up' as const },
  { id: '2', label: 'Costs', value: 500, trend: 'down' as const },
];
try {
  const el = DataDashboard({ data: mockData, onRowClick: () => {} });
  assert(el !== null && el !== undefined, 'DataDashboard renders with data rows');
} catch {
  assert(false, 'DataDashboard renders with data rows');
}

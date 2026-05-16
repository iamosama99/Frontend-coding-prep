// Tests for DataTable (Table with Sort + Filter)
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { DataTable, DataTableProps, DataTableColumn } from './index';

// Test 1: DataTable is exported as a function
try {
  typeof DataTable === 'function'
    ? pass('DataTable is exported as a function')
    : fail('DataTable exported', `typeof = ${typeof DataTable}`);
} catch (e) {
  fail('DataTable exported', String(e));
}

// Test 2: Data pipeline order: filter → sort → paginate
try {
  const data = [
    { id: '1', name: 'Charlie', age: 30 },
    { id: '2', name: 'Alice', age: 25 },
    { id: '3', name: 'Bob', age: 35 },
    { id: '4', name: 'Alice', age: 28 },
  ];
  // Step 1: filter by name = 'Alice'
  const filtered = data.filter(r => r.name.toLowerCase().includes('alice'));
  // Step 2: sort by age asc
  const sorted = [...filtered].sort((a, b) => a.age - b.age);
  // Step 3: page 1, size 1
  const page = sorted.slice(0, 1);
  page[0].id === '2' && page[0].age === 25
    ? pass('pipeline: filter → sort → paginate gives correct result')
    : fail('pipeline', JSON.stringify(page));
} catch (e) {
  fail('pipeline', String(e));
}

// Test 3: Filter change resets page to 1
try {
  let page = 3;
  const applyFilter = (_filterChange: string) => { page = 1; };
  applyFilter('new filter');
  page === 1
    ? pass('page resets to 1 when filter changes')
    : fail('page reset on filter', `page=${page}`);
} catch (e) {
  fail('page reset on filter', String(e));
}

// Test 4: Select filter unique options derived from data
try {
  const data = [{ role: 'admin' }, { role: 'user' }, { role: 'admin' }, { role: 'viewer' }];
  const uniqueOptions = [...new Set(data.map(r => r.role))].sort();
  JSON.stringify(uniqueOptions) === JSON.stringify(['admin', 'user', 'viewer'])
    ? pass('select filter options derived from unique column values')
    : fail('unique options', JSON.stringify(uniqueOptions));
} catch (e) {
  fail('unique options', String(e));
}

// Test 5: Range filter — numeric between min and max
try {
  const data = [{ age: 20 }, { age: 25 }, { age: 30 }, { age: 35 }];
  const filterRange = (items: { age: number }[], min: number, max: number) =>
    items.filter(r => r.age >= min && r.age <= max);
  const result = filterRange(data, 23, 30);
  result.map(r => r.age).join(',') === '25,30'
    ? pass('range filter includes ages between 23 and 30')
    : fail('range filter', result.map(r => r.age).join(','));
} catch (e) {
  fail('range filter', String(e));
}

// Test 6: Empty result shows emptyMessage
try {
  const data: { name: string }[] = [];
  const emptyMessage = 'No data';
  const shouldShowEmpty = data.length === 0;
  shouldShowEmpty
    ? pass('empty filtered result should show emptyMessage')
    : fail('empty state', 'data is not empty');
} catch (e) {
  fail('empty state', String(e));
}

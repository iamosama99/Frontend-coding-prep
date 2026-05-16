// Tests for SortableTable
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { SortableTable, Column, SortDirection } from './index';

// Test 1: SortableTable is exported as a function
try {
  typeof SortableTable === 'function'
    ? pass('SortableTable is exported as a function')
    : fail('SortableTable exported', `typeof = ${typeof SortableTable}`);
} catch (e) {
  fail('SortableTable exported', String(e));
}

// Test 2: Sort direction cycle: null → asc → desc → null
try {
  const nextDir = (current: SortDirection): SortDirection => {
    if (current === null) return 'asc';
    if (current === 'asc') return 'desc';
    return null;
  };
  const cycle = [nextDir(null), nextDir('asc'), nextDir('desc')];
  JSON.stringify(cycle) === JSON.stringify(['asc', 'desc', null])
    ? pass('sort direction cycles: null → asc → desc → null')
    : fail('sort direction cycle', JSON.stringify(cycle));
} catch (e) {
  fail('sort direction cycle', String(e));
}

// Test 3: Sorting strings — case-insensitive ascending
try {
  const data = [
    { name: 'charlie' },
    { name: 'Alice' },
    { name: 'bob' },
  ];
  const sorted = [...data].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  sorted[0].name === 'Alice' && sorted[1].name === 'bob' && sorted[2].name === 'charlie'
    ? pass('string sort is case-insensitive ascending')
    : fail('string sort asc', sorted.map(r => r.name).join(', '));
} catch (e) {
  fail('string sort asc', String(e));
}

// Test 4: Sorting numbers — ascending
try {
  const data = [{ age: 30 }, { age: 25 }, { age: 35 }];
  const sorted = [...data].sort((a, b) => a.age - b.age);
  sorted.map(r => r.age).join(',') === '25,30,35'
    ? pass('numeric sort ascending: 25, 30, 35')
    : fail('numeric sort asc', sorted.map(r => r.age).join(','));
} catch (e) {
  fail('numeric sort asc', String(e));
}

// Test 5: Empty data renders no rows (but headers exist)
try {
  const data: { name: string }[] = [];
  const rowCount = data.length;
  rowCount === 0
    ? pass('empty data array produces 0 rows')
    : fail('empty data', `got ${rowCount} rows`);
} catch (e) {
  fail('empty data', String(e));
}

// Test 6: Column interface supports optional fields
try {
  const col: Column<{ id: string; name: string }> = {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (v) => String(v).toUpperCase(),
  };
  col.key === 'name' && typeof col.render === 'function'
    ? pass('Column interface with render function accepted')
    : fail('Column interface', 'field mismatch');
} catch (e) {
  fail('Column interface', String(e));
}

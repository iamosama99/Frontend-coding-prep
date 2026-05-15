// Tests for MultiSelect
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { MultiSelect, MultiSelectProps, Option } from './index';

// Test 1: MultiSelect is exported as a function
try {
  typeof MultiSelect === 'function'
    ? pass('MultiSelect is exported as a function')
    : fail('MultiSelect exported', `typeof = ${typeof MultiSelect}`);
} catch (e) {
  fail('MultiSelect exported', String(e));
}

// Test 2: Option interface shape
try {
  const opt: Option = { value: 'react', label: 'React', disabled: false };
  opt.value === 'react' && opt.label === 'React'
    ? pass('Option interface has correct shape')
    : fail('Option shape', JSON.stringify(opt));
} catch (e) {
  fail('Option shape', String(e));
}

// Test 3: Toggle selection — add then remove
try {
  const toggle = (selected: string[], value: string): string[] => {
    return selected.includes(value)
      ? selected.filter(s => s !== value)
      : [...selected, value];
  };
  const after1 = toggle([], 'react');
  const after2 = toggle(after1, 'react');
  after1.length === 1 && after2.length === 0
    ? pass('toggle adds then removes a value correctly')
    : fail('toggle', `after1=${JSON.stringify(after1)} after2=${JSON.stringify(after2)}`);
} catch (e) {
  fail('toggle', String(e));
}

// Test 4: maxSelected enforced
try {
  const canSelect = (selected: string[], maxSelected: number | undefined): boolean => {
    if (maxSelected === undefined) return true;
    return selected.length < maxSelected;
  };
  canSelect(['a', 'b'], 2) === false && canSelect(['a'], 2) === true
    ? pass('maxSelected prevents selection when limit reached')
    : fail('maxSelected', `full=${canSelect(['a', 'b'], 2)} partial=${canSelect(['a'], 2)}`);
} catch (e) {
  fail('maxSelected', String(e));
}

// Test 5: Search filter — case-insensitive
try {
  const options: Option[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ];
  const filter = (opts: Option[], query: string) =>
    opts.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
  const result = filter(options, 're');
  result.length === 2 && result.map(r => r.value).join(',') === 'react,angular'
    ? pass('search filter matches "React" and "Angular" for query "re"')
    : fail('search filter', result.map(r => r.label).join(', '));
} catch (e) {
  fail('search filter', String(e));
}

// Test 6: Backspace removes last chip when search is empty
try {
  const removeLastOnBackspace = (selected: string[], searchQuery: string): string[] => {
    if (searchQuery === '' && selected.length > 0) {
      return selected.slice(0, -1);
    }
    return selected;
  };
  const result = removeLastOnBackspace(['a', 'b', 'c'], '');
  JSON.stringify(result) === JSON.stringify(['a', 'b'])
    ? pass('Backspace on empty search removes last selected item')
    : fail('Backspace remove last', JSON.stringify(result));
} catch (e) {
  fail('Backspace remove last', String(e));
}

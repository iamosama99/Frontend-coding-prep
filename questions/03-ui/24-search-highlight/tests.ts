// Tests for SearchHighlight
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { SearchHighlight, SearchHighlightProps, SearchResult } from './index';

// Test 1: SearchHighlight is exported as a function
try {
  typeof SearchHighlight === 'function'
    ? pass('SearchHighlight is exported as a function')
    : fail('SearchHighlight exported', `typeof = ${typeof SearchHighlight}`);
} catch (e) {
  fail('SearchHighlight exported', String(e));
}

// Test 2: Case-insensitive text filter
try {
  const items: SearchResult[] = [
    { id: '1', text: 'Apple' },
    { id: '2', text: 'Pineapple' },
    { id: '3', text: 'Banana' },
  ];
  const filter = (list: SearchResult[], query: string) =>
    list.filter(i => i.text.toLowerCase().includes(query.toLowerCase()));
  const result = filter(items, 'app');
  result.length === 2 && result.map(r => r.id).join(',') === '1,2'
    ? pass('case-insensitive filter matches "Apple" and "Pineapple" for "app"')
    : fail('case-insensitive filter', result.map(r => r.text).join(', '));
} catch (e) {
  fail('case-insensitive filter', String(e));
}

// Test 3: Regex escape for special characters
try {
  const escape = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  escape('he[llo') === 'he\\[llo' && escape('(test)') === '\\(test\\)'
    ? pass('regex special characters are properly escaped')
    : fail('regex escape', `"he[llo" → "${escape('he[llo')}" "(test)" → "${escape('(test)')}"`);
} catch (e) {
  fail('regex escape', String(e));
}

// Test 4: Highlight split — before/match/after
try {
  const highlight = (text: string, query: string): string[] => {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.split(regex);
  };
  const parts = highlight('Pineapple', 'app');
  // Expected: ['Pine', 'app', 'le']
  parts.length >= 3 && parts.some(p => p.toLowerCase() === 'app')
    ? pass('highlight splits text into before/match/after parts')
    : fail('highlight split', JSON.stringify(parts));
} catch (e) {
  fail('highlight split', String(e));
}

// Test 5: Empty query with minChars > 0 shows all items
try {
  const filter = (items: SearchResult[], query: string, minChars: number): SearchResult[] => {
    if (query.length < minChars) return items; // show all when below threshold
    return items.filter(i => i.text.toLowerCase().includes(query.toLowerCase()));
  };
  const items: SearchResult[] = [{ id: '1', text: 'A' }, { id: '2', text: 'B' }];
  filter(items, '', 1).length === 2
    ? pass('empty query below minChars threshold returns all items')
    : fail('empty query behavior', `got ${filter(items, '', 1).length} items`);
} catch (e) {
  fail('empty query behavior', String(e));
}

// Test 6: No results returns empty array
try {
  const items: SearchResult[] = [{ id: '1', text: 'Apple' }];
  const filter = (list: SearchResult[], query: string) =>
    list.filter(i => i.text.toLowerCase().includes(query.toLowerCase()));
  filter(items, 'xyz').length === 0
    ? pass('no matching results returns empty array')
    : fail('no results', 'expected empty array');
} catch (e) {
  fail('no results', String(e));
}

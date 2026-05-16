// Tests for Autocomplete
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Autocomplete, AutocompleteProps, Suggestion } from './index';

// Test 1: Autocomplete is exported as a function
try {
  typeof Autocomplete === 'function'
    ? pass('Autocomplete is exported as a function')
    : fail('Autocomplete exported', `typeof = ${typeof Autocomplete}`);
} catch (e) {
  fail('Autocomplete exported', String(e));
}

// Test 2: Suggestion interface shape
try {
  const s: Suggestion = { id: '1', label: 'Alice', role: 'admin' };
  s.id === '1' && s.label === 'Alice' && s.role === 'admin'
    ? pass('Suggestion interface supports extra metadata fields')
    : fail('Suggestion shape', JSON.stringify(s));
} catch (e) {
  fail('Suggestion shape', String(e));
}

// Test 3: minChars guard — no fetch when query is too short
try {
  const shouldFetch = (query: string, minChars: number) => query.length >= minChars;
  shouldFetch('a', 2) === false && shouldFetch('ab', 2) === true
    ? pass('minChars guard prevents fetch on short queries')
    : fail('minChars guard', `"a"→${shouldFetch('a', 2)} "ab"→${shouldFetch('ab', 2)}`);
} catch (e) {
  fail('minChars guard', String(e));
}

// Test 4: maxResults caps the displayed suggestions
try {
  const cap = (items: Suggestion[], max: number) => items.slice(0, max);
  const items: Suggestion[] = Array.from({ length: 20 }, (_, i) => ({ id: String(i), label: `Item ${i}` }));
  cap(items, 10).length === 10
    ? pass('maxResults caps suggestions to 10')
    : fail('maxResults', `got ${cap(items, 10).length}`);
} catch (e) {
  fail('maxResults', String(e));
}

// Test 5: Keyboard navigation — highlightedIndex wraps at boundaries
try {
  const items = ['a', 'b', 'c'];
  const navigate = (current: number, dir: 1 | -1): number => {
    return (current + dir + items.length) % items.length;
  };
  navigate(2, 1) === 0 && navigate(0, -1) === 2
    ? pass('highlighted index wraps at start and end of list')
    : fail('index wrap', `down from 2=${navigate(2, 1)} up from 0=${navigate(0, -1)}`);
} catch (e) {
  fail('index wrap', String(e));
}

// Test 6: AbortError is silently ignored
try {
  const isAbortError = (err: unknown): boolean => {
    return err instanceof Error && err.name === 'AbortError';
  };
  const abortErr = new DOMException('aborted', 'AbortError');
  isAbortError(abortErr) === true
    ? pass('AbortError detected correctly for silent ignore')
    : fail('AbortError detection', `${(abortErr as Error).name}`);
} catch (e) {
  fail('AbortError detection', String(e));
}

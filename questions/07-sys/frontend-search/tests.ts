// Tests for SearchClient
// Run: npx ts-node questions/07-sys/frontend-search/tests.ts

import { SearchClient, SearchAdapter, SearchResult } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  assert(JSON.stringify(actual) === JSON.stringify(expected), message);
}

// Synchronous adapter for testing (debounce = 0)
function makeAdapter<T>(items: T[]): SearchAdapter<T> {
  let callCount = 0;
  return {
    async search(opts) {
      callCount++;
      return {
        items,
        total: items.length,
        page: opts.page ?? 1,
        pageSize: opts.pageSize ?? 20,
        facets: {},
        durationMs: 0,
        _callCount: callCount,
      } as any;
    },
  };
}

const client = new SearchClient(makeAdapter(['a', 'b', 'c']), 0);

// Test 1: SearchClient is a class
assert(typeof SearchClient === 'function', 'SearchClient is a class');

// Test 2: highlight — empty query returns full text as non-highlight
try {
  const segs = client.highlight('Hello World', '');
  assertEqual(segs, [{ text: 'Hello World', highlight: false }], 'highlight() with empty query returns full text unhighlighted');
} catch {
  assert(false, 'highlight() with empty query does not throw');
}

// Test 3: highlight — basic case-insensitive match
try {
  const segs = client.highlight('Blue Guitar Pick', 'guitar');
  assertEqual(segs, [
    { text: 'Blue ', highlight: false },
    { text: 'Guitar', highlight: true },
    { text: ' Pick', highlight: false },
  ], 'highlight() finds case-insensitive match and preserves original casing');
} catch {
  assert(false, 'highlight() basic match does not throw');
}

// Test 4: highlight — query longer than text
try {
  const segs = client.highlight('Hi', 'Hello World');
  assertEqual(segs, [{ text: 'Hi', highlight: false }], 'highlight() returns unhighlighted when query > text');
} catch {
  assert(false, 'highlight() query > text does not throw');
}

// Test 5: highlight — no match
try {
  const segs = client.highlight('Hello World', 'xyz');
  assertEqual(segs, [{ text: 'Hello World', highlight: false }], 'highlight() returns unhighlighted when no match');
} catch {
  assert(false, 'highlight() no match does not throw');
}

// Test 6: highlight — multiple matches
try {
  const segs = client.highlight('aXaXa', 'x');
  assertEqual(segs, [
    { text: 'a', highlight: false },
    { text: 'X', highlight: true },
    { text: 'a', highlight: false },
    { text: 'X', highlight: true },
    { text: 'a', highlight: false },
  ], 'highlight() finds multiple matches');
} catch {
  assert(false, 'highlight() multiple matches does not throw');
}

// Test 7: clearCache does not throw
try {
  client.clearCache();
  assert(true, 'clearCache() does not throw');
} catch {
  assert(false, 'clearCache() does not throw');
}

// Test 8: cancel does not throw
try {
  client.cancel();
  assert(true, 'cancel() does not throw');
} catch {
  assert(false, 'cancel() does not throw');
}

// Test 9: search resolves with adapter data (debounce=0 fires immediately in next tick)
client.search({ query: 'test' }).then((result) => {
  assert(Array.isArray(result.items), 'search() resolves with items array');
  assert(typeof result.total === 'number', 'search() result has total');
});

// Test 10: same search uses cache (adapter call count doesn't increase)
const cachingAdapter = makeAdapter<string>(['x']);
let adapterCallCount = 0;
const cachingAdapterWrapped: SearchAdapter<string> = {
  async search(opts) {
    adapterCallCount++;
    return cachingAdapter.search(opts);
  }
};
const cachedClient = new SearchClient(cachingAdapterWrapped, 0);
Promise.all([
  cachedClient.search({ query: 'same' }),
]).then(() => {
  return cachedClient.search({ query: 'same' });
}).then(() => {
  assert(adapterCallCount === 1, 'second search with same options uses cache (adapter called only once)');
});

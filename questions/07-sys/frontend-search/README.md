# Frontend Search System

## Problem

Build a `SearchClient` class that wraps a data source with debounced queries, result caching, faceted filtering, and substring highlighting.

## TypeScript Signature

```ts
interface SearchOptions {
  query: string;
  facets?: Record<string, string[]>;  // e.g. { category: ['books', 'music'] }
  sort?: { field: string; direction: 'asc' | 'desc' };
  page?: number;     // 1-based, default 1
  pageSize?: number; // default 20
}

interface FacetCount {
  value: string;
  count: number;
}

interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  facets: Record<string, FacetCount[]>;
  durationMs: number;
}

// Pluggable data source — implemented by the consumer
interface SearchAdapter<T> {
  search(options: SearchOptions): Promise<SearchResult<T>>;
}

class SearchClient<T> {
  constructor(adapter: SearchAdapter<T>, debounceMs?: number)

  // Debounced search — returns a promise that resolves after the debounce window.
  // Repeated calls within the window cancel the previous one.
  search(options: SearchOptions): Promise<SearchResult<T>>

  // Highlight occurrences of `query` inside `text`.
  // Returns an array of segments: { text: string; highlight: boolean }
  highlight(text: string, query: string): Array<{ text: string; highlight: boolean }>

  // Discard all cached results.
  clearCache(): void

  // Cancel the pending debounced call (if any) without triggering it.
  cancel(): void
}
```

## Usage Example

```ts
const adapter: SearchAdapter<Product> = {
  search: async (opts) => fetch(`/api/search?q=${opts.query}`).then(r => r.json()),
};

const client = new SearchClient(adapter, 300);

// Debounced — only the last call within 300ms actually fires
client.search({ query: 'guitar' });
client.search({ query: 'guitar picks' });
const results = await client.search({ query: 'guitar picks blue' });

// Highlight matching substrings
const segments = client.highlight('Blue Guitar Pick', 'guitar');
// → [{ text: 'Blue ', highlight: false }, { text: 'Guitar', highlight: true }, { text: ' Pick', highlight: false }]

// Faceted filter
const filtered = await client.search({
  query: 'guitar',
  facets: { category: ['accessories'] },
  sort: { field: 'price', direction: 'asc' },
});
```

## Constraints

- Cache key = `JSON.stringify(options)` — same options object shape hits the cache
- Cache is a simple `Map` with no TTL (cleared only by `clearCache()`)
- `highlight()` is case-insensitive but preserves the original casing of `text`
- `highlight()` must handle overlapping or empty queries gracefully
- Debounce: if `search()` is called before the previous debounce timer fires, cancel the old timer and start fresh
- The resolved promise always carries the result from the adapter (or cache), not an intermediate cancelled result

## Edge Cases

- `query` is an empty string — call the adapter (empty query is valid)
- Same options called twice — second call returns cached result without hitting the adapter
- `highlight()` called with empty `query` — return `[{ text, highlight: false }]`
- `highlight()` called with `query` longer than `text` — return `[{ text, highlight: false }]`
- Adapter throws — the promise should reject with the same error (don't swallow it)
- `cancel()` then `search()` — new search should work normally

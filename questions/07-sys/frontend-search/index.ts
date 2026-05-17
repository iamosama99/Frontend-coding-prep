export interface SearchOptions {
  query: string;
  facets?: Record<string, string[]>;
  sort?: { field: string; direction: 'asc' | 'desc' };
  page?: number;
  pageSize?: number;
}

export interface FacetCount {
  value: string;
  count: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  facets: Record<string, FacetCount[]>;
  durationMs: number;
}

export interface SearchAdapter<T> {
  search(options: SearchOptions): Promise<SearchResult<T>>;
}

// TODO 1: Store the adapter, debounce delay, a cache Map, and a timer ref.
//   Cache key = JSON.stringify(options).
//   Timer ref holds the setTimeout ID so you can clear it on repeated calls.

// TODO 2: implement search(options): Promise<SearchResult<T>>.
//   a) Compute the cache key. If the cache has it, resolve immediately.
//   b) Otherwise, cancel the existing timer.
//   c) Return a new Promise. Inside, set a new setTimeout for debounceMs.
//      When the timer fires: call adapter.search(options), store the result
//      in the cache, then resolve. If the adapter rejects, reject the promise.

// TODO 3: implement highlight(text, query).
//   a) If query is empty or longer than text, return [{ text, highlight: false }].
//   b) Walk through the text finding case-insensitive matches of query.
//   c) Build an array of { text: string, highlight: boolean } segments.
//      Non-matching spans are highlight: false; matched spans are highlight: true.
//      Preserve original casing from `text` for all segments.

// TODO 4: implement clearCache() — just call this.cache.clear().

// TODO 5: implement cancel() — clear the pending timer without resolving/rejecting.
//   The pending promise is effectively abandoned (it will never settle).
//   This is acceptable for a UI search debouncer where stale promises are ignored.

export class SearchClient<T> {
  constructor(_adapter: SearchAdapter<T>, _debounceMs?: number) {
    throw new Error('Not implemented');
  }

  search(_options: SearchOptions): Promise<SearchResult<T>> {
    throw new Error('Not implemented');
  }

  highlight(
    _text: string,
    _query: string,
  ): Array<{ text: string; highlight: boolean }> {
    throw new Error('Not implemented');
  }

  clearCache(): void {
    throw new Error('Not implemented');
  }

  cancel(): void {
    throw new Error('Not implemented');
  }
}

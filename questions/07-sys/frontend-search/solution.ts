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

export class SearchClient<T> {
  private adapter: SearchAdapter<T>;
  private debounceMs: number;
  private cache = new Map<string, SearchResult<T>>();
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(adapter: SearchAdapter<T>, debounceMs = 300) {
    this.adapter = adapter;
    this.debounceMs = debounceMs;
  }

  search(options: SearchOptions): Promise<SearchResult<T>> {
    const key = JSON.stringify(options);

    if (this.cache.has(key)) {
      return Promise.resolve(this.cache.get(key)!);
    }

    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    return new Promise<SearchResult<T>>((resolve, reject) => {
      this.timer = setTimeout(async () => {
        this.timer = null;
        try {
          const result = await this.adapter.search(options);
          this.cache.set(key, result);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }, this.debounceMs);
    });
  }

  highlight(text: string, query: string): Array<{ text: string; highlight: boolean }> {
    if (!query || query.length > text.length) {
      return [{ text, highlight: false }];
    }

    const lower = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const segments: Array<{ text: string; highlight: boolean }> = [];
    let pos = 0;

    while (pos < text.length) {
      const idx = lower.indexOf(lowerQuery, pos);
      if (idx === -1) {
        segments.push({ text: text.slice(pos), highlight: false });
        break;
      }
      if (idx > pos) {
        segments.push({ text: text.slice(pos, idx), highlight: false });
      }
      segments.push({ text: text.slice(idx, idx + query.length), highlight: true });
      pos = idx + query.length;
    }

    return segments;
  }

  clearCache(): void {
    this.cache.clear();
  }

  cancel(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

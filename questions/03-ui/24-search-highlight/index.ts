import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

export interface SearchResult {
  id: string;
  text: string;
  [key: string]: unknown;
}

export interface SearchHighlightProps {
  items: SearchResult[];
  debounceMs?: number;
  placeholder?: string;
  onSelect?: (item: SearchResult) => void;
  highlightClassName?: string;
  minChars?: number;
  emptyMessage?: string;
}

// TODO 1: Implement debounce for the search query.
//   - Keep two state variables: `rawQuery` (updates on every keystroke) and
//     `debouncedQuery` (updates after debounceMs ms of no changes).
//   - Use a useEffect with setTimeout to update debouncedQuery.
//   - Clear the timeout in the cleanup function.

// TODO 2: Filter items using debouncedQuery and useMemo.
//   - If debouncedQuery.length < minChars (default 1): return all items (or empty array).
//   - Otherwise: case-insensitive includes check on item.text.
//   - Depend on [items, debouncedQuery, minChars].

// TODO 3: Implement the highlight function.
//   - Escape the query: queryEscaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').
//   - Create a case-insensitive RegExp: new RegExp(`(${queryEscaped})`, 'gi').
//   - Split the text using this RegExp (split preserves capture groups).
//   - Map parts to JSX: matches get <mark className={highlightClassName}>, others get plain text.
//   - Return a <span> containing all parts.

// TODO 4: Render the results list.
//   - <ul aria-live="polite"> containing the filtered results.
//   - Each result: <li key={item.id}> — if onSelect, wrap in <button>; otherwise plain text.
//   - Show result count for screen readers: `<p className="sr-only">{count} results</p>`.
//   - Show emptyMessage in a <p role="status"> when filteredItems is empty AND query is non-empty.

// TODO 5: Handle the search input.
//   - <input type="search"> with value={rawQuery}, onChange updates rawQuery.
//   - aria-label or a visible <label> for the input.
//   - Clearing the input (x button in search input) should also clear rawQuery.

export function SearchHighlight(_props: SearchHighlightProps): JSX.Element {
  throw new Error('Not implemented');
}

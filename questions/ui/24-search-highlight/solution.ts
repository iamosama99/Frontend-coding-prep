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

// TODO: implement solution
export function SearchHighlight(_props: SearchHighlightProps): JSX.Element {
  throw new Error('Not implemented');
}

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import type { ReactNode } from 'react';

export interface Suggestion {
  id: string;
  label: string;
  [key: string]: unknown;
}

export interface AutocompleteProps {
  fetchSuggestions: (query: string, signal?: AbortSignal) => Promise<Suggestion[]>;
  onSelect?: (suggestion: Suggestion) => void;
  debounceMs?: number;
  minChars?: number;
  placeholder?: string;
  label?: string;
  initialValue?: string;
  maxResults?: number;
  renderItem?: (item: Suggestion, isHighlighted: boolean) => ReactNode;
}

// TODO: implement solution
export function Autocomplete(_props: AutocompleteProps): JSX.Element {
  throw new Error('Not implemented');
}

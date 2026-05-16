# Search with Highlight

## Problem

Build a `SearchHighlight` component with a debounced search input and a results list where the matched substring is visually highlighted in each result. The highlight must split the text around the match and wrap the matched portion in a `<mark>` element.

## TypeScript Signature

```ts
interface SearchResult {
  id: string;
  text: string;
  [key: string]: unknown;
}

interface SearchHighlightProps {
  items: SearchResult[];
  debounceMs?: number;          // default: 300
  placeholder?: string;
  onSelect?: (item: SearchResult) => void;
  highlightClassName?: string;  // CSS class for <mark> element
  minChars?: number;            // minimum chars before filtering, default: 1
  emptyMessage?: string;        // shown when no results match
}

function SearchHighlight(props: SearchHighlightProps): JSX.Element
```

## Usage Example

```tsx
const fruits = [
  { id: '1', text: 'Apple' },
  { id: '2', text: 'Pineapple' },
  { id: '3', text: 'Apricot' },
];

<SearchHighlight
  items={fruits}
  placeholder="Search fruits..."
  onSelect={(item) => console.log('Selected:', item.text)}
/>
// Typing "app" highlights "App" in "Apple" and "app" in "Pineapple"
```

**Expected behaviour:** the input is debounced so filtering only runs after the user pauses typing. Matched text is case-insensitively found within each `text` field, and the matching portion is wrapped in `<mark>`. Clicking a result calls `onSelect`.

## Constraints

- Highlight function: split `text` at the match boundary and return three parts: `[before, match, after]`. The match portion renders as `<mark>`.
- Multiple matches in a single text: highlight only the first match (simplest) or all matches.
- The query must be regex-escaped before use in a RegExp to avoid errors on special characters.
- `aria-live="polite"` on the results container to announce result count changes.
- Show the count of results ("3 results for 'app'") for screen reader users.

## Edge Cases

- Query with regex special chars (e.g. `[`, `(`, `.`) — must be escaped before creating RegExp.
- Empty query — show all items (if minChars is 0) or show nothing (if minChars > 0).
- No matches — show `emptyMessage` with `role="status"`.
- `onSelect` not provided — results are displayed but not interactive (no button/link).
- Very long text with match near the end — the full text is shown, not truncated.
- Query changes rapidly — only the debounced value is used for filtering.

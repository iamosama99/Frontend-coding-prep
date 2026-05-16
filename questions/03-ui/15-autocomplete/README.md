# Autocomplete / Typeahead

## Problem

Build an `Autocomplete` component that shows a dropdown of suggestions as the user types in an input. Suggestions come from an async `fetchSuggestions` function. The input is debounced to avoid firing on every keystroke. The component follows the ARIA combobox pattern.

## TypeScript Signature

```ts
interface Suggestion {
  id: string;
  label: string;
  [key: string]: unknown;   // allow extra metadata
}

interface AutocompleteProps {
  fetchSuggestions: (query: string) => Promise<Suggestion[]>;
  onSelect?: (suggestion: Suggestion) => void;
  debounceMs?: number;          // default: 300
  minChars?: number;            // minimum query length to trigger fetch, default: 1
  placeholder?: string;
  label?: string;
  initialValue?: string;
  maxResults?: number;          // cap displayed results, default: 10
  renderItem?: (item: Suggestion, isHighlighted: boolean) => React.ReactNode;
}

function Autocomplete(props: AutocompleteProps): JSX.Element
```

## Usage Example

```tsx
<Autocomplete
  fetchSuggestions={async (q) => {
    const res = await fetch(`/api/search?q=${q}`);
    return res.json();
  }}
  onSelect={(s) => navigate(`/user/${s.id}`)}
  debounceMs={300}
  minChars={2}
  label="Search users"
  placeholder="Type a name..."
/>
```

**Expected behaviour:** after the debounce delay, if the query is at least `minChars` long, `fetchSuggestions` is called. A loading state is shown while fetching. The dropdown opens with results. Arrow keys navigate the list; Enter selects the highlighted item; Escape closes the dropdown. Clicking an item selects it and closes the dropdown.

## Constraints

- Cancel in-flight requests when the query changes (use `AbortController` or track a request id).
- The input is `role="combobox"` with `aria-expanded`, `aria-autocomplete="list"`, `aria-controls` pointing to the listbox id.
- The listbox has `role="listbox"`; each item has `role="option"` and `id` for `aria-activedescendant`.
- Use `aria-activedescendant` on the input — do NOT move DOM focus into the list.
- Clear the suggestion list and close the dropdown on Escape.
- If `fetchSuggestions` rejects, show an error state and keep the dropdown open.

## Edge Cases

- Empty query (backspace to zero chars) — close dropdown and clear suggestions.
- `fetchSuggestions` called with query A, then query B returns before A — only show results for the latest query (race condition handling).
- `minChars=0` — fires immediately on focus, even with empty input.
- No suggestions returned — show "No results" message.
- `renderItem` not provided — render `suggestion.label` as text.
- User selects an item, then starts typing again — dropdown reopens with new suggestions.
- Component unmounts while fetch is in flight — abort the request and do not update state.

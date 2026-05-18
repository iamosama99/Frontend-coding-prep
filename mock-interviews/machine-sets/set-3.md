# Machine Round Set 3 — Autocomplete / Typeahead

**Difficulty:** Medium / Hard  
**Time limit:** 90 minutes  
**Components:** 1 (but requires debounce + ARIA + keyboard nav)

---

## Full Spec

Build an `Autocomplete` (typeahead) component that fetches suggestions as the user types.

**Requirements:**
- Render a text input that calls a provided async `fetchSuggestions` function as the user types
- Debounce the fetch by 300ms (do not fetch on every keystroke)
- Show a dropdown list of suggestions below the input
- Support keyboard navigation: ArrowDown / ArrowUp move through suggestions, Enter selects, Escape closes
- Clicking a suggestion selects it and closes the dropdown
- Show a loading state while fetching
- Show a "No results" message when fetch returns empty array
- When a suggestion is selected, put its label in the input and call `onSelect`

**Props interface:**
```ts
interface AutocompleteProps {
  fetchSuggestions: (query: string) => Promise<Suggestion[]>
  onSelect: (suggestion: Suggestion) => void
  placeholder?: string
  minQueryLength?: number  // don't fetch until query is this long (default: 2)
}

interface Suggestion {
  id: string
  label: string
}
```

**Stretch goals (if time allows):**
- Highlight the matching substring in each suggestion (e.g. bold the part that matches the query)
- Cancel in-flight requests with AbortController when a new request starts
- Cache results so repeated queries don't re-fetch

**Evaluation criteria:**
- Debounce: fetches don't fire on every character
- Keyboard nav: active index managed in state, wraps at boundaries (optional)
- ARIA: `role="combobox"` on input, `role="listbox"` on dropdown, `role="option"` on items, `aria-activedescendant` on input pointing to active item id
- Stale response handling: if a second fetch resolves before the first, the older result shouldn't overwrite the newer one
- `minQueryLength`: no fetch for empty string or single character

---

## Edge Cases to Handle

| Scenario | Expected behavior |
|----------|-------------------|
| User clears the input | Dropdown closes, no fetch |
| Fetch throws / network error | Show error state (or at least don't crash) |
| User types, then immediately closes dropdown with Escape | Input retains typed text |
| User selects item with Enter | Input shows selected label, dropdown closes |
| Two rapid requests — second resolves first | Show results from second (most recent) query |

---

## Check-in at 45 min

> "Quick check-in — do you have typing + debounced fetch + dropdown display working?"

Expected at 45 min: Input, debounce, and dropdown render working. Keyboard nav started.

## Check-in at 80 min

> "10 minutes left — keyboard nav or ARIA — which are you finishing?"

Expected at 80 min: Keyboard nav done. ARIA may be partial.

---

## Reviewer Checklist

- [ ] Debounce implemented (not just setTimeout without clear)
- [ ] `minQueryLength` respected — no fetch for short queries
- [ ] Loading state shown during fetch
- [ ] Empty state shown for empty results
- [ ] ArrowDown / ArrowUp navigate the list
- [ ] Enter selects and closes dropdown
- [ ] Escape closes dropdown
- [ ] Click on suggestion selects it
- [ ] `onSelect` called with the full Suggestion object
- [ ] ARIA: combobox, listbox, option roles present
- [ ] Stale response not overwriting newer result (ideally)
- [ ] TypeScript: no implicit `any`

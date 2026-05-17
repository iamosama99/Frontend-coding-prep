# Search & Filter List

## Problem

Build a live search interface that filters a static list and highlights matched substrings.

## Requirements

- Display a static list of at least 20 items (countries, movies, or names)
- A **search input** at the top filters the list in real time as the user types
- Search is **case-insensitive**
- **Highlight** the matched substring within each visible result (e.g. wrap in `<mark>`)
- Show a **"No results found"** message when nothing matches
- Display a **result count** above the list: "Showing X of Y items"

## Edge Cases

- Trim leading and trailing whitespace from the search query before matching
- Very fast typing still works correctly — filtering is synchronous (no debounce needed)
- Clearing the search input immediately restores the full list
- The result count updates on every keystroke
- Matching is substring-based, not whole-word (e.g. "an" matches "France")
- An empty search shows all items and updates the count accordingly

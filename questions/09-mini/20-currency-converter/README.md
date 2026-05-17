# Currency Converter

## Problem

Build a live currency converter that fetches exchange rates from a free API, supports two-way input binding, and lets users swap the two selected currencies.

## Requirements

- Fetch exchange rates from `https://open.er-api.com/v6/latest/USD` (free, no API key)
- **Two rows**: each with a currency dropdown and an amount input
- **Two-way binding**: typing in either amount input recalculates the other
- **Swap button** that swaps the two selected currencies (and updates amounts accordingly)
- **Populate dropdowns** from the API response's `rates` object keys
- Show the API's **last-updated timestamp**
- **Round** displayed amounts to 4 decimal places
- **Error state** if the API call fails

## Edge Cases

- Amount of `0` is valid — show `0.0000` in the other field
- Empty / non-numeric input in one field should not crash — treat as 0 or clear the other
- Swap only re-fetches if the new base currency has changed (i.e., after swap the base is the old "to" currency, which requires a new API call — simplest approach: always re-fetch on swap with new base)
- Dropdowns have a sensible default: USD → EUR on load
- If rates haven't loaded yet, disable both inputs and the swap button

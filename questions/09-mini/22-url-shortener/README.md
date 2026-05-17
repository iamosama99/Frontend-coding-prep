# URL Shortener UI

## Problem

Build a front-end-only URL shortener. There is no real backend — generate a fake 6-character alphanumeric code and display shortened URLs using the fake domain `short.ly/{code}`. Persist the history to localStorage so it survives page refreshes.

## Requirements

- Input field for a long URL
- "Shorten" button that generates a fake 6-char alphanumeric short code
- Display shortened results as a history list: clickable `short.ly/{code}` links
- Copy-to-clipboard button on each history entry
- "Copied!" feedback that appears for 2 seconds then reverts to "Copy"
- Persist history to localStorage (restored on page load)
- Delete individual entries from the history list
- Validate URL format before shortening — must start with `http://` or `https://`

## Edge Cases

- Show an inline validation error if the URL is missing or malformed
- If the same long URL is shortened again, show the existing short URL instead of creating a duplicate
- Clicking a `short.ly/` link opens the **original** long URL in a new tab (since the short URL is fake)
- Empty history shows a placeholder message "No URLs shortened yet"
- localStorage key: `url-shortener-history`

# GitHub User Search

## Problem

Build a GitHub user search app that debounces input, fetches user data from the public GitHub API, and renders a profile card.

## Requirements

- **Search input** for a GitHub username
- **Debounce 400 ms** — only fetch after the user stops typing for 400 ms
- Fetch from `https://api.github.com/users/{username}`
- Display a **profile card** with:
  - Avatar image
  - Display name (or username if no name)
  - Bio (if present)
  - Public repositories count
  - Followers and following counts
  - Location (if present)
  - Link to GitHub profile (opens in new tab)
- **Loading spinner** while fetching
- **404 error state** when the user is not found
- **Generic error state** for network failures

## Edge Cases

- Empty input clears the card and stops any in-flight fetch
- Rapid typing triggers **only one** fetch (debounce cancels earlier timers)
- Clearing the input resets the UI to the initial empty state
- The GitHub profile link uses `data.html_url` from the API response
- Rate limiting (403): show a friendly message about GitHub API limits

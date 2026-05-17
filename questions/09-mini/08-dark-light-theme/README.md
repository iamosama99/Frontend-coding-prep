# Dark / Light Theme Switcher

## Problem

Build a theme switcher that respects user preferences and persists across reloads.

## Requirements

- A **toggle button** that switches between dark and light themes
- Display the **current theme name** next to the toggle icon (e.g. "Dark Mode" / "Light Mode")
- **Smooth CSS transition** between themes (colors fade over ~300ms)
- On page load: check `localStorage` first, then fall back to `prefers-color-scheme` media query
- **Persist** the user's preference to `localStorage` under the key `"theme"`
- The theme applies to the entire page (background, text, links, cards, etc.)

## Edge Cases

- If the system preference changes **after the page loads** (e.g. OS switches from light to dark), the page should respond — unless the user has already set an explicit preference in `localStorage`
- `localStorage` value of `"dark"` or `"light"` always overrides the system preference
- Theme toggle must work without JavaScript frameworks — pure DOM class toggling
- The button icon should reflect the current theme (e.g. moon icon for dark, sun icon for light)

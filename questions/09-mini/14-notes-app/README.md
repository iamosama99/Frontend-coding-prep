# Notes App

## Problem

Build a CRUD notes application that persists to localStorage, supports searching, and displays relative timestamps.

## Requirements

- **Create** a note with a title and body text
- **Edit** an existing note by clicking it to open an inline editor
- **Delete** a note with a confirmation prompt
- **Search / filter** notes by title or body (live, case-insensitive)
- **Persist** all notes to `localStorage` — notes survive page refresh
- Each note stores:
  - `id` (unique)
  - `title`
  - `body`
  - `createdAt` timestamp
  - `updatedAt` timestamp
- Note list shows: title, truncated body preview (max ~80 chars), and a relative timestamp
- Notes are **sorted by most-recently-updated** first

## Edge Cases

- Cannot save a note with an empty title — show an inline error
- Search is live on every keystroke; the list filters instantly
- Relative timestamps:
  - < 1 minute ago → "Just now"
  - < 60 minutes → "X mins ago"
  - < 24 hours → "X hours ago"
  - < 48 hours → "Yesterday"
  - Older → full date string (e.g. "Jan 5, 2025")
- Deleting the last note shows an empty-state message
- Editing a note and pressing **Cancel** discards changes

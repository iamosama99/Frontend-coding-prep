# Kanban Board

## Problem

Build a Kanban board with three columns — To Do, In Progress, and Done. Users can add task cards to any column and drag them between columns using the HTML5 Drag-and-Drop API. Board state is persisted to localStorage.

## Requirements

- Three columns: To Do / In Progress / Done
- Each column has a header with a card-count badge
- Add task card form: title (required) + optional description, associated with a target column
- Drag cards between columns using HTML5 `draggable` + drag event API
- Delete card with an × button (visible on hover)
- Card count badge updates automatically when cards are moved or deleted
- Persist board state to localStorage (key: `kanban-board`)

## Edge Cases

- Valid drop zones are highlighted when a card is dragged over them
- Dropping a card on the column it already lives in is a no-op (no reorder within column for now)
- When a column is empty it shows a "Drop cards here" placeholder to maintain a valid drop target
- Title field is required — show inline validation if user tries to add a card with empty title
- localStorage is updated after every state change (add, move, delete)

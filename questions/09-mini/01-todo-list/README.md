# Todo List App

## Problem

Build a fully functional todo list app that lets users manage tasks with filtering and persistence.

## Requirements

- Add a new todo by typing in the input field and pressing **Enter** or clicking the **Add** button
- **Toggle** a todo as complete/incomplete by clicking on it or its checkbox
- **Delete** individual todos with a delete button on each item
- **Filter** the list by view: **All** / **Active** / **Done**
- **Persist** todos to `localStorage` so they survive page refresh
- Display a count of active (incomplete) items remaining
- **Complete All** button marks every todo as done
- **Clear Completed** button removes all completed todos

## Edge Cases

- Trim whitespace from input before adding; do not add empty or whitespace-only todos
- Persist the currently selected filter across page reload
- Complete All toggles all to done; if all are already done it toggles all back to active
- Clear Completed only appears when at least one todo is completed
- Deleting the last todo leaves a clean empty state with a helpful message
- Item count label uses correct singular/plural: "1 item left" vs "2 items left"

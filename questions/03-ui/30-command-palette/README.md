# Command Palette (⌘K)

## Problem

Build a `CommandPalette` component that opens as a modal overlay when the user presses ⌘K (or Ctrl+K on Windows). It shows a fuzzy-searchable list of commands, grouped by category, with keyboard navigation. Selecting a command executes it and closes the palette.

## TypeScript Signature

```ts
interface Command {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;            // display shortcut hint
  icon?: React.ReactNode;
  onExecute: () => void;
  keywords?: string[];          // extra search terms
}

interface CommandPaletteProps {
  commands: Command[];
  placeholder?: string;         // default: "Search commands..."
  emptyMessage?: string;        // default: "No commands found"
  maxResults?: number;          // default: 10
  onOpen?: () => void;
  onClose?: () => void;
}

function CommandPalette(props: CommandPaletteProps): JSX.Element
```

## Usage Example

```tsx
<CommandPalette
  commands={[
    { id: 'new', label: 'New file', group: 'File', shortcut: '⌘N', onExecute: () => createFile() },
    { id: 'open', label: 'Open file', group: 'File', shortcut: '⌘O', onExecute: () => openFile() },
    { id: 'theme', label: 'Toggle theme', group: 'Settings', onExecute: toggleTheme },
  ]}
  placeholder="Type a command..."
/>
```

**Expected behaviour:** ⌘K/Ctrl+K opens the palette. Typing filters commands by fuzzy-matching against `label` and `keywords`. Arrow keys navigate the list; Enter executes the highlighted command; Escape closes. Commands are grouped by `group`. Clicking outside the palette also closes it.

## Constraints

- Register the ⌘K/Ctrl+K shortcut globally using `document.addEventListener('keydown')` on mount.
- Render the palette in a portal via `createPortal`.
- Use the ARIA combobox or dialog pattern (the latter is simpler for a command palette).
- Focus the search input when the palette opens; trap focus within.
- Fuzzy match: a query "op fi" should match "Open file" (characters appear in order, not necessarily adjacent).
- Group headings are not selectable items; they are rendered as `role="presentation"` separators.

## Edge Cases

- Two `CommandPalette` instances mounted — only one should listen for the global shortcut (de-duplicate in a global listener registry or by checking if any palette is already open).
- `commands` array changes while palette is open — re-filter with the current query.
- All commands filtered out — show `emptyMessage`.
- `maxResults` is 5 but there are 20 matching commands — show only the top 5.
- Shortcut key conflicts with browser native shortcuts (⌘K is "focus search" in Firefox) — call `e.preventDefault()`.
- Command `onExecute` throws — catch the error and close the palette; do not crash the component.

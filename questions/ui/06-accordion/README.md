# Accordion

## Problem

Build an `Accordion` component that renders a list of collapsible sections. Each section has a header button and a content panel. Clicking a header toggles its panel open or closed. The component must support both **single-expand** (only one panel open at a time) and **multi-expand** modes, and both **controlled** and **uncontrolled** APIs.

## TypeScript Signature

```ts
interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;           // allow multiple panels open, default: false
  // Controlled API
  openIds?: string[];
  onOpenChange?: (openIds: string[]) => void;
  // Uncontrolled API
  defaultOpenIds?: string[];
}

function Accordion(props: AccordionProps): JSX.Element
```

## Usage Example

```tsx
const items = [
  { id: 'a', title: 'What is React?', content: 'A JavaScript library...' },
  { id: 'b', title: 'What is TypeScript?', content: 'A typed superset...' },
  { id: 'c', title: 'Disabled item', content: 'Cannot open', disabled: true },
];

// Uncontrolled, single-expand
<Accordion items={items} defaultOpenIds={['a']} />

// Controlled, multi-expand
const [open, setOpen] = useState<string[]>([]);
<Accordion items={items} multiple openIds={open} onOpenChange={setOpen} />
```

**Expected behaviour:** in single-expand mode, opening a new panel closes the previously open one. In multi-expand mode, each panel toggles independently. Disabled items cannot be opened.

## Constraints

- Use correct ARIA: `role="button"` is not needed since `<button>` is used; set `aria-expanded`, `aria-controls`, and `id` attributes to link headers and panels.
- Each panel should have `role="region"` and `aria-labelledby` pointing to its header button.
- Keyboard: `Enter`/`Space` toggle; `Tab` navigates between headers and into open panels.
- In controlled mode without `onOpenChange`, panels are read-only.
- `multiple={false}` (default): only one panel open at a time; clicking the open panel closes it.

## Edge Cases

- All panels start closed — valid state; nothing is open by default.
- Controlled mode where `openIds` contains an id not in `items` — ignore gracefully.
- `defaultOpenIds` contains multiple ids but `multiple` is false — only the first id is honoured.
- Disabled item in `openIds` (controlled) — render it as open but still non-interactive.
- `items` array changes (item removed) — if a removed item was open, update open state accordingly.
- Single item with no content — panel should still render (even if empty) without crashing.

# Drag & Drop List

## Problem

Build a `DragDropList` component that allows users to reorder a list of items by dragging and dropping. Implement using HTML5 Drag and Drop API (or pointer events as a bonus). The component must also support keyboard-based reordering for accessibility.

## TypeScript Signature

```ts
interface DragDropItem {
  id: string;
  [key: string]: unknown;
}

interface DragDropListProps<T extends DragDropItem> {
  items: T[];
  onReorder: (reorderedItems: T[]) => void;
  renderItem: (item: T, index: number, isDragging: boolean) => React.ReactNode;
  keyExtractor?: (item: T) => string;   // default: item.id
  disabled?: boolean;
}

function DragDropList<T extends DragDropItem>(props: DragDropListProps<T>): JSX.Element
```

## Usage Example

```tsx
const [tasks, setTasks] = useState([
  { id: '1', title: 'Write tests' },
  { id: '2', title: 'Fix bug' },
  { id: '3', title: 'Code review' },
]);

<DragDropList
  items={tasks}
  onReorder={setTasks}
  renderItem={(item, _i, isDragging) => (
    <div style={{ opacity: isDragging ? 0.5 : 1 }}>
      {item.title}
    </div>
  )}
/>
```

**Expected behaviour:** dragging an item shows a ghost/clone at the drag position. When dropped on another item, the items swap positions. `onReorder` is called with the new array. Visual feedback shows the drop target. Keyboard: Space to pick up, arrow keys to move, Space/Enter to drop, Escape to cancel.

## Constraints

- Track `draggedId` and `dragOverId` in state to apply visual feedback classes.
- On `dragStart`: set `draggedId`.
- On `dragOver` (with `preventDefault()`): update `dragOverId`.
- On `drop`: reorder the array by moving the dragged item to the position of the dropped-on item, call `onReorder`, clear both ids.
- `draggable={true}` on each item; `dragover` must call `e.preventDefault()` to enable drops.
- Keyboard: implement with `aria-grabbed` (or the newer approach of managing a `grabbed` state manually) and `aria-live` announcements.

## Edge Cases

- Dropping an item on itself — no-op; array unchanged.
- Drop outside any item (on the container) — cancel drag, restore original order.
- `disabled` prop — draggable is false, no event handlers attached.
- Rapid drag + drop actions — state should always reflect the final order, not an intermediate one.
- Items with duplicate labels — ids must be used for comparison, not labels.
- Item count changes during drag (race condition) — cancel drag, apply no reorder.

# Recursive Comments / File Tree

## Problem

Build a `RecursiveTree` component that renders a deeply nested tree structure. Each node can be expanded or collapsed, and collapse state is tracked per node id. The component renders itself recursively for child nodes. It supports both a comment-thread style and a file-explorer style via a `renderNode` render prop.

## TypeScript Signature

```ts
interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  [key: string]: unknown;   // allow extra data (author, timestamp, etc.)
}

interface RecursiveTreeProps {
  nodes: TreeNode[];
  renderNode?: (node: TreeNode, depth: number) => React.ReactNode;
  defaultExpanded?: boolean;    // start all nodes expanded, default: false
  expandedIds?: string[];       // controlled expanded node ids
  onExpandChange?: (id: string, expanded: boolean) => void;
  indentSize?: number;          // px per depth level, default: 20
  maxDepth?: number;            // stop rendering beyond this depth
}

function RecursiveTree(props: RecursiveTreeProps): JSX.Element
```

## Usage Example

```tsx
const comments = [
  {
    id: '1', label: 'Alice: Great post!', children: [
      { id: '2', label: 'Bob: Thanks!', children: [
        { id: '3', label: 'Alice: You\'re welcome', children: [] }
      ]}
    ]
  },
  { id: '4', label: 'Charlie: Interesting take.' }
];

<RecursiveTree
  nodes={comments}
  defaultExpanded={true}
  renderNode={(node, depth) => (
    <span style={{ fontSize: `${16 - depth}px` }}>{node.label}</span>
  )}
/>
```

**Expected behaviour:** clicking a node's toggle button expands/collapses its children. The indentation increases by `indentSize` per depth level. Leaf nodes (no children) do not show a toggle button. The `renderNode` prop customises how each node's content is displayed.

## Constraints

- Each node's collapse state must be stored by id, not by array index, so it survives list re-ordering.
- The component must not exceed `maxDepth` levels of recursion (guard to prevent stack overflow on malformed data).
- Use `aria-expanded` on toggle buttons; use `<ul>`/`<li>` for the list structure (or `<div>` with `role="tree"` and `role="treeitem"`).
- Each `<li>` should have a unique `key` derived from the node id.
- Leaf nodes: either hide the toggle or show it as disabled.

## Edge Cases

- Circular reference in tree data — `maxDepth` prevents infinite recursion; optionally track visited ids.
- Node with `children: []` (empty array) — treat as a leaf; do not render a toggle.
- `expandedIds` contains an id not in the current tree — ignore gracefully.
- `defaultExpanded: true` with a very deep tree — render all levels (respect `maxDepth`).
- Nodes added to a previously collapsed parent — newly added children should be visible if the parent is expanded.
- `renderNode` returns null — render nothing for that node's content but still render its children.

import { useState } from 'react';
import type { ReactNode } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  [key: string]: unknown;
}

export interface RecursiveTreeProps {
  nodes: TreeNode[];
  renderNode?: (node: TreeNode, depth: number) => ReactNode;
  defaultExpanded?: boolean;
  expandedIds?: string[];
  onExpandChange?: (id: string, expanded: boolean) => void;
  indentSize?: number;
  maxDepth?: number;
}

// TODO 1: Manage collapse state with a Set<string> (expanded node ids).
//   - Uncontrolled: use useState initialised to an empty Set (or all ids if defaultExpanded).
//   - Controlled: use expandedIds prop as the source of truth.
//   - Toggling calls onExpandChange in both modes; only update state in uncontrolled mode.

// TODO 2: Initialise the expanded set for defaultExpanded mode.
//   - Collect all node ids recursively and pre-populate the Set when defaultExpanded is true.
//   - This must happen lazily (useState initialiser function) to avoid re-running on every render.

// TODO 3: Create a recursive render function (or a sub-component).
//   - Accept (nodes: TreeNode[], depth: number) as parameters.
//   - Guard: if depth > (maxDepth ?? Infinity), return null.
//   - For each node: determine if it has children (children?.length > 0).
//   - Render a <li> with the toggle button (if has children) and the node content.
//   - Render children recursively inside a <ul> only when the node is expanded.
//   - Apply paddingLeft = depth * (indentSize ?? 20) to the <li>.

// TODO 4: Toggle button behaviour.
//   - aria-expanded={isExpanded} on the button.
//   - Button label: "Collapse {node.label}" or "Expand {node.label}".
//   - Clicking calls the toggle handler; stopPropagation if inside a list item click handler.

// TODO 5: Default renderNode — if no renderNode prop provided, just render node.label as text.
//   Use the renderNode result as the node's visual content, next to the toggle button.

export function RecursiveTree(_props: RecursiveTreeProps): JSX.Element {
  throw new Error('Not implemented');
}

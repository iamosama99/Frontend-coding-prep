export interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

export interface DOMNode {
  tagName: string;
  children: DOMNode[];
}

// TODO 1: implement bfsTree<T>(root): T[].
//   Use a queue (start with [root]).
//   While queue is not empty: shift the front node, push its value to the result,
//   and enqueue all of its children.

export function bfsTree<T>(_root: TreeNode<T>): T[] {
  throw new Error('Not implemented');
}

// TODO 2: implement dfsTree<T>(root): T[].
//   Option A (recursive): push root.value, then recurse on each child.
//   Option B (iterative): use a stack — push root, then while stack is not empty:
//     pop a node, push its value, push children in REVERSE order so the
//     leftmost child is processed first.

export function dfsTree<T>(_root: TreeNode<T>): T[] {
  throw new Error('Not implemented');
}

// TODO 3: implement bfsDOM(root): string[].
//   Same BFS logic as bfsTree but collect tagName instead of value.

export function bfsDOM(_root: DOMNode): string[] {
  throw new Error('Not implemented');
}

// TODO 4: implement dfsDOM(root): string[].
//   Same DFS logic as dfsTree but collect tagName.

export function dfsDOM(_root: DOMNode): string[] {
  throw new Error('Not implemented');
}

# BFS + DFS on Tree and DOM

## Problem

Implement BFS and DFS traversal for two data structures: a generic tree node and a DOM-like element tree.

## TypeScript Signatures

```ts
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

// BFS: visit nodes level by level using a queue
function bfsTree<T>(root: TreeNode<T>): T[]

// DFS: visit nodes depth-first (pre-order: parent before children)
function dfsTree<T>(root: TreeNode<T>): T[]

// DOM-like element (minimal interface)
interface DOMNode {
  tagName: string;
  children: DOMNode[];
}

// BFS walk of a DOM subtree — return tagNames in BFS order
function bfsDOM(root: DOMNode): string[]

// DFS walk of a DOM subtree — return tagNames in DFS pre-order
function dfsDOM(root: DOMNode): string[]
```

## Usage Example

```
Tree:
         1
       / | \
      2  3  4
     / \
    5   6

bfsTree(root)  → [1, 2, 3, 4, 5, 6]  (level-order)
dfsTree(root)  → [1, 2, 5, 6, 3, 4]  (pre-order)
```

```ts
const dom: DOMNode = {
  tagName: 'div',
  children: [
    { tagName: 'h1', children: [] },
    { tagName: 'p',  children: [{ tagName: 'span', children: [] }] },
  ],
};

bfsDOM(dom)  // → ['div', 'h1', 'p', 'span']
dfsDOM(dom)  // → ['div', 'h1', 'p', 'span']
```

## Constraints

- BFS must use an explicit queue (array with `shift()` or a deque)
- DFS must use either recursion or an explicit stack — not the call stack via BFS
- All four functions must handle a single-node tree (no children)
- Do not use any library helpers

## Edge Cases

- Single node with no children — return `[value]`
- Node with 0 children (leaf) — DFS/BFS both just return that node's value
- Very wide tree (many children) — BFS handles it breadth-first
- Very deep tree (long chain) — recursive DFS may hit call stack limits; iterative is safer
- DOM node with no children — returns array with just that tagName
- Mixed depth tree (some branches deeper than others) — BFS still processes level by level

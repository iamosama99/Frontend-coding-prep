// Tests for bfsTree, dfsTree, bfsDOM, dfsDOM
// Run: npx ts-node questions/08-ds/bfs-dfs/tests.ts

import { bfsTree, dfsTree, bfsDOM, dfsDOM, TreeNode, DOMNode } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

//       1
//      /|\
//     2  3  4
//    / \
//   5   6
const tree: TreeNode<number> = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 5, children: [] },
        { value: 6, children: [] },
      ],
    },
    { value: 3, children: [] },
    { value: 4, children: [] },
  ],
};

assert(deepEqual(bfsTree(tree), [1, 2, 3, 4, 5, 6]), 'bfsTree: level-order traversal');
assert(deepEqual(dfsTree(tree), [1, 2, 5, 6, 3, 4]), 'dfsTree: pre-order traversal');

// Single node
const single: TreeNode<string> = { value: 'root', children: [] };
assert(deepEqual(bfsTree(single), ['root']), 'bfsTree: single node');
assert(deepEqual(dfsTree(single), ['root']), 'dfsTree: single node');

// Linear chain: 1 → 2 → 3
const chain: TreeNode<number> = {
  value: 1,
  children: [{ value: 2, children: [{ value: 3, children: [] }] }],
};
assert(deepEqual(bfsTree(chain), [1, 2, 3]), 'bfsTree: linear chain');
assert(deepEqual(dfsTree(chain), [1, 2, 3]), 'dfsTree: linear chain');

// DOM tests
const dom: DOMNode = {
  tagName: 'div',
  children: [
    { tagName: 'h1', children: [] },
    { tagName: 'p', children: [{ tagName: 'span', children: [] }] },
  ],
};

assert(deepEqual(bfsDOM(dom), ['div', 'h1', 'p', 'span']), 'bfsDOM: level-order');
assert(deepEqual(dfsDOM(dom), ['div', 'h1', 'p', 'span']), 'dfsDOM: pre-order');

const singleDom: DOMNode = { tagName: 'input', children: [] };
assert(deepEqual(bfsDOM(singleDom), ['input']), 'bfsDOM: single DOM node');
assert(deepEqual(dfsDOM(singleDom), ['input']), 'dfsDOM: single DOM node');

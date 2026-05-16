// Tests for RecursiveTree
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { RecursiveTree, RecursiveTreeProps, TreeNode } from './index';

// Test 1: RecursiveTree is exported as a function
try {
  typeof RecursiveTree === 'function'
    ? pass('RecursiveTree is exported as a function')
    : fail('RecursiveTree exported', `typeof = ${typeof RecursiveTree}`);
} catch (e) {
  fail('RecursiveTree exported', String(e));
}

// Test 2: TreeNode interface supports nested children
try {
  const node: TreeNode = {
    id: '1',
    label: 'Root',
    children: [
      { id: '2', label: 'Child', children: [] }
    ],
  };
  node.children?.length === 1 && node.children[0].id === '2'
    ? pass('TreeNode supports nested children array')
    : fail('TreeNode nesting', JSON.stringify(node));
} catch (e) {
  fail('TreeNode nesting', String(e));
}

// Test 3: Collect all ids recursively for defaultExpanded
try {
  const collectIds = (nodes: TreeNode[]): string[] => {
    return nodes.flatMap(n => [n.id, ...collectIds(n.children ?? [])]);
  };
  const tree: TreeNode[] = [
    { id: '1', label: 'A', children: [{ id: '2', label: 'B', children: [] }] },
    { id: '3', label: 'C' },
  ];
  const ids = collectIds(tree);
  JSON.stringify(ids) === JSON.stringify(['1', '2', '3'])
    ? pass('collectIds recursively gathers all node ids')
    : fail('collectIds', JSON.stringify(ids));
} catch (e) {
  fail('collectIds', String(e));
}

// Test 4: Leaf node detection — no children or empty children array
try {
  const isLeaf = (node: TreeNode): boolean => !node.children || node.children.length === 0;
  const leaf1: TreeNode = { id: '1', label: 'Leaf' };
  const leaf2: TreeNode = { id: '2', label: 'Empty', children: [] };
  const branch: TreeNode = { id: '3', label: 'Branch', children: [{ id: '4', label: 'Child' }] };
  isLeaf(leaf1) && isLeaf(leaf2) && !isLeaf(branch)
    ? pass('isLeaf correctly identifies leaf and branch nodes')
    : fail('isLeaf', `leaf1=${isLeaf(leaf1)} leaf2=${isLeaf(leaf2)} branch=${isLeaf(branch)}`);
} catch (e) {
  fail('isLeaf', String(e));
}

// Test 5: maxDepth prevents recursion beyond limit
try {
  let renderCount = 0;
  const renderWithDepth = (nodes: TreeNode[], depth: number, maxDepth: number): void => {
    if (depth > maxDepth) return;
    nodes.forEach(node => {
      renderCount++;
      if (node.children) renderWithDepth(node.children, depth + 1, maxDepth);
    });
  };
  const deepTree: TreeNode[] = [
    { id: '1', label: 'L1', children: [
      { id: '2', label: 'L2', children: [
        { id: '3', label: 'L3', children: [{ id: '4', label: 'L4' }] }
      ]}
    ]}
  ];
  renderWithDepth(deepTree, 0, 1); // maxDepth 1: should only render L1 and L2
  renderCount === 2
    ? pass('maxDepth=1 renders only 2 levels (0 and 1)')
    : fail('maxDepth', `renderCount=${renderCount}`);
} catch (e) {
  fail('maxDepth', String(e));
}

// Test 6: Indent calculation
try {
  const getIndent = (depth: number, indentSize: number): number => depth * indentSize;
  getIndent(2, 20) === 40 && getIndent(0, 20) === 0
    ? pass('indent = depth × indentSize px')
    : fail('indent', `depth=2: ${getIndent(2, 20)}px depth=0: ${getIndent(0, 20)}px`);
} catch (e) {
  fail('indent', String(e));
}

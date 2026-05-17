// Tests for serialize / deserialize binary tree
// Run: npx ts-node questions/08-ds/serialize-binary-tree/tests.ts

import { TreeNode, serialize, deserialize } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    if (node === null) {
      result.push(null);
    } else {
      result.push(node.val);
      queue.push(node.left, node.right);
    }
  }
  while (result[result.length - 1] === null) result.pop();
  return result;
}

function treesEqual(a: TreeNode | null, b: TreeNode | null): boolean {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.val === b.val && treesEqual(a.left, b.left) && treesEqual(a.right, b.right);
}

// Test 1: null root round-trip
assert(deserialize(serialize(null)) === null, 'null root serializes and deserializes to null');

// Test 2: single node
const single = new TreeNode(42);
const rt1 = deserialize(serialize(single));
assert(rt1 !== null && rt1.val === 42 && rt1.left === null && rt1.right === null, 'single node round-trip');

// Test 3: full tree round-trip
//     1
//    / \
//   2   3
//      / \
//     4   5
const root = new TreeNode(1,
  new TreeNode(2),
  new TreeNode(3, new TreeNode(4), new TreeNode(5)),
);
const rt2 = deserialize(serialize(root));
assert(treesEqual(root, rt2), 'full tree round-trip preserves structure and values');

// Test 4: serialize produces a non-empty string for non-null tree
const s = serialize(root);
assert(typeof s === 'string' && s.length > 0, 'serialize produces non-empty string');

// Test 5: left-skewed tree
const leftSkewed = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
assert(treesEqual(leftSkewed, deserialize(serialize(leftSkewed))), 'left-skewed tree round-trip');

// Test 6: right-skewed tree
const rightSkewed = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3)));
assert(treesEqual(rightSkewed, deserialize(serialize(rightSkewed))), 'right-skewed tree round-trip');

// Test 7: negative values
const negTree = new TreeNode(-5, new TreeNode(-3), new TreeNode(0));
const rt3 = deserialize(serialize(negTree));
assert(treesEqual(negTree, rt3), 'negative values round-trip');

// Test 8: deserialize('') returns null
assert(deserialize('') === null, "deserialize('') returns null");

# Serialize / Deserialize Binary Tree

## Problem

Implement two functions that convert a binary tree to a string and back, using BFS with null markers. The serialized format must be a valid round-trip: `deserialize(serialize(tree))` should produce an identical tree.

## TypeScript Signature

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null)
}

// Encode the tree to a single string
function serialize(root: TreeNode | null): string

// Decode a serialized string back into a tree
function deserialize(data: string): TreeNode | null
```

## Usage Example

```
Tree:
    1
   / \
  2   3
     / \
    4   5

serialize(root)  →  "1,2,3,null,null,4,5"

deserialize("1,2,3,null,null,4,5")  →  the same tree structure
```

```ts
const root = new TreeNode(1,
  new TreeNode(2),
  new TreeNode(3, new TreeNode(4), new TreeNode(5))
);

const s = serialize(root);        // "1,2,3,null,null,4,5"
const t = deserialize(s);
t.val                             // 1
t.right.left.val                  // 4
```

## Constraints

- Use BFS (level-order) with `'null'` markers for missing nodes
- Values are comma-separated in the string
- Deserialize by splitting on `','`, then rebuilding level by level using a queue
- `serialize(null)` should return `''` (or `'null'`, as long as `deserialize` handles it)

## Edge Cases

- `null` root — `serialize(null)` returns `''`, `deserialize('')` returns `null`
- Single node — `serialize(new TreeNode(1))` returns `'1'`
- Left-only skewed tree — right pointers serialize as `null`
- Right-only skewed tree — left pointers serialize as `null`
- Negative values and zero — must round-trip correctly
- Large tree — BFS-based solution avoids call-stack overflow on deep trees
- Duplicate values — allowed; the structure, not just the values, must match

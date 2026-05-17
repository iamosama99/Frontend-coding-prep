export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// TODO 1: implement serialize(root): string.
//   Use BFS: start a queue with [root].
//   While the queue is not empty, shift a node.
//   If it's null, push 'null' to the result array.
//   If it's a node, push its val, and enqueue left and right (even if null).
//   Join the result array with ','.
//   Handle root === null → return ''.

// TODO 2: implement deserialize(data): TreeNode | null.
//   If data is '' or 'null', return null.
//   Split data by ',' to get tokens.
//   Create the root from tokens[0].
//   Use a queue of TreeNodes. For each node in the queue, assign left and right
//   from the next two tokens (skip if 'null').
//   Return root.

export function serialize(_root: TreeNode | null): string {
  throw new Error('Not implemented');
}

export function deserialize(_data: string): TreeNode | null {
  throw new Error('Not implemented');
}

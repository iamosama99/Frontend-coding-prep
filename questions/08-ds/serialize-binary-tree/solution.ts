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

export function serialize(root: TreeNode | null): string {
  if (!root) return '';
  const result: string[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length) {
    const node = queue.shift()!;
    if (node === null) {
      result.push('null');
    } else {
      result.push(String(node.val));
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  // Trim trailing nulls for a cleaner format
  while (result[result.length - 1] === 'null') result.pop();
  return result.join(',');
}

export function deserialize(data: string): TreeNode | null {
  if (!data || data === 'null') return null;
  const tokens = data.split(',');
  const root = new TreeNode(Number(tokens[0]));
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length && i < tokens.length) {
    const node = queue.shift()!;

    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(Number(tokens[i]));
      queue.push(node.left);
    }
    i++;

    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(Number(tokens[i]));
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

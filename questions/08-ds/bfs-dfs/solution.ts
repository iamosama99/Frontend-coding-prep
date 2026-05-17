export interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

export interface DOMNode {
  tagName: string;
  children: DOMNode[];
}

export function bfsTree<T>(root: TreeNode<T>): T[] {
  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node.value);
    queue.push(...node.children);
  }
  return result;
}

export function dfsTree<T>(root: TreeNode<T>): T[] {
  const result: T[] = [];
  const stack: TreeNode<T>[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    result.push(node.value);
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  return result;
}

export function bfsDOM(root: DOMNode): string[] {
  const result: string[] = [];
  const queue: DOMNode[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node.tagName);
    queue.push(...node.children);
  }
  return result;
}

export function dfsDOM(root: DOMNode): string[] {
  const result: string[] = [];
  const stack: DOMNode[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    result.push(node.tagName);
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  return result;
}

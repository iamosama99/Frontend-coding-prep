# Data Structures — Guide

## Core Mental Model

Frontend data structure questions aren't about memorising textbook algorithms — they're about recognising *which tool fits the shape of the problem*. The pattern inventory is small: hash map for O(1) lookup, two-pointer/sliding window for contiguous subarrays, BFS/DFS for trees and graphs, and DP for optimal substructure problems. Master the when-to-use, not just the how-to-implement.

The DOM is itself a tree, so BFS and DFS come up constantly in frontend contexts: finding ancestors, collecting descendants, serialising component trees, implementing virtual-DOM diffing.

---

## Key Patterns

### Hash Map — O(1) Lookup

The most common pattern in frontend DS questions. Any time you're checking membership, counting frequency, or caching a computed value, reach for a `Map` or plain object.

```ts
// Two-sum via complement lookup
function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return null;
}
```

**Gotcha:** `JSON.stringify` as a cache key works for simple objects but breaks on undefined values and circular refs. Use a dedicated key function.

---

### BFS — Level-Order Traversal

BFS uses a queue (array with shift or a proper deque). Use it when you need shortest path or level-by-level processing.

```ts
function bfs(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const level: number[] = [];
    const size = queue.length; // snapshot — don't use queue.length in the loop
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

**DOM variant:** `Array.from(el.children)` gives you the next level. Use the same pattern to walk the real DOM.

---

### DFS — Depth-First Traversal

DFS uses the call stack (recursion) or an explicit stack (iterative). Use it for path problems, collecting all matches, or any traversal where you don't need level information.

```ts
// Recursive DFS — preorder
function dfs(node: TreeNode | null, result: number[] = []): number[] {
  if (!node) return result;
  result.push(node.val);
  dfs(node.left, result);
  dfs(node.right, result);
  return result;
}
```

**Iterative DFS (stack):**

```ts
function dfsIterative(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    result.push(node.val);
    if (node.right) stack.push(node.right); // right first → left processed first
    if (node.left) stack.push(node.left);
  }
  return result;
}
```

---

### Two-Pointer / Sliding Window

Use when the input is sorted or when you're looking for a contiguous subarray with a given property.

```ts
// Max sum of subarray with fixed window size k
function maxSlidingWindow(nums: number[], k: number): number {
  let sum = nums.slice(0, k).reduce((a, b) => a + b, 0);
  let max = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k]; // slide: add right, remove left
    max = Math.max(max, sum);
  }
  return max;
}
```

---

### Trie — Prefix Search

A Trie is a tree where each node represents a character. Each path from root to a terminal node spells a word. Insert is O(L), prefix lookup is O(L+results).

```ts
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd = false;
}

class Trie {
  root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return true;
  }
}
```

---

### Dynamic Programming

DP solves problems with *overlapping subproblems* and *optimal substructure*. The key is defining `dp[i]` (or `dp[i][j]`) clearly before writing code.

```ts
// Longest Common Subsequence
function lcs(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}
```

---

## Common Gotchas & Interview Mistakes

- **Using `array.shift()` as a queue**: O(n) per dequeue. For performance-sensitive BFS, use an index pointer instead.
- **Mutating the input array**: Always clarify whether you can mutate in-place. If not, clone first.
- **Missing the base case in recursion**: null check at the top of every recursive DFS function.
- **Hash map key collisions with objects**: Objects are compared by reference, not value. Serialize to string or use a composite key.
- **Forgetting to mark visited nodes**: In graph BFS/DFS (cyclic graphs), always keep a `visited` Set.

---

## Interview Framing

Before coding, say:
> "My first instinct is to use a hash map here — we need O(1) lookups and the input isn't sorted. The trade-off is O(n) space."

For tree problems:
> "This looks like a BFS problem because we need level-by-level output. I'll use a queue with a size snapshot per level."

Always state time and space complexity before moving on. Interviewers are checking whether you know *why* you chose the approach, not just that you can implement it.

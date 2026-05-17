class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    if (!word) return false;
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return node.isEnd;
  }

  startsWith(prefix: string): boolean {
    if (!prefix) return this.root.children.size > 0;
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return true;
  }

  autocomplete(prefix: string): string[] {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return [];
      node = node.children.get(ch)!;
    }
    const results: string[] = [];
    this.collect(node, prefix, results);
    return results;
  }

  private collect(node: TrieNode, current: string, results: string[]): void {
    if (node.isEnd) results.push(current);
    for (const [ch, child] of node.children) {
      this.collect(child, current + ch, results);
    }
  }

  delete(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return;
      node = node.children.get(ch)!;
    }
    node.isEnd = false;
  }
}

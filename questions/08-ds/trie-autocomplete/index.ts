// TODO 1: Define a TrieNode class or interface.
//   It needs:
//   - children: Map<string, TrieNode>  (one entry per unique next character)
//   - isEnd: boolean                   (true if a word ends at this node)

// TODO 2: implement insert(word).
//   Walk the trie character by character.
//   If a child for the current character doesn't exist, create a new TrieNode.
//   After the last character, set node.isEnd = true.

// TODO 3: implement search(word): boolean.
//   Walk the trie. If any character is missing, return false.
//   Return node.isEnd after consuming all characters.
//   Special case: empty string → false.

// TODO 4: implement startsWith(prefix): boolean.
//   Same walk as search but return true as soon as you've consumed all prefix chars.
//   Special case: empty prefix → return true if the root has any children.

// TODO 5: implement autocomplete(prefix): string[].
//   a) Walk to the node at the end of prefix. If not found, return [].
//   b) DFS from that node collecting all words.
//      Keep a `current` string (the prefix so far).
//      At each node, if isEnd: push current to results.
//      Recurse into each child, appending the child's character to current.

// TODO 6: implement delete(word).
//   Simplest correct approach: clear the isEnd flag at the terminal node
//   (and optionally prune dead branches — nodes with no children and isEnd=false).

export class Trie {
  insert(_word: string): void {
    throw new Error('Not implemented');
  }

  search(_word: string): boolean {
    throw new Error('Not implemented');
  }

  startsWith(_prefix: string): boolean {
    throw new Error('Not implemented');
  }

  autocomplete(_prefix: string): string[] {
    throw new Error('Not implemented');
  }

  delete(_word: string): void {
    throw new Error('Not implemented');
  }
}

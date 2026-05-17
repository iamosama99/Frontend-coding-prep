# Trie for Autocomplete

## Problem

Implement a `Trie` class that supports inserting words, prefix searching, and collecting all words that share a given prefix — the core of an autocomplete system.

## TypeScript Signature

```ts
class Trie {
  // Insert a word into the trie.
  insert(word: string): void

  // Return true if the exact word exists in the trie.
  search(word: string): boolean

  // Return true if any word in the trie starts with the given prefix.
  startsWith(prefix: string): boolean

  // Return all words in the trie that start with the given prefix.
  // Results can be in any order.
  autocomplete(prefix: string): string[]

  // Delete a word from the trie. If the word does not exist, do nothing.
  delete(word: string): void
}
```

## Usage Example

```ts
const trie = new Trie();
trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('banana');

trie.search('app')         // → true
trie.search('ap')          // → false (not inserted as complete word)
trie.startsWith('app')     // → true
trie.startsWith('ban')     // → true
trie.startsWith('xyz')     // → false

trie.autocomplete('app')   // → ['app', 'apple', 'application'] (any order)
trie.autocomplete('ban')   // → ['banana']
trie.autocomplete('xyz')   // → []

trie.delete('apple');
trie.search('apple')       // → false
trie.search('app')         // → true  (shared prefix node still exists)
```

## Constraints

- Use a `TrieNode` class/interface internally with a `Map<string, TrieNode>` for children and an `isEnd: boolean` flag
- `insert`, `search`, `startsWith` each run in O(L) time where L = word length
- `autocomplete` runs in O(L + N) where N = total characters in matching words (DFS from the prefix node)
- Case-sensitive — 'Apple' and 'apple' are different words
- `delete` must not break prefix paths used by other words

## Edge Cases

- Insert the same word twice — `search` still returns `true`, `autocomplete` returns it once
- `delete` a word that is a prefix of another — only remove the `isEnd` flag, do not delete nodes
- `delete` a word that shares no suffix with any other word — prune the dead branch (optional optimisation, but do not break sibling paths)
- `autocomplete('')` — returns all words in the trie
- `search('')` — return `false` (empty string is not a word)
- `startsWith('')` — return `true` if the trie is non-empty (any word starts with empty string)
- Very long words — no practical depth limit

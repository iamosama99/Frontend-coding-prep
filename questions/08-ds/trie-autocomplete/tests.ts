// Tests for Trie
// Run: npx ts-node questions/08-ds/trie-autocomplete/tests.ts

import { Trie } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function sameElements(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

const trie = new Trie();
trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('banana');

// search
assert(trie.search('app') === true, 'search: exact word "app" → true');
assert(trie.search('apple') === true, 'search: exact word "apple" → true');
assert(trie.search('ap') === false, 'search: prefix-only "ap" → false');
assert(trie.search('') === false, 'search: empty string → false');
assert(trie.search('xyz') === false, 'search: unknown word → false');

// startsWith
assert(trie.startsWith('app') === true, 'startsWith: "app" → true');
assert(trie.startsWith('ban') === true, 'startsWith: "ban" → true');
assert(trie.startsWith('xyz') === false, 'startsWith: "xyz" → false');
assert(trie.startsWith('') === true, 'startsWith: "" → true (non-empty trie)');

// autocomplete
assert(sameElements(trie.autocomplete('app'), ['app', 'apple', 'application']), 'autocomplete: "app" returns 3 words');
assert(sameElements(trie.autocomplete('ban'), ['banana']), 'autocomplete: "ban" returns banana');
assert(sameElements(trie.autocomplete('xyz'), []), 'autocomplete: unknown prefix returns []');
assert(sameElements(trie.autocomplete(''), ['app', 'apple', 'application', 'banana']), 'autocomplete: "" returns all words');

// delete
trie.delete('apple');
assert(trie.search('apple') === false, 'delete: "apple" no longer found');
assert(trie.search('app') === true, 'delete: "app" still found after deleting "apple"');
assert(sameElements(trie.autocomplete('app'), ['app', 'application']), 'autocomplete after delete: "app" returns 2 words');

// insert same word twice
trie.insert('app');
trie.insert('app');
assert(trie.search('app') === true, 'insert duplicate: "app" still found');
assert(sameElements(trie.autocomplete('app'), ['app', 'application']), 'autocomplete after duplicate insert: still 2 words');

// delete non-existent word — no throw
try {
  trie.delete('notexist');
  assert(true, 'delete non-existent word does not throw');
} catch {
  assert(false, 'delete non-existent word does not throw');
}

// Tests for lcsLength and lcs
// Run: npx ts-node questions/08-ds/lcs/tests.ts

import { lcsLength, lcs } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// --- lcsLength ---
assert(lcsLength('abcde', 'ace') === 3, 'lcsLength: "abcde" vs "ace" → 3');
assert(lcsLength('abc', 'abc') === 3, 'lcsLength: identical strings → full length');
assert(lcsLength('abc', 'def') === 0, 'lcsLength: no common chars → 0');
assert(lcsLength('', 'abc') === 0, 'lcsLength: empty s1 → 0');
assert(lcsLength('abc', '') === 0, 'lcsLength: empty s2 → 0');
assert(lcsLength('', '') === 0, 'lcsLength: both empty → 0');
assert(lcsLength('a', 'a') === 1, 'lcsLength: single char match → 1');
assert(lcsLength('a', 'b') === 0, 'lcsLength: single char no match → 0');
assert(lcsLength('AGGTAB', 'GXTXAYB') === 4, 'lcsLength: AGGTAB vs GXTXAYB → 4');
assert(lcsLength('aabb', 'ab') === 2, 'lcsLength: repeated chars — "aabb" vs "ab" → 2');

// --- lcs ---
assert(lcs('abcde', 'ace') === 'ace', 'lcs: "abcde" vs "ace" → "ace"');
assert(lcs('abc', 'abc') === 'abc', 'lcs: identical strings returns full string');
assert(lcs('abc', 'def') === '', 'lcs: no common chars → ""');
assert(lcs('', 'abc') === '', 'lcs: empty s1 → ""');
assert(lcs('AGGTAB', 'GXTXAYB') === 'GTAB', 'lcs: AGGTAB vs GXTXAYB → "GTAB"');
assert(lcs('a', 'a') === 'a', 'lcs: single matching char → "a"');
assert(lcs('a', 'b') === '', 'lcs: single non-matching chars → ""');

// Verify length matches lcsLength
const pairs: [string, string][] = [
  ['abcde', 'ace'],
  ['AGGTAB', 'GXTXAYB'],
  ['aabbcc', 'abc'],
];
for (const [s1, s2] of pairs) {
  assert(
    lcs(s1, s2).length === lcsLength(s1, s2),
    `lcs length matches lcsLength for "${s1}" vs "${s2}"`,
  );
}

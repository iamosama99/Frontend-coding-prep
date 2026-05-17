# Longest Common Subsequence

## Problem

Given two strings, find the length of their longest common subsequence (LCS) and reconstruct the actual subsequence. A subsequence is a sequence derived by deleting some (or no) characters without changing the relative order.

## TypeScript Signature

```ts
// Returns the length of the LCS
function lcsLength(s1: string, s2: string): number

// Returns the actual LCS string (one valid answer if multiple exist)
function lcs(s1: string, s2: string): string
```

## Usage Example

```ts
lcsLength('abcde', 'ace')   // → 3   (subsequence: 'ace')
lcsLength('abc', 'abc')     // → 3   (entire string)
lcsLength('abc', 'def')     // → 0   (nothing in common)
lcsLength('', 'abc')        // → 0

lcs('abcde', 'ace')         // → 'ace'
lcs('AGGTAB', 'GXTXAYB')    // → 'GTAB'
lcs('abc', 'def')           // → ''
```

## Algorithm

Build a 2D DP table where `dp[i][j]` = LCS length of `s1[0..i-1]` and `s2[0..j-1]`:

```
dp[0][j] = 0  for all j   (empty s1)
dp[i][0] = 0  for all i   (empty s2)

if s1[i-1] === s2[j-1]:
  dp[i][j] = dp[i-1][j-1] + 1
else:
  dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

To reconstruct: start at `dp[m][n]`, trace back diagonally when characters match, otherwise move to the larger of `dp[i-1][j]` or `dp[i][j-1]`.

## Constraints

- Time complexity O(m × n), space complexity O(m × n) for the full table
- Build a `(m+1) × (n+1)` table (extra row/column of zeros as base case)
- `lcs` should use the same DP table to reconstruct — don't compute the table twice

## Edge Cases

- Either string is empty — LCS length is 0, LCS string is `''`
- Both strings identical — LCS is the string itself
- No characters in common — LCS length is 0, LCS string is `''`
- Single character strings — length 1 if equal, 0 if not
- One string is a subsequence of the other — LCS equals the shorter string
- Strings with repeated characters — algorithm must count distinct subsequence matches, not occurrences

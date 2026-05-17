// TODO 1: implement lcsLength(s1, s2): number.
//   Build a (m+1) x (n+1) DP table where m = s1.length, n = s2.length.
//   Initialise all values to 0 (the extra row/column handles the base cases).
//   Fill row by row:
//     if s1[i-1] === s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
//     else:                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
//   Return dp[m][n].

export function lcsLength(_s1: string, _s2: string): number {
  throw new Error('Not implemented');
}

// TODO 2: implement lcs(s1, s2): string.
//   Build the same DP table (or share a helper function).
//   Trace back from dp[m][n]:
//     While i > 0 and j > 0:
//       if s1[i-1] === s2[j-1]: prepend s1[i-1] to result, i--, j--
//       else if dp[i-1][j] > dp[i][j-1]: i--
//       else: j--
//   Return the reconstructed string (built in reverse, so prepend or reverse at end).

export function lcs(_s1: string, _s2: string): string {
  throw new Error('Not implemented');
}

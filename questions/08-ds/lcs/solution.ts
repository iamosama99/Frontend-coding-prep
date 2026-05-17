function buildTable(s1: string, s2: string): number[][] {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
}

export function lcsLength(s1: string, s2: string): number {
  const dp = buildTable(s1, s2);
  return dp[s1.length][s2.length];
}

export function lcs(s1: string, s2: string): string {
  const dp = buildTable(s1, s2);
  let i = s1.length;
  let j = s2.length;
  const result: string[] = [];

  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      result.push(s1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result.reverse().join('');
}

# Bundle Size Optimization

## Problem

You're given a module that has several bundle size problems. Refactor it to apply tree shaking, dynamic imports, and proper named-import patterns. Also implement a `getBundleStats` utility that parses a webpack-bundle-analyzer JSON report and returns a summary of the largest chunks and potential savings.

## API Signature

```ts
interface ChunkInfo {
  name: string;
  sizeBytes: number;
  sizeParsed: number;
  sizeGzip: number;
  modules: Array<{ name: string; size: number }>;
}

interface BundleSummary {
  totalSizeBytes: number;
  totalGzipBytes: number;
  largestChunks: ChunkInfo[];  // top 5 by gzip size
  duplicateModules: string[];  // modules appearing in 2+ chunks
  suggestions: string[];       // actionable suggestions
}

export function getBundleStats(chunks: ChunkInfo[]): BundleSummary

// Problematic import patterns to fix (exported so tests can verify the fix)
export { format } from './fixed-imports';
```

## Usage Example

```ts
const stats = getBundleStats([
  {
    name: 'main',
    sizeBytes: 500_000,
    sizeParsed: 480_000,
    sizeGzip: 120_000,
    modules: [
      { name: 'lodash/lodash.js', size: 200_000 },
      { name: './src/App.tsx', size: 50_000 },
    ],
  },
  // ...more chunks
]);

stats.largestChunks; // top 5 sorted by gzip size
stats.duplicateModules; // ['react-dom', 'lodash'] etc.
stats.suggestions;
// [
//   "lodash/lodash.js (200KB) in main — use lodash-es or cherry-pick imports",
//   "react-dom appears in 2 chunks — ensure it's in a shared vendor chunk",
// ]
```

## Constraints

- `largestChunks` contains at most 5 items, sorted by `sizeGzip` descending
- A module is "duplicate" if the same `module.name` appears in more than one chunk
- Suggestions must be strings — no objects
- `getBundleStats` is a pure function
- In `fixed-imports.ts`: import only the `format` function from `date-fns` (named import), not the entire library

## Edge Cases

- Empty `chunks` array — returns zeroed summary with empty arrays
- Chunk with empty `modules` array — included in size totals, no suggestions for that chunk
- All chunks below 50KB — `suggestions` may be empty
- Same module name appears 3+ times — listed once in `duplicateModules`
- `sizeGzip` is 0 for a chunk (e.g. inlined script) — include in totals but exclude from suggestions

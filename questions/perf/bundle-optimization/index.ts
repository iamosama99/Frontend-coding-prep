// Bundle Size Optimization

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
  largestChunks: ChunkInfo[];
  duplicateModules: string[];
  suggestions: string[];
}

// TODO 1: Sum up totalSizeBytes and totalGzipBytes across all chunks.

// TODO 2: Sort chunks by sizeGzip descending and take the top 5 for largestChunks.

// TODO 3: Find duplicate modules — a module is duplicate if the same name appears
//         in more than one chunk. Return unique names only (even if it appears 3+ times).
//         Hint: build a Map<moduleName, count> across all chunk.modules arrays.

// TODO 4: Generate suggestions array. At minimum:
//         - Flag any module > 100KB in a chunk with a specific message
//         - Flag duplicate modules with a "ensure shared chunk" message
//         Keep suggestions as plain strings.

// TODO 5: Handle the empty chunks case — return all zeros, empty arrays.

export function getBundleStats(chunks: ChunkInfo[]): BundleSummary {
  throw new Error('Not implemented');
}

// --- Bad import patterns (comment explains the problem, fix them below) ---

// BAD: imports entire lodash bundle (~70KB gzipped)
// import _ from 'lodash';
// const result = _.merge({}, obj);

// GOOD: cherry-pick the function you need
// import merge from 'lodash/merge';
// — or use lodash-es for full tree-shaking:
// import { merge } from 'lodash-es';

// BAD: side-effect import of entire moment locale set
// import 'moment/locale/fr';
// import moment from 'moment';

// GOOD: use date-fns with named imports (tree-shakeable)
// import { format, parseISO } from 'date-fns';

// TODO: export `format` from date-fns as a named re-export
// This forces you to use the correct named import pattern.
export { format } from 'date-fns';

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

export function getBundleStats(chunks: ChunkInfo[]): BundleSummary {
  if (chunks.length === 0) {
    return { totalSizeBytes: 0, totalGzipBytes: 0, largestChunks: [], duplicateModules: [], suggestions: [] };
  }

  const totalSizeBytes = chunks.reduce((sum, c) => sum + c.sizeBytes, 0);
  const totalGzipBytes = chunks.reduce((sum, c) => sum + c.sizeGzip, 0);

  const largestChunks = [...chunks]
    .sort((a, b) => b.sizeGzip - a.sizeGzip)
    .slice(0, 5);

  // Count how many chunks each module name appears in
  const moduleChunkCount = new Map<string, number>();
  for (const chunk of chunks) {
    const seen = new Set<string>();
    for (const mod of chunk.modules) {
      if (!seen.has(mod.name)) {
        seen.add(mod.name);
        moduleChunkCount.set(mod.name, (moduleChunkCount.get(mod.name) ?? 0) + 1);
      }
    }
  }

  const duplicateModules = [...moduleChunkCount.entries()]
    .filter(([, count]) => count > 1)
    .map(([name]) => name);

  const suggestions: string[] = [];

  for (const chunk of chunks) {
    for (const mod of chunk.modules) {
      if (mod.size > 100_000) {
        suggestions.push(
          `"${mod.name}" in chunk "${chunk.name}" is ${Math.round(mod.size / 1024)}KB — consider tree-shaking or a lighter alternative`
        );
      }
    }
  }

  if (duplicateModules.length > 0) {
    suggestions.push(
      `Duplicate modules detected (${duplicateModules.join(', ')}) — ensure a shared chunk via splitChunks or vendor entry`
    );
  }

  return { totalSizeBytes, totalGzipBytes, largestChunks, duplicateModules, suggestions };
}

export { format } from 'date-fns';

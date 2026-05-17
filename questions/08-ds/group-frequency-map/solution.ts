export function groupBy<T>(
  arr: T[],
  key: (item: T) => string,
): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

export function frequencyMap<T>(
  arr: T[],
  key?: (item: T) => string,
  topK?: number,
): Array<{ value: string; count: number }> {
  const counts = new Map<string, number>();
  for (const item of arr) {
    const k = key ? key(item) : String(item);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }

  const entries = Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);

  if (topK !== undefined) return entries.slice(0, topK);
  return entries;
}

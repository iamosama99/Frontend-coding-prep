// TODO 1: implement groupBy<T>(arr, key): Record<string, T[]>.
//   For each element, compute key(element).
//   If that key doesn't exist in the result, initialise it to [].
//   Push the element into result[computedKey].

export function groupBy<T>(
  _arr: T[],
  _key: (item: T) => string,
): Record<string, T[]> {
  throw new Error('Not implemented');
}

// TODO 2: implement frequencyMap<T>(arr, key?, topK?).
//   a) Build a Map<string, number> counting occurrences:
//      for each item, resolve its string value via key?.(item) ?? String(item).
//   b) Convert the Map to an array of { value, count } objects.
//   c) Sort descending by count (stable — Map preserves insertion order, so equal
//      counts keep their original relative order after a stable sort).
//   d) If topK is defined, slice to topK.

export function frequencyMap<T>(
  _arr: T[],
  _key?: (item: T) => string,
  _topK?: number,
): Array<{ value: string; count: number }> {
  throw new Error('Not implemented');
}

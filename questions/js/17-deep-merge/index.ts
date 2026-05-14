export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  // TODO 1: Start with a shallow copy of target: { ...target }
  // TODO 2: Iterate over the keys of source
  // TODO 3: For each key: if both target[key] and source[key] are plain objects (not arrays, not null),
  //         recurse: result[key] = deepMerge(target[key], source[key])
  // TODO 4: Otherwise, source[key] wins: result[key] = source[key]
  // TODO 5: Return the merged result
  throw new Error('Not implemented');
}

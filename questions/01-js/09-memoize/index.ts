export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  // TODO 1: Create a Map to store cached results (key: string, value: return type of fn)
  // TODO 2: Return a new function with the same signature as fn
  // TODO 3: Inside that function, serialise args to a cache key using JSON.stringify
  // TODO 4: Check if the key exists in the cache — if yes, return cached value
  // TODO 5: If not, call fn(...args), store in cache, and return the result
  throw new Error('Not implemented');
}

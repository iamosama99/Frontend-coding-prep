export function groupBy<T extends Record<string, unknown>>(
  arr: T[],
  key: keyof T
): Record<string, T[]> {
  // TODO 1: Use arr.reduce to build up an accumulator object
  // TODO 2: For each item, get the value at item[key] — convert to string for use as object key
  // TODO 3: If the key doesn't exist in the accumulator yet, initialise it as an empty array
  // TODO 4: Push the current item into accumulator[groupKey]
  // TODO 5: Return the accumulator
  throw new Error('Not implemented');
}

export function myMap<T, U>(
  arr: T[],
  callback: (item: T, index: number, array: T[]) => U
): U[] {
  // TODO 1: Create an empty result array
  // TODO 2: Loop over arr with a for loop (do NOT use .map/.forEach)
  // TODO 3: Call callback(arr[i], i, arr) and push the result
  // TODO 4: Return the result array
  throw new Error('Not implemented');
}

export function myFilter<T>(
  arr: T[],
  callback: (item: T, index: number, array: T[]) => boolean
): T[] {
  // TODO 1: Create an empty result array
  // TODO 2: Loop over arr — if callback returns true, push the item
  // TODO 3: Return result
  throw new Error('Not implemented');
}

export function myReduce<T, U>(
  arr: T[],
  callback: (acc: U, item: T, index: number, array: T[]) => U,
  initialValue: U
): U {
  // TODO 1: Start with acc = initialValue
  // TODO 2: Loop over arr — update acc = callback(acc, arr[i], i, arr) each step
  // TODO 3: Return the final acc
  throw new Error('Not implemented');
}

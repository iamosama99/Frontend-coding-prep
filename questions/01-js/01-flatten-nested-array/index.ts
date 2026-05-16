type NestedArray<T> = (T | NestedArray<T>)[];

export function flattenArray(arr: NestedArray<number>): number[] {
  // TODO 1: Base case — what does an empty array return?
  // TODO 2: Iterate through each element
  // TODO 3: Check if the current element is an array (use Array.isArray)
  // TODO 4: If it is, recursively flatten it and spread the results in
  // TODO 5: If it isn't, push the value directly
  throw new Error('Not implemented');
}

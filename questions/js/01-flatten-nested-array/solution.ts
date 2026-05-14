type NestedArray<T> = (T | NestedArray<T>)[];

export function flattenArray(arr: NestedArray<number>): number[] {
  // TODO: implement solution
}

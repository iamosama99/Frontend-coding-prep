export function myMap<T, U>(
  arr: T[],
  callback: (item: T, index: number, array: T[]) => U
): U[] {
  // TODO: implement solution
}

export function myFilter<T>(
  arr: T[],
  callback: (item: T, index: number, array: T[]) => boolean
): T[] {
  // TODO: implement solution
}

export function myReduce<T, U>(
  arr: T[],
  callback: (acc: U, item: T, index: number, array: T[]) => U,
  initialValue: U
): U {
  // TODO: implement solution
}

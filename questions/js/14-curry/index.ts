export function curry(fn: (...args: any[]) => any): (...args: any[]) => any {
  // TODO 1: Create an inner function `curried` that accepts any number of args
  // TODO 2: Check if the accumulated args length >= fn.length (enough to call fn)
  //         If yes: call fn(...args) and return the result
  //         If no:  return a new function that, when called, recurses with [...args, ...newArgs]
  // TODO 3: Return `curried` as the result
  throw new Error('Not implemented');
}

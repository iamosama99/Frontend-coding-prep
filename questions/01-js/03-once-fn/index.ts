export function once<T extends (...args: any[]) => any>(fn: T): T {
  // TODO 1: Declare a `called` boolean flag, initially false
  // TODO 2: Declare a variable to store the cached result
  // TODO 3: Return a new function (with the same signature as fn)
  // TODO 4: Inside that function, check the flag — if not yet called, invoke fn, store result, set flag
  // TODO 5: After first call, null out the fn reference so it can be garbage collected
  // TODO 6: Always return the cached result
  throw new Error('Not implemented');
}

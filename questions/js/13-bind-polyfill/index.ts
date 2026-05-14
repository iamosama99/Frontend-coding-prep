export function myBind(fn: Function, thisArg: any, ...boundArgs: any[]): (...args: any[]) => any {
  // TODO 1: Return a new function (use a regular `function`, not an arrow, to support `new`)
  // TODO 2: Inside, check if the returned function is being called with `new`:
  //         use `this instanceof BoundFn` where BoundFn is the returned function
  // TODO 3: If called with `new`: call fn with `new` context (use `new fn(...allArgs)`)
  //         If called normally: call fn.apply(thisArg, [...boundArgs, ...args])
  // TODO 4: Merge boundArgs (pre-applied) with any new args passed at call time
  throw new Error('Not implemented');
}

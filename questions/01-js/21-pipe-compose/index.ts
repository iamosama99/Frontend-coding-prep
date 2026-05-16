export function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  // TODO 1: Return a function that takes an initial value x
  // TODO 2: Use fns.reduce((value, fn) => fn(value), x) — left to right
  throw new Error('Not implemented');
}

export function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  // TODO 1: Return a function that takes an initial value x
  // TODO 2: Use fns.reduceRight((value, fn) => fn(value), x) — right to left
  throw new Error('Not implemented');
}

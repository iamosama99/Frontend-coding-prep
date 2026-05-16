export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  // TODO 1: Declare a variable to track the last time fn was called (e.g. lastTime = 0)
  // TODO 2: Return a new function with the same args as fn
  // TODO 3: Inside, get the current timestamp with Date.now()
  // TODO 4: Check if enough time has passed: Date.now() - lastTime >= interval
  // TODO 5: If yes, update lastTime and call fn(...args)
  // TODO 6: If no, do nothing (drop the call)
  throw new Error('Not implemented');
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  // TODO 1: Declare a variable to hold the timer ID (ReturnType<typeof setTimeout>)
  // TODO 2: Return a new function that accepts the same args as fn
  // TODO 3: Inside the returned function, clear the existing timer (clearTimeout)
  // TODO 4: Start a new timer with setTimeout that calls fn(...args) after `delay` ms
  // TODO 5: Store the new timer ID so the next call can cancel it
  throw new Error('Not implemented');
}

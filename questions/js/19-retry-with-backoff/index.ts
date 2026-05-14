function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs: number = 100
): Promise<T> {
  // TODO 1: Use a loop or recursion — loop is simpler here
  // TODO 2: For attempt 0..retries (inclusive), try calling fn()
  // TODO 3: If fn() resolves, return the result immediately
  // TODO 4: If fn() rejects:
  //         - If this was the last attempt (no retries left), re-throw the error
  //         - Otherwise, wait delayMs * (attempt + 1) ms before the next try
  throw new Error('Not implemented');
}

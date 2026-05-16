export function promiseRace<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((resolve, reject) => {
    // TODO 1: Loop over every promise
    // TODO 2: Attach .then(resolve) and .catch(reject) to each one
    //         Because a Promise can only settle once, calling resolve/reject
    //         multiple times is safe — only the first call has any effect
    throw new Error('Not implemented');
  });
}

export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    // TODO 1: Handle empty input — resolve immediately with []
    // TODO 2: Create a results array of the same length as promises
    // TODO 3: Keep a counter of how many promises have resolved
    // TODO 4: For each promise, attach .then and .catch handlers
    //         In .then: store the resolved value at the correct index, increment counter
    //         When counter === promises.length, resolve with the results array
    //         In .catch: call reject immediately with the error
    throw new Error('Not implemented');
  });
}

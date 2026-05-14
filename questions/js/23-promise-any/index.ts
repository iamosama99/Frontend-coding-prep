export function promiseAny<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((resolve, reject) => {
    // TODO 1: Handle empty array — reject immediately with AggregateError (errors: [])
    // TODO 2: Track rejection reasons and a rejection counter
    // TODO 3: For each promise:
    //         .then → resolve immediately with the value (first fulfillment wins)
    //         .catch → store the reason at the correct index, increment rejection counter
    //                  when all have rejected, reject with AggregateError(reasons, 'All promises were rejected')
    throw new Error('Not implemented');
  });
}

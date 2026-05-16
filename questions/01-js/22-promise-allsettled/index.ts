type SettledResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: any };

export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<SettledResult<T>[]> {
  // TODO 1: Wrap each promise with .then and .catch so it always resolves
  //         .then(value => ({ status: 'fulfilled', value }))
  //         .catch(reason => ({ status: 'rejected', reason }))
  // TODO 2: Use Promise.all (the native one, or your own) on the wrapped array
  //         Since each wrapped promise always fulfills, Promise.all will always resolve
  throw new Error('Not implemented');
}

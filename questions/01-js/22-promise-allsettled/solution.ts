type SettledResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: any };

export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<SettledResult<T>[]> {
  // TODO: implement solution
}

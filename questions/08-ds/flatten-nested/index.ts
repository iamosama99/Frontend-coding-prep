// TODO 1: implement flattenArray without using Array.prototype.flat.
//   Two valid approaches:
//   a) Recursive: for each element, if it's an array, spread flattenArray(el);
//      otherwise push it.
//   b) Iterative stack: push all elements onto a stack in reverse; pop one at a time —
//      if it's an array, push its elements back (in reverse) onto the stack.

export function flattenArray(_arr: unknown[]): unknown[] {
  throw new Error('Not implemented');
}

// TODO 2: implement flattenObject with dot-key flattening.
//   For each key in obj:
//   - Build the full key: prefix ? `${prefix}.${key}` : key
//   - If the value is a plain object (typeof === 'object', not null, not Array),
//     recurse: Object.assign(result, flattenObject(value, fullKey))
//   - Otherwise, set result[fullKey] = value
//   Return the accumulated result object.

export function flattenObject(
  _obj: Record<string, unknown>,
  _prefix?: string,
): Record<string, unknown> {
  throw new Error('Not implemented');
}

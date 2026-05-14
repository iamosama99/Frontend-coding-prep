export function flattenObject(
  obj: Record<string, any>,
  prefix: string = ''
): Record<string, any> {
  // TODO 1: Create an empty result object
  // TODO 2: Iterate over each key in obj
  // TODO 3: Build the full key: prefix ? `${prefix}.${key}` : key
  // TODO 4: If the value is a non-null plain object (and not an array), recurse
  //         and spread the recursive result into the result object
  // TODO 5: Otherwise, set result[fullKey] = value (leaf node)
  // TODO 6: Return result
  throw new Error('Not implemented');
}

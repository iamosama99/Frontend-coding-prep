export function flattenArray(arr: unknown[]): unknown[] {
  const result: unknown[] = [];
  for (const el of arr) {
    if (Array.isArray(el)) {
      result.push(...flattenArray(el));
    } else {
      result.push(el);
    }
  }
  return result;
}

export function flattenObject(
  obj: Record<string, unknown>,
  prefix = '',
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

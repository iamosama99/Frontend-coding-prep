import { useState, useEffect, useCallback } from 'react';

// TODO: implement solution
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  throw new Error('Not implemented');
}

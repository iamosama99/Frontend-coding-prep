import { useEffect, useRef } from 'react';

// TODO: implement solution
export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: EventTarget | null
): void {
  throw new Error('Not implemented');
}

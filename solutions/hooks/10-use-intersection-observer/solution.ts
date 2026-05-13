import { useRef, useState, useEffect } from 'react';

interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

// TODO: implement solution
export function useIntersectionObserver(
  options?: IntersectionOptions
): { ref: React.RefObject<HTMLElement>; isIntersecting: boolean } {
  throw new Error('Not implemented');
}

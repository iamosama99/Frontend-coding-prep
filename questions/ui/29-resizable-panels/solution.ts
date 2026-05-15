import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface ResizablePanelsProps {
  children: [ReactNode, ReactNode];
  direction?: 'horizontal' | 'vertical';
  defaultSplit?: number;
  minSize?: number;
  maxSize?: number;
  onResize?: (split: number) => void;
  className?: string;
}

// TODO: implement solution
export function ResizablePanels(_props: ResizablePanelsProps): JSX.Element {
  throw new Error('Not implemented');
}

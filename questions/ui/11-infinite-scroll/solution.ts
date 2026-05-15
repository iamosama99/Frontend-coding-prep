import { useRef, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface InfiniteScrollProps {
  onLoadMore: () => Promise<void> | void;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
  loader?: ReactNode;
  endMessage?: ReactNode;
  children: ReactNode;
}

// TODO: implement solution
export function InfiniteScroll(_props: InfiniteScrollProps): JSX.Element {
  throw new Error('Not implemented');
}

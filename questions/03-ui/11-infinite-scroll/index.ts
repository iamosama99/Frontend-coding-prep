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

// TODO 1: Create a ref for the sentinel element (a <div> placed at the bottom of the list).
//   This sentinel is the target for the IntersectionObserver.

// TODO 2: Set up the IntersectionObserver in a useEffect.
//   - Options: { rootMargin: `0px 0px ${threshold ?? 200}px 0px` }
//   - In the callback: if entry.isIntersecting AND hasMore AND NOT loading, call onLoadMore().
//   - Attach the observer to sentinelRef.current.
//   - Return a cleanup that calls observer.disconnect().
//   - Re-run when [hasMore, loading, onLoadMore, threshold] change.

// TODO 3: Wrap onLoadMore in useCallback to avoid observer recreation on every render.
//   Include onLoadMore in the dependency array.

// TODO 4: Render the component structure.
//   - A wrapper <div>.
//   - {children} — the list content.
//   - Conditionally: the sentinel <div ref={sentinelRef}> only when hasMore is true.
//   - Conditionally: the loader element when loading is true.
//   - Conditionally: the endMessage when hasMore is false.

// TODO 5: Handle the guard against double-trigger.
//   - If `loading` is true when the observer fires, skip the onLoadMore call.
//   - Alternatively, disconnect the observer when loading starts and reconnect when done
//     (this requires additional logic but is more robust).

export function InfiniteScroll(_props: InfiniteScrollProps): JSX.Element {
  throw new Error('Not implemented');
}

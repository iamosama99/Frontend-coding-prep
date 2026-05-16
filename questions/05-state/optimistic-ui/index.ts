import { useState, useRef, useCallback } from 'react'

interface LikeState {
  count: number
  liked: boolean
  pending: boolean
  error: Error | null
}

interface UseLikeButtonOptions {
  initialCount: number
  initialLiked: boolean
  onLike: (liked: boolean) => Promise<{ count: number }>
}

/**
 * TODO 1: Initialise state with { count: initialCount, liked: initialLiked,
 *         pending: false, error: null }.
 *
 * TODO 2: Implement toggle:
 *   a. If pending, return early (ignore rapid double-clicks).
 *   b. Capture the rollback snapshot (current count and liked values).
 *   c. Apply the optimistic update immediately:
 *      - liked flips, count goes up by 1 (if liking) or down by 1 (if unliking).
 *      - Set pending: true, error: null.
 *   d. Call onLike(newLiked) and await the result.
 *   e. On success: update count from the server response, set pending: false.
 *   f. On failure: revert to the rollback snapshot, set error, set pending: false.
 *
 * TODO 3: Guard against setState after unmount using a mounted ref:
 *   const mounted = useRef(true)
 *   useEffect(() => () => { mounted.current = false }, [])
 *   Only call setState if mounted.current is true.
 *
 * TODO 4: Wrap toggle in useCallback so it has a stable reference.
 *
 * TODO 5: Return { state, toggle }.
 */
export function useLikeButton({ initialCount, initialLiked, onLike }: UseLikeButtonOptions) {
  // TODO: implement
  throw new Error('Not implemented')
}

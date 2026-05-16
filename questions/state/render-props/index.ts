import { useState, useEffect, ReactNode } from 'react'

interface MousePosition {
  x: number
  y: number
}

interface MouseTrackerProps {
  render: (position: MousePosition) => ReactNode
}

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface DataFetcherProps<T> {
  url: string
  render?: (state: FetchState<T>) => ReactNode
  children?: (state: FetchState<T>) => ReactNode
}

/**
 * TODO 1 (MouseTracker): useState for { x, y } defaulting to { x: 0, y: 0 }.
 *         useEffect to add a mousemove listener on window; update state in the
 *         handler. Return the cleanup (removeEventListener) from the effect.
 *         Render by calling props.render(position).
 *
 * TODO 2 (DataFetcher): useState for { data: null, loading: true, error: null }.
 *         useEffect that creates an AbortController, fetches the url, and
 *         handles the response:
 *           - Set loading: false on completion.
 *           - On HTTP error (res.ok === false), set error.
 *           - On network error, set error (but ignore AbortError).
 *         Return () => controller.abort() as the cleanup.
 *         Re-run the effect when url changes.
 *
 * TODO 3 (DataFetcher): Prefer props.render over props.children if both exist.
 *         If neither, return null.
 *
 * TODO 4: Make DataFetcher generic — DataFetcher<T> — so callers get typed data.
 */
export function MouseTracker({ render }: MouseTrackerProps): ReactNode {
  // TODO: implement
  throw new Error('Not implemented')
}

export function DataFetcher<T>({ url, render, children }: DataFetcherProps<T>): ReactNode {
  // TODO: implement
  throw new Error('Not implemented')
}

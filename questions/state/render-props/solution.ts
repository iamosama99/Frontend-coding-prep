import { ReactNode } from 'react'

interface MousePosition { x: number; y: number }
interface MouseTrackerProps { render: (position: MousePosition) => ReactNode }
interface FetchState<T> { data: T | null; loading: boolean; error: Error | null }
interface DataFetcherProps<T> {
  url: string
  render?: (state: FetchState<T>) => ReactNode
  children?: (state: FetchState<T>) => ReactNode
}

// TODO: implement solution
export function MouseTracker({ render }: MouseTrackerProps): ReactNode {
  throw new Error('Not implemented')
}

export function DataFetcher<T>({ url, render, children }: DataFetcherProps<T>): ReactNode {
  throw new Error('Not implemented')
}

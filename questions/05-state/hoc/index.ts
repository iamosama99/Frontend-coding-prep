import { ComponentType, useEffect, useRef } from 'react'

interface LoggerOptions {
  logMount?: boolean
  logUnmount?: boolean
  logPropChanges?: boolean
}

/**
 * TODO 1: Accept a generic type parameter P extending object so the returned
 *         component has the same prop types as the wrapped one.
 *
 * TODO 2: Derive the display name — use Component.displayName ?? Component.name,
 *         falling back to 'Component' if both are empty.
 *
 * TODO 3: Inside the wrapped component, use useEffect with an empty dependency
 *         array to log mount (and return a cleanup fn for unmount).
 *
 * TODO 4: Track previous props with useRef. On each render, compare current
 *         props to the ref. Log changed keys, then update the ref.
 *
 * TODO 5: Respect the options flags — skip logs when the option is false.
 *
 * TODO 6: Set Wrapped.displayName = `withLogger(${name})` before returning.
 */
export function withLogger<P extends object>(
  Component: ComponentType<P>,
  options: LoggerOptions = {}
): ComponentType<P> {
  // TODO: implement
  throw new Error('Not implemented')
}

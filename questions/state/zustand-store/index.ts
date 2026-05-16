import { useSyncExternalStore } from 'react'

type Listener = () => void
type Selector<S, T> = (state: S) => T

interface Store<S> {
  getState(): S
  setState(partial: Partial<S> | ((state: S) => Partial<S>)): void
  subscribe(listener: Listener): () => void
}

/**
 * TODO 1: Implement createStore.
 *   - Hold state in a closure variable.
 *   - Hold listeners in a Set<Listener>.
 *   - getState: return state (same reference, not a clone).
 *   - setState: compute the next partial (call the function if it's a function),
 *     shallow-merge into state with { ...state, ...partial },
 *     then call all listeners.
 *   - subscribe: add listener to the Set, return () => listeners.delete(fn).
 *
 * TODO 2: Implement useStore using useSyncExternalStore:
 *   - First arg: store.subscribe (already the right shape).
 *   - Second arg: a snapshot function — () => selector(store.getState()).
 *   - useSyncExternalStore handles subscription, tearing prevention, and
 *     will only re-render when the snapshot (selected value) changes.
 *
 * TODO 3 (alternative if avoiding useSyncExternalStore):
 *   - useState initialised with selector(store.getState()).
 *   - useEffect: subscribe to store, compare new selected value with
 *     the previous one (useRef), and only call setState if they differ.
 *   - Return the cleanup (unsubscribe) from the effect.
 *
 * TODO 4: Consider the functional setState case — if the argument is a function,
 *   call it with current state to get the partial; otherwise use it directly.
 */
export function createStore<S>(initialState: S): Store<S> {
  // TODO: implement
  throw new Error('Not implemented')
}

export function useStore<S, T>(store: Store<S>, selector: Selector<S, T>): T {
  // TODO: implement
  throw new Error('Not implemented')
}

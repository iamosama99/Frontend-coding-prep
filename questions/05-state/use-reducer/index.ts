import { useState } from 'react'

type Reducer<S, A> = (state: S, action: A) => S
type Dispatch<A> = (action: A) => void

/**
 * Implement useReducer using only useState internally.
 *
 * TODO 1: Set up internal state using useState with initialState.
 *
 * TODO 2: Create a dispatch function that calls the reducer with the
 *         current state and the given action, then updates state.
 *
 * TODO 3: Use the functional form of setState so you always get the
 *         latest state (avoids stale closure in rapid dispatches).
 *
 * TODO 4: Return [state, dispatch] as a tuple.
 *
 * TODO 5: Consider what happens when the reducer returns the same
 *         reference — does React re-render? Should it?
 */
export function useReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S
): [S, Dispatch<A>] {
  // TODO: implement
  throw new Error('Not implemented')
}

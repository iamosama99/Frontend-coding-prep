type Reducer<S, A> = (state: S | undefined, action: A) => S
type Listener = () => void
type Unsubscribe = () => void

interface Store<S, A> {
  getState(): S
  dispatch(action: A): void
  subscribe(listener: Listener): Unsubscribe
}

/**
 * TODO 1: Implement createStore.
 *   - Store state in a closure variable (initialise from preloadedState or undefined).
 *   - Store listeners in an array.
 *   - dispatch: call reducer(currentState, action), store result, notify listeners.
 *   - subscribe: push listener, return a function that splices it out.
 *   - Fire an INIT action immediately so the reducer sets its default state.
 *
 * TODO 2: Implement combineReducers.
 *   - Takes an object mapping keys to slice reducers.
 *   - Returns a single reducer that calls each slice reducer with its slice of state.
 *   - The root state shape mirrors the keys of the input object.
 *   - Tip: use Object.keys to iterate; build the next state object and check if
 *     any slice actually changed (reference equality) before returning a new object.
 *
 * TODO 3: Protect against unsubscribing a listener that was already removed.
 *
 * TODO 4: When dispatching, snapshot the listener array before iterating
 *         so mutations during dispatch don't cause skipped or double calls.
 *
 * TODO 5: Type the INIT action separately so it doesn't interfere with user actions.
 */
export function createStore<S, A>(
  reducer: Reducer<S, A>,
  preloadedState?: S
): Store<S, A> {
  // TODO: implement
  throw new Error('Not implemented')
}

export function combineReducers<S extends Record<string, unknown>>(
  reducers: { [K in keyof S]: Reducer<S[K], unknown> }
): Reducer<S, unknown> {
  // TODO: implement
  throw new Error('Not implemented')
}

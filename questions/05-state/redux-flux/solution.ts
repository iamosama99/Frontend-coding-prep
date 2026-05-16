// TODO: implement solution

type Reducer<S, A> = (state: S | undefined, action: A) => S
type Listener = () => void
type Unsubscribe = () => void

interface Store<S, A> {
  getState(): S
  dispatch(action: A): void
  subscribe(listener: Listener): Unsubscribe
}

export function createStore<S, A>(
  reducer: Reducer<S, A>,
  preloadedState?: S
): Store<S, A> {
  throw new Error('Not implemented')
}

export function combineReducers<S extends Record<string, unknown>>(
  reducers: { [K in keyof S]: Reducer<S[K], unknown> }
): Reducer<S, unknown> {
  throw new Error('Not implemented')
}

// TODO: implement solution

type Listener = () => void
type Selector<S, T> = (state: S) => T

interface Store<S> {
  getState(): S
  setState(partial: Partial<S> | ((state: S) => Partial<S>)): void
  subscribe(listener: Listener): () => void
}

export function createStore<S>(initialState: S): Store<S> {
  throw new Error('Not implemented')
}

export function useStore<S, T>(store: Store<S>, selector: Selector<S, T>): T {
  throw new Error('Not implemented')
}

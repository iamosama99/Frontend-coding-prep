# Redux / Flux from Scratch

Implement a minimal Redux-style store with `createStore`, `dispatch`, `getState`, `subscribe`, and `combineReducers`.

## TypeScript Signature

```ts
type Reducer<S, A> = (state: S | undefined, action: A) => S
type Listener = () => void
type Unsubscribe = () => void

interface Store<S, A> {
  getState(): S
  dispatch(action: A): void
  subscribe(listener: Listener): Unsubscribe
}

function createStore<S, A>(
  reducer: Reducer<S, A>,
  preloadedState?: S
): Store<S, A>

function combineReducers<S extends Record<string, unknown>>(
  reducers: { [K in keyof S]: Reducer<S[K], any> }
): Reducer<S, any>
```

## Usage Example

```ts
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' }

function counter(state = 0, action: Action): number {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    case 'DECREMENT': return state - 1
    default: return state
  }
}

const store = createStore(counter)

store.subscribe(() => console.log('state:', store.getState()))

store.dispatch({ type: 'INCREMENT' })  // logs: state: 1
store.dispatch({ type: 'INCREMENT' })  // logs: state: 2
store.dispatch({ type: 'DECREMENT' })  // logs: state: 1
```

## Constraints

- `getState()` returns the current state snapshot
- `dispatch(action)` runs the reducer, updates state, and calls all listeners
- `subscribe(listener)` returns an unsubscribe function; calling it removes the listener
- `combineReducers` merges multiple slice reducers into one root reducer
- Must dispatch an `{ type: '@@INIT' }` action on creation to populate initial state

## Edge Cases

- `unsubscribe()` called during a dispatch (listener is mid-notification)
- Multiple listeners — all must be called in subscription order
- `combineReducers` with a slice reducer that returns `undefined` — should throw
- Dispatching during a listener callback (reentrant dispatch)
- `preloadedState` overrides the reducer's default state
- Listener array mutated while iterating during dispatch

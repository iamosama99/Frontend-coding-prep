# useReducer from Scratch

Implement a `useReducer` hook that mirrors React's built-in `useReducer` API.

## TypeScript Signature

```ts
type Reducer<S, A> = (state: S, action: A) => S
type Dispatch<A> = (action: A) => void

function useReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S
): [S, Dispatch<A>]
```

## Usage Example

```ts
type State = { count: number }
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' }

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    case 'reset':     return { count: 0 }
    default:          return state
  }
}

const [state, dispatch] = useReducer(counterReducer, { count: 0 })
dispatch({ type: 'increment' })
// state.count === 1
```

## Constraints

- Must trigger a re-render when state changes (use `useState` internally)
- The reducer must be a pure function — no side effects
- Dispatching the same action twice must produce consistent results
- Must be callable at the top level of a React component (follows rules of hooks)

## Edge Cases

- Reducer returns the same state reference — should NOT re-render (React bails out)
- Dispatching during render (not in an effect or handler)
- Multiple dispatches in the same event handler — batched in React 18
- Reducer throws — error should bubble up naturally
- `initialState` is `null` or `undefined`
- Complex nested state object — reducer must return new reference, not mutate

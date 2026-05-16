# State & Patterns — Study Guide

## Core Mental Model

State management in React is about **where data lives and who owns it**. The rule of thumb: lift state to the lowest common ancestor that needs it. When that ancestor becomes the app root, you reach for external solutions (Context, Redux, Zustand). Every pattern in this category solves the same problem — *how do components share and react to state changes* — with different trade-offs around coupling, re-renders, and testability.

The fundamental insight behind React's model: **state is a snapshot**. Each render captures a closure over a particular state value. Stale state bugs arise when you hold a reference to an old closure. This is why `useReducer` pairs well with complex state — the reducer is always called with the *current* state, not a captured one.

## Key APIs and Patterns

### useReducer

```ts
type Action = { type: 'increment' } | { type: 'set'; payload: number }
type State = { count: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'set': return { count: action.payload }
    default: return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 })
dispatch({ type: 'increment' })
```

Use `useReducer` when: next state depends on previous state in non-trivial ways, or when you have 3+ related state fields that always change together.

### Context API — the re-render trap

```ts
const CountCtx = createContext<number>(0)
const SetCtx = createContext<Dispatch<SetStateAction<number>>>(() => {})

// Split value and setter into separate contexts
// Components that only call the setter never re-render on value changes
function Provider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  return (
    <SetCtx.Provider value={setCount}>
      <CountCtx.Provider value={count}>{children}</CountCtx.Provider>
    </SetCtx.Provider>
  )
}
```

**Critical gotcha:** a single context value that is an object re-renders all consumers on every parent render, even if the data they care about didn't change. Split contexts by concern, or memoize the value object.

### HOC (Higher-Order Component)

```ts
function withLogger<P extends object>(Component: ComponentType<P>) {
  const Wrapped = (props: P) => {
    useEffect(() => { console.log('mounted', Component.displayName) }, [])
    return <Component {...props} />
  }
  Wrapped.displayName = `withLogger(${Component.displayName ?? Component.name})`
  return Wrapped
}
```

Always set `displayName` — without it, React DevTools shows `Unknown` and debugging is painful.

### Render Props

```ts
interface MouseProps {
  render: (pos: { x: number; y: number }) => ReactNode
}
function Mouse({ render }: MouseProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  return <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>{render(pos)}</div>
}
// Usage: <Mouse render={({ x, y }) => <p>{x}, {y}</p>} />
```

### Compound Components

```ts
const TabsCtx = createContext<{ active: string; setActive: (id: string) => void } | null>(null)

function Tabs({ children, defaultTab }: { children: ReactNode; defaultTab: string }) {
  const [active, setActive] = useState(defaultTab)
  return <TabsCtx.Provider value={{ active, setActive }}>{children}</TabsCtx.Provider>
}
Tabs.Tab = function Tab({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(TabsCtx)!
  return <button onClick={() => ctx.setActive(id)} aria-selected={ctx.active === id}>{children}</button>
}
```

Children share implicit state through context without explicit prop-passing — maximum composability.

### Zustand-style Store (Closure Pattern)

```ts
function createStore<T>(initialState: T) {
  let state = initialState
  const listeners = new Set<() => void>()
  return {
    getState: () => state,
    setState: (next: Partial<T>) => {
      state = { ...state, ...next }
      listeners.forEach(fn => fn())
    },
    subscribe: (fn: () => void) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    }
  }
}
```

The key: `useSyncExternalStore` (React 18) is the idiomatic way to subscribe a component to an external store without tearing.

### Finite State Machine

```ts
type State = 'idle' | 'loading' | 'success' | 'error'
type Event = 'FETCH' | 'RESOLVE' | 'REJECT' | 'RESET'

const transitions: Record<State, Partial<Record<Event, State>>> = {
  idle:    { FETCH: 'loading' },
  loading: { RESOLVE: 'success', REJECT: 'error' },
  success: { RESET: 'idle' },
  error:   { RESET: 'idle', FETCH: 'loading' },
}

function transition(state: State, event: Event): State {
  return transitions[state][event] ?? state
}
```

## Common Gotchas and Interview Mistakes

1. **Context doesn't prevent prop-drilling — it moves it.** Misusing context for local state (state only one component needs) is an antipattern.
2. **Redux without selectors is slow.** Every `useSelector` re-runs on every dispatch; memoize with `createSelector` (reselect) for derived data.
3. **HOCs break ref forwarding.** You must use `React.forwardRef` inside an HOC if the wrapped component uses refs.
4. **Optimistic updates need rollback.** Store the pre-update state before mutating, and revert on error. Don't just refetch — the server might be slow.
5. **Observer cleanup.** Every `subscribe` call must return an `unsubscribe` function; forgetting it leaks listeners.

## Interview Framing

When asked about state management:
- Start with "it depends on scope" — local, feature-level, or global?
- Name the decision tree: `useState` → `useReducer` → Context → external store
- Mention the re-render trade-off for Context immediately — interviewers probe this
- For Redux, explain the unidirectional data flow *before* the API: action → reducer → store → view
- For compound components, the magic word is "implicit state sharing via Context" — say it

When implementing a store from scratch, walk through: how state is stored (closure), how updates happen (notify pattern), and how React subscribes (useSyncExternalStore or useState + subscribe). This shows you understand both the pattern and React's rendering model.

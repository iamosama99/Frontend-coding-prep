# Zustand-Style Store from Scratch

Implement a minimal state management store inspired by Zustand. The store lives outside React, holds state in a closure, and provides `getState`, `setState`, and `subscribe`. A `useStore` hook connects React components to the store and re-renders them only when their selected slice changes.

## TypeScript Signature

```ts
type Listener = () => void
type Selector<S, T> = (state: S) => T

interface Store<S> {
  getState(): S
  setState(partial: Partial<S> | ((state: S) => Partial<S>)): void
  subscribe(listener: Listener): () => void
}

function createStore<S>(initialState: S): Store<S>
function useStore<S, T>(store: Store<S>, selector: Selector<S, T>): T
```

## Usage Example

```ts
const counterStore = createStore({ count: 0, name: 'Alice' })

// Update state
counterStore.setState({ count: 1 })
counterStore.setState(s => ({ count: s.count + 1 }))

// Subscribe (outside React)
const unsub = counterStore.subscribe(() => {
  console.log('new state:', counterStore.getState())
})
```

```tsx
// In a React component — only re-renders when count changes
function Counter() {
  const count = useStore(counterStore, s => s.count)
  return <p>{count}</p>
}
```

## Constraints

- `setState` performs a shallow merge (like `Object.assign`) — does not replace the full state
- Functional `setState` receives current state and returns the partial update
- `subscribe` returns an unsubscribe function
- `useStore` uses `useSyncExternalStore` (React 18) or a manual `useState + subscribe` equivalent
- The selector determines what the component subscribes to — if the selected value doesn't change (strict equality), the component does not re-render

## Edge Cases

- Two components subscribe to different slices — updating one slice should not re-render the other
- `setState` with an empty object `{}` — no change, listeners still fire (or should they?)
- Selector that returns a derived object — new reference every render causes infinite re-renders
- Store created inside a component (new store on every render — antipattern)
- `subscribe` called during a listener notification (re-entrant subscribe)
- Unmounting a component does not leave a dangling subscriber

# useState from Scratch

Implement a simplified version of React's `useState` hook using closures. This is a conceptual exercise — the implementation runs outside React's fiber system but demonstrates the core mechanism: a closure that holds state, an index counter to support multiple `useState` calls, and a dispatcher queue.

## TypeScript Signature

```ts
type SetStateAction<S> = S | ((prevState: S) => S)
type Dispatch<A> = (action: A) => void

function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]

// Supporting infrastructure you need to implement:
function render(): void           // re-runs the component function
function resetHooks(): void       // resets the hook index (called before each render)
```

## Usage Example

```ts
// Simulate a component
function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Alice')
  return { count, name, setCount, setName }
}

resetHooks()
const result = Counter()
// result.count === 0, result.name === 'Alice'

result.setCount(1)
// triggers re-render, count is now 1

result.setCount(prev => prev + 1)
// functional update: count is now 2
```

## Constraints

- Multiple `useState` calls in one component must each get their own state slot (use an index)
- The index must reset to 0 before each render call
- Functional updates (`setCount(prev => prev + 1)`) must receive the latest state
- `initialState` can be a value or a lazy initializer function

## Edge Cases

- Two `useState` calls — each must maintain independent state
- Functional updater called multiple times without a re-render between them
- `initialState` is a function (lazy initializer) — call it only on first render
- Setting state to the same value (Object.is equality) — should not re-render
- Calling setState after component unmounts (out-of-order renders)
- More `useState` calls on re-render than on initial render (violates rules of hooks)

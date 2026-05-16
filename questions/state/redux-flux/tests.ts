import { createStore, combineReducers } from './index'

type CounterAction = { type: 'INC' } | { type: 'DEC' }

function counter(state = 0, action: CounterAction): number {
  if (action.type === 'INC') return state + 1
  if (action.type === 'DEC') return state - 1
  return state
}

// Test 1: initial state
const store = createStore(counter)
console.log(store.getState() === 0 ? 'PASS: initial state is 0' : `FAIL: expected 0, got ${store.getState()}`)

// Test 2: dispatch updates state
store.dispatch({ type: 'INC' })
console.log(store.getState() === 1 ? 'PASS: dispatch INC' : `FAIL: expected 1, got ${store.getState()}`)

// Test 3: listeners are called on dispatch
let callCount = 0
const unsub = store.subscribe(() => callCount++)
store.dispatch({ type: 'INC' })
console.log(callCount === 1 ? 'PASS: listener called' : `FAIL: expected 1 call, got ${callCount}`)

// Test 4: unsubscribe stops listener calls
unsub()
store.dispatch({ type: 'INC' })
console.log(callCount === 1 ? 'PASS: unsubscribe works' : `FAIL: expected 1 call after unsub, got ${callCount}`)

// Test 5: preloadedState
const store2 = createStore(counter, 10)
console.log(store2.getState() === 10 ? 'PASS: preloadedState' : `FAIL: expected 10, got ${store2.getState()}`)

// Test 6: combineReducers
type NameAction = { type: 'SET_NAME'; payload: string }
function name(state = 'Alice', action: NameAction): string {
  if (action.type === 'SET_NAME') return action.payload
  return state
}

const rootReducer = combineReducers({ count: counter, name })
const rootStore = createStore(rootReducer as Parameters<typeof createStore>[0])
const initial = rootStore.getState() as { count: number; name: string }
console.log(
  initial.count === 0 && initial.name === 'Alice'
    ? 'PASS: combineReducers initial state'
    : `FAIL: ${JSON.stringify(initial)}`
)

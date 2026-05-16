// Tests for useReducer
// Note: hook tests require a React rendering environment.
// These test the reducer logic directly — wrap in renderHook for full integration.

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

// Test 1: reducer produces correct next state
const s0: State = { count: 0 }
const s1 = counterReducer(s0, { type: 'increment' })
console.log(s1.count === 1 ? 'PASS: increment' : 'FAIL: increment', s1)

// Test 2: multiple actions chain correctly
const s2 = counterReducer(counterReducer(s1, { type: 'increment' }), { type: 'decrement' })
console.log(s2.count === 1 ? 'PASS: increment then decrement' : 'FAIL: increment then decrement', s2)

// Test 3: reset returns to zero regardless of current count
const s3 = counterReducer({ count: 42 }, { type: 'reset' })
console.log(s3.count === 0 ? 'PASS: reset' : 'FAIL: reset', s3)

// Test 4: unknown action type returns same state reference
const s4 = counterReducer(s0, { type: 'unknown' as never })
console.log(s4 === s0 ? 'PASS: unknown action returns same ref' : 'FAIL: unknown action mutated state', s4)

// Test 5: reducer does not mutate the input state
const original = { count: 5 }
counterReducer(original, { type: 'increment' })
console.log(original.count === 5 ? 'PASS: no mutation' : 'FAIL: input state was mutated')

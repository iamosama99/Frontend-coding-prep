import { createStore } from './index'

// Test 1: initial state
const store = createStore({ count: 0, name: 'Alice' })
const s = store.getState()
console.log(
  s.count === 0 && s.name === 'Alice'
    ? 'PASS: initial state'
    : `FAIL: ${JSON.stringify(s)}`
)

// Test 2: setState merges partial update
store.setState({ count: 5 })
const s2 = store.getState()
console.log(
  s2.count === 5 && s2.name === 'Alice'
    ? 'PASS: partial setState preserves other keys'
    : `FAIL: ${JSON.stringify(s2)}`
)

// Test 3: functional setState
store.setState(prev => ({ count: prev.count + 1 }))
console.log(
  store.getState().count === 6
    ? 'PASS: functional setState'
    : `FAIL: expected 6, got ${store.getState().count}`
)

// Test 4: subscribe is called on setState
let notified = 0
const unsub = store.subscribe(() => notified++)
store.setState({ count: 10 })
console.log(notified === 1 ? 'PASS: subscriber called' : `FAIL: expected 1 call, got ${notified}`)

// Test 5: unsubscribe stops notifications
unsub()
store.setState({ count: 20 })
console.log(notified === 1 ? 'PASS: unsubscribe works' : `FAIL: subscriber called after unsub`)

// Test 6: multiple subscribers all notified
const s3 = createStore({ x: 0 })
let a = 0, b = 0
s3.subscribe(() => a++)
s3.subscribe(() => b++)
s3.setState({ x: 1 })
console.log(
  a === 1 && b === 1
    ? 'PASS: multiple subscribers all called'
    : `FAIL: a=${a}, b=${b}`
)

// Test 7: getState returns same reference if unchanged
const ref1 = store.getState()
const ref2 = store.getState()
console.log(ref1 === ref2 ? 'PASS: getState returns same reference' : 'FAIL: new object every call')

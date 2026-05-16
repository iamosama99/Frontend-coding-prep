import { useState, resetHooks, render } from './index'

let log: string[] = []

// Test 1: basic initial state
resetHooks()
const [count] = useState(0)
console.log(count === 0 ? 'PASS: initial state is 0' : `FAIL: expected 0, got ${count}`)

// Test 2: lazy initializer function
resetHooks()
const [val] = useState(() => 42)
console.log(val === 42 ? 'PASS: lazy initializer called' : `FAIL: expected 42, got ${val}`)

// Test 3: two independent state slots
resetHooks()
const [a] = useState(1)
const [b] = useState(2)
console.log(a === 1 && b === 2 ? 'PASS: independent state slots' : `FAIL: a=${a}, b=${b}`)

// Test 4: setState with a direct value triggers re-render
log = []
let renderCount = 0
function MyComponent() {
  const [n, setN] = useState(10)
  renderCount++
  log.push(`render #${renderCount}: n=${n}`)
  if (renderCount === 1) {
    // Trigger an update on first render
    setTimeout(() => setN(99), 0)
  }
}

render(MyComponent)
setTimeout(() => {
  console.log(log.some(l => l.includes('n=99')) ? 'PASS: setState direct value' : 'FAIL: direct value not applied')
}, 10)

// Test 5: functional updater
resetHooks()
let captured: number | null = null
function FnUpdater() {
  const [x, setX] = useState(5)
  captured = x
  if (captured === 5) setTimeout(() => setX(prev => prev + 1), 0)
}
render(FnUpdater)
setTimeout(() => {
  console.log(captured === 6 ? 'PASS: functional updater' : `FAIL: expected 6, got ${captured}`)
}, 20)

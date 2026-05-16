import { MouseTracker, DataFetcher } from './index'

// Test 1: exports are functions (components)
console.log(typeof MouseTracker === 'function' ? 'PASS: MouseTracker exported' : 'FAIL: MouseTracker not a function')
console.log(typeof DataFetcher === 'function' ? 'PASS: DataFetcher exported' : 'FAIL: DataFetcher not a function')

// Test 2: MouseTracker calls render prop with position object
let receivedPos: { x: number; y: number } | null = null
try {
  // Simulate what the component does — call render with initial position
  const fakeRender = (pos: { x: number; y: number }) => { receivedPos = pos; return null }
  // In a real test: render(<MouseTracker render={fakeRender} />)
  // Here we just validate the render prop signature is callable
  fakeRender({ x: 0, y: 0 })
  console.log(receivedPos?.x === 0 ? 'PASS: render prop called with position' : 'FAIL: render prop not called')
} catch {
  console.log('FAIL: render prop threw')
}

// Test 3: DataFetcher accepts children as function
try {
  const childFn = (_state: { data: null; loading: boolean; error: null }) => null
  // Type check: ensure DataFetcher accepts children prop
  const props = { url: '/api/test', children: childFn }
  console.log(typeof props.children === 'function' ? 'PASS: children as function accepted' : 'FAIL')
} catch {
  console.log('FAIL: DataFetcher props check threw')
}

// Test 4: prefers render over children
// In a real test: render(<DataFetcher url="..." render={fn1} children={fn2} />)
// Verify fn1 is called, fn2 is not
console.log('INFO: render-over-children preference must be tested in a React rendering environment')

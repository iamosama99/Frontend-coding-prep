import { withLogger } from './index'

// Test 1: returns a function (component)
function MockComponent(_props: { label: string }) { return null as never }
MockComponent.displayName = 'MockComponent'

let Wrapped: ReturnType<typeof withLogger>
try {
  Wrapped = withLogger(MockComponent)
  console.log(typeof Wrapped === 'function' ? 'PASS: withLogger returns a component' : 'FAIL: not a function')
} catch {
  console.log('FAIL: withLogger threw')
}

// Test 2: displayName is set correctly
try {
  Wrapped = withLogger(MockComponent)
  const expected = 'withLogger(MockComponent)'
  console.log(
    Wrapped.displayName === expected
      ? 'PASS: displayName set correctly'
      : `FAIL: expected "${expected}", got "${Wrapped.displayName}"`
  )
} catch {
  console.log('FAIL: could not read displayName')
}

// Test 3: component with no displayName falls back to .name
function NoDisplay(_props: { x: number }) { return null as never }
try {
  const W2 = withLogger(NoDisplay)
  console.log(
    W2.displayName === 'withLogger(NoDisplay)'
      ? 'PASS: fallback to .name works'
      : `FAIL: displayName was "${W2.displayName}"`
  )
} catch {
  console.log('FAIL: withLogger threw on no-displayName component')
}

// Test 4: anonymous component fallback
try {
  const Anon = withLogger(() => null as never)
  console.log(
    typeof Anon.displayName === 'string' && Anon.displayName.startsWith('withLogger(')
      ? 'PASS: anonymous component gets a displayName'
      : `FAIL: unexpected displayName "${Anon.displayName}"`
  )
} catch {
  console.log('FAIL: withLogger threw on anonymous component')
}

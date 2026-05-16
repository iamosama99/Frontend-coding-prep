import { createMachine } from './index'

const log: string[] = []

const light = createMachine({
  initial: 'red',
  states: {
    red: {
      entry: () => log.push('enter:red'),
      exit:  () => log.push('exit:red'),
      on: { NEXT: { target: 'green', action: () => log.push('action:red→green') } }
    },
    green: {
      entry: () => log.push('enter:green'),
      on: { NEXT: { target: 'yellow' } }
    },
    yellow: {
      on: { NEXT: { target: 'red' } }
    }
  }
})

// Test 1: initial state
console.log(light.current === 'red' ? 'PASS: initial state is red' : `FAIL: ${light.current}`)

// Test 2: send transitions state
light.send('NEXT')
console.log(light.current === 'green' ? 'PASS: transition to green' : `FAIL: ${light.current}`)

// Test 3: exit, action, entry lifecycle order
console.log(
  log.join(',') === 'exit:red,action:red→green,enter:green'
    ? 'PASS: exit → action → entry order'
    : `FAIL: order was [${log.join(', ')}]`
)

// Test 4: unknown event does nothing
light.send('UNKNOWN')
console.log(light.current === 'green' ? 'PASS: unknown event ignored' : `FAIL: ${light.current}`)

// Test 5: can() returns correct boolean
console.log(light.can('NEXT') === true ? 'PASS: can(NEXT) is true' : 'FAIL: can(NEXT) should be true')
console.log(light.can('UNKNOWN') === false ? 'PASS: can(UNKNOWN) is false' : 'FAIL: can(UNKNOWN) should be false')

// Test 6: guard blocks transition
const guardMachine = createMachine({
  initial: 'locked',
  states: {
    locked: {
      on: { UNLOCK: { target: 'open', guard: () => false } }
    },
    open: {}
  }
})
guardMachine.send('UNLOCK')
console.log(
  guardMachine.current === 'locked'
    ? 'PASS: guard blocked transition'
    : `FAIL: expected locked, got ${guardMachine.current}`
)

// Test 7: can() respects guard
console.log(
  guardMachine.can('UNLOCK') === false
    ? 'PASS: can() returns false when guard fails'
    : 'FAIL: can() should return false for failing guard'
)

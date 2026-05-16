import { EventBus } from './index'

const bus = new EventBus()

// Test 1: subscribe and publish
let received: string | null = null
bus.subscribe<string>('test', (payload) => { received = payload })
bus.publish('test', 'hello')
console.log(received === 'hello' ? 'PASS: subscribe + publish' : `FAIL: expected "hello", got ${received}`)

// Test 2: unsubscribe stops handler
const handler = (p: string) => { received = p }
bus.subscribe('test2', handler)
bus.unsubscribe('test2', handler)
bus.publish('test2', 'should-not-arrive')
console.log(received === 'hello' ? 'PASS: unsubscribe works' : `FAIL: received changed to "${received}"`)

// Test 3: unsub function returned from subscribe
received = null
const unsub = bus.subscribe<string>('test3', (p) => { received = p })
bus.publish('test3', 'before-unsub')
console.log(received === 'before-unsub' ? 'PASS: subscribe return value delivers payload' : `FAIL: ${received}`)
unsub()
bus.publish('test3', 'after-unsub')
console.log(received === 'before-unsub' ? 'PASS: unsub fn stops handler' : `FAIL: received changed to "${received}"`)

// Test 4: publish to unknown event does not throw
try {
  bus.publish('nonexistent', {})
  console.log('PASS: publish to unknown event is safe')
} catch {
  console.log('FAIL: publish to unknown event threw')
}

// Test 5: clear removes all subscribers
bus.subscribe('clearTest', () => { received = 'should-not-run' })
bus.clear()
received = null
bus.publish('clearTest', 'x')
console.log(received === null ? 'PASS: clear() removes all subscribers' : 'FAIL: subscriber ran after clear()')

// Test 6: multiple subscribers all fire
const results: number[] = []
bus.subscribe<number>('multi', (n) => results.push(n))
bus.subscribe<number>('multi', (n) => results.push(n * 2))
bus.publish('multi', 3)
console.log(
  results.length === 2 && results.includes(3) && results.includes(6)
    ? 'PASS: multiple subscribers all fire'
    : `FAIL: ${JSON.stringify(results)}`
)

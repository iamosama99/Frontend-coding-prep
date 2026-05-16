import { getPositionStyles, PositionDemo } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// Happy path
const relativeStyles = getPositionStyles('relative', { top: 10, left: 20 })
test('relative position is set', relativeStyles.position === 'relative')
test('relative top offset is set', relativeStyles.top === 10)
test('relative left offset is set', relativeStyles.left === 20)

// Static ignores offsets
const staticStyles = getPositionStyles('static', { top: 10, right: 5 })
test('static position is set', staticStyles.position === 'static')
test('static ignores top offset', staticStyles.top === undefined)
test('static ignores right offset', staticStyles.right === undefined)

// Sticky with offset
const stickyStyles = getPositionStyles('sticky', { top: 0 })
test('sticky position is set', stickyStyles.position === 'sticky')
test('sticky top offset is set', stickyStyles.top === 0)

// No offsets
const absoluteStyles = getPositionStyles('absolute')
test('absolute position is set', absoluteStyles.position === 'absolute')
test('absolute with no offsets has no top', absoluteStyles.top === undefined)

// Negative offsets are valid
const fixedStyles = getPositionStyles('fixed', { top: -10 })
test('fixed accepts negative offsets', fixedStyles.top === -10)

// PositionDemo is a function
test('PositionDemo is a function', typeof PositionDemo === 'function')

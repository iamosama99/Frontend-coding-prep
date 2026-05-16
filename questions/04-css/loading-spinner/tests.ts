import { getSpinnerKeyframes, Spinner } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getSpinnerKeyframes is a pure function — testable
const keyframes = getSpinnerKeyframes()
test('keyframes string is non-empty', keyframes.length > 0)
test('keyframes contains @keyframes', keyframes.includes('@keyframes'))
test('keyframes contains spin name', keyframes.includes('spin'))
test('keyframes contains rotate', keyframes.includes('rotate'))
test('keyframes has from/0% marker', keyframes.includes('from') || keyframes.includes('0%'))
test('keyframes has to/100% marker', keyframes.includes('to') || keyframes.includes('100%'))
test('keyframes contains 360deg', keyframes.includes('360deg'))

// Spinner is a function (visual rendering requires DOM)
test('Spinner is a function', typeof Spinner === 'function')

// Edge: calling getSpinnerKeyframes multiple times returns the same value
const kf2 = getSpinnerKeyframes()
test('getSpinnerKeyframes is deterministic', keyframes === kf2)

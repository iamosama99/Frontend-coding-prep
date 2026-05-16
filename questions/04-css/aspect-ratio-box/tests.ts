import { getAspectRatioStyle, getPaddingTopPercent, AspectRatioBox } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getPaddingTopPercent — pure function tests
test('16:9 padding-top is 56.25%', getPaddingTopPercent([16, 9]) === 56.25)
test('1:1 padding-top is 100%', getPaddingTopPercent([1, 1]) === 100)
test('2:1 padding-top is 50%', getPaddingTopPercent([2, 1]) === 50)
test('4:3 padding-top is 75%', getPaddingTopPercent([4, 3]) === 75)

// Portrait ratio: height > width
test('9:16 padding-top is 177.77...', Math.abs(getPaddingTopPercent([9, 16]) - 177.78) < 0.01)

// getAspectRatioStyle — pure function tests
const style16_9 = getAspectRatioStyle([16, 9])
test('modern style has aspectRatio', (style16_9 as Record<string, unknown>).aspectRatio !== undefined)
test('modern aspectRatio contains 16', String((style16_9 as Record<string, unknown>).aspectRatio).includes('16'))
test('modern aspectRatio contains 9', String((style16_9 as Record<string, unknown>).aspectRatio).includes('9'))
test('modern style has width 100%', style16_9.width === '100%')

const style1_1 = getAspectRatioStyle([1, 1])
test('1:1 modern aspectRatio is correct', String((style1_1 as Record<string, unknown>).aspectRatio).includes('1'))

// AspectRatioBox is a function
test('AspectRatioBox is a function', typeof AspectRatioBox === 'function')

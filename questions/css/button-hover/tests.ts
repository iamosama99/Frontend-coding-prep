import { getVariantStyles, getSizeStyles, Button } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getVariantStyles — pure function tests
const fillStyles = getVariantStyles('fill', '#3b82f6')
test('fill: background is set', fillStyles.background !== undefined || fillStyles.backgroundColor !== undefined)
test('fill: transition is set', fillStyles.transition !== undefined)
test('fill: cursor is pointer', fillStyles.cursor === 'pointer')

const outlineStyles = getVariantStyles('outline', '#3b82f6')
test('outline: border is set', outlineStyles.border !== undefined || outlineStyles.borderWidth !== undefined)

const ghostStyles = getVariantStyles('ghost', '#3b82f6')
test('ghost: background is transparent',
  ghostStyles.background === 'transparent' || ghostStyles.backgroundColor === 'transparent')

// getSizeStyles — pure function tests
const smStyles = getSizeStyles('sm')
test('sm: fontSize is 12', smStyles.fontSize === 12)

const mdStyles = getSizeStyles('md')
test('md: fontSize is 14', mdStyles.fontSize === 14)

const lgStyles = getSizeStyles('lg')
test('lg: fontSize is 16', lgStyles.fontSize === 16)

// Different sizes have different padding
test('sm and md have different padding', smStyles.padding !== mdStyles.padding)

// Button is a function
test('Button is a function', typeof Button === 'function')

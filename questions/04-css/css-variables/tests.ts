import { themeToCSS, ThemeProvider, useCSSVariable } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// themeToCSS tests (pure function — fully testable)
const css = themeToCSS({ 'color-primary': '#3b82f6', 'space-4': '1rem' })
test('themeToCSS includes --color-primary', css.includes('--color-primary'))
test('themeToCSS includes the value', css.includes('#3b82f6'))
test('themeToCSS includes --space-4', css.includes('--space-4'))

// No double-prefix if key already has '--'
const css2 = themeToCSS({ '--already-prefixed': 'red' })
test('no double -- prefix', !css2.includes('----already-prefixed'))
test('single -- prefix preserved', css2.includes('--already-prefixed'))

// Empty theme
const emptyCSS = themeToCSS({})
test('empty theme produces empty string or whitespace', emptyCSS.trim() === '')

// ThemeProvider is a function (rendering requires DOM)
test('ThemeProvider is a function', typeof ThemeProvider === 'function')

// useCSSVariable is a function
test('useCSSVariable is a function', typeof useCSSVariable === 'function')

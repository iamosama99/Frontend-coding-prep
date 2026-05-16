import { CustomCheckbox, CustomRadio, RadioGroup, getCustomInputCSS } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// All exports are functions
test('CustomCheckbox is a function', typeof CustomCheckbox === 'function')
test('CustomRadio is a function', typeof CustomRadio === 'function')
test('RadioGroup is a function', typeof RadioGroup === 'function')
test('getCustomInputCSS is a function', typeof getCustomInputCSS === 'function')

// getCustomInputCSS returns CSS with appearance: none
const css = getCustomInputCSS()
test('CSS is a non-empty string', typeof css === 'string' && css.length > 0)
test('CSS includes appearance:none', css.includes('appearance') && css.includes('none'))
test('CSS includes :checked selector', css.includes(':checked'))

// RadioGroup options structure — test via shape check
const groupProps = {
  name: 'test-group',
  value: 'a',
  onChange: () => {},
  options: [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ],
}
let groupThrew = false
try {
  RadioGroup(groupProps)
} catch (e: unknown) {
  if (e instanceof Error && e.message === 'Not implemented') groupThrew = true
}
test('RadioGroup implementation replaces "Not implemented" stub', !groupThrew)

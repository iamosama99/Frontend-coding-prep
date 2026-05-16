import { getTooltipCSS, Tooltip } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getTooltipCSS is a pure function — fully testable
const topCSS = getTooltipCSS('top')
test('CSS is non-empty string', typeof topCSS === 'string' && topCSS.length > 0)
test('CSS includes position:relative or absolute', topCSS.includes('position'))
test('CSS includes opacity for visibility toggle', topCSS.includes('opacity'))
test('CSS includes visibility', topCSS.includes('visibility'))
test('CSS includes :hover', topCSS.includes(':hover'))
test('CSS includes ::before or ::after', topCSS.includes('::before') || topCSS.includes('::after'))
test('CSS uses attr(data-tooltip)', topCSS.includes('attr(data-tooltip)'))

// Position-specific CSS differs between placements
const bottomCSS = getTooltipCSS('bottom')
const leftCSS = getTooltipCSS('left')
test('top and bottom CSS are different', topCSS !== bottomCSS)
test('top and left CSS are different', topCSS !== leftCSS)

// Delay is included when provided
const withDelay = getTooltipCSS('top', '0.3s')
test('delay appears in CSS when provided', withDelay.includes('0.3s'))

// Tooltip is a function (requires DOM to render)
test('Tooltip is a function', typeof Tooltip === 'function')

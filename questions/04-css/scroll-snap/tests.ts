import { getSnapContainerStyles, getSnapItemStyles, ScrollSnapContainer, ScrollSnapItem } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// getSnapContainerStyles — pure function tests
const hStyles = getSnapContainerStyles('x', 'mandatory')
test('horizontal: scrollSnapType is x mandatory', hStyles.scrollSnapType === 'x mandatory')
test('horizontal: overflow-x is auto', hStyles.overflowX === 'auto')
test('horizontal: display is flex', hStyles.display === 'flex')

const vStyles = getSnapContainerStyles('y', 'mandatory')
test('vertical: scrollSnapType is y mandatory', vStyles.scrollSnapType === 'y mandatory')
test('vertical: overflow-y is auto', vStyles.overflowY === 'auto')

const proximityStyles = getSnapContainerStyles('x', 'proximity')
test('proximity: scrollSnapType is x proximity', proximityStyles.scrollSnapType === 'x proximity')

// getSnapItemStyles — pure function tests
const startItem = getSnapItemStyles('start')
test('item: scrollSnapAlign is start', startItem.scrollSnapAlign === 'start')

const centerItem = getSnapItemStyles('center')
test('item: scrollSnapAlign is center', centerItem.scrollSnapAlign === 'center')

const endItem = getSnapItemStyles('end')
test('item: scrollSnapAlign is end', endItem.scrollSnapAlign === 'end')

// Components are functions
test('ScrollSnapContainer is a function', typeof ScrollSnapContainer === 'function')
test('ScrollSnapItem is a function', typeof ScrollSnapItem === 'function')

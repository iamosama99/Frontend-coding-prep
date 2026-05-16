import { computeRenderedWidth, BoxModelDemo } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// content-box: adds padding and border to the CSS width
const cbWidth = computeRenderedWidth({
  boxSizing: 'content-box',
  width: 200,
  paddingLeft: 20, paddingRight: 20,
  borderLeft: 2, borderRight: 2,
})
test('content-box adds padding and border to width', cbWidth === 244)

// border-box: width is unchanged
const bbWidth = computeRenderedWidth({
  boxSizing: 'border-box',
  width: 200,
  paddingLeft: 20, paddingRight: 20,
  borderLeft: 2, borderRight: 2,
})
test('border-box returns CSS width as-is', bbWidth === 200)

// Edge: zero padding and border — both approaches agree
const zeroPad = computeRenderedWidth({
  boxSizing: 'content-box', width: 100,
  paddingLeft: 0, paddingRight: 0, borderLeft: 0, borderRight: 0,
})
test('content-box with zero padding/border equals width', zeroPad === 100)

const zeroPadBB = computeRenderedWidth({
  boxSizing: 'border-box', width: 100,
  paddingLeft: 0, paddingRight: 0, borderLeft: 0, borderRight: 0,
})
test('border-box with zero padding/border equals width', zeroPadBB === 100)

// Edge: fractional values pass through
const fracWidth = computeRenderedWidth({
  boxSizing: 'content-box', width: 100.5,
  paddingLeft: 10.5, paddingRight: 10.5, borderLeft: 0, borderRight: 0,
})
test('fractional values preserved', fracWidth === 121.5)

test('BoxModelDemo is a function', typeof BoxModelDemo === 'function')

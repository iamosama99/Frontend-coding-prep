import { useStickyHeader, StickyHeader } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// useStickyHeader and StickyHeader are functions
test('useStickyHeader is a function', typeof useStickyHeader === 'function')
test('StickyHeader is a function', typeof StickyHeader === 'function')

// useStickyHeader has at most 1 parameter (threshold is optional)
test('useStickyHeader has 0 or 1 parameters', useStickyHeader.length <= 1)

// Calling useStickyHeader outside React will throw a hook error (not "Not implemented")
let threwNotImplemented = false
try {
  useStickyHeader(80)
} catch (e: unknown) {
  if (e instanceof Error && e.message === 'Not implemented') threwNotImplemented = true
}
test('useStickyHeader is not a stub ("Not implemented")', !threwNotImplemented)

// StickyHeader calling outside React will throw a hook error (not "Not implemented")
let componentThrewNotImplemented = false
try {
  StickyHeader({ children: null, threshold: 80 })
} catch (e: unknown) {
  if (e instanceof Error && e.message === 'Not implemented') componentThrewNotImplemented = true
}
test('StickyHeader is not a stub ("Not implemented")', !componentThrewNotImplemented)

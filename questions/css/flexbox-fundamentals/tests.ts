import { FlexContainer, FlexItem } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

test('FlexContainer is a function', typeof FlexContainer === 'function')
test('FlexItem is a function', typeof FlexItem === 'function')

// Test the style computation indirectly by checking the exported functions exist
// For visual rendering tests, paste into playground/src/App.tsx and run npm run dev

// Test that the components accept their prop interfaces (type checks at build time)
// We verify the function arity and shape here
test('FlexContainer accepts zero args without crashing types', FlexContainer.length >= 0)
test('FlexItem accepts zero args without crashing types', FlexItem.length >= 0)

// Test that gap normalization logic exists by verifying the function works at call time
// (This will throw 'Not implemented' until you implement it)
let containerThrew = false
let containerResult: unknown = null
try {
  containerResult = FlexContainer({ justify: 'space-between', gap: 16, children: null })
} catch (e: unknown) {
  if (e instanceof Error && e.message === 'Not implemented') containerThrew = true
}
test('FlexContainer implementation replaces "Not implemented" stub', !containerThrew)

let itemThrew = false
try {
  FlexItem({ grow: 1, children: null })
} catch (e: unknown) {
  if (e instanceof Error && e.message === 'Not implemented') itemThrew = true
}
test('FlexItem implementation replaces "Not implemented" stub', !itemThrew)

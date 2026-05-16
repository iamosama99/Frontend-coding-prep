import { Tabs } from './index'

// Test 1: Tabs and sub-components exported correctly
console.log(typeof Tabs === 'function' ? 'PASS: Tabs exported' : 'FAIL: Tabs not a function')
console.log(typeof Tabs.Tab === 'function' ? 'PASS: Tabs.Tab exported' : 'FAIL: Tabs.Tab missing')
console.log(typeof Tabs.Panel === 'function' ? 'PASS: Tabs.Panel exported' : 'FAIL: Tabs.Panel missing')

// Test 2: sub-components are different functions
console.log(
  Tabs.Tab !== Tabs.Panel
    ? 'PASS: Tab and Panel are distinct components'
    : 'FAIL: Tab and Panel are the same function'
)

// Test 3: Tabs is a valid React component (accepts props)
// In a real test env:
// const { getByRole } = render(
//   <Tabs defaultTab="a">
//     <Tabs.Tab id="a">Tab A</Tabs.Tab>
//     <Tabs.Panel tabId="a">Content A</Tabs.Panel>
//   </Tabs>
// )
// expect(getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'true')
console.log('INFO: full integration tests require @testing-library/react')

// Test 4: onChange called on tab switch (logic check)
let lastChanged: string | null = null
const onChangeSpy = (id: string) => { lastChanged = id }
// Simulate: render(<Tabs defaultTab="a" onChange={onChangeSpy}>...</Tabs>)
// Click Tab "b" → onChangeSpy('b') → lastChanged === 'b'
console.log('INFO: onChange integration test requires rendered component')

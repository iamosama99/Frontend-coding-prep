import { useDarkMode, DarkModeToggle } from './index'

function test(name: string, pass: boolean) {
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`)
}

// useDarkMode and DarkModeToggle are functions
test('useDarkMode is a function', typeof useDarkMode === 'function')
test('DarkModeToggle is a function', typeof DarkModeToggle === 'function')

// useDarkMode takes an optional options argument (check function length)
test('useDarkMode accepts 0 or 1 arguments', useDarkMode.length <= 1)

// useDarkMode returns an object with the expected shape when called in a React context
// Since we can't call hooks outside React, we verify the function signature via TypeScript
// The implementation must return { theme, resolvedTheme, setTheme, toggleTheme }

// Verify that calling the hook outside React throws a hook error (not "Not implemented")
let threwHookError = false
let threwNotImplemented = false
try {
  useDarkMode()
} catch (e: unknown) {
  if (e instanceof Error && e.message === 'Not implemented') threwNotImplemented = true
  else threwHookError = true
}
test('useDarkMode does not throw "Not implemented" (hook rules may apply)', !threwNotImplemented)

// DarkModeToggle is a React component (function)
test('DarkModeToggle can be constructed as a component', typeof DarkModeToggle === 'function')

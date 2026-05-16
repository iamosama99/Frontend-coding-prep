# Context API + Provider Pattern

Build a theme system using React's Context API. Expose a `ThemeProvider` component and a `useTheme` hook. Consumers must be able to read and toggle the current theme without unnecessary re-renders.

## TypeScript Signature

```ts
type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

function ThemeProvider(props: { children: ReactNode }): JSX.Element
function useTheme(): ThemeContextValue
```

## Usage Example

```tsx
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  )
}

function Header() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header data-theme={theme}>
      <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>
    </header>
  )
}
```

## Constraints

- `useTheme` must throw a descriptive error when called outside `ThemeProvider`
- Default theme is `'light'`
- Toggling flips between `'light'` and `'dark'`
- Components that only call `toggleTheme` (not read `theme`) should ideally not re-render on theme changes

## Edge Cases

- Calling `useTheme` outside the provider tree
- Nesting two `ThemeProvider` components — inner one should take precedence
- `toggleTheme` called multiple times in rapid succession
- Provider unmounts while a consumer is still mounted
- Consumer renders before provider has set up context value

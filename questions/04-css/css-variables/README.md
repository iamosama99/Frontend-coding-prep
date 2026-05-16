# CSS Variables (Custom Properties)

## Problem

Implement a `ThemeProvider` component that injects CSS custom properties onto a wrapper element, and a `useCSSVariable` hook for reading and updating individual CSS custom properties at runtime via JavaScript.

## TypeScript Signatures

```typescript
interface Theme {
  [key: string]: string  // e.g. { 'color-primary': '#3b82f6' }
}

interface ThemeProviderProps {
  theme: Theme
  children: React.ReactNode
  as?: keyof React.JSX.IntrinsicElements  // wrapper element tag, default 'div'
}

function ThemeProvider(props: ThemeProviderProps): React.ReactElement

// Hook to read/update a CSS custom property on an element
function useCSSVariable(
  ref: React.RefObject<HTMLElement>,
  variableName: string   // without the '--' prefix
): {
  value: string
  setValue: (newValue: string) => void
}

// Utility: convert a Theme object to a CSS variable string
function themeToCSS(theme: Theme): string
```

## Usage Example

```tsx
const theme = { 'color-primary': '#3b82f6', 'space-4': '1rem' }

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
// Renders: <div style="--color-primary: #3b82f6; --space-4: 1rem;">...</div>

themeToCSS({ 'color-primary': '#3b82f6' })
// → '--color-primary: #3b82f6;'

// Hook usage
const ref = useRef<HTMLElement>(null)
const { value, setValue } = useCSSVariable(ref, 'color-primary')
setValue('#ff0000')  // updates --color-primary on the element
```

## Constraints

- `ThemeProvider` converts theme keys to CSS variable names by prepending `--`
- Variables are set as inline styles on the wrapper element, not in a `<style>` tag
- `useCSSVariable` uses `element.style.setProperty` for writing and `getComputedStyle().getPropertyValue` for reading (reads inherited values, not just inline)
- `themeToCSS` joins all variables into a semicolon-separated string — useful for `<style>` injection

## Edge Cases

- Theme key already has `--` prefix — don't double-prefix
- Empty theme — renders wrapper with no custom properties
- `setValue('')` — removes the variable (equivalent to `removeProperty`)
- Theme update (new object) — diff and update only changed properties to avoid layout thrashing
- Keys with uppercase letters — CSS custom properties are case-sensitive

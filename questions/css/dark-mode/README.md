# CSS Dark Mode Strategy

## Problem

Implement a `useDarkMode` hook that manages theme preference with three sources: user explicit toggle, localStorage persistence, and `prefers-color-scheme` system preference. Also implement a `DarkModeToggle` component.

## TypeScript Signatures

```typescript
type Theme = 'light' | 'dark' | 'system'

interface UseDarkModeOptions {
  defaultTheme?: Theme          // preference when nothing is stored, default 'system'
  storageKey?: string           // localStorage key, default 'theme'
  rootElement?: HTMLElement     // element to apply class/attr, default document.documentElement
}

interface UseDarkModeReturn {
  theme: Theme                  // current preference ('light', 'dark', 'system')
  resolvedTheme: 'light' | 'dark'  // actual applied theme after resolving 'system'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void       // toggles between light and dark (not system)
}

function useDarkMode(options?: UseDarkModeOptions): UseDarkModeReturn

interface DarkModeToggleProps {
  showLabel?: boolean
}

function DarkModeToggle(props: DarkModeToggleProps): React.ReactElement
```

## Usage Example

```tsx
const { resolvedTheme, toggleTheme } = useDarkMode()

// Applies 'dark' or 'light' class to <html>
// CSS then uses: .dark { --bg: #0f172a; } or :root { --bg: #ffffff; }

<DarkModeToggle showLabel />
// Renders a toggle button with sun/moon icon
```

CSS strategy:
```css
:root { --bg: #ffffff; --text: #0f172a; }
.dark { --bg: #0f172a; --text: #f8fafc; }

/* Or with data attribute */
[data-theme="dark"] { --bg: #0f172a; }

/* System preference fallback */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --bg: #0f172a; }
}
```

## Constraints

- Read order: localStorage > system preference > defaultTheme
- When `theme === 'system'`, `resolvedTheme` reads `window.matchMedia('prefers-color-scheme: dark').matches`
- Apply the theme by adding/removing a `dark` class (or `data-theme` attribute) on `rootElement`
- Listen for system preference changes with `matchMedia.addEventListener('change', ...)`
- Persist explicit user choice to localStorage; clear it when set back to `'system'`

## Edge Cases

- SSR — `window` and `document` are unavailable; initialize with `defaultTheme` and no side effects on the server
- System preference changes while the page is open — `resolvedTheme` updates if theme is `'system'`
- localStorage unavailable (private browsing, security policy) — catch the error and fall back to `defaultTheme`
- `storageKey` collision with other apps using the same key — use a namespaced key in production
- Initial flash — mitigated by reading from localStorage synchronously before React hydrates (requires a blocking `<script>` in `<head>`)

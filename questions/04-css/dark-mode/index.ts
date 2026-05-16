import React from 'react'

export type Theme = 'light' | 'dark' | 'system'

export interface UseDarkModeOptions {
  defaultTheme?: Theme
  storageKey?: string
  rootElement?: HTMLElement
}

export interface UseDarkModeReturn {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// TODO 1: Implement useDarkMode hook.
//         Initialize state from localStorage → system preference → defaultTheme (in that order).
//         Guard against SSR: check typeof window !== 'undefined' before accessing browser APIs.
// TODO 2: resolvedTheme: if theme === 'system', read window.matchMedia('(prefers-color-scheme: dark)').
//         Otherwise resolvedTheme === theme.
// TODO 3: Apply the theme: add/remove the 'dark' class on rootElement (default: document.documentElement).
//         Do this in a useEffect that runs whenever resolvedTheme changes.
// TODO 4: Listen for system preference changes using matchMedia.addEventListener('change', handler).
//         Only relevant when theme === 'system'. Clean up the listener on unmount.
// TODO 5: toggleTheme: switches between 'light' and 'dark', ignoring 'system'.
//         setTheme('system') should remove the localStorage entry (not store 'system').
export function useDarkMode(options?: UseDarkModeOptions): UseDarkModeReturn {
  throw new Error('Not implemented')
}

export interface DarkModeToggleProps {
  showLabel?: boolean
}

// TODO: Implement DarkModeToggle — a button that calls toggleTheme().
//       Show a sun icon for light mode, moon icon for dark mode.
//       Add aria-label="Toggle dark mode".
export function DarkModeToggle(props: DarkModeToggleProps): React.ReactElement {
  throw new Error('Not implemented')
}

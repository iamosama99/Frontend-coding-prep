import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

// TODO: implement solution
export function ThemeProvider({ children }: { children: ReactNode }) {
  throw new Error('Not implemented')
}

export function useTheme(): ThemeContextValue {
  throw new Error('Not implemented')
}

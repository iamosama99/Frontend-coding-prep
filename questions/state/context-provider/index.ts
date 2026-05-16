import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

/**
 * TODO 1: Create the context with createContext. Think about what the
 *         default value should be — null is a good sentinel so you
 *         can detect "used outside provider" in useTheme.
 *
 * TODO 2: Implement ThemeProvider. It should hold the theme in useState,
 *         define a toggleTheme callback, and pass both via the context value.
 *
 * TODO 3: Implement useTheme. Call useContext, then guard against null —
 *         throw a clear error message if context is null.
 *
 * TODO 4: Think about the re-render optimisation: if you put theme and
 *         toggleTheme in the same context object, ALL consumers re-render
 *         when theme changes (even ones that only call toggleTheme).
 *         How would you split context to avoid that?
 *
 * TODO 5: Export ThemeProvider and useTheme.
 */

// TODO: create context(s) here

export function ThemeProvider({ children }: { children: ReactNode }) {
  // TODO: implement
  throw new Error('Not implemented')
}

export function useTheme(): ThemeContextValue {
  // TODO: implement
  throw new Error('Not implemented')
}

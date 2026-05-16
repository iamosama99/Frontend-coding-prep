import React from 'react'
import { Theme, ThemeProviderProps } from './index'

// TODO: implement solution
export function themeToCSS(theme: Theme): string {
  throw new Error('Not implemented')
}

export function ThemeProvider(props: ThemeProviderProps): React.ReactElement {
  throw new Error('Not implemented')
}

export function useCSSVariable(
  ref: React.RefObject<HTMLElement>,
  variableName: string
): { value: string; setValue: (newValue: string) => void } {
  throw new Error('Not implemented')
}

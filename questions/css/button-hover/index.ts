import React from 'react'

export type ButtonVariant = 'fill' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: string
  disabled?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

// TODO 1: Implement getVariantStyles.
//         Return the base inline styles for each variant.
//         fill:    background = color, color = white, border = transparent
//         outline: background = transparent, color = color, border = 1px solid color
//         ghost:   background = transparent, color = color, border = transparent
//         All variants: transition: 'all 0.2s ease', cursor: 'pointer', borderRadius: 6
export function getVariantStyles(variant: ButtonVariant, color: string): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 2: Implement getSizeStyles.
//         sm: padding '4px 8px',   fontSize 12, height 28
//         md: padding '8px 16px',  fontSize 14, height 36
//         lg: padding '12px 24px', fontSize 16, height 44
export function getSizeStyles(size: ButtonSize): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 3: Implement Button using getVariantStyles and getSizeStyles.
//         Apply defaults: variant='fill', size='md', color='#3b82f6', type='button'.
//         Merge variant + size styles into the button's style prop.
// TODO 4: Handle disabled state: set opacity to 0.5 and cursor to 'not-allowed'.
//         React doesn't support :hover in inline styles — use className + injected CSS for hover.
// TODO 5: Handle loading state: show a Spinner next to children, set pointer-events: none.
//         The button should not change size when switching to loading state.
export function Button(props: ButtonProps): React.ReactElement {
  throw new Error('Not implemented')
}

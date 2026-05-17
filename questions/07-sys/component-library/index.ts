import React from 'react';

// Design tokens — consumers can override these via CSS custom properties
export const tokens = {
  colorPrimary: '#2563eb',
  colorSecondary: '#6b7280',
  colorGhost: 'transparent',
  colorDanger: '#dc2626',
  spacingSm: '0.25rem 0.5rem',
  spacingMd: '0.5rem 1rem',
  spacingLg: '0.75rem 1.5rem',
  borderRadius: '0.375rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
};

// TODO 1: Define the polymorphic helper types.
//   AsProp<C> should add an optional `as` prop of type C (a React.ElementType).
//   PropsWithAs<C, P> should merge ButtonOwnProps (P) with the native props of C,
//   omitting any keys that overlap so there's no conflict.

// TODO 2: Define ButtonOwnProps:
//   variant?: 'primary' | 'secondary' | 'ghost' | 'danger'  (default 'primary')
//   size?: 'sm' | 'md' | 'lg'                               (default 'md')
//   isLoading?: boolean
//   leftIcon?: React.ReactNode
//   rightIcon?: React.ReactNode

// TODO 3: Implement the Button component using React.forwardRef (or a plain function
//   if you skip forwardRef for now). It must:
//   - Render the element specified by `as` (default to 'button')
//   - Apply inline styles derived from the tokens object based on variant and size
//   - When isLoading is true: show a spinner, hide children visually (but keep in DOM
//     for width stability), set disabled and aria-busy="true"
//   - Forward all remaining props to the underlying element

// TODO 4: Handle the icon slots.
//   leftIcon renders before children; rightIcon renders after.
//   Use a small flex wrapper so icons align vertically with the label.

// TODO 5: Export a typed `tokens` object (already provided above).
//   Document which CSS custom properties correspond to each token so library
//   consumers know what to override in their :root selector.

export function Button(props: any): JSX.Element {
  throw new Error('Not implemented');
}

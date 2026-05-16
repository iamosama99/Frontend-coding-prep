import React from 'react'

export interface FlexContainerProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around'
  gap?: number | string
  inline?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
}

export interface FlexItemProps {
  grow?: number
  shrink?: number
  basis?: number | string
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  order?: number
  children: React.ReactNode
  style?: React.CSSProperties
}

// TODO 1: Implement FlexContainer.
//         Build a style object with only the props that are explicitly provided (don't set defaults
//         that would override browser defaults — omit undefined props from the style object).
//         display: 'flex' or 'inline-flex' based on the inline prop.
// TODO 2: Normalize the gap prop: numbers become px strings ('16px'), strings pass through.
// TODO 3: Merge the computed styles with the passed-in style prop (user styles win on conflict).
// TODO 4: Map prop names to correct CSS property names:
//         justify → justifyContent, align → alignItems, direction → flexDirection, wrap → flexWrap.
export function FlexContainer(props: FlexContainerProps): React.ReactElement {
  throw new Error('Not implemented')
}

// TODO 5: Implement FlexItem — similar pattern: only include props that are provided.
//         grow → flexGrow, shrink → flexShrink, basis → flexBasis.
//         Number basis becomes a px string. Merge with style prop.
export function FlexItem(props: FlexItemProps): React.ReactElement {
  throw new Error('Not implemented')
}

import React from 'react'

export type BoxSizing = 'content-box' | 'border-box'

// TODO 1: Implement computeRenderedWidth.
//         content-box: add padding and border to the CSS width.
//         border-box: the CSS width already includes padding and border — return it as-is.
export function computeRenderedWidth(config: {
  boxSizing: BoxSizing
  width: number
  paddingLeft: number
  paddingRight: number
  borderLeft: number
  borderRight: number
}): number {
  throw new Error('Not implemented')
}

export interface BoxModelDemoProps {
  boxSizing: BoxSizing
  width: number
  padding: number
  border: number
  label?: string
}

// TODO 2: Implement BoxModelDemo — a labelled div that shows the element at the rendered size.
//         Apply box-sizing, width, padding, and border as inline styles.
//         Show the computed rendered width using computeRenderedWidth().
// TODO 3: Use distinct background colors for the content, padding, and border regions
//         so the different areas are visually clear.
// TODO 4: Display a summary showing: CSS width, padding, border, and rendered width.
// TODO 5: The padding/border visualization can be done with outline (for border) and
//         a nested div (for content), or with box-shadow layers.
export function BoxModelDemo(props: BoxModelDemoProps): React.ReactElement {
  throw new Error('Not implemented')
}

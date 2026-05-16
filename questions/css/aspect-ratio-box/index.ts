import React from 'react'

export interface AspectRatioBoxProps {
  ratio?: [number, number]
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  useLegacy?: boolean
}

// TODO 1: Implement getAspectRatioStyle.
//         Return the modern approach: { aspectRatio: 'W / H', width: '100%' }
//         React accepts aspectRatio as a string.
export function getAspectRatioStyle(ratio: [number, number]): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 2: Implement getPaddingTopPercent.
//         Return (height / width * 100) — this is the padding-top percentage value.
//         e.g. [16, 9] → 56.25 (not rounded, full precision)
export function getPaddingTopPercent(ratio: [number, number]): number {
  throw new Error('Not implemented')
}

// TODO 3: Implement AspectRatioBox with two modes:
//         Modern (useLegacy=false): wrap children in a div with getAspectRatioStyle().
//         Legacy (useLegacy=true):
//           - outer div: position:relative, width:'100%', paddingTop: `${getPaddingTopPercent()}%`
//           - inner div: position:absolute, top:0, left:0, width:'100%', height:'100%'
//           - children go inside the inner div
// TODO 4: Apply default ratio [16, 9].
//         Merge with the style prop — user styles win on the outer container.
// TODO 5: The inner div in legacy mode must be position:absolute with inset:0
//         so children can use width/height: 100% to fill it.
export function AspectRatioBox(props: AspectRatioBoxProps): React.ReactElement {
  throw new Error('Not implemented')
}

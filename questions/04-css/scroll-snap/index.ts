import React from 'react'

export type SnapDirection = 'x' | 'y'
export type SnapAlign = 'start' | 'center' | 'end'
export type SnapType = 'mandatory' | 'proximity'

export interface ScrollSnapContainerProps {
  direction?: SnapDirection
  snapType?: SnapType
  children: React.ReactNode
  style?: React.CSSProperties
}

export interface ScrollSnapItemProps {
  snapAlign?: SnapAlign
  children: React.ReactNode
  style?: React.CSSProperties
}

// TODO 1: Implement getSnapContainerStyles.
//         Build the style object:
//           scroll-snap-type: '[direction] [snapType]' → scrollSnapType: 'x mandatory'
//           overflow-x: 'auto' (horizontal) or overflow-y: 'auto' (vertical)
//           For horizontal: display: 'flex' (so items sit side by side)
export function getSnapContainerStyles(
  direction: SnapDirection,
  snapType: SnapType
): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 2: Implement getSnapItemStyles.
//         scroll-snap-align → scrollSnapAlign: 'start' | 'center' | 'end'
//         For horizontal containers: flexShrink: 0 (prevents items from squishing)
export function getSnapItemStyles(snapAlign: SnapAlign): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 3: Implement ScrollSnapContainer using getSnapContainerStyles.
//         Apply defaults: direction='x', snapType='mandatory'.
//         Merge computed styles with the style prop (user styles win).
export function ScrollSnapContainer(props: ScrollSnapContainerProps): React.ReactElement {
  throw new Error('Not implemented')
}

// TODO 4: Implement ScrollSnapItem using getSnapItemStyles.
//         Apply default: snapAlign='start'.
//         Merge computed styles with the style prop.
// TODO 5: Consider adding scrollSnapStop: 'always' for mandatory snap behaviour
//         (prevents fast-scrolling from skipping snap points).
export function ScrollSnapItem(props: ScrollSnapItemProps): React.ReactElement {
  throw new Error('Not implemented')
}

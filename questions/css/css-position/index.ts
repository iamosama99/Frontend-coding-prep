import React from 'react'

export type PositionValue = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'

// TODO 1: Implement getPositionStyles — return a CSSProperties object with the position value
//         and any offsets. IMPORTANT: static elements ignore offsets — don't include them.
export function getPositionStyles(
  position: PositionValue,
  offsets?: { top?: number; right?: number; bottom?: number; left?: number }
): React.CSSProperties {
  throw new Error('Not implemented')
}

export interface PositionDemoProps {
  position: PositionValue
  top?: number
  left?: number
  children: React.ReactNode
}

// TODO 2: Implement PositionDemo — a div that visually shows the position value in action.
//         Apply getPositionStyles() to the inner element.
//         Wrap in a relative-positioned container so absolute children have an anchor.
// TODO 3: For 'sticky', warn in the console if no 'top' offset is provided (sticky needs it).
// TODO 4: Add a label overlay showing which position type is active.
// TODO 5: Ensure the wrapper has enough height for absolute/relative offsets to be visible.
export function PositionDemo(props: PositionDemoProps): React.ReactElement {
  throw new Error('Not implemented')
}

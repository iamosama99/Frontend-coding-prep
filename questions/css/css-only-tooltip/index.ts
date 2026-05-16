import React from 'react'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  text: string
  position?: TooltipPosition
  children: React.ReactNode
  delay?: string
}

// TODO 1: Implement getTooltipCSS.
//         Return the CSS for .tooltip-wrapper, .tooltip-wrapper::before (bubble),
//         and .tooltip-wrapper::after (arrow).
//         The tooltip text comes from data-tooltip attribute: content: attr(data-tooltip).
//         Use position: absolute on ::before relative to position: relative on the wrapper.
//         Offset varies by position:
//           top:    bottom: 100%; left: 50%; transform: translateX(-50%)
//           bottom: top: 100%;    left: 50%; transform: translateX(-50%)
//           left:   right: 100%;  top: 50%;  transform: translateY(-50%)
//           right:  left: 100%;   top: 50%;  transform: translateY(-50%)
export function getTooltipCSS(position: TooltipPosition, delay?: string): string {
  throw new Error('Not implemented')
}

// TODO 2: Implement Tooltip.
//         Render a <span> (or <div>) wrapper with:
//           - position: relative
//           - data-tooltip attribute set to props.text
//           - a className that your injected CSS targets
//         Inject a <style> tag with the CSS from getTooltipCSS.
// TODO 3: The CSS uses :hover to toggle opacity: 0 → 1 and visibility: hidden → visible.
//         Do NOT use JS state — this is a CSS-only tooltip.
// TODO 4: Add a CSS transition on ::before for the opacity change (with optional delay).
// TODO 5: Handle the 4 positions — the arrow (::after) must point toward the trigger
//         using the CSS border triangle trick (zero-width/height + colored borders).
export function Tooltip(props: TooltipProps): React.ReactElement {
  throw new Error('Not implemented')
}

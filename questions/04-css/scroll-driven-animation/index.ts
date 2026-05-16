import React from 'react'

export type ScrollTimelineType = 'scroll' | 'view'

export interface ScrollAnimatedProps {
  animation: 'fadeIn' | 'slideUp' | 'scaleIn' | 'revealLeft'
  timelineType?: ScrollTimelineType
  threshold?: number
  useCSSNative?: boolean
  children: React.ReactNode
  className?: string
}

// TODO 1: Implement getScrollDrivenCSS.
//         Return the CSS for the scroll-driven animation.
//         For timelineType='view' (element-based):
//           .scroll-animated {
//             animation: [name] linear both;
//             animation-timeline: view();
//             animation-range: entry 0% entry 40%;
//           }
//         For timelineType='scroll' (page-based):
//           animation-timeline: scroll();
//         Include the @keyframes block for the named animation.
//         Add prefers-reduced-motion override: animation: none.
export function getScrollDrivenCSS(animation: string, timelineType: ScrollTimelineType): string {
  throw new Error('Not implemented')
}

// TODO 2: Implement useScrollReveal (JavaScript fallback).
//         Use IntersectionObserver with the provided threshold.
//         Set isVisible=true when the element enters the viewport.
//         Clean up the observer in the useEffect return.
//         Once visible, stop observing (one-shot reveal, not hide-on-exit).
export function useScrollReveal(
  ref: React.RefObject<HTMLElement>,
  threshold?: number
): { isVisible: boolean } {
  throw new Error('Not implemented')
}

// TODO 3: Implement ScrollAnimated.
//         Detect CSS animation-timeline support: CSS.supports('animation-timeline', 'scroll()').
//         If useCSSNative=true AND the browser supports it: inject getScrollDrivenCSS() via <style>.
//         Otherwise: use useScrollReveal for a JS-driven class toggle.
// TODO 4: For the JS fallback: start with opacity:0 transform:translateY(20px) etc.,
//         add a 'visible' class that transitions to the final state.
// TODO 5: Guard for SSR: CSS.supports and IntersectionObserver are browser-only.
export function ScrollAnimated(props: ScrollAnimatedProps): React.ReactElement {
  throw new Error('Not implemented')
}

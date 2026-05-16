import React from 'react'

export interface StickyHeaderState {
  isScrolled: boolean
  scrollY: number
}

export interface StickyHeaderProps {
  threshold?: number
  normalHeight?: number
  shrunkHeight?: number
  children: React.ReactNode
  className?: string
}

// TODO 1: Implement useStickyHeader hook.
//         Attach a scroll event listener to window.
//         On each scroll event, check if window.scrollY > threshold.
//         Update isScrolled state ONLY if the boolean value has changed
//         (compare new value to previous before calling setState).
// TODO 2: Initialize: isScrolled=false, scrollY=0.
//         Guard for SSR: only attach the listener if typeof window !== 'undefined'.
// TODO 3: Clean up the listener in the useEffect return function.
//         Return { isScrolled, scrollY }.
export function useStickyHeader(threshold?: number): StickyHeaderState {
  throw new Error('Not implemented')
}

// TODO 4: Implement StickyHeader.
//         Use useStickyHeader(threshold) for scroll state.
//         Apply position:'sticky', top:0 always.
//         Expose normalHeight/shrunkHeight as CSS custom properties on the element
//         so CSS transitions can animate between them.
//         Toggle a 'scrolled' className based on isScrolled.
// TODO 5: Apply a CSS transition on height/padding changes via an injected <style> tag.
//         The transition should be: all 0.3s ease (or just height and padding).
export function StickyHeader(props: StickyHeaderProps): React.ReactElement {
  throw new Error('Not implemented')
}

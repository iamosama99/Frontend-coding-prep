import React from 'react'

export interface SkeletonProps {
  width?: number | string
  height?: number
  borderRadius?: number
  className?: string
  style?: React.CSSProperties
}

export interface SkeletonTextProps {
  lines?: number
  lastLineWidth?: string
  lineHeight?: number
  gap?: number
}

// TODO 1: Implement getShimmerCSS.
//         Return a string containing the @keyframes shimmer animation:
//           from: background-position: -200% 0
//           to:   background-position:  200% 0
//         Also include the .skeleton base class:
//           background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)
//           background-size: 200% 100%
//           animation: shimmer 1.5s infinite linear
//         And the reduced-motion override:
//           @media (prefers-reduced-motion: reduce) { .skeleton { animation: none } }
export function getShimmerCSS(): string {
  throw new Error('Not implemented')
}

// TODO 2: Implement Skeleton.
//         Inject getShimmerCSS() via a <style> tag (once per render — use React.memo to limit).
//         Apply the 'skeleton' className plus any passed className.
//         Convert numeric width to '200px' string; string width passes through.
//         Apply height, borderRadius as inline styles.
// TODO 3: Default values: width='100%', height=16, borderRadius=4.
export function Skeleton(props: SkeletonProps): React.ReactElement {
  throw new Error('Not implemented')
}

// TODO 4: Implement SkeletonText.
//         Render `lines` number of Skeleton components stacked vertically.
//         Last line uses lastLineWidth (default '60%') for a natural look.
//         All other lines use width='100%'.
//         Gap between lines is controlled by marginBottom on each Skeleton.
// TODO 5: Default values: lines=3, lineHeight=14, gap=8.
export function SkeletonText(props: SkeletonTextProps): React.ReactElement {
  throw new Error('Not implemented')
}

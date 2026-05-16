import React from 'react'

export type MasonryApproach = 'columns' | 'grid-masonry'

export interface MasonryGridProps {
  columns?: number
  gap?: number
  approach?: MasonryApproach
  children: React.ReactNode
  style?: React.CSSProperties
}

// TODO 1: Implement getColumnsMasonryStyles.
//         Return the CSS columns approach styles:
//           columns: [count], columnGap: [gap]px
//         (Row gap is handled by marginBottom on items, not here.)
export function getColumnsMasonryStyles(columns: number, gap: number): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 2: Implement getGridMasonryStyles.
//         Return the experimental CSS grid masonry approach:
//           display: 'grid',
//           gridTemplateColumns: `repeat(${columns}, 1fr)`,
//           gridTemplateRows: 'masonry',  ← experimental
//           gap: `${gap}px`
export function getGridMasonryStyles(columns: number, gap: number): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 3: Implement getMasonryItemStyles.
//         For the columns approach, items need:
//           breakInside: 'avoid'   ← prevents cards splitting across columns
//           marginBottom: [gap]px  ← row spacing
//         Return these styles; the gap value needs to be passed in.
export function getMasonryItemStyles(gap?: number): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 4: Implement MasonryGrid.
//         Apply defaults: columns=3, gap=16, approach='columns'.
//         For 'columns': apply getColumnsMasonryStyles() to the container div.
//           Wrap each child in a div with getMasonryItemStyles() to prevent card splits.
//         For 'grid-masonry': apply getGridMasonryStyles() to the container.
//           Children are placed directly (no wrapper needed).
// TODO 5: Merge the computed container styles with the style prop (user styles win).
export function MasonryGrid(props: MasonryGridProps): React.ReactElement {
  throw new Error('Not implemented')
}

import React from 'react'

export interface TruncatedTextProps {
  text: string
  lines?: number
  className?: string
  style?: React.CSSProperties
}

// TODO 1: Implement getTruncationStyles.
//         Branch on lines:
//           lines === 1:
//             { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }
//           lines > 1:
//             { display: '-webkit-box', WebkitLineClamp: lines,
//               WebkitBoxOrient: 'vertical', overflow: 'hidden' }
//         Treat lines <= 0 as 1.
export function getTruncationStyles(lines: number): React.CSSProperties {
  throw new Error('Not implemented')
}

// TODO 2: Implement TruncatedText.
//         Apply getTruncationStyles(lines) to a <p> element.
//         Merge with the style prop (user styles win on conflict).
//         Forward className to the element.
// TODO 3: The component renders text as its content (not children) — use the text prop.
//         This makes the API explicit about what gets truncated.
// TODO 4: Remember: truncation only works if the parent container has a defined width.
//         You don't need to handle this in the component — it's a CSS constraint.
export function TruncatedText(props: TruncatedTextProps): React.ReactElement {
  throw new Error('Not implemented')
}

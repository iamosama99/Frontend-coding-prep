# Text Truncation (1 + Multi-line)

## Problem

Implement a `TruncatedText` component that truncates text after a given number of lines, showing an ellipsis. Support both single-line (`text-overflow: ellipsis`) and multi-line (`-webkit-line-clamp`) truncation. Export a `getTruncationStyles` utility that returns the correct style object.

## TypeScript Signatures

```typescript
interface TruncatedTextProps {
  text: string
  lines?: number          // number of lines before truncation, default 1
  className?: string
  style?: React.CSSProperties
}

function TruncatedText(props: TruncatedTextProps): React.ReactElement

function getTruncationStyles(lines: number): React.CSSProperties
```

## Usage Example

```tsx
<TruncatedText text="A very long text that will be cut off..." lines={1} />
// Single-line: overflow:hidden, white-space:nowrap, text-overflow:ellipsis

<TruncatedText text="A long paragraph that spans multiple lines..." lines={3} />
// Multi-line: display:-webkit-box, -webkit-line-clamp:3, -webkit-box-orient:vertical, overflow:hidden
```

Expected style objects:
```typescript
getTruncationStyles(1)
// → { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }

getTruncationStyles(3)
// → {
//     display: '-webkit-box',
//     WebkitLineClamp: 3,
//     WebkitBoxOrient: 'vertical',
//     overflow: 'hidden',
//   }
```

## Constraints

- `lines={1}`: use the single-line approach (`white-space: nowrap` + `text-overflow: ellipsis`)
- `lines > 1`: use the multi-line clamp approach (`-webkit-line-clamp`)
- The component renders a single `<p>` element by default; accept `className` and `style` as pass-throughs
- The parent container must have a defined width for truncation to work — document this in the component

## Edge Cases

- `lines={0}` — treat as 1 (minimum meaningful value)
- `lines={1}` vs `lines > 1` — the CSS technique changes completely; this is the core branch
- Text shorter than `lines` — no truncation, renders normally
- RTL text — `text-overflow: ellipsis` appears on the correct side automatically
- Dynamic text — if text changes, the truncation reapplies automatically (no JS needed)
- Very long single word with no spaces — truncated at the container edge (no word break within the word unless `word-break: break-all` is added)

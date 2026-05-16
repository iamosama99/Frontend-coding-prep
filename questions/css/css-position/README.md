# CSS Position Deep Dive

## Problem

Implement a `getPositionStyles` utility that returns the correct CSS style object for a given position type and optional offsets. Also implement a `PositionDemo` React component that visually demonstrates all five position values.

## TypeScript Signatures

```typescript
type PositionValue = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'

function getPositionStyles(
  position: PositionValue,
  offsets?: { top?: number; right?: number; bottom?: number; left?: number }
): React.CSSProperties

interface PositionDemoProps {
  position: PositionValue
  top?: number
  left?: number
  children: React.ReactNode
}

function PositionDemo(props: PositionDemoProps): React.ReactElement
```

## Usage Example

```typescript
getPositionStyles('absolute', { top: 0, right: 0 })
// → { position: 'absolute', top: 0, right: 0 }

getPositionStyles('sticky', { top: 0 })
// → { position: 'sticky', top: 0 }

getPositionStyles('static')
// → { position: 'static' }
```

## Constraints

- `static`: offsets have no effect (do not include them in the output)
- `relative`: offsets move the element from its natural position, leaving a gap
- `absolute`: positions relative to the nearest non-static ancestor; removed from flow
- `fixed`: positions relative to the viewport; removed from flow
- `sticky`: stays in flow until it hits the offset threshold, then acts like `fixed`

## Edge Cases

- Calling `getPositionStyles('static', { top: 10 })` — offsets must be ignored
- `relative` with no offsets — valid, element stays in place but creates a positioned context
- `sticky` requires a `top` (or `left/right/bottom`) value to work — warn in the demo if missing
- `absolute` without a positioned ancestor — falls back to the initial containing block (viewport equivalent)
- Negative offset values — valid; push the element in the opposite direction

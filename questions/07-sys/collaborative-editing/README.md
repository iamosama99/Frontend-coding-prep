# Collaborative Editing (Basic)

## Problem

Implement a `CollabEditor` class that applies local and remote text operations using Operational Transformation (OT). The key insight is the `transform(op, against)` function: given two operations that diverged from the same document state, it returns a new version of `op` that can be safely applied *after* `against`.

## TypeScript Signature

```ts
type InsertOp = { type: 'insert'; pos: number; text: string }
type DeleteOp = { type: 'delete'; pos: number; len: number }
type Op = InsertOp | DeleteOp

class CollabEditor {
  constructor(initialText?: string)

  // Apply an operation to the local document and notify listeners.
  apply(op: Op): void

  // Transform op so it can be applied after `against` was applied.
  // Returns the adjusted op (does NOT apply it).
  transform(op: Op, against: Op): Op

  // Return the current document text.
  getText(): string

  // Register a listener that fires whenever an op is applied.
  // Returns an unsubscribe function.
  onOp(handler: (op: Op) => void): () => void
}
```

## Transform Rules

```
insert vs insert:
  - If against.pos <= op.pos  →  op.pos += against.text.length

insert vs delete:
  - If against.pos + against.len <= op.pos  →  op.pos -= against.len
  - If against.pos < op.pos (and delete overlaps insert point)  →  op.pos = against.pos

delete vs insert:
  - If against.pos <= op.pos  →  op.pos += against.text.length

delete vs delete:
  - If against.pos + against.len <= op.pos  →  op.pos -= against.len
  - If against overlaps op completely  →  op.len = 0 (no-op)
  - If partial overlap  →  shrink op.len by the overlapping bytes
```

## Usage Example

```ts
const editor = new CollabEditor('Hello');

// Local user deletes 'H'
editor.apply({ type: 'delete', pos: 0, len: 1 });
// getText() → 'ello'

// Remote op arrived that was based on original 'Hello' — insert 'World' at pos 5
const remoteOp: Op = { type: 'insert', pos: 5, text: ' World' };
// Local already deleted 1 char, so transform the remote op against our delete
const transformed = editor.transform(remoteOp, { type: 'delete', pos: 0, len: 1 });
// transformed.pos is now 4 (5 - 1)
editor.apply(transformed);
// getText() → 'ello World'
```

## Constraints

- `apply` mutates the internal text string directly — no immutable document model needed
- Out-of-bounds positions should be clamped to valid range (0 to text.length)
- `transform` must return a **new** op object — do not mutate the input
- `onOp` handlers receive the op *as applied* (after clamping)
- Deletion beyond end of string: clamp len so it doesn't exceed available characters

## Edge Cases

- `insert` at pos 0 — prepend to document
- `insert` at pos > text.length — clamp to end
- `delete` with len 0 — no-op (apply does nothing, still notifies handlers)
- `delete` that would exceed the string — clamp len
- Two concurrent inserts at the same position — second insert goes after first (tie-break: server op wins by convention, i.e. `against.pos <= op.pos` uses `<=` not `<`)
- `transform` called with identical ops — should still return a valid (possibly no-op) op

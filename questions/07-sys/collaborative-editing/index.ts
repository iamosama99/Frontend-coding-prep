export type InsertOp = { type: 'insert'; pos: number; text: string };
export type DeleteOp = { type: 'delete'; pos: number; len: number };
export type Op = InsertOp | DeleteOp;

// TODO 1: Store the document text and a Set of op listeners.

// TODO 2: implement apply(op: Op): void.
//   a) Clamp op.pos to [0, text.length].
//   b) For 'insert': text = text.slice(0, pos) + op.text + text.slice(pos).
//   c) For 'delete': clamp len so it doesn't exceed text.length - pos.
//      text = text.slice(0, pos) + text.slice(pos + len).
//   d) Notify all handlers with the (possibly clamped) op.

// TODO 3: implement transform(op, against): Op.
//   Return a NEW op object — do not mutate either input.
//
//   insert vs insert:
//     against.pos <= op.pos  →  op.pos += against.text.length
//
//   insert vs delete:
//     against.pos + against.len <= op.pos  →  op.pos -= against.len
//     against.pos < op.pos (partial/full overlap)  →  op.pos = against.pos
//
//   delete vs insert:
//     against.pos <= op.pos  →  op.pos += against.text.length
//
//   delete vs delete:
//     against.pos + against.len <= op.pos  →  op.pos -= against.len
//     against.pos >= op.pos + op.len  →  no change (no overlap)
//     full overlap (against covers op entirely)  →  op.len = 0
//     partial overlap  →  shrink op.len by the number of overlapping chars

// TODO 4: implement getText(): string — trivially returns the internal text.

// TODO 5: implement onOp(handler): () => void.
//   Add to a Set; return a function that deletes from the Set.

export class CollabEditor {
  constructor(_initialText?: string) {
    throw new Error('Not implemented');
  }

  apply(_op: Op): void {
    throw new Error('Not implemented');
  }

  transform(_op: Op, _against: Op): Op {
    throw new Error('Not implemented');
  }

  getText(): string {
    throw new Error('Not implemented');
  }

  onOp(_handler: (op: Op) => void): () => void {
    throw new Error('Not implemented');
  }
}

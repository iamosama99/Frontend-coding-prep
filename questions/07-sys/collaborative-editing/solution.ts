export type InsertOp = { type: 'insert'; pos: number; text: string };
export type DeleteOp = { type: 'delete'; pos: number; len: number };
export type Op = InsertOp | DeleteOp;

type Handler = (op: Op) => void;

export class CollabEditor {
  private text: string;
  private handlers = new Set<Handler>();

  constructor(initialText = '') {
    this.text = initialText;
  }

  apply(op: Op): void {
    const len = this.text.length;

    if (op.type === 'insert') {
      const pos = Math.max(0, Math.min(op.pos, len));
      this.text = this.text.slice(0, pos) + op.text + this.text.slice(pos);
      this.handlers.forEach((h) => h({ ...op, pos }));
    } else {
      const pos = Math.max(0, Math.min(op.pos, len));
      const deleteLen = Math.min(op.len, len - pos);
      this.text = this.text.slice(0, pos) + this.text.slice(pos + deleteLen);
      this.handlers.forEach((h) => h({ ...op, pos, len: deleteLen }));
    }
  }

  transform(op: Op, against: Op): Op {
    if (op.type === 'insert' && against.type === 'insert') {
      const newPos = against.pos <= op.pos ? op.pos + against.text.length : op.pos;
      return { ...op, pos: newPos };
    }

    if (op.type === 'insert' && against.type === 'delete') {
      let newPos = op.pos;
      if (against.pos + against.len <= op.pos) {
        newPos -= against.len;
      } else if (against.pos < op.pos) {
        newPos = against.pos;
      }
      return { ...op, pos: newPos };
    }

    if (op.type === 'delete' && against.type === 'insert') {
      const newPos = against.pos <= op.pos ? op.pos + against.text.length : op.pos;
      return { ...op, pos: newPos };
    }

    // delete vs delete
    if (op.type === 'delete' && against.type === 'delete') {
      const opEnd = op.pos + op.len;
      const agEnd = against.pos + against.len;

      if (agEnd <= op.pos) {
        // against is entirely before op
        return { ...op, pos: op.pos - against.len };
      }

      if (against.pos >= opEnd) {
        // against is entirely after op — no change
        return { ...op };
      }

      // overlap
      const overlapStart = Math.max(op.pos, against.pos);
      const overlapEnd = Math.min(opEnd, agEnd);
      const overlap = overlapEnd - overlapStart;

      let newPos = op.pos;
      if (against.pos < op.pos) newPos = against.pos;

      return { ...op, pos: newPos, len: Math.max(0, op.len - overlap) };
    }

    return op;
  }

  getText(): string {
    return this.text;
  }

  onOp(handler: Handler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
}

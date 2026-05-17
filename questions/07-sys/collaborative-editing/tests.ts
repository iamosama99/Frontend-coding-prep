// Tests for CollabEditor
// Run: npx ts-node questions/07-sys/collaborative-editing/tests.ts

import { CollabEditor, Op } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function assertEqual(actual: unknown, expected: unknown, message: string): void {
  assert(JSON.stringify(actual) === JSON.stringify(expected), message);
}

// Test 1: CollabEditor is a class
assert(typeof CollabEditor === 'function', 'CollabEditor is exported as a class');

// Test 2: constructor with initial text
let editor: CollabEditor;
try {
  editor = new CollabEditor('Hello');
  assert(editor.getText() === 'Hello', 'getText() returns initial text');
} catch {
  assert(false, 'CollabEditor instantiates with initial text');
  process.exit(1);
}

// Test 3: apply insert at middle
editor!.apply({ type: 'insert', pos: 5, text: ' World' });
assert(editor!.getText() === 'Hello World', 'insert appends text correctly');

// Test 4: apply delete
editor!.apply({ type: 'delete', pos: 0, len: 6 });
assert(editor!.getText() === 'World', 'delete removes text correctly');

// Test 5: insert at pos 0 (prepend)
editor!.apply({ type: 'insert', pos: 0, text: 'Hello ' });
assert(editor!.getText() === 'Hello World', 'insert at pos 0 prepends correctly');

// Test 6: delete with len 0 is a no-op
editor!.apply({ type: 'delete', pos: 0, len: 0 });
assert(editor!.getText() === 'Hello World', 'delete with len=0 is a no-op');

// Test 7: delete beyond string length clamps
editor!.apply({ type: 'delete', pos: 5, len: 9999 });
assert(editor!.getText() === 'Hello', 'delete beyond string length clamps correctly');

// Test 8: onOp fires for each apply
const ops: Op[] = [];
const unsub = editor!.onOp((op) => ops.push(op));
editor!.apply({ type: 'insert', pos: 5, text: '!' });
assert(ops.length === 1, 'onOp handler fires on apply');
unsub();
editor!.apply({ type: 'insert', pos: 5, text: '?' });
assert(ops.length === 1, 'unsubscribed handler does not fire');

// Test 9: transform — insert vs insert (against.pos <= op.pos shifts op right)
{
  const e = new CollabEditor('abc');
  const op: Op = { type: 'insert', pos: 2, text: 'X' };
  const against: Op = { type: 'insert', pos: 1, text: 'YY' };
  const transformed = e.transform(op, against);
  assertEqual(transformed, { type: 'insert', pos: 4, text: 'X' }, 'transform insert vs insert shifts pos');
}

// Test 10: transform — insert vs delete (delete before insert shifts left)
{
  const e = new CollabEditor('Hello World');
  const op: Op = { type: 'insert', pos: 6, text: 'Beautiful ' };
  const against: Op = { type: 'delete', pos: 0, len: 6 };
  const transformed = e.transform(op, against);
  assertEqual(transformed, { type: 'insert', pos: 0, text: 'Beautiful ' }, 'transform insert vs delete (full overlap shifts to against.pos)');
}

// Test 11: transform — delete vs delete (non-overlapping)
{
  const e = new CollabEditor('Hello World');
  const op: Op = { type: 'delete', pos: 6, len: 5 };
  const against: Op = { type: 'delete', pos: 0, len: 5 };
  const transformed = e.transform(op, against);
  assertEqual(transformed, { type: 'delete', pos: 1, len: 5 }, 'transform delete vs delete shifts pos');
}

// Test 12: transform returns new object (does not mutate input)
{
  const e = new CollabEditor('abc');
  const op: Op = { type: 'insert', pos: 1, text: 'X' };
  const against: Op = { type: 'insert', pos: 0, text: 'Y' };
  const result = e.transform(op, against);
  assert(result !== op, 'transform returns a new op object');
  assert(op.pos === 1, 'transform does not mutate the input op');
}

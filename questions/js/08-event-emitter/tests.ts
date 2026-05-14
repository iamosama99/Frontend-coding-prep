import { EventEmitter } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

const e = new EventEmitter();

// on / emit
let count = 0;
const inc = () => count++;
e.on('tick', inc);
e.emit('tick');
e.emit('tick');
assert('on: listener fires on each emit', count, 2);

// off
e.off('tick', inc);
e.emit('tick');
assert('off: listener removed', count, 2);

// emit returns boolean
assert('emit returns true when listeners exist', e.on('x', () => {}) && e.emit('x'), true);
assert('emit returns false when no listeners', e.emit('nonexistent'), false);

// once
let onceCount = 0;
e.once('ping', () => onceCount++);
e.emit('ping');
e.emit('ping');
e.emit('ping');
assert('once: fires exactly once', onceCount, 1);

// multiple listeners
let order = '';
e.on('seq', () => { order += 'a'; });
e.on('seq', () => { order += 'b'; });
e.emit('seq');
assert('multiple listeners fire in order', order, 'ab');

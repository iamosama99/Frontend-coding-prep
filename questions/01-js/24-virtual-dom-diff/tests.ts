import { diff, VNode } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(actual)}`);
}

// Text nodes
assert('same text → NONE', diff('hello', 'hello'), { kind: 'NONE' });
assert('different text → TEXT', diff('hello', 'world'), { kind: 'TEXT', text: 'world' });

// Type change
assert('type change → REPLACE', diff({ type: 'div' }, { type: 'span' }), { kind: 'REPLACE', node: { type: 'span' } });
assert('text to VNode → REPLACE', diff('hello', { type: 'div' }), { kind: 'REPLACE', node: { type: 'div' } });

// Props change
assert(
  'prop changed → PROPS',
  diff({ type: 'div', props: { id: 'a' } }, { type: 'div', props: { id: 'b' } }),
  { kind: 'PROPS', props: { id: 'b' } }
);

// No change
assert(
  'same VNode → NONE',
  diff({ type: 'div', props: { id: 'x' } }, { type: 'div', props: { id: 'x' } }),
  { kind: 'NONE' }
);

// Children
assert(
  'child text change → CHILDREN',
  diff(
    { type: 'div', children: ['hello'] },
    { type: 'div', children: ['world'] }
  ),
  { kind: 'CHILDREN', patches: [{ kind: 'TEXT', text: 'world' }] }
);

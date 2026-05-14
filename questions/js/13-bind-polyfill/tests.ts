import { myBind } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

// Basic this binding
function getTitle(this: { title: string }) { return this.title; }
const bound = myBind(getTitle, { title: 'Dr' });
assert('binds this', bound(), 'Dr');

// Pre-applied arguments
function add(a: number, b: number) { return a + b; }
const add5 = myBind(add, null, 5);
assert('pre-applied args', add5(3), 8);
assert('pre-applied + call args', add5(10), 15);

// This fixed regardless of how called later
const obj = { title: 'Prof' };
function hello(this: { title: string }, name: string) { return `${this.title} ${name}`; }
const boundHello = myBind(hello, obj);
assert('this fixed on call', boundHello('Smith'), 'Prof Smith');

// Combined: bound this + bound args + call args
function greet(this: { salutation: string }, first: string, last: string) {
  return `${this.salutation} ${first} ${last}`;
}
const g = myBind(greet, { salutation: 'Hello' }, 'Jane');
assert('combined binding', g('Doe'), 'Hello Jane Doe');

// Event delegation relies on the DOM — run this in a browser or use jsdom.
// This file uses a minimal manual DOM simulation for ts-node.

import { delegate } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

// Minimal DOM stub for testing outside the browser
class FakeElement {
  tagName: string;
  _listeners: Map<string, Function[]> = new Map();
  _children: FakeElement[] = [];
  _parent: FakeElement | null = null;
  textContent = '';

  constructor(tag: string) { this.tagName = tag; }

  addEventListener(type: string, fn: Function) {
    if (!this._listeners.has(type)) this._listeners.set(type, []);
    this._listeners.get(type)!.push(fn);
  }

  removeEventListener(type: string, fn: Function) {
    const arr = this._listeners.get(type) ?? [];
    this._listeners.set(type, arr.filter(f => f !== fn));
  }

  appendChild(child: FakeElement) {
    child._parent = this;
    this._children.push(child);
    return child;
  }

  contains(el: FakeElement | null): boolean {
    if (!el) return false;
    if (el === this) return true;
    return this._children.some(c => c.contains(el));
  }

  closest(sel: string): FakeElement | null {
    const tag = sel.replace(/^\./, '');
    if (this.tagName === tag) return this;
    return this._parent ? this._parent.closest(sel) : null;
  }

  dispatchEvent(type: string, target: FakeElement) {
    const fns = this._listeners.get(type) ?? [];
    fns.forEach(fn => fn({ target }));
  }
}

const ul = new FakeElement('ul') as unknown as Element;
const li1 = new FakeElement('li') as unknown as Element;
const li2 = new FakeElement('li') as unknown as Element;
(ul as any).appendChild(li1);
(ul as any).appendChild(li2);

let hits: Element[] = [];
const cleanup = delegate(ul, 'click', 'li', (_, el) => hits.push(el));

// Simulate click on li1
(ul as any).dispatchEvent('click', li1);
assert('handler fires for matching child', hits.length, 1);
assert('handler receives correct element', hits[0], li1);

// Simulate click on ul itself (not an li)
(ul as any).dispatchEvent('click', ul);
assert('handler not called for non-matching target', hits.length, 1);

// Cleanup removes listener
cleanup();
(ul as any).dispatchEvent('click', li1);
assert('no handler after cleanup', hits.length, 1);

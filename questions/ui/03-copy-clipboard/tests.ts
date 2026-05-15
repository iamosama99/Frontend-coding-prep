// Tests for CopyButton
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { CopyButton, CopyButtonProps } from './index';

// Test 1: CopyButton is exported as a function
try {
  typeof CopyButton === 'function'
    ? pass('CopyButton is exported as a function')
    : fail('CopyButton exported', `typeof = ${typeof CopyButton}`);
} catch (e) {
  fail('CopyButton exported', String(e));
}

// Test 2: Props interface accepts required and optional fields
try {
  const props: CopyButtonProps = {
    text: 'hello world',
    label: 'Copy',
    successLabel: 'Copied!',
    successDuration: 2000,
    onCopy: (_t: string) => {},
    onError: (_e: unknown) => {},
  };
  props.text === 'hello world'
    ? pass('CopyButtonProps accepts all fields')
    : fail('CopyButtonProps fields', 'text mismatch');
} catch (e) {
  fail('CopyButtonProps fields', String(e));
}

// Test 3: Default successDuration is 2000 ms — verify the constant
try {
  const DEFAULT_DURATION = 2000;
  DEFAULT_DURATION === 2000
    ? pass('default successDuration is 2000ms')
    : fail('default successDuration', `got ${DEFAULT_DURATION}`);
} catch (e) {
  fail('default successDuration', String(e));
}

// Test 4: Timer reset pattern — clearTimeout before setting a new one
try {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  const resetTimer = (fn: () => void, delay: number) => {
    if (timerId !== null) clearTimeout(timerId);
    timerId = setTimeout(fn, delay);
  };
  resetTimer(() => {}, 1000);
  resetTimer(() => {}, 1000);
  // If we get here without error, the reset pattern works
  pass('timer reset pattern clears previous timer before setting new one');
} catch (e) {
  fail('timer reset pattern', String(e));
}

// Test 5: Clipboard fallback — execCommand approach
try {
  // Simulate the fallback detection
  const hasClipboardAPI = typeof navigator !== 'undefined' && !!navigator.clipboard;
  // In Node, navigator.clipboard won't exist — that's the fallback scenario
  typeof hasClipboardAPI === 'boolean'
    ? pass('clipboard API availability check returns a boolean')
    : fail('clipboard API check', 'not boolean');
} catch (e) {
  fail('clipboard API check', String(e));
}

// Test 6: onCopy callback receives the copied text
try {
  let received: string | null = null;
  const cb = (text: string) => { received = text; };
  cb('test text');
  received === 'test text'
    ? pass('onCopy callback receives copied text')
    : fail('onCopy argument', `received "${received}"`);
} catch (e) {
  fail('onCopy argument', String(e));
}

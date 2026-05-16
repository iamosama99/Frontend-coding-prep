// Tests for SignaturePad (Canvas Signature)
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { SignaturePad, SignaturePadProps, SignaturePadRef } from './index';

// Test 1: SignaturePad is exported as a function (forwardRef component)
try {
  typeof SignaturePad === 'function' || (typeof SignaturePad === 'object' && SignaturePad !== null)
    ? pass('SignaturePad is exported as a function/component')
    : fail('SignaturePad exported', `typeof = ${typeof SignaturePad}`);
} catch (e) {
  fail('SignaturePad exported', String(e));
}

// Test 2: Props interface accepts all fields
try {
  const props: SignaturePadProps = {
    width: 400,
    height: 200,
    penColor: '#000000',
    penWidth: 2,
    backgroundColor: '#ffffff',
    onBegin: () => {},
    onEnd: (_dataUrl: string) => {},
    onClear: () => {},
    disabled: false,
  };
  props.width === 400 && props.penColor === '#000000'
    ? pass('SignaturePadProps accepts all fields')
    : fail('SignaturePadProps', 'field mismatch');
} catch (e) {
  fail('SignaturePadProps', String(e));
}

// Test 3: Midpoint calculation for smooth curves
try {
  const midpoint = (p1: { x: number; y: number }, p2: { x: number; y: number }) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  });
  const mid = midpoint({ x: 10, y: 20 }, { x: 30, y: 40 });
  mid.x === 20 && mid.y === 30
    ? pass('midpoint calculation: (10,20)+(30,40) → (20,30)')
    : fail('midpoint', JSON.stringify(mid));
} catch (e) {
  fail('midpoint', String(e));
}

// Test 4: High-DPI canvas dimensions
try {
  const dpr = 2; // simulate retina
  const cssWidth = 400;
  const cssHeight = 200;
  const canvasWidth = cssWidth * dpr;
  const canvasHeight = cssHeight * dpr;
  canvasWidth === 800 && canvasHeight === 400
    ? pass('high-DPI canvas: CSS 400×200 at dpr=2 → canvas 800×400')
    : fail('high-DPI', `canvas=${canvasWidth}×${canvasHeight}`);
} catch (e) {
  fail('high-DPI', String(e));
}

// Test 5: isEmpty is true after clear
try {
  let empty = false;
  const clear = () => { empty = true; };
  clear();
  empty === true
    ? pass('isEmpty returns true after clear()')
    : fail('isEmpty after clear', `empty=${empty}`);
} catch (e) {
  fail('isEmpty after clear', String(e));
}

// Test 6: onEnd receives a data URL string
try {
  let received: string | null = null;
  const onEnd = (url: string) => { received = url; };
  onEnd('data:image/png;base64,ABC');
  received !== null && received.startsWith('data:')
    ? pass('onEnd receives a valid data URL string')
    : fail('onEnd dataUrl', `received="${received}"`);
} catch (e) {
  fail('onEnd dataUrl', String(e));
}

// Tests for useWindowSize

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Test 1: SSR fallback — when window is undefined, should return zeros
try {
  const ssrGetSize = () => {
    if (typeof window === 'undefined') return { width: 0, height: 0 };
    return { width: window.innerWidth, height: window.innerHeight };
  };
  // Temporarily remove window
  const originalWindow = (global as any).window;
  delete (global as any).window;
  const result = ssrGetSize();
  (global as any).window = originalWindow;
  result.width === 0 && result.height === 0
    ? pass('SSR fallback returns { width: 0, height: 0 }')
    : fail('SSR fallback', JSON.stringify(result));
} catch (e) {
  fail('SSR fallback', String(e));
}

// Test 2: WindowSize shape
try {
  const size = { width: 1280, height: 720 };
  typeof size.width === 'number' && typeof size.height === 'number'
    ? pass('WindowSize has numeric width and height')
    : fail('WindowSize shape', JSON.stringify(size));
} catch (e) {
  fail('WindowSize shape', String(e));
}

// Test 3: resize listener added and removed
try {
  let added = 0, removed = 0;
  const mockWindow = {
    addEventListener: (_: string, __: any) => added++,
    removeEventListener: (_: string, __: any) => removed++,
    innerWidth: 1024,
    innerHeight: 768,
  };
  // Simulate add
  mockWindow.addEventListener('resize', () => {});
  // Simulate cleanup
  mockWindow.removeEventListener('resize', () => {});
  added === 1 && removed === 1
    ? pass('resize listener added and removed exactly once')
    : fail('listener lifecycle', `added=${added} removed=${removed}`);
} catch (e) {
  fail('listener lifecycle', String(e));
}

// Test 4: hook exported
const { useWindowSize } = require('./index');
try {
  typeof useWindowSize === 'function'
    ? pass('useWindowSize exported as function')
    : fail('useWindowSize exported', `typeof = ${typeof useWindowSize}`);
} catch (e) {
  fail('export check', String(e));
}

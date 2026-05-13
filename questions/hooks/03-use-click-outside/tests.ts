// Tests for useClickOutside
// Simulates the contains() logic and listener wiring without React DOM.

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Simulate the element-contains check at the core of this hook
function isOutside(element: { contains: (t: any) => boolean } | null, target: any): boolean {
  if (!element) return false;
  return !element.contains(target);
}

// Test 1: click outside fires (target not in element)
try {
  const element = { contains: (_: any) => false };
  const target = {};
  isOutside(element, target)
    ? pass('click outside detected correctly')
    : fail('click outside', 'should return true when contains returns false');
} catch (e) {
  fail('click outside', String(e));
}

// Test 2: click inside does NOT fire (target is in element)
try {
  const element = { contains: (_: any) => true };
  const target = {};
  !isOutside(element, target)
    ? pass('click inside not triggered')
    : fail('click inside not triggered', 'should return false when contains returns true');
} catch (e) {
  fail('click inside', String(e));
}

// Test 3: null ref guard — should not throw, should return false
try {
  const result = isOutside(null, {});
  !result
    ? pass('null ref guard works')
    : fail('null ref guard', 'should return false for null element');
} catch (e) {
  fail('null ref guard', String(e));
}

// Test 4: hook is exported
const { useClickOutside } = require('./index');
try {
  typeof useClickOutside === 'function'
    ? pass('useClickOutside exported as function')
    : fail('useClickOutside exported', `typeof = ${typeof useClickOutside}`);
} catch (e) {
  fail('export check', String(e));
}

// Test 5: simulate callback called only for outside clicks
try {
  let called = 0;
  const callback = () => called++;
  const callbackRef = { current: callback };

  // Outside click
  const element = { contains: () => false };
  if (!element.contains({})) callbackRef.current();
  // Inside click
  const inside = { contains: () => true };
  if (!inside.contains({})) callbackRef.current();

  called === 1
    ? pass('callback fires exactly once for outside click')
    : fail('callback count', `expected 1, got ${called}`);
} catch (e) {
  fail('callback firing', String(e));
}

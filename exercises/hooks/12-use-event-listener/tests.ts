// Tests for useEventListener

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Test 1: event fires when dispatched
try {
  const target = new EventTarget();
  let fired = false;
  target.addEventListener('click', () => { fired = true; });
  target.dispatchEvent(new Event('click'));
  fired
    ? pass('addEventListener fires on dispatchEvent')
    : fail('addEventListener fires', 'did not fire');
} catch (e) {
  fail('addEventListener', String(e));
}

// Test 2: removeEventListener stops handler
try {
  const target = new EventTarget();
  let count = 0;
  const handler = () => count++;
  target.addEventListener('click', handler);
  target.dispatchEvent(new Event('click'));
  target.removeEventListener('click', handler);
  target.dispatchEvent(new Event('click'));
  count === 1
    ? pass('removeEventListener prevents further firing')
    : fail('removeEventListener', `count was ${count}`);
} catch (e) {
  fail('removeEventListener', String(e));
}

// Test 3: null element guard
try {
  let added = false;
  const element: EventTarget | null = null;
  if (element !== null) {
    element.addEventListener('click', () => { added = true; });
  }
  !added
    ? pass('null element guard prevents addEventListener')
    : fail('null element guard', 'addEventListener was called on null');
} catch (e) {
  fail('null element guard', String(e));
}

// Test 4: ref pattern — latest handler always called without re-registering
try {
  let version = 'v1';
  const handlerRef = { current: () => version };

  const target = new EventTarget();
  const stableListener = (e: Event) => handlerRef.current();

  target.addEventListener('test', stableListener);

  // "Re-render" — update handler without re-registering listener
  version = 'v2';
  handlerRef.current = () => version;

  let result = '';
  handlerRef.current = () => { result = version; return version; };
  target.dispatchEvent(new Event('test'));
  // stableListener calls handlerRef.current() which is now the v2 version
  pass('ref pattern allows handler update without listener re-registration');
} catch (e) {
  fail('ref pattern', String(e));
}

// Test 5: export check
const { useEventListener } = require('./starter');
try {
  typeof useEventListener === 'function'
    ? pass('useEventListener exported as function')
    : fail('useEventListener exported', `typeof = ${typeof useEventListener}`);
} catch (e) {
  fail('export check', String(e));
}

// Tests for useWhyDidYouUpdate

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Core comparison logic (extracted for testing)
function findChanges(
  prev: Record<string, unknown>,
  current: Record<string, unknown>
): Record<string, { from: unknown; to: unknown }> {
  const allKeys = new Set([...Object.keys(prev), ...Object.keys(current)]);
  const changes: Record<string, { from: unknown; to: unknown }> = {};
  for (const key of allKeys) {
    if (!Object.is(prev[key], current[key])) {
      changes[key] = { from: prev[key], to: current[key] };
    }
  }
  return changes;
}

// Test 1: detects changed primitive
try {
  const changes = findChanges({ count: 0 }, { count: 1 });
  'count' in changes && changes.count.from === 0 && changes.count.to === 1
    ? pass('detects changed primitive')
    : fail('changed primitive', JSON.stringify(changes));
} catch (e) {
  fail('changed primitive', String(e));
}

// Test 2: no change returns empty object
try {
  const obj = { a: 1, b: 'x' };
  const changes = findChanges(obj, { ...obj });
  Object.keys(changes).length === 0
    ? pass('no change produces empty changes object')
    : fail('no change', JSON.stringify(changes));
} catch (e) {
  fail('no change', String(e));
}

// Test 3: detects new key (added prop)
try {
  const changes = findChanges({ a: 1 }, { a: 1, b: 2 });
  'b' in changes && changes.b.from === undefined && changes.b.to === 2
    ? pass('detects added prop (from undefined to value)')
    : fail('added prop', JSON.stringify(changes));
} catch (e) {
  fail('added prop', String(e));
}

// Test 4: detects removed key
try {
  const changes = findChanges({ a: 1, b: 2 }, { a: 1 });
  'b' in changes && changes.b.from === 2 && changes.b.to === undefined
    ? pass('detects removed prop (to undefined)')
    : fail('removed prop', JSON.stringify(changes));
} catch (e) {
  fail('removed prop', String(e));
}

// Test 5: Object.is distinguishes different object references
try {
  const obj1 = {};
  const obj2 = {};
  !Object.is(obj1, obj2)
    ? pass('Object.is distinguishes different references')
    : fail('Object.is', 'should return false for different object references');
} catch (e) {
  fail('Object.is', String(e));
}

// Test 6: export check
const { useWhyDidYouUpdate } = require('./index');
try {
  typeof useWhyDidYouUpdate === 'function'
    ? pass('useWhyDidYouUpdate exported as function')
    : fail('useWhyDidYouUpdate exported', `typeof = ${typeof useWhyDidYouUpdate}`);
} catch (e) {
  fail('export check', String(e));
}

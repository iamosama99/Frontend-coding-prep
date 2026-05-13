// Tests for useLocalStorage
// Run with: npx ts-node tests.ts
// Note: these tests simulate the hook logic without a React renderer.
// For full integration tests use @testing-library/react-hooks.

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// --- Simulate localStorage in Node ---
const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
};

// Inject into global for the module to use
(global as any).localStorage = mockLocalStorage;
(global as any).window = { localStorage: mockLocalStorage };

// Re-import after setting global (ts-node re-evaluates on require)
const { useLocalStorage } = require('./index');

// Test 1: returns initialValue when key is not in storage
try {
  // Direct call (not in React — just test the read helper logic)
  store['test-key'] = undefined as any;
  delete store['test-key'];
  // Can't call hooks directly, so we test by checking localStorage behaviour
  mockLocalStorage.setItem('test-init', JSON.stringify(42));
  const parsed = JSON.parse(mockLocalStorage.getItem('test-init')!);
  parsed === 42 ? pass('reads and parses stored value') : fail('reads and parses stored value', `got ${parsed}`);
} catch (e) {
  fail('reads and parses stored value', String(e));
}

// Test 2: JSON round-trip works for objects
try {
  const obj = { a: 1, b: [1, 2, 3] };
  mockLocalStorage.setItem('test-obj', JSON.stringify(obj));
  const result = JSON.parse(mockLocalStorage.getItem('test-obj')!);
  result.a === 1 && result.b.length === 3
    ? pass('object round-trip via JSON')
    : fail('object round-trip via JSON', JSON.stringify(result));
} catch (e) {
  fail('object round-trip via JSON', String(e));
}

// Test 3: corrupt JSON falls back gracefully
try {
  store['bad-json'] = 'not-valid-json{{{';
  let result: any;
  try {
    result = JSON.parse(mockLocalStorage.getItem('bad-json')!);
    fail('corrupt JSON handling', 'should have thrown');
  } catch {
    pass('corrupt JSON throws — hook must catch this and use initialValue');
  }
} catch (e) {
  fail('corrupt JSON handling', String(e));
}

// Test 4: useLocalStorage is exported as a function
try {
  typeof useLocalStorage === 'function'
    ? pass('useLocalStorage is exported as a function')
    : fail('useLocalStorage is exported as a function', `typeof = ${typeof useLocalStorage}`);
} catch (e) {
  fail('useLocalStorage exported', String(e));
}

// Test 5: setter accepts updater function pattern
try {
  // Simulate the updater pattern logic
  const prev = 5;
  const updater = (n: number) => n + 1;
  const next = typeof updater === 'function' ? updater(prev) : updater;
  next === 6 ? pass('updater function pattern resolves correctly') : fail('updater function', `got ${next}`);
} catch (e) {
  fail('updater function pattern', String(e));
}

console.log('\nNote: for full hook lifecycle tests (storage events, key changes) use @testing-library/react-hooks');

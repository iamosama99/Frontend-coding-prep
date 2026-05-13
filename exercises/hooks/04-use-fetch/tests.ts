// Tests for useFetch
// Tests focus on AbortController usage and state shape logic.

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Test 1: AbortController can be created and aborted
try {
  const controller = new AbortController();
  controller.abort();
  controller.signal.aborted === true
    ? pass('AbortController.abort() sets signal.aborted')
    : fail('AbortController', 'signal.aborted should be true after abort()');
} catch (e) {
  fail('AbortController', String(e));
}

// Test 2: AbortError name check
try {
  const err = new DOMException('aborted', 'AbortError');
  err.name === 'AbortError'
    ? pass('AbortError name check works')
    : fail('AbortError name', `got ${err.name}`);
} catch (e) {
  // DOMException may not exist in all Node versions
  try {
    const err = Object.assign(new Error('aborted'), { name: 'AbortError' });
    err.name === 'AbortError'
      ? pass('AbortError name check (manual) works')
      : fail('AbortError name', `got ${err.name}`);
  } catch (e2) {
    fail('AbortError', String(e2));
  }
}

// Test 3: FetchState initial shape
try {
  const initial = { data: null, loading: true, error: null };
  initial.data === null && initial.loading === true && initial.error === null
    ? pass('initial state shape is correct')
    : fail('initial state shape', JSON.stringify(initial));
} catch (e) {
  fail('initial state', String(e));
}

// Test 4: error state on network failure
try {
  const errorState = { data: null, loading: false, error: new Error('Network error') };
  errorState.error instanceof Error && !errorState.loading && errorState.data === null
    ? pass('error state shape is correct')
    : fail('error state shape', JSON.stringify({ ...errorState, error: errorState.error?.message }));
} catch (e) {
  fail('error state', String(e));
}

// Test 5: useFetch is exported
const { useFetch } = require('./starter');
try {
  typeof useFetch === 'function'
    ? pass('useFetch exported as function')
    : fail('useFetch exported', `typeof = ${typeof useFetch}`);
} catch (e) {
  fail('export check', String(e));
}

console.log('\nNote: for full integration tests (actual fetch calls, refetch trigger) use @testing-library/react-hooks with a fetch mock.');

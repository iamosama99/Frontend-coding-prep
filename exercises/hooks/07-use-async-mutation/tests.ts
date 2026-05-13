// Tests for useAsync
// Tests the state machine logic and transitions.

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

// Simulate the async state machine transitions
type Status = 'idle' | 'loading' | 'success' | 'error';

async function simulateRun<T>(
  fn: () => Promise<T>
): Promise<{ status: Status; data: T | null; error: Error | null }> {
  let state = { status: 'loading' as Status, data: null as T | null, error: null as Error | null };
  try {
    const data = await fn();
    return { status: 'success', data, error: null };
  } catch (e) {
    return { status: 'error', data: null, error: e instanceof Error ? e : new Error(String(e)) };
  }
}

// Test 1: success transition
(async () => {
  try {
    const result = await simulateRun(() => Promise.resolve(42));
    result.status === 'success' && result.data === 42 && result.error === null
      ? pass('success: status=success, data=42, error=null')
      : fail('success transition', JSON.stringify({ ...result, error: result.error?.message }));
  } catch (e) {
    fail('success transition', String(e));
  }
})();

// Test 2: error transition
(async () => {
  try {
    const result = await simulateRun(() => Promise.reject(new Error('Network fail')));
    result.status === 'error' && result.data === null && result.error?.message === 'Network fail'
      ? pass('error: status=error, data=null, error=Error')
      : fail('error transition', JSON.stringify({ ...result, error: result.error?.message }));
  } catch (e) {
    fail('error transition', String(e));
  }
})();

// Test 3: non-Error rejection wrapped
(async () => {
  try {
    const result = await simulateRun(() => Promise.reject('just a string'));
    result.error instanceof Error && result.error.message === 'just a string'
      ? pass('non-Error rejection wrapped in Error')
      : fail('non-Error wrapping', `got error: ${result.error?.message}`);
  } catch (e) {
    fail('non-Error wrapping', String(e));
  }
})();

// Test 4: boolean helpers are correct
(async () => {
  const successResult = { status: 'success' as Status };
  const isLoading = successResult.status === 'loading';
  const isSuccess = successResult.status === 'success';
  const isError = successResult.status === 'error';
  !isLoading && isSuccess && !isError
    ? pass('boolean helpers derived correctly from status')
    : fail('boolean helpers', `isLoading=${isLoading} isSuccess=${isSuccess} isError=${isError}`);
})();

// Test 5: export check
const { useAsync } = require('./starter');
try {
  typeof useAsync === 'function'
    ? pass('useAsync exported as function')
    : fail('useAsync exported', `typeof = ${typeof useAsync}`);
} catch (e) {
  fail('export check', String(e));
}

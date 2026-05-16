import { retry } from './index';

function assert(label: string, actual: unknown, expected: unknown) {
  const pass = actual === expected;
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) console.log(`  expected: ${expected}\n  got:      ${actual}`);
}

async function run() {
  // Succeeds on first try
  const result1 = await retry(() => Promise.resolve('ok'), 3, 10);
  assert('succeeds immediately', result1, 'ok');

  // Fails twice, succeeds on 3rd
  let attempts = 0;
  const flaky = () => {
    attempts++;
    if (attempts < 3) return Promise.reject(new Error('not yet'));
    return Promise.resolve('success');
  };
  const result2 = await retry(flaky, 5, 10);
  assert('succeeds after retries', result2, 'success');
  assert('fn called correct number of times', attempts, 3);

  // All fail — rejects
  let errMsg = '';
  try {
    await retry(() => Promise.reject(new Error('always fails')), 2, 10);
  } catch (e) {
    errMsg = (e as Error).message;
  }
  assert('rejects when all attempts fail', errMsg, 'always fails');

  // retries = 0 means one attempt only
  let zeroAttempts = 0;
  try {
    await retry(() => { zeroAttempts++; return Promise.reject(new Error('x')); }, 0, 10);
  } catch {}
  assert('retries=0 calls fn exactly once', zeroAttempts, 1);
}

run().catch(console.error);

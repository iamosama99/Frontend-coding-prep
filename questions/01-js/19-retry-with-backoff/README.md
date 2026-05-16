# retry(fn, n) with Backoff

## Problem

Write a `retry` function that calls an async function up to `n` times. If a call fails, wait an increasing delay before trying again (exponential backoff). If all attempts fail, reject with the last error.

## API

```ts
function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs?: number  // base delay in ms (default 100)
): Promise<T>
```

## Example

```ts
let attempts = 0;
const flaky = () => {
  attempts++;
  if (attempts < 3) return Promise.reject(new Error('not yet'));
  return Promise.resolve('success');
};

retry(flaky, 5).then(v => console.log(v)); // "success" (after 2 retries)
```

## Constraints

- Delay between retries: `delayMs * attempt` (linear) or `delayMs * 2^attempt` (exponential) — either is acceptable, state your choice
- First attempt (attempt 0) fires immediately — no delay before the first try
- Do not catch errors from the final attempt — let the rejection propagate

## Edge Cases

- `retries = 0` → call once, no retry (if it fails, reject immediately)
- Function succeeds on first try → resolves with no delays
- All attempts fail → rejects with the error from the **last** attempt
- `fn` throws synchronously → treat it the same as a rejected promise

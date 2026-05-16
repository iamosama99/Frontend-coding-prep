# Implement Throttle

## Problem

Write a `throttle` function that ensures `fn` is called **at most once** per `interval` milliseconds, no matter how many times the throttled function is invoked.

## API

```ts
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void
```

## Example

```ts
const log = throttle((msg: string) => console.log(msg), 200);

log('a'); // fires immediately
log('b'); // ignored (within 200ms)
log('c'); // ignored (within 200ms)
// After 200ms: the next call fires immediately again
log('d'); // fires immediately
```

## Constraints

- First call in a new window fires immediately (leading edge)
- Subsequent calls within the interval are silently dropped
- No trailing call required

## Edge Cases

- Called exactly at the interval boundary → fires
- Single call → fires immediately
- Rapid calls, then pause, then rapid calls → fires once per burst
- Interval of 0 → every call fires (no throttling)

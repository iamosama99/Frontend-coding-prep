# Implement Debounce

## Problem

Write a `debounce` function that delays invoking `fn` until after `delay` milliseconds have elapsed since the last time the debounced function was called.

## API

```ts
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void
```

## Example

```ts
const log = debounce((msg: string) => console.log(msg), 300);

log('a'); // timer starts
log('b'); // resets timer
log('c'); // resets timer — only this call fires after 300ms
// → logs "c" once, 300ms after last call
```

## Constraints

- Each new call must reset the timer
- The original function is called with the arguments from the **most recent** invocation
- Return a plain function (no leading-call option required)

## Edge Cases

- Called once → fires after delay
- Called rapidly many times → fires exactly once, after the last call's delay
- Delay of 0 → fires asynchronously (next event loop tick), still debounced
- Called after the delay has already fired → starts a fresh timer

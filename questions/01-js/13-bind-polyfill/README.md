# Function.prototype.bind Polyfill

## Problem

Implement `myBind` that replicates `Function.prototype.bind`: returns a new function that, when called, calls the original function with a fixed `this` and optional pre-applied arguments.

## API

```ts
function myBind(fn: Function, thisArg: any, ...boundArgs: any[]): (...args: any[]) => any
```

## Example

```ts
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}! I am ${this.title}`;
}

const obj = { title: 'Dr' };
const boundGreet = myBind(greet, obj, 'Hello');
boundGreet('Alice'); // "Hello, Alice! I am Dr"
boundGreet('Bob');   // "Hello, Bob! I am Dr"
```

## Constraints

- `thisArg` sets the `this` context for the original function
- `boundArgs` are prepended before any arguments passed when calling the bound function
- Do not use `Function.prototype.bind` in your implementation

## Edge Cases

- No `boundArgs` → just fixes `this`
- No extra args when calling → uses only the pre-bound args
- Called with `new` → the `this` binding should be ignored (use a `instanceof` check to detect this)
- Arrow functions ignore `this` — this is expected behaviour, not a bug

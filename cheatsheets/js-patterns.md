# JavaScript Patterns — Cheatsheet

## Closures

A function that remembers its outer scope. The binding is captured, not the value.

```ts
function makeAdder(x: number) {
  return (y: number) => x + y;  // x lives in closure
}
const add5 = makeAdder(5);
add5(3); // 8
```

**Pattern:** use closures for private state (counter, cache, flag).

---

## Prototype Chain Lookup

`obj.prop` → own properties → `Object.getPrototypeOf(obj)` → ... → `null`

```ts
const a = { x: 1 };
const b = Object.create(a); // b's prototype is a
b.x;                         // 1, found on a via chain
b.hasOwnProperty('x');       // false — it's inherited

// Pure hash map (no prototype noise):
const map = Object.create(null);
```

---

## Event Loop Execution Order

```
synchronous code → microtasks (Promises) → one macrotask → microtasks → ...
```

```ts
console.log('sync');
setTimeout(() => console.log('macro'), 0);
Promise.resolve().then(() => console.log('micro'));
// Output: sync → micro → macro
```

Microtask queue **fully drains** before the next macrotask runs.

---

## Promise Chains vs async/await

```ts
// Chain style
fetch(url)
  .then(r => r.json())
  .then(data => process(data))
  .catch(err => handle(err));

// async/await — same semantics, linear to read
async function load() {
  try {
    const r = await fetch(url);
    const data = await r.json();
    return process(data);
  } catch (err) {
    handle(err);
  }
}
```

`await` suspends the current async function and queues a microtask when the Promise settles. The caller is not blocked.

---

## Promise Static Methods

| Method | Resolves when | Rejects when |
|--------|--------------|--------------|
| `Promise.all(ps)` | ALL fulfill | ANY rejects (immediately) |
| `Promise.race(ps)` | FIRST settles (either way) | same |
| `Promise.allSettled(ps)` | ALL settle (never rejects) | — |
| `Promise.any(ps)` | FIRST fulfills | ALL reject → AggregateError |

---

## Iterators & Generators

```ts
// Iterator protocol: object with .next() returning { value, done }
function* range(start: number, end: number) {
  for (let i = start; i < end; i++) yield i;
}
[...range(0, 3)]; // [0, 1, 2]

// Generators are lazy — values computed on demand
```

---

## WeakMap / WeakRef

```ts
// WeakMap: keys must be objects; not enumerable; GC can collect keys
const cache = new WeakMap<object, string>();
cache.set(domNode, 'value');
// When domNode is GC'd, entry is automatically removed

// Use for: private data, DOM node metadata, memoization with object keys
// Don't use for: primitive keys, iterating entries
```

---

## structuredClone vs JSON round-trip

| Feature | `structuredClone(x)` | `JSON.parse(JSON.stringify(x))` |
|---------|---------------------|----------------------------------|
| Circular refs | ✅ handled | ❌ throws |
| `Date` | ✅ real Date | ❌ becomes string |
| `undefined` in obj | ✅ preserved | ❌ key dropped |
| Functions | ❌ throws | ❌ silently dropped |
| `Map` / `Set` | ✅ cloned | ❌ becomes `{}` / `[]` |
| Browser support | Modern only | Everywhere |

**Rule:** prefer `structuredClone` unless you need IE11 or are serialising for JSON transport.

---

## Common Patterns Quick Reference

```ts
// Once — call at most once
function once<T>(fn: (...args: any[]) => T) {
  let called = false, result: T;
  return (...args: any[]): T => {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
}

// Memoize — cache by serialised args
function memoize<T>(fn: (...args: any[]) => T) {
  const cache = new Map<string, T>();
  return (...args: any[]): T => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key)!;
  };
}

// Pipe — left-to-right function composition
const pipe = (...fns: Array<(x: any) => any>) =>
  (x: any) => fns.reduce((v, f) => f(v), x);
```

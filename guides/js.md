# JavaScript Fundamentals — Study Guide

## Core Mental Model

JavaScript executes in a single thread. Understanding *when* code runs and *what* variables it can see are the two questions behind every JS interview topic. Get those right and closures, the event loop, and Promises all become predictable rather than mysterious.

---

## 1. Closures

A closure is a function that remembers the variables from the scope where it was **defined**, not where it is called.

```ts
function makeCounter() {
  let count = 0;          // this variable lives in the closure
  return () => ++count;   // returned fn remembers `count`
}
const inc = makeCounter();
inc(); // 1
inc(); // 2 — same `count`, not a fresh copy
```

**The critical insight:** the closure captures the *variable binding*, not the value. That's why the classic loop bug happens:

```ts
// Bug: all callbacks share the same `i` variable
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0); // 3 3 3

// Fix: each iteration gets its own `i` binding
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i), 0); // 0 1 2
```

**Interview application:** debounce, throttle, memoize, once, and bind polyfills all rely on closures to store state between calls.

---

## 2. Prototype Chain

Every object has an internal `[[Prototype]]` link. Property lookup walks the chain until it finds the key or hits `null`.

```ts
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return `${this.name} speaks`; };

const dog = new Animal('Rex');
dog.speak();         // found on Animal.prototype
dog.hasOwnProperty; // found on Object.prototype
dog.nothing;         // undefined — chain exhausted
```

**Interview gotcha:** `Object.create(null)` makes an object with *no* prototype — no `.toString()`, no `.hasOwnProperty()`. Useful for pure hash maps.

---

## 3. Event Loop

The event loop processes tasks in this strict order every tick:

1. **Call stack** — synchronous code runs to completion
2. **Microtask queue** — all Promise callbacks (`.then`, `await`, `queueMicrotask`) drain completely before the next step
3. **Macrotask queue** — one `setTimeout`/`setInterval`/I/O callback runs, then back to step 2

```ts
console.log('1');
setTimeout(() => console.log('4'), 0);   // macrotask
Promise.resolve().then(() => console.log('3')); // microtask
console.log('2');
// Output: 1, 2, 3, 4
```

**Why it matters:** stale closure bugs in `useEffect`, unexpected Promise ordering, and why `await` inside a loop is serial (each iteration waits for the microtask to settle before scheduling the next).

---

## 4. Promise Internals

A Promise is a state machine: `pending → fulfilled | rejected`. It never transitions twice.

```ts
// Promise.all: resolve when ALL settle successfully, reject on first failure
// Promise.race: settle (either way) when the FIRST one settles
// Promise.allSettled: always resolve, report success/failure for each
// Promise.any: resolve on first success, reject only if ALL fail
```

Key implementation detail: `Promise.all` needs a counter, not `Promise.race`. The first rejection should immediately reject the outer promise — don't wait.

**Interview pattern:** implementing these from scratch tests whether you understand that `.then()` returns a *new* Promise and that you can call `resolve`/`reject` from inside closures.

---

## 5. Functional Patterns

**Curry** transforms `f(a, b, c)` into `f(a)(b)(c)`. The implementation checks if enough arguments have accumulated — if so, call the original function; if not, return another function asking for more.

**Compose/Pipe** chain functions where the output of one is the input of the next. `pipe` runs left-to-right; `compose` runs right-to-left. Both use `reduce`.

```ts
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const add1 = (n: number) => n + 1;
const double = (n: number) => n * 2;
pipe(add1, double)(3); // (3+1)*2 = 8
```

---

## Common Gotchas

- `typeof null === 'object'` — historical bug, use `=== null` to check for null
- `NaN !== NaN` — use `Number.isNaN()`, not `isNaN()` (the global coerces first)
- Array holes: `[,,,].length === 3` but `.map()` skips holes, `.forEach()` skips them too
- `JSON.stringify` drops `undefined`, functions, and symbols silently
- `structuredClone` handles circular refs; `JSON.parse(JSON.stringify(...))` does not

---

## Interview Framing

1. **State your approach before coding** — "I'll use a closure to store state between calls"
2. **Name the time complexity** — O(1) lookup with a Map, O(n) with an array
3. **Call out edge cases upfront** — empty input, null, circular references
4. **Explain the tradeoff** — `structuredClone` vs JSON round-trip: former handles more types, latter is supported everywhere

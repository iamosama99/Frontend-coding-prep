# Live Interview Set 1 — Warm-Up Session

**Difficulty:** Easy / Medium  
**Focus:** Closures, functional utilities, React hooks basics  
**Total time:** 45 minutes  
**Questions:** 3

---

## Session Overview

This is a warm-up set. The questions are all "must know" fundamentals. The interviewer is testing
that you can think out loud, identify edge cases, and write clean TypeScript quickly. Speed matters
less than clarity here — a well-explained 80% solution beats a silent 100%.

---

## Question 1 — `once(fn)` utility (10 min)

**Prompt:**
> Implement a `once(fn)` function that returns a wrapper which calls `fn` at most once.
> Any subsequent calls return the result of the first invocation without calling `fn` again.

**What to implement:**
```ts
function once<T extends (...args: any[]) => any>(fn: T): T
```

**Interviewer watches for:**
- Immediately asks: "What should subsequent calls return?" (the first return value, not undefined)
- Uses a closure to store the `called` flag and the cached result
- Nulls out `fn` after the first call to prevent memory leaks (bonus)
- Types the return correctly — wrapper should match `fn`'s signature

**Follow-up questions:**
1. "What happens if `fn` throws on the first call? Should that count as the one call?"
2. "How would you make `once` reset-able — i.e., add a `.reset()` method to the returned function?"
3. "How is this different from memoize? When would you use each?"

---

## Question 2 — Flatten Nested Array (12 min)

**Prompt:**
> Write a function that flattens a deeply nested array to any depth.
> Do not use `Array.flat()` or `Array.flatMap()`.

**What to implement:**
```ts
function flatten<T>(arr: NestedArray<T>): T[]
type NestedArray<T> = (T | NestedArray<T>)[]
```

**Interviewer watches for:**
- Defines the recursive type for nested arrays
- Handles both recursive and iterative approaches (either is fine — explain the trade-off)
- Catches edge cases: empty array, already-flat array, mixed depths
- Mentions `Array.flat(Infinity)` as the built-in (and knows why you might avoid it)

**Follow-up questions:**
1. "What's the time and space complexity of your solution?"
2. "Your recursive solution could hit a stack overflow on very deep nesting. How would you fix that?"
3. "How would you modify this to accept a `depth` parameter like `Array.flat(depth)`?"

---

## Question 3 — `usePrevious` hook (10 min)

**Prompt:**
> Implement a React hook `usePrevious<T>(value: T): T | undefined` that returns the value
> from the previous render. On the first render, return `undefined`.

**What to implement:**
```ts
function usePrevious<T>(value: T): T | undefined
```

**Interviewer watches for:**
- Immediately reaches for `useRef` (not `useState` — that would trigger an extra render)
- Understands that the ref is updated *after* render, so the current render sees the old value
- Handles the first-render `undefined` case
- Knows why `useEffect` alone doesn't work (runs after paint, not before return)

**Follow-up questions:**
1. "Walk me through what happens across three renders: value goes A → B → C. What does the hook return each time?"
2. "Why useRef instead of useState here?"
3. "How would you extend this to track the last N values instead of just the previous one?"

---

## Interviewer Notes (do not share with candidate)

**Passing bar:**
- Q1: closure with flag + cached result. TypeScript types correct.
- Q2: recursive or iterative. Mentions time complexity.
- Q3: useRef + effect pattern. Explains timing correctly.

**Stretch signals (strong candidate):**
- Q1: nulls out `fn` after first call
- Q2: iterative stack solution + explains stack overflow risk
- Q3: mentions that if you need the previous value synchronously (like in render), you need a different pattern

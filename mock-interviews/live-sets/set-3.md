# Live Interview Set 3 — Data Structures + Functional Programming

**Difficulty:** Medium / Hard  
**Focus:** LRU cache with Map, curry with recursion, complexity analysis  
**Total time:** 45 minutes  
**Questions:** 2

---

## Session Overview

Two questions instead of three — both are hard and require more thinking time. This set distinguishes
senior candidates. The interviewer expects the candidate to arrive at the O(1) LRU solution, not just
a naive approach. For curry, the key is understanding `fn.length` and recursive accumulation.

---

## Question 1 — LRU Cache Class (25 min)

**Prompt:**
> Implement an LRU (Least Recently Used) cache class with O(1) `get` and `put` operations.

**What to implement:**
```ts
class LRUCache {
  constructor(capacity: number)
  get(key: number): number        // returns -1 if not found
  put(key: number, value: number): void  // evicts LRU if at capacity
}
```

**Interviewer watches for:**
- Recognizes that `Map` preserves insertion order in JavaScript — this is the key insight
- "Most recently used" = delete and re-insert on access (moves to end)
- Eviction = delete the first key (`map.keys().next().value`)
- Does NOT reach for a linked list (that's Java; Map handles ordering natively)
- Asks clarifying question: "Is the capacity guaranteed to be positive?"

**Time box guidance:** If candidate hasn't identified the Map trick by minute 8, hint: "JavaScript Maps have a useful ordering property."

**Follow-up questions:**
1. "Walk me through the time complexity of each operation."
2. "What if you needed this to work across multiple browser tabs — how would you persist it?"
3. "How would you add a `getAll()` method that returns entries in MRU order?"

---

## Question 2 — Implement Curry (15 min)

**Prompt:**
> Implement a `curry(fn)` function. The curried function should accumulate arguments until
> it has received at least `fn.length` arguments, then call `fn` with all of them.

**What to implement:**
```ts
function curry<T extends (...args: any[]) => any>(fn: T): CurriedFn<T>

// Example:
const add = curry((a: number, b: number, c: number) => a + b + c)
add(1)(2)(3)   // 6
add(1, 2)(3)   // 6
add(1)(2, 3)   // 6
add(1, 2, 3)   // 6
```

**Interviewer watches for:**
- Uses `fn.length` to know the arity (not a hardcoded number)
- Inner function accumulates args via spread + concat
- Base case: when accumulated args >= fn.length, call the original fn
- Recursive case: return another curried function waiting for more args
- Handles partial application (multiple args at once)

**Follow-up questions:**
1. "What does `fn.length` return for a function with default parameters? Does that affect your implementation?"
2. "How would you handle functions with rest parameters (`...args`)?"
3. "What's the relationship between curry and partial application? Are they the same thing?"

---

## Interviewer Notes (do not share with candidate)

**Passing bar:**
- Q1: Map-based solution, O(1) get and put. Explains eviction correctly.
- Q2: Recursive accumulation with fn.length check. Handles multi-arg partial application.

**Stretch signals (strong candidate):**
- Q1: Knows Map key insertion order, mentions doubly-linked list + hashmap as the classic CS solution but chooses Map for JS
- Q1: Mentions that `map.keys().next().value` is O(1) because Map iterators start at the head
- Q2: Correctly handles `fn.length` edge cases (default params count as 0), discusses auto-curry vs manual curry
- Q2: Returns a TypeScript-safe curried type (the CurriedFn generic)

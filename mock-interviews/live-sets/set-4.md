# Live Interview Set 4 — Async Patterns

**Difficulty:** Hard  
**Focus:** Promise internals, error propagation, retry strategies  
**Total time:** 45 minutes  
**Questions:** 3

---

## Session Overview

This set is pure async — no React, no DOM. The candidate must demonstrate they understand Promise
execution order, short-circuit vs wait-all semantics, and how to build retry logic without callback hell.
A common failure mode: getting `Promise.all` right but not knowing what to do when the counter hits zero.

---

## Question 1 — `Promise.all` from Scratch (15 min)

**Prompt:**
> Implement `Promise.all(promises)` — resolves with an array of results in input order,
> rejects immediately when any promise rejects.

**What to implement:**
```ts
function promiseAll<T>(promises: Promise<T>[]): Promise<T[]>
```

**Interviewer watches for:**
- Returns a new Promise immediately
- Uses a counter (not `results.length`) to detect completion — avoids race conditions
- Stores results by index to preserve order (not push order)
- Rejects on first rejection, ignores subsequent rejections
- Handles empty input: resolves with `[]`
- Doesn't confuse "all settled" with "all resolved"

**Follow-up questions:**
1. "Why do you use a counter and not check `results.length === promises.length`?"
2. "What happens if `promises` contains a non-Promise value like `42`? Should your implementation handle that?"
3. "How does your implementation differ from `Promise.allSettled`?"

---

## Question 2 — `Promise.race` from Scratch (8 min)

**Prompt:**
> Implement `Promise.race(promises)` — settles (resolves or rejects) with the first promise to settle.

**What to implement:**
```ts
function promiseRace<T>(promises: Promise<T>[]): Promise<T>
```

**Interviewer watches for:**
- Simpler than `Promise.all` — just forEach + resolve/reject on first settlement
- A Promise can only be settled once — calling resolve/reject multiple times is a no-op
- Empty input never settles (that's correct — matches spec)
- Does NOT filter out rejections (first rejection also wins)

**Follow-up questions:**
1. "What's the difference between `Promise.race` and `Promise.any`?"
2. "What happens if you pass an empty array to your `promiseRace`?"
3. "Give a real use case for `Promise.race` in a frontend app."

---

## Question 3 — `retry(fn, n)` with Exponential Backoff (15 min)

**Prompt:**
> Implement `retry(fn, maxAttempts, baseDelayMs)` — calls async `fn`, retries up to `maxAttempts`
> times on failure, with delay doubling between each attempt (exponential backoff).

**What to implement:**
```ts
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  baseDelayMs?: number
): Promise<T>
```

**Interviewer watches for:**
- Recursive or iterative approach (either works)
- Delay grows exponentially: attempt 1 → baseDelayMs, attempt 2 → 2×, attempt 3 → 4×
- Rejects with the final error after all attempts exhausted
- Does NOT retry on success
- Asks: "Should I retry on all errors, or only certain ones?" (good clarifying question)

**Follow-up questions:**
1. "How would you add a `shouldRetry(error)` predicate to skip retries for non-retriable errors (like 400 Bad Request)?"
2. "What's the risk of retrying immediately vs with backoff? Why does backoff help?"
3. "How would you add jitter to the delay to avoid the thundering herd problem?"

---

## Interviewer Notes (do not share with candidate)

**Passing bar:**
- Q1: counter + index assignment + early reject + empty-array shortcut.
- Q2: forEach + first-resolve/reject wins. Understands Promise one-settlement guarantee.
- Q3: recursive or loop, delay doubles each attempt, rejects after all attempts fail.

**Stretch signals (strong candidate):**
- Q1: Wraps non-Promise values with `Promise.resolve()`
- Q2: Correctly states that empty array never resolves (pending forever — matches spec)
- Q3: Adds `shouldRetry` predicate, mentions jitter, handles `baseDelayMs=0` gracefully

# Live Interview Set 5 — React Internals

**Difficulty:** Hard  
**Focus:** How React works under the hood — useState and Redux from scratch  
**Total time:** 45 minutes  
**Questions:** 2

---

## Session Overview

The hardest live set. These questions are rarely about correctness — they're about demonstrating
deep understanding of React's mental model. A candidate who can build `useState` from closures and
`Redux` from a subscriber pattern understands *why* the abstractions exist, not just how to use them.

---

## Question 1 — `useState` from Scratch (25 min)

**Prompt:**
> Implement a simplified version of React's `useState`. It should handle multiple `useState`
> calls in a single component render using an index counter approach.

**What to implement:**
```ts
// Outside any component:
let hooks: any[] = []
let currentHook = 0

function useState<T>(initialValue: T): [T, (newValue: T) => void]

function render(component: () => void) {
  currentHook = 0
  component()
}
```

**Interviewer watches for:**
- Recognizes this requires module-level state (not local variables)
- Uses an index (`currentHook`) incremented each time `useState` is called — this is how React tracks hook order
- Initial value is only used on first call (when `hooks[index]` is undefined)
- Setter function closes over the index at definition time — not at call time
- Explains why hooks can't be called conditionally (index would break)

**Time box guidance:** This question is conceptually dense. If the candidate explains the index mechanism correctly by minute 10, let them implement it. If not, ask: "How does React know which useState call is which, across renders?"

**Follow-up questions:**
1. "Why does React require hooks to always be called in the same order?"
2. "How would you add `useEffect` to this simplified model?"
3. "Your implementation re-renders by re-running the component function. How does real React differ?"

---

## Question 2 — Redux / Flux from Scratch (15 min)

**Prompt:**
> Implement a minimal Redux store: `createStore(reducer, initialState)` with `getState`,
> `dispatch`, and `subscribe`.

**What to implement:**
```ts
type Reducer<S, A> = (state: S, action: A) => S
type Listener = () => void

function createStore<S, A>(
  reducer: Reducer<S, A>,
  initialState: S
): {
  getState(): S
  dispatch(action: A): void
  subscribe(listener: Listener): () => void  // returns unsubscribe
}
```

**Interviewer watches for:**
- Closes over `state` — not exposed directly
- `dispatch` calls reducer and sets new state, then notifies all listeners
- `subscribe` adds to listener array and returns an `unsubscribe` function
- Dispatches don't modify the existing state — reducer must return new state
- `getState` returns current state (snapshot, not reference to mutable object)

**Follow-up questions:**
1. "Why should reducers be pure functions? What breaks if they mutate state?"
2. "How would you implement `combineReducers`?"
3. "What's the difference between Redux middleware and a subscriber? Where does middleware fit in the dispatch flow?"

---

## Interviewer Notes (do not share with candidate)

**Passing bar:**
- Q1: Module-level array + index counter. Setter closes over the correct index. Explains conditional-hook prohibition.
- Q2: Closure over state. Dispatch → reduce → notify. Subscribe returns unsubscribe.

**Stretch signals (strong candidate):**
- Q1: Implements batching (calling render only once for multiple setState calls)
- Q1: Extends to include useEffect (separate hooks array, dependency comparison)
- Q2: Implements `combineReducers` correctly
- Q2: Explains middleware as a way to intercept `dispatch` (compose pattern), distinguishes from subscribers
- Q2: Notes that listeners should be called with a copy of the array to handle unsubscribe during dispatch

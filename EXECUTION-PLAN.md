# Frontend Interview Prep — Execution Plan

**Working directory:** current folder (empty, ready)  
**Total questions:** 159 across 9 categories  
**Strategy:** Complete one phase at a time. Each phase is fully self-contained — after finishing it you can immediately use all slash commands (/hint, /review, /quiz) for that topic. You do not need to complete later phases to benefit from earlier ones.

Mark each phase `[x]` when done.

---

## [x] Phase 0 — Foundation (do this first, once)

Sets up root files, progress tracking, and all slash commands. Required before any topic phase.

Paste this into Claude Code:

```
Create the following in the current directory:

**Root files (3 files):**

1. CLAUDE.md — Include: (a) project summary, (b) complete 159-question table with columns: category | name | hint | difficulty | importance | round, (c) coaching rules — always ask "what have you tried?" before helping; give hints progressively vague→specific→near-solution; never write a full solution unprompted, (d) one paragraph per slash command explaining behavior: /hint, /review, /mock, /explain, /progress, /quiz.

2. README.md — Include: quick start guide, folder structure with one-line purpose per directory, day-to-day workflow (pick question → open README.md → code in index.ts → run tests.ts → use slash commands), slash command reference table.

3. PROGRESS.md — Checkbox table of ALL 159 questions grouped by category. Columns: [ ] | Name | Difficulty | Importance | Round.

**Slash commands (.claude/commands/ — 6 files):**

.claude/commands/hint.md
Behavior for /hint <question-name>:
- If no argument, ask which question the user is working on
- Give Level 1: direction only, no code, no pseudocode (e.g. "Think about what data structure gives O(1) lookup")
- Stop. Wait for the user to try and respond
- Only if user asks for more help: give Level 2 — approach + pseudocode (no working code)
- Stop. Wait again
- Only if user asks again: give Level 3 — near-solution with the key lines/pattern shown
- Never skip levels. Never volunteer the next level. If user pastes their attempt, give feedback on that attempt instead of jumping to the next hint level.

.claude/commands/review.md
Behavior for /review:
- Infer which question is being worked on from context, or ask if unclear
- Find and read the user's file (questions/[cat]/[slug]/index.ts or wherever they coded)
- Evaluate across 5 dimensions, each with a pass/borderline/fail verdict:
  1. Correctness — does the implementation handle the core requirement?
  2. Edge cases — which edge cases from README.md are handled vs missing?
  3. TypeScript — are types specific? any `any` types? return types inferred or explicit?
  4. Performance — any obvious inefficiencies? wrong time complexity?
  5. Interviewer impression — how would this score in a real interview?
- Point to specific lines for each issue
- End with: one overall verdict and the single most important improvement

.claude/commands/mock.md
Behavior for /mock live|machine:
- Adopt the persona of a realistic technical interviewer (professional, not chatty)
- For "live": randomly pick one of the live-sets in mock-interviews/live-sets/, read it, and run the session. Present the first problem. Ask 1–2 clarifying questions to warm up the candidate. Enforce time pressure out loud ("you have 8 minutes left on this part"). After they code, ask 2–3 follow-up questions from the set. Then move to the next question.
- For "machine": randomly pick one of the machine-sets in mock-interviews/machine-sets/, share the full spec, let the user code. Check in at 45 min ("quick check-in — where are you?") and 80 min ("10 minutes left — what's your priority?"). After time is up, evaluate the submitted code using the set's criteria.
- Stay in character throughout the session
- Only break character if user types exactly: stop mock

.claude/commands/explain.md
Behavior for /explain <concept-or-question-name>:
- Structure the explanation in this exact order:
  1. What it is (1–2 sentences, plain English)
  2. Why it matters in frontend interviews (concrete reason)
  3. Minimal working example (5–15 lines of code, focused on the core idea only)
  4. Common misconceptions (what people get wrong about this)
  5. When NOT to use it (the constraint or trade-off that makes alternatives better)
- If the concept maps to a question in questions/, mention the exercise path
- Keep total response under 400 words

.claude/commands/progress.md
Behavior for /progress:
- Read PROGRESS.md
- Count unchecked items by category, filtered to must-know only
- Identify the single biggest gap (most unchecked must-know items in one category)
- Recommend exactly 3 specific questions to work on today
- For each recommendation: question name + one sentence reason why it's the right next step
- Keep total output under 150 words

.claude/commands/quiz.md
Behavior for /quiz:
- Read PROGRESS.md to find unchecked must-know items
- Pick 3 questions at random (prefer different categories)
- For each question: state the question name, then ask the user to explain their approach verbally — no coding, words only
- Wait for user's response before moving on
- After each response: say what was correct, what was missing or wrong, what the key insight is
- After all 3: give an overall assessment (strong / needs work / significant gaps) and name the one concept to review today

After creating, run:
find . -maxdepth 1 -name "*.md" | sort
find .claude/commands -name "*.md" | sort
```

**Verify:** PROGRESS.md has 159 rows. CLAUDE.md has the full question table. 6 command files exist.

---

## [x] Phase 1 — JavaScript Fundamentals (24 questions)

The foundation for hooks, state, and everything else. Closures and the event loop are the mental model behind every hook and async pattern.

Paste this into Claude Code:

```
Create everything needed for the JavaScript Fundamentals topic:

**1. Guide — guides/js.md**
300+ words covering: (1) core mental model, (2) key APIs/patterns with inline code snippets, (3) common gotchas and interview mistakes, (4) 2–3 code snippets illustrating the most important patterns, (5) interview framing — how to talk through solutions out loud.
Topics: closures, prototype chain, event loop (call stack + microtask queue + macrotask queue), Promise internals, functional patterns (curry, compose)

**2. Cheatsheet — cheatsheets/js-patterns.md**
Cover: closures (definition + example), prototype chain lookup, event loop (call stack + microtask queue + macrotask queue with execution order example), Promise chains vs async/await, iterators and generators, WeakMap/WeakRef use cases, structuredClone vs JSON.parse/stringify.

**3. Exercises — questions/js/ (24 questions)**
One subfolder per question. Each subfolder gets 3 files: README.md, index.ts, tests.ts.
index.ts exports a typed function (not a React component).

Questions (name | hint | diff | imp | slug):
1. Flatten nested array | reduce + recursion or Array.flat(Infinity) | easy | must | flatten-nested-array
2. Group array by key | reduce to object, Array.prototype.groupBy shim | easy | must | group-array-by-key
3. once(fn) utility | called flag in closure, null out fn after first call | easy | must | once-fn
4. chunk(array, size) | for loop, array.slice(i, i + size) per iteration | easy | must | chunk
5. Implement debounce | clearTimeout + setTimeout in closure, leading option | med | must | debounce
6. Implement throttle | Date.now diff or inThrottle boolean flag approach | med | must | throttle
7. Deep clone object | structuredClone vs recursive + typeof + Array.isArray | med | must | deep-clone
8. Event emitter / pub-sub | Map of listener arrays, on / off / emit / once | med | must | event-emitter
9. Memoize function | Map or WeakMap cache, JSON.stringify as cache key | med | must | memoize
10. Array.map / filter / reduce polyfill | Array.prototype extension, this = array, callback(el, i, arr) | med | must | array-polyfills
11. Promise.all from scratch | counter resolve, reject immediately on first failure | hard | must | promise-all
12. Promise.race from scratch | first settled promise — resolve or reject — wins | hard | must | promise-race
13. Function.prototype.bind polyfill | closure + apply, handle new keyword edge case | hard | must | bind-polyfill
14. Implement curry | check fn.length vs accumulated args length, recurse | hard | must | curry
15. LRU cache class | Map preserves insertion order — delete then re-set trick | hard | must | lru-cache
16. Array intersection / difference | Set for O(1) lookup, filter + has() | easy | imp | array-intersection-difference
17. Deep merge objects | recursive Object.assign, handle arrays by strategy | med | imp | deep-merge
18. Event delegation pattern | single listener on parent, event.target.closest(sel) | med | imp | event-delegation
19. retry(fn, n) with backoff | recursive promise, catch → retry, delay * attempt | med | imp | retry-with-backoff
20. Flatten nested object (dot keys) | recursion, join keys with ".", base case = primitive | med | imp | flatten-object-dot-keys
21. Implement pipe / compose | reduce left-to-right (pipe) or right-to-left (compose) | med | imp | pipe-compose
22. Promise.allSettled from scratch | always resolves, wraps each in { status, value/reason } | hard | imp | promise-allsettled
23. Implement Promise.any | reject only if ALL reject, AggregateError on fail | med | nice | promise-any
24. Virtual DOM diff (basic) | key reconciliation, return patch descriptor object | hard | nice | virtual-dom-diff

File specs:
- README.md: plain-English problem statement, TypeScript API signature, usage example with expected behavior, constraints, edge cases list (no hints in edge cases)
- index.ts: correct TypeScript signature + types, 3–5 TODO comments that guide thinking without giving away the solution, exports the function
- tests.ts: plain console.log PASS/FAIL assertions (no test framework), happy path + 2 edge cases, imports from ./index

**4. Solution stubs — questions/js/ (24 files)**
Mirror questions/js/ — same 24 slugs. Each solution.ts lives alongside index.ts and tests.ts in the same slug folder.
Each solution.ts: correct TypeScript signature (same as corresponding index.ts) + single comment: // TODO: implement solution

After creating, run:
find questions/js -type f | wc -l
find questions/js -name "solution.ts" | wc -l
```

Expected: questions/js = 72 files, questions/js = 24 files

**Verify:** Open `lru-cache/` and `promise-all/` — check README.md has edge cases, tests.ts has 3+ assertions.

---

## [x] Phase 2 — React Hooks (17 questions)

Builds directly on Phase 1. Stale closures, cleanup patterns, and ref tricks are all JS fundamentals applied to React's model.

Paste this into Claude Code:

```
Create everything needed for the React Hooks topic:

**1. Guide — guides/hooks.md**
300+ words covering: (1) core mental model, (2) key APIs/patterns with inline code snippets, (3) common gotchas and interview mistakes, (4) 2–3 code snippets illustrating the most important patterns, (5) interview framing — how to talk through solutions out loud.
Topics: custom React hooks, the rules of hooks, useRef vs useState, cleanup in useEffect, stale closure trap, SSR guards (typeof window)

**2. Cheatsheet — cheatsheets/react-hooks-api.md**
All built-in React hooks with: TypeScript signature, when to use it, common pitfall.
Cover: useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, useLayoutEffect, useId, useDeferredValue, useTransition, useSyncExternalStore.

**3. Exercises — questions/hooks/ (15 questions)**
One subfolder per question. Each subfolder gets 3 files: README.md, index.ts, tests.ts.

Questions (name | hint | diff | imp | round | slug):
1. useLocalStorage | JSON.parse/stringify, storage event, SSR window guard | easy | must | both | use-local-storage
2. usePrevious | useRef stores last render value — classic 1-liner | easy | must | live | use-previous
3. useToggle | useState bool + toggle callback, optional forced value param | easy | must | both | use-toggle
4. useClickOutside | mousedown on document, ref.contains() check | easy | must | both | use-click-outside
5. useFetch | loading / error / refetch, AbortController on cleanup | med | must | both | use-fetch
6. useDebounce | clearTimeout + setTimeout in useEffect, useRef for timer | med | must | both | use-debounce
7. useThrottle | Date.now timestamp diff or inThrottle ref flag | med | must | live | use-throttle
8. useAsync / useMutation | idle → loading → success → error state machine | hard | must | live | use-async-mutation
9. useWindowSize | resize event listener, throttle, SSR window guard | easy | imp | live | use-window-size
10. useScrollPosition | scroll event, throttle, track scroll direction | easy | imp | both | use-scroll-position
11. useIntersectionObserver | ref callback, threshold / rootMargin options, cleanup | med | imp | both | use-intersection-observer
12. useCountdown | target Date diff, setInterval tick, pause/resume | med | imp | machine | use-countdown
13. useInterval | useRef for callback pointer — avoids stale closure trap | med | imp | live | use-interval
14. useEventListener | generic typed hook, ref + addEventListener + cleanup | med | imp | live | use-event-listener
15. useMediaQuery | matchMedia API, addListener + cleanup on unmount | med | imp | live | use-media-query
16. useLongPress | touchstart + setTimeout, cancel on touchmove / end | med | nice | live | use-long-press
17. useWhyDidYouUpdate | useRef prev props, JSON compare, console.log diffs | hard | nice | live | use-why-did-you-update

File specs:
- README.md: plain-English problem statement, TypeScript API signature, usage example with expected behavior, constraints, edge cases list (no hints in edge cases)
- index.ts: correct TypeScript signature + types, 3–5 TODO comments that guide thinking without giving away the solution, exports the hook
- tests.ts: plain console.log PASS/FAIL assertions (no test framework), happy path + 2 edge cases, imports from ./index

**4. Solution stubs — questions/hooks/ (17 files)**
Mirror questions/hooks/ — same 17 slugs. Each solution.ts lives alongside index.ts and tests.ts in the same slug folder.
Each solution.ts: correct TypeScript signature + single comment: // TODO: implement solution

After creating, run:
find questions/hooks -type f | wc -l
find questions/hooks -name "solution.ts" | wc -l
```

Expected: questions/hooks = 51 files, questions/hooks = 17 files

**Verify:** Open `use-fetch/` and `use-async-mutation/` — check index.ts has types and TODOs but no implementation.

---

## [x] Phase 3 — UI Components (33 questions)

The largest and most interview-common category. Accessibility and keyboard management are non-negotiable here.

Paste this into Claude Code:

```
Create everything needed for the UI Components topic:

**1. Guide — guides/ui.md**
300+ words covering: (1) core mental model, (2) key APIs/patterns with inline code snippets, (3) common gotchas and interview mistakes, (4) 2–3 code snippets illustrating the most important patterns, (5) interview framing — how to talk through solutions out loud.
Topics: compound components pattern, controlled vs uncontrolled, ARIA patterns, portal usage, focus trap and focus management

**2. Cheatsheet — cheatsheets/a11y-aria.md**
For EVERY UI component in the question list, provide:
- Correct ARIA role(s)
- Required keyboard interactions (Tab, Enter, Space, Arrow keys, Escape)
- Focus management requirements
- Required aria-* attributes
Components to cover: Accordion, Tabs, Modal/Dialog, Combobox/Autocomplete, Listbox (Multi-select dropdown), Tooltip, Breadcrumb, Pagination, Carousel, Date picker, Command palette, Form, Drag & drop list, Progress bar, Star rating, OTP input, Stepper/wizard.

**3. Exercises — questions/ui/ (26 questions)**
One subfolder per question. Each subfolder gets 3 files: README.md, index.ts, tests.ts.
index.ts exports a React functional component with typed props interface.

Questions (name | hint | diff | imp | slug):
1. Toggle switch | Checkbox underneath, CSS pill track, animated sliding thumb | easy | must | toggle-switch
2. Like / heart button | Toggle state, CSS scale animation, optimistic count update | easy | must | like-button
3. Copy-to-clipboard button | navigator.clipboard.writeText, transient "Copied!" feedback | easy | must | copy-clipboard
4. Back-to-top button | Show after scroll threshold, smooth scroll, keyboard a11y | easy | must | back-to-top
5. Read more / show less | Clamp text to N lines, toggle expanded, accessible label | easy | must | read-more
6. Accordion | controlled vs uncontrolled, single vs multi-expand | easy | must | accordion
7. Pagination | client-side slice OR server page+limit, ellipsis logic | easy | must | pagination
8. Star rating | hover preview, half-stars, keyboard accessible | easy | must | star-rating
9. Progress bar | aria-valuenow / min / max, animated fill, indeterminate | easy | must | progress-bar
10. Sortable table | Click header to sort asc/desc, indicator arrow, stable sort | easy | must | sortable-table
11. Infinite scroll | IntersectionObserver on sentinel div, page cursor | med | must | infinite-scroll
12. Tabs component | compound component, ARIA tablist / tab / tabpanel roles | med | must | tabs
13. OTP input | auto-focus next, paste split across inputs, backspace nav | med | must | otp-input
14. Multi-select dropdown | search filter, chip tags, keyboard nav, ARIA listbox | med | must | multi-select-dropdown
15. Autocomplete / Typeahead | debounced API call, keyboard nav, ARIA combobox pattern | hard | must | autocomplete
16. Modal / Dialog | portal, focus trap, Escape to close, aria-modal role | hard | must | modal
17. Toast / notification system | Context + portal + queue + auto-dismiss timer | hard | must | toast
18. Recursive comments / file tree | recursive render, collapse state per node id | hard | must | recursive-tree
19. Drag & drop list | HTML5 DnD or pointer events, swap index on drop | hard | must | drag-drop-list
20. Tooltip component | position calc above/below/left/right, delay, portal | easy | imp | tooltip
21. Breadcrumb nav | ARIA breadcrumb landmark, overflow ellipsis, current page | easy | imp | breadcrumb
22. Badge / chip component | Dismissible X, color variants, icon slot, max count badge | easy | imp | badge-chip
23. Table with sort + filter | Controlled column sort, column filters, pagination combo | med | imp | table-sort-filter
24. Search with highlight | mark matched substring in results, debounced input | med | imp | search-highlight
25. Stepper / wizard | step state machine, per-step validation, back/next flow | med | imp | stepper
26. Carousel / slider | touch swipe, auto-play, dots nav, ARIA live region | med | imp | carousel
27. Virtualized list (windowing) | render visible rows only, offset + placeholder height | hard | imp | virtual-list
28. Date picker | calendar grid, month navigation, range selection mode | hard | imp | date-picker
29. Resizable panels | pointer events, mousemove delta, clamp to min/max | hard | imp | resizable-panels
30. Command palette (⌘K) | global shortcut, fuzzy search, grouped keyboard nav | hard | imp | command-palette
31. Form builder | dynamic field config, validation schema, nested errors | hard | imp | form-builder
32. Color picker | hue/saturation sliders, hex/rgb sync, EyeDropper API | hard | nice | color-picker
33. Canvas signature pad | pointerdown/move/up, getContext 2d, toDataURL export | hard | nice | canvas-signature

File specs:
- README.md: plain-English problem statement, TypeScript API signature, usage example with expected behavior, constraints, edge cases list (no hints in edge cases)
- index.ts: correct TypeScript signature + types, 3–5 TODO comments that guide thinking without giving away the solution, exports the component
- tests.ts: plain console.log PASS/FAIL assertions (no test framework), happy path + 2 edge cases, imports from ./index

**4. Solution stubs — questions/ui/ (33 files)**
Mirror questions/ui/ — same 33 slugs. Each solution.ts lives alongside index.ts and tests.ts in the same slug folder.
Each solution.ts: correct TypeScript signature + single comment: // TODO: implement solution

After creating, run:
find questions/ui -type f | wc -l
find questions/ui -name "solution.ts" | wc -l
```

Expected: questions/ui = 99 files, questions/ui = 33 files

**Verify:** Open `modal/` and `autocomplete/` — check index.ts has the Props interface and focus/ARIA-related TODOs.

---

## [ ] Phase 4 — CSS (20 questions)

Visual layout fundamentals. Everything from box model and specificity to modern scroll-driven animations.

Paste this into Claude Code:

```
Create everything needed for the CSS topic:

**1. Guide — guides/css.md**
300+ words covering: (1) core mental model, (2) key APIs/patterns with inline code snippets, (3) common gotchas and interview mistakes, (4) 2–3 code snippets illustrating the most important patterns, (5) interview framing — how to talk through solutions out loud.
Topics: box model, stacking context, BFC, specificity calculation, Grid vs Flexbox decision tree, custom properties, @keyframes

**2. Cheatsheet — cheatsheets/css-tricks.md**
Cover: box model (content-box vs border-box), stacking context (what creates one), BFC (block formatting context and why it matters), CSS specificity calculation table, Grid vs Flexbox decision tree, CSS custom properties (var(), :root, fallbacks), logical properties (margin-inline, padding-block), @layer cascade order.

**3. Exercises — questions/css/ (15 questions)**
One subfolder per question. Each subfolder gets 3 files: README.md, index.ts (or starter.css where appropriate), tests.ts.

Questions (name | hint | diff | imp | slug):
1. CSS position deep dive | static/relative/absolute/fixed/sticky — interview classic | easy | must | css-position
2. Box model (content-box vs border-box) | Padding/border included in width with border-box | easy | must | box-model
3. Specificity + cascade rules | ID > class > tag, !important, layers, inline order | easy | must | css-specificity
4. Flexbox layout fundamentals | justify-content, align-items, flex-wrap, gap, order | easy | must | flexbox-fundamentals
5. Responsive CSS grid | auto-fit + minmax() — no media queries needed | easy | must | responsive-grid
6. CSS variables (custom props) | --var declaration, var() usage, :root scope, JS setProperty | easy | must | css-variables
7. CSS loading spinner | border + border-top-color trick + @keyframes rotate | easy | must | loading-spinner
8. Custom checkbox / radio | appearance:none, :checked selector, label click trick | easy | must | custom-checkbox-radio
9. CSS-only tooltip | ::before content, position absolute, :hover opacity | easy | must | css-only-tooltip
10. Text truncation (1 + multi-line) | overflow:hidden + text-overflow; -webkit-line-clamp | easy | must | text-truncation
11. Button hover effects | Transition on background, transform scale, box-shadow | easy | must | button-hover
12. Skeleton screen animation | shimmer: linear-gradient + @keyframes background-position | med | must | skeleton-screen
13. CSS dark mode strategy | prefers-color-scheme media query + CSS custom properties | med | must | dark-mode
14. CSS scroll snap | scroll-snap-type on parent, scroll-snap-align on child | easy | imp | scroll-snap
15. CSS keyframe animation | @keyframes, animation shorthand, fill-mode, delay | easy | imp | keyframe-animation
16. CSS aspect ratio box | aspect-ratio: 16/9 modern or padding-top % legacy trick | easy | imp | aspect-ratio-box
17. Sticky + shrinking header | position:sticky + scroll listener toggles a class | med | imp | sticky-header
18. Container queries | container-type:inline-size, @container (width > Npx) | med | imp | container-queries
19. Scroll-driven animation | animation-timeline: scroll() or view(), @keyframes | hard | nice | scroll-driven-animation
20. CSS masonry layout | CSS columns trick or experimental grid: masonry value | hard | nice | css-masonry

File specs:
- README.md: plain-English problem statement, API/markup signature, usage example with expected visual behavior, constraints, edge cases list
- index.ts: scaffold with typed props or CSS class structure, 3–5 TODO comments guiding thinking
- tests.ts: plain console.log PASS/FAIL assertions, happy path + 2 edge cases

**4. Solution stubs — questions/css/ (20 files)**
Mirror questions/css/ — same 20 slugs. Each solution.ts lives alongside index.ts and tests.ts in the same slug folder.
Each solution.ts: correct TypeScript signature + single comment: // TODO: implement solution

After creating, run:
find questions/css -type f | wc -l
find questions/css -name "solution.ts" | wc -l
```

Expected: questions/css = 60 files, questions/css = 20 files

**Verify:** Open `skeleton-screen/` and `dark-mode/` — check README.md has edge cases.

---

## [ ] Phase 5 — Performance (9 questions)

Core Web Vitals, memoization pitfalls, and optimization strategies interviewers probe directly.

Paste this into Claude Code:

```
Create everything needed for the Performance topic:

**1. Guide — guides/perf.md**
300+ words covering: (1) core mental model, (2) key APIs/patterns with inline code snippets, (3) common gotchas and interview mistakes, (4) 2–3 code snippets illustrating the most important patterns, (5) interview framing — how to talk through solutions out loud.
Topics: Core Web Vitals (LCP/CLS/INP), React memoization pitfalls, code splitting, rAF loop, Web Workers, bundle analysis

**2. Cheatsheet — cheatsheets/big-o.md**
Time/space complexity table for: Array (push/pop/shift/unshift/indexOf/splice), Object (get/set/delete/hasOwnProperty), Map, Set, sorting algorithms.
Common interview patterns with their complexity: two-pointer O(n), sliding window O(n), hash map lookup O(1), BFS/DFS O(V+E), binary search O(log n), DP O(n²).

**3. Exercises — questions/perf/ (9 questions)**
One subfolder per question. Each subfolder gets 3 files: README.md, index.ts, tests.ts.

Questions (name | hint | diff | imp | slug):
1. Image lazy loading + optimization | loading="lazy", srcset, WebP, LCP + CLS impact | easy | must | image-lazy-loading
2. React.memo + useMemo + useCallback | referential equality — know when NOT to use each | med | must | react-memoization
3. Code splitting with React.lazy | dynamic import(), Suspense fallback, route-level split | med | must | code-splitting
4. Core Web Vitals (LCP / CLS / INP) | measure with DevTools, root causes, and fixes | med | must | core-web-vitals
5. requestAnimationFrame loop | rAF id, cancelAnimationFrame on unmount, delta time | med | imp | request-animation-frame
6. Bundle size optimization | tree shaking, dynamic import, webpack-bundle-analyzer | med | imp | bundle-optimization
7. React rendering optimization | React Profiler, key prop, transitions, Concurrent Mode | med | imp | react-rendering
8. Web Worker for heavy computation | postMessage, Comlink wrapper, transferable objects | hard | imp | web-worker
9. Service Worker + caching strategies | cache-first, stale-while-revalidate, Workbox | hard | imp | service-worker

File specs:
- README.md: plain-English problem statement, TypeScript API signature, usage example with expected behavior, constraints, edge cases list
- index.ts: correct TypeScript signature + types, 3–5 TODO comments guiding thinking
- tests.ts: plain console.log PASS/FAIL assertions, happy path + 2 edge cases

**4. Solution stubs — questions/perf/ (9 files)**
Mirror questions/perf/ — same 9 slugs. Each solution.ts lives alongside index.ts and tests.ts in the same slug folder.
Each solution.ts: correct TypeScript signature + single comment: // TODO: implement solution

After creating, run:
find questions/perf -type f | wc -l
find questions/perf -name "solution.ts" | wc -l
```

Expected: questions/perf = 27 files, questions/perf = 9 files

**Verify:** Open `react-memoization/` — check README.md covers both over-optimization and under-optimization edge cases.

---

## [ ] Phase 6 — State & Patterns (11 questions)

HOCs, render props, Context pitfalls, and building Redux from scratch — the "how React works" tier.

Paste this into Claude Code:

```
Create everything needed for the State & Patterns topic:

**1. Guide — guides/state.md**
300+ words covering: (1) core mental model, (2) key APIs/patterns with inline code snippets, (3) common gotchas and interview mistakes, (4) 2–3 code snippets illustrating the most important patterns, (5) interview framing — how to talk through solutions out loud.
Topics: HOC vs render props vs hooks, Redux architecture, context re-render pitfalls, state machines

**2. Exercises — questions/state/ (11 questions)**
One subfolder per question. Each subfolder gets 3 files: README.md, index.ts, tests.ts.

Questions (name | hint | diff | imp | slug):
1. useReducer from scratch | pure reducer fn, action type switch, return new state | med | must | use-reducer
2. Context API + Provider pattern | createContext, useContext, prevent unnecessary re-renders | med | must | context-provider
3. HOC (Higher-Order Component) | wraps component, injects props, set displayName prop | med | must | hoc
4. useState from scratch | closure array + index counter, dispatcher queue | hard | must | use-state-scratch
5. Redux / Flux from scratch | store, dispatch, subscribe, combineReducers | hard | must | redux-flux
6. Render props pattern | function as child or render prop, inversion of control | med | imp | render-props
7. Optimistic UI update | update state first, store rollback, revert on error | med | imp | optimistic-ui
8. Observer / pub-sub pattern | subject.subscribe(fn), notify all, unsubscribe cleanup | med | imp | observer-pattern
9. Compound components pattern | Context inside parent, children share implicit state | hard | imp | compound-components
10. Zustand-style store from scratch | closure, getState, setState, subscribe + selector | hard | imp | zustand-store
11. Finite state machine (lite) | state map, transition fn, guards + side effects | hard | nice | finite-state-machine

File specs:
- README.md: plain-English problem statement, TypeScript API signature, usage example with expected behavior, constraints, edge cases list
- index.ts: correct TypeScript signature + types, 3–5 TODO comments guiding thinking
- tests.ts: plain console.log PASS/FAIL assertions, happy path + 2 edge cases

**3. Solution stubs — questions/state/ (11 files)**
Mirror questions/state/ — same 11 slugs. Each solution.ts lives alongside index.ts and tests.ts in the same slug folder.
Each solution.ts: correct TypeScript signature + single comment: // TODO: implement solution

After creating, run:
find questions/state -type f | wc -l
find questions/state -name "solution.ts" | wc -l
```

Expected: questions/state = 33 files, questions/state = 11 files

**Verify:** Open `redux-flux/` and `use-state-scratch/` — these are the hardest. Check index.ts has meaningful TODOs.

---

## [ ] Phase 7 — System Design (7 questions)

Architecture-level thinking: component libraries, real-time systems, offline-first. Usually the "senior" tier of an interview.

Paste this into Claude Code:

```
Create everything needed for the System Design topic:

**1. Guide — guides/sys.md**
300+ words covering: (1) core mental model, (2) key APIs/patterns with inline code snippets, (3) common gotchas and interview mistakes, (4) 2–3 code snippets illustrating the most important patterns, (5) interview framing — how to talk through solutions out loud.
Topics: component library tokens and polymorphic `as` prop, WebSocket vs SSE, chunked upload, offline-first with IndexedDB, analytics SDK batching

**2. Exercises — questions/sys/ (7 questions)**
One subfolder per question. Each subfolder gets 3 files: README.md, index.ts, tests.ts.

Questions (name | hint | diff | imp | slug):
1. Component library architecture | tokens, polymorphic `as` prop, peer deps, a11y first | hard | must | component-library
2. Real-time chat / activity feed | WebSocket vs SSE, cursor pagination, read receipts | hard | must | realtime-chat
3. Chunked file uploader | File.slice + FormData chunks, progress, retry, abort | hard | must | chunked-uploader
4. Frontend search system | debounce, cache results, highlight, facets, sort | med | imp | frontend-search
5. Analytics / tracking SDK | batch events, flush queue, visibilitychange, beacon API | hard | imp | analytics-sdk
6. Offline-first web app | IndexedDB queue, background sync, conflict resolution | hard | imp | offline-first
7. Collaborative editing (basic) | operational transform or CRDT concept, merge conflicts | hard | nice | collaborative-editing

File specs:
- README.md: plain-English problem statement, TypeScript API signature, usage example with expected behavior, constraints, edge cases list
- index.ts: correct TypeScript signature + types, 3–5 TODO comments guiding thinking
- tests.ts: plain console.log PASS/FAIL assertions, happy path + 2 edge cases

**3. Solution stubs — questions/sys/ (7 files)**
Mirror questions/sys/ — same 7 slugs. Each solution.ts lives alongside index.ts and tests.ts in the same slug folder.
Each solution.ts: correct TypeScript signature + single comment: // TODO: implement solution

After creating, run:
find questions/sys -type f | wc -l
find questions/sys -name "solution.ts" | wc -l
```

Expected: questions/sys = 21 files, questions/sys = 7 files

**Verify:** Open `chunked-uploader/` — check that README.md covers retry, abort, and progress reporting as edge cases.

---

## [ ] Phase 8 — Data Structures (8 questions)

Algorithmic thinking for frontend: DOM traversal, trie for autocomplete, DP for string problems.

Paste this into Claude Code:

```
Create everything needed for the Data Structures topic:

**1. Guide — guides/ds.md**
300+ words covering: (1) core mental model, (2) key APIs/patterns with inline code snippets, (3) common gotchas and interview mistakes, (4) 2–3 code snippets illustrating the most important patterns, (5) interview framing — how to talk through solutions out loud.
Topics: hash map patterns, BFS/DFS on trees and DOM, two-pointer and sliding window, trie insert/search, DP table setup

**2. Exercises — questions/ds/ (8 questions)**
One subfolder per question. Each subfolder gets 3 files: README.md, index.ts, tests.ts.

Questions (name | hint | diff | imp | slug):
1. Two sum / three sum | hash map O(n) or sorted + two-pointer O(n log n) | easy | must | two-sum
2. Flatten nested object / array | DFS recursion or iterative stack approach | easy | must | flatten-nested
3. Group by + frequency map | reduce to Map, sort by count, top-K elements | easy | must | group-frequency-map
4. BFS + DFS on tree and DOM | queue for BFS, call stack for DFS, NodeList walk | med | must | bfs-dfs
5. Trie for autocomplete | TrieNode class, insert O(L), prefix search + DFS collect | hard | imp | trie-autocomplete
6. Sliding window (max, sum) | monotonic deque or expand/shrink two-pointer | hard | imp | sliding-window
7. Serialize / deserialize binary tree | BFS with null markers, split string + queue restore | hard | imp | serialize-binary-tree
8. Longest common subsequence | 2D DP table dp[i][j], trace back diagonally | hard | nice | lcs

File specs:
- README.md: plain-English problem statement, TypeScript API signature, usage example with expected behavior, constraints, edge cases list
- index.ts: correct TypeScript signature + types, 3–5 TODO comments guiding thinking
- tests.ts: plain console.log PASS/FAIL assertions, happy path + 2 edge cases

**3. Solution stubs — questions/ds/ (8 files)**
Mirror questions/ds/ — same 8 slugs. Each solution.ts lives alongside index.ts and tests.ts in the same slug folder.
Each solution.ts: correct TypeScript signature + single comment: // TODO: implement solution

After creating, run:
find questions/ds -type f | wc -l
find questions/ds -name "solution.ts" | wc -l
```

Expected: questions/ds = 24 files, questions/ds = 8 files

**Verify:** Open `trie-autocomplete/` — check index.ts has a TrieNode class scaffold with TODOs.

---

## [ ] Phase 9 — Mini Apps: Build This (30 questions)

End-to-end machine round practice. These are full features built from scratch — no starter API, just a spec. Do this phase after Phases 1–3 so you have JS, hooks, and UI foundations in place.

Paste this into Claude Code:

```
Create everything needed for the Mini Apps topic:

**1. Guide — guides/mini.md**
300+ words covering: (1) how machine rounds differ from live coding, (2) how to structure a mini app build (state first, then UI, then edge cases), (3) common patterns across all mini apps (controlled inputs, localStorage persist, loading/error states), (4) what reviewers check in submitted code (correctness, edge case handling, code organisation), (5) time management — what to cut vs what to keep.

**2. Exercises — questions/mini/ (30 questions)**
One subfolder per question. Each subfolder gets 2 files: README.md and index.tsx.
No tests.ts — mini apps are evaluated by running them in a browser (paste into playground/src/App.tsx and run `npm run dev`).

Questions (name | hint | diff | imp | slug):
1. Todo list app | Add/delete/complete, filter (all/active/done), localStorage persist | easy | must | todo-list
2. Counter app | Increment/decrement/reset, step config, min/max clamp | easy | must | counter-app
3. Calculator | Operator chain, decimal, clear/backspace, edge: divide by 0 | easy | must | calculator
4. Stopwatch / Timer | setInterval + clearInterval, lap times, format mm:ss:ms | easy | must | stopwatch-timer
5. Countdown timer | Target date diff, tick with setInterval, flash on zero | easy | must | countdown-timer
6. Shopping cart | Add/remove/qty, total + tax calc, localStorage persist | easy | must | shopping-cart
7. Search & filter list | Live filter on input, highlight match, empty state message | easy | must | search-filter-list
8. Dark / light theme switcher | Toggle CSS class, localStorage persist, system pref fallback | easy | must | theme-switcher
9. Password strength indicator | Regex rules (uppercase/digit/symbol), visual bar + label | easy | must | password-strength
10. Character / word counter | Live count on keyup, max limit highlight, remaining label | easy | must | char-word-counter
11. Form with validation | Required, email regex, min-length, inline errors, submit lock | easy | must | form-validation
12. Tic-tac-toe | Win detection (rows/cols/diags), X/O turn, reset, draw state | easy | must | tic-tac-toe
13. Quiz / survey app | Step through Qs, score tally, result screen, restart | med | must | quiz-app
14. Notes app | CRUD notes, localStorage, search, timestamps | med | must | notes-app
15. Expense tracker | Add/delete entries, category tag, running total, chart | med | must | expense-tracker
16. Image gallery + lightbox | Grid layout, click to open modal, prev/next, keyboard nav | med | must | image-gallery
17. Pomodoro timer | 25/5 cycle, session count, browser notification on break | med | must | pomodoro-timer
18. Weather app (API) | Fetch from OpenWeather, loading/error states, icon display | easy | imp | weather-app
19. GitHub user search | Debounced fetch, profile card render, 404 error handling | easy | imp | github-search
20. Currency converter | Fetch live rates, two-way input, swap button, decimal round | easy | imp | currency-converter
21. Rock Paper Scissors | Random CPU pick, score tracking, win/lose/draw display | easy | imp | rock-paper-scissors
22. URL shortener (UI) | Input + submit, history list, copy-to-clipboard button | easy | imp | url-shortener
23. Memory match card game | Shuffle deck, flip pairs, match tracking, move counter | med | imp | memory-match
24. Kanban board | Columns (To-do/In progress/Done), drag cards between columns | med | imp | kanban-board
25. Markdown previewer | Textarea input, marked.js parse, live side-by-side preview | med | imp | markdown-previewer
26. Infinite photo feed | Unsplash API, IntersectionObserver load-more, masonry grid | med | imp | infinite-photo-feed
27. Snake game (basic) | requestAnimationFrame loop, grid, direction queue, collision | med | imp | snake-game
28. Number guessing game | Random number, hint (higher/lower), attempt counter | easy | nice | number-guessing
29. BMI / tip calculator | Formula, input validation, result with category label | easy | nice | bmi-tip-calc
30. Paint / drawing canvas | Canvas 2d, mouse/touch events, color picker, brush size | hard | nice | paint-canvas

File specs:
- README.md: plain-English problem statement, full requirements list, stretch goals, what the reviewer checks, edge cases list
- index.tsx: React component scaffold with TODO comments for each major feature; paste into playground/src/App.tsx to view live in the browser

**3. Solution stubs — questions/mini/ (30 files)**
Mirror questions/mini/ — same 30 slugs. Each slug folder contains only one file: solution.md.
Each solution.md: one-paragraph approach outline — no code — so the user plans before building.

After creating, run:
find questions/mini -type f | wc -l
find questions/mini -name "solution.md" | wc -l
```

Expected: questions/mini = 60 files (2 per question), questions/mini = 30 files

**Verify:** Open `todo-list/` and `pomodoro-timer/` — check README.md covers localStorage, edge cases, and evaluation criteria.

---

## [ ] Phase 10 — Mock Interviews & Interview Communication

Ties everything together. Run these after completing at least Phases 1–3.

Paste this into Claude Code:

```
Create mock-interviews/ with 3 subdirectories, and the final cheatsheet:

**Cheatsheet — cheatsheets/interview-communication.md**
Cover: how to structure verbal explanations (clarify → approach → code → test), good clarifying questions to ask before coding, how to handle being stuck gracefully, how to communicate trade-offs, what interviewers actually look for beyond correctness, phrases to use ("I'm going to start with X because...", "A trade-off here is..."), phrases to avoid ("I think maybe...", long silences).

**mock-interviews/live-sets/ — 5 files (set-1.md through set-5.md)**
Each is a 45-minute live interview scenario structured as:
- Session overview (difficulty level, focus area)
- Questions (2–3 per session, all from the actual question list)
- For each question: time allocation, what to implement, what the interviewer watches for
- Follow-up questions the interviewer will ask after coding
- Difficulty progression: set-1 uses easy/med must-know, set-5 uses med/hard must-know

Suggested question groupings:
- set-1: once(fn) + Flatten nested array + usePrevious (warm-up session)
- set-2: Implement debounce + Event emitter + useDebounce (closures + hooks)
- set-3: LRU cache class + Implement curry (data structures + FP)
- set-4: Promise.all + Promise.race + retry with backoff (async patterns)
- set-5: useState from scratch + Redux/Flux from scratch (React internals)

**mock-interviews/machine-sets/ — 5 files (set-1.md through set-5.md)**
Each is a 90-minute machine round structured as:
- Problem statement (full spec, not just a name)
- Primary requirements (must complete in 90 min)
- Stretch goals (for candidates finishing early)
- Evaluation criteria (what the reviewer checks in the submitted code)
- Difficulty progression: set-1 = simpler components, set-5 = complex ones

Suggested components:
- set-1: Accordion + Pagination (two simple components)
- set-2: OTP input (one focused, tricky component)
- set-3: Autocomplete / Typeahead (debounce + ARIA + keyboard nav)
- set-4: Modal / Dialog + Toast system (portal + focus trap + queue)
- set-5: Virtualized list (windowing — the hardest machine question)

**mock-interviews/SCORING.md**
Self-evaluation rubric with pass/borderline/fail bands for 6 dimensions:
1. Correctness — does it work for the happy path?
2. Edge case handling — does it handle empty input, nulls, rapid events?
3. TypeScript quality — are types specific (not `any`), are props/returns typed?
4. Time management — finished within expected time? (include expected times per difficulty)
5. Communication clarity — did you explain before coding? narrate trade-offs?
6. Code quality — naming, no premature abstraction, no magic numbers
Include: how to compute an overall session score and what to do based on the result.

After creating, run:
find mock-interviews -name "*.md" | sort
find cheatsheets -name "*.md" | sort
```

Expected: mock-interviews = 11 files, cheatsheets = 6 total (js-patterns, react-hooks-api, a11y-aria, css-tricks, big-o, interview-communication)

**Verify:** Check set-1 and set-5 of each type — confirm difficulty progression is real.

---

## [ ] Final Verification

Run after all phases are complete:

```
find . -not -path './.git/*' -not -path './node_modules/*' -not -path './playground/node_modules/*' -not -name 'EXECUTION-PLAN.md' | sort | head -80
echo "---"
echo "questions files:"; find questions -type f | wc -l
echo "solution stubs:"; find questions -name "solution.ts" -o -name "solution.md" | wc -l
echo "guides files:"; find guides -name "*.md" | wc -l
echo "cheatsheets files:"; find cheatsheets -name "*.md" | wc -l
echo "mock-interview files:"; find mock-interviews -name "*.md" | wc -l
echo "command files:"; find .claude/commands -name "*.md" | wc -l
```

Expected counts:
- questions: (129 questions × 4 files each) + (30 mini × 3 files each) = 516 + 90 = 606 total question files
- solution stubs: 159 (129 solution.ts + 30 solution.md)
- guides: 9
- cheatsheets: 6
- mock-interviews: 11
- commands: 6

---

## Quick Reference — Phase Completion Status

| Phase | Topic | Questions | Usable after completing |
|-------|-------|-----------|------------------------|
| 0 | Foundation | — | /hint, /review, /quiz, /progress work |
| 1 | JavaScript Fundamentals | 24 | Full JS practice + hints + review |
| 2 | React Hooks | 17 | Full hooks practice |
| 3 | UI Components | 33 | Full UI practice + a11y cheatsheet |
| 4 | CSS | 20 | Full CSS practice |
| 5 | Performance | 9 | Full perf practice + big-O cheatsheet |
| 6 | State & Patterns | 11 | Full state practice |
| 7 | System Design | 7 | Full sys design practice |
| 8 | Data Structures | 8 | Full DS practice |
| 9 | Mini Apps | 30 | Full machine round practice |
| 10 | Mock Interviews | — | /mock live and /mock machine |

---

## Quick Reference — All 159 Slugs

| Cat | Name | Slug |
|-----|------|------|
| mini | Todo list app | todo-list |
| mini | Counter app | counter-app |
| mini | Calculator | calculator |
| mini | Stopwatch / Timer | stopwatch-timer |
| mini | Countdown timer | countdown-timer |
| mini | Shopping cart | shopping-cart |
| mini | Search & filter list | search-filter-list |
| mini | Dark / light theme switcher | theme-switcher |
| mini | Password strength indicator | password-strength |
| mini | Character / word counter | char-word-counter |
| mini | Form with validation | form-validation |
| mini | Tic-tac-toe | tic-tac-toe |
| mini | Quiz / survey app | quiz-app |
| mini | Notes app | notes-app |
| mini | Expense tracker | expense-tracker |
| mini | Image gallery + lightbox | image-gallery |
| mini | Pomodoro timer | pomodoro-timer |
| mini | Weather app (API) | weather-app |
| mini | GitHub user search | github-search |
| mini | Currency converter | currency-converter |
| mini | Rock Paper Scissors | rock-paper-scissors |
| mini | URL shortener (UI) | url-shortener |
| mini | Memory match card game | memory-match |
| mini | Kanban board | kanban-board |
| mini | Markdown previewer | markdown-previewer |
| mini | Infinite photo feed | infinite-photo-feed |
| mini | Snake game (basic) | snake-game |
| mini | Number guessing game | number-guessing |
| mini | BMI / tip calculator | bmi-tip-calc |
| mini | Paint / drawing canvas | paint-canvas |
| hooks | useLocalStorage | use-local-storage |
| hooks | usePrevious | use-previous |
| hooks | useToggle | use-toggle |
| hooks | useClickOutside | use-click-outside |
| hooks | useFetch | use-fetch |
| hooks | useDebounce | use-debounce |
| hooks | useThrottle | use-throttle |
| hooks | useAsync / useMutation | use-async-mutation |
| hooks | useWindowSize | use-window-size |
| hooks | useScrollPosition | use-scroll-position |
| hooks | useIntersectionObserver | use-intersection-observer |
| hooks | useCountdown | use-countdown |
| hooks | useInterval | use-interval |
| hooks | useEventListener | use-event-listener |
| hooks | useMediaQuery | use-media-query |
| hooks | useLongPress | use-long-press |
| hooks | useWhyDidYouUpdate | use-why-did-you-update |
| ui | Toggle switch | toggle-switch |
| ui | Like / heart button | like-button |
| ui | Copy-to-clipboard button | copy-clipboard |
| ui | Back-to-top button | back-to-top |
| ui | Read more / show less | read-more |
| ui | Accordion | accordion |
| ui | Pagination | pagination |
| ui | Star rating | star-rating |
| ui | Progress bar | progress-bar |
| ui | Sortable table | sortable-table |
| ui | Infinite scroll | infinite-scroll |
| ui | Tabs component | tabs |
| ui | OTP input | otp-input |
| ui | Multi-select dropdown | multi-select-dropdown |
| ui | Autocomplete / Typeahead | autocomplete |
| ui | Modal / Dialog | modal |
| ui | Toast / notification system | toast |
| ui | Recursive comments / file tree | recursive-tree |
| ui | Drag & drop list | drag-drop-list |
| ui | Tooltip component | tooltip |
| ui | Breadcrumb nav | breadcrumb |
| ui | Badge / chip component | badge-chip |
| ui | Table with sort + filter | table-sort-filter |
| ui | Search with highlight | search-highlight |
| ui | Stepper / wizard | stepper |
| ui | Carousel / slider | carousel |
| ui | Virtualized list (windowing) | virtual-list |
| ui | Date picker | date-picker |
| ui | Resizable panels | resizable-panels |
| ui | Command palette (⌘K) | command-palette |
| ui | Form builder | form-builder |
| ui | Color picker | color-picker |
| ui | Canvas signature pad | canvas-signature |
| js | Flatten nested array | flatten-nested-array |
| js | Group array by key | group-array-by-key |
| js | once(fn) utility | once-fn |
| js | chunk(array, size) | chunk |
| js | Implement debounce | debounce |
| js | Implement throttle | throttle |
| js | Deep clone object | deep-clone |
| js | Event emitter / pub-sub | event-emitter |
| js | Memoize function | memoize |
| js | Array.map / filter / reduce polyfill | array-polyfills |
| js | Promise.all from scratch | promise-all |
| js | Promise.race from scratch | promise-race |
| js | Function.prototype.bind polyfill | bind-polyfill |
| js | Implement curry | curry |
| js | LRU cache class | lru-cache |
| js | Array intersection / difference | array-intersection-difference |
| js | Deep merge objects | deep-merge |
| js | Event delegation pattern | event-delegation |
| js | retry(fn, n) with backoff | retry-with-backoff |
| js | Flatten nested object (dot keys) | flatten-object-dot-keys |
| js | Implement pipe / compose | pipe-compose |
| js | Promise.allSettled from scratch | promise-allsettled |
| js | Implement Promise.any | promise-any |
| js | Virtual DOM diff (basic) | virtual-dom-diff |
| css | CSS position deep dive | css-position |
| css | Box model (content-box vs border-box) | box-model |
| css | Specificity + cascade rules | css-specificity |
| css | Flexbox layout fundamentals | flexbox-fundamentals |
| css | Responsive CSS grid | responsive-grid |
| css | CSS variables (custom props) | css-variables |
| css | CSS loading spinner | loading-spinner |
| css | Custom checkbox / radio | custom-checkbox-radio |
| css | CSS-only tooltip | css-only-tooltip |
| css | Text truncation (1 + multi-line) | text-truncation |
| css | Button hover effects | button-hover |
| css | Skeleton screen animation | skeleton-screen |
| css | CSS dark mode strategy | dark-mode |
| css | CSS scroll snap | scroll-snap |
| css | CSS keyframe animation | keyframe-animation |
| css | CSS aspect ratio box | aspect-ratio-box |
| css | Sticky + shrinking header | sticky-header |
| css | Container queries | container-queries |
| css | Scroll-driven animation | scroll-driven-animation |
| css | CSS masonry layout | css-masonry |
| perf | Image lazy loading + optimization | image-lazy-loading |
| perf | React.memo + useMemo + useCallback | react-memoization |
| perf | Code splitting with React.lazy | code-splitting |
| perf | Core Web Vitals (LCP / CLS / INP) | core-web-vitals |
| perf | requestAnimationFrame loop | request-animation-frame |
| perf | Bundle size optimization | bundle-optimization |
| perf | React rendering optimization | react-rendering |
| perf | Web Worker for heavy computation | web-worker |
| perf | Service Worker + caching strategies | service-worker |
| state | useReducer from scratch | use-reducer |
| state | Context API + Provider pattern | context-provider |
| state | HOC (Higher-Order Component) | hoc |
| state | useState from scratch | use-state-scratch |
| state | Redux / Flux from scratch | redux-flux |
| state | Render props pattern | render-props |
| state | Optimistic UI update | optimistic-ui |
| state | Observer / pub-sub pattern | observer-pattern |
| state | Compound components pattern | compound-components |
| state | Zustand-style store from scratch | zustand-store |
| state | Finite state machine (lite) | finite-state-machine |
| sys | Component library architecture | component-library |
| sys | Real-time chat / activity feed | realtime-chat |
| sys | Chunked file uploader | chunked-uploader |
| sys | Frontend search system | frontend-search |
| sys | Analytics / tracking SDK | analytics-sdk |
| sys | Offline-first web app | offline-first |
| sys | Collaborative editing (basic) | collaborative-editing |
| ds | Two sum / three sum | two-sum |
| ds | Flatten nested object / array | flatten-nested |
| ds | Group by + frequency map | group-frequency-map |
| ds | BFS + DFS on tree and DOM | bfs-dfs |
| ds | Trie for autocomplete | trie-autocomplete |
| ds | Sliding window (max, sum) | sliding-window |
| ds | Serialize / deserialize binary tree | serialize-binary-tree |
| ds | Longest common subsequence | lcs |

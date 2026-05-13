# Frontend Interview Prep — Project Guide

## Project Summary

This workspace is a structured frontend engineering interview preparation system covering 159 questions across 9 categories. Each question has a problem statement, typed starter file, and tests. Work through exercises at your own pace using slash commands for hints, review, and mock interviews. The coaching approach prioritises your own thinking first — hints are progressive and solutions are never given unprompted.

---

## Complete Question Table

| Category | Name | Hint | Difficulty | Importance | Round |
|----------|------|------|------------|------------|-------|
| mini | Todo list app | Add/delete/complete, filter (all/active/done), localStorage persist | easy | must | machine |
| mini | Counter app | Increment/decrement/reset, step config, min/max clamp | easy | must | machine |
| mini | Calculator | Operator chain, decimal, clear/backspace, edge: divide by 0 | easy | must | machine |
| mini | Stopwatch / Timer | setInterval + clearInterval, lap times, format mm:ss:ms | easy | must | machine |
| mini | Countdown timer | Target date diff, tick with setInterval, flash on zero | easy | must | machine |
| mini | Shopping cart | Add/remove/qty, total + tax calc, localStorage persist | easy | must | machine |
| mini | Search & filter list | Live filter on input, highlight match, empty state message | easy | must | machine |
| mini | Dark / light theme switcher | Toggle CSS class, localStorage persist, system pref fallback | easy | must | machine |
| mini | Password strength indicator | Regex rules (uppercase/digit/symbol), visual bar + label | easy | must | machine |
| mini | Character / word counter | Live count on keyup, max limit highlight, remaining label | easy | must | machine |
| mini | Form with validation | Required, email regex, min-length, inline errors, submit lock | easy | must | machine |
| mini | Tic-tac-toe | Win detection (rows/cols/diags), X/O turn, reset, draw state | easy | must | machine |
| mini | Quiz / survey app | Step through Qs, score tally, result screen, restart | med | must | machine |
| mini | Notes app | CRUD notes, localStorage, search, timestamps | med | must | machine |
| mini | Expense tracker | Add/delete entries, category tag, running total, chart | med | must | machine |
| mini | Image gallery + lightbox | Grid layout, click to open modal, prev/next, keyboard nav | med | must | machine |
| mini | Pomodoro timer | 25/5 cycle, session count, browser notification on break | med | must | machine |
| mini | Weather app (API) | Fetch from OpenWeather, loading/error states, icon display | easy | imp | machine |
| mini | GitHub user search | Debounced fetch, profile card render, 404 error handling | easy | imp | machine |
| mini | Currency converter | Fetch live rates, two-way input, swap button, decimal round | easy | imp | machine |
| mini | Rock Paper Scissors | Random CPU pick, score tracking, win/lose/draw display | easy | imp | machine |
| mini | URL shortener (UI) | Input + submit, history list, copy-to-clipboard button | easy | imp | machine |
| mini | Memory match card game | Shuffle deck, flip pairs, match tracking, move counter | med | imp | machine |
| mini | Kanban board | Columns (To-do/In progress/Done), drag cards between columns | med | imp | machine |
| mini | Markdown previewer | Textarea input, marked.js parse, live side-by-side preview | med | imp | machine |
| mini | Infinite photo feed | Unsplash API, IntersectionObserver load-more, masonry grid | med | imp | machine |
| mini | Snake game (basic) | requestAnimationFrame loop, grid, direction queue, collision | med | imp | machine |
| mini | Number guessing game | Random number, hint (higher/lower), attempt counter | easy | nice | machine |
| mini | BMI / tip calculator | Formula, input validation, result with category label | easy | nice | machine |
| mini | Paint / drawing canvas | Canvas 2d, mouse/touch events, color picker, brush size | hard | nice | machine |
| hooks | useLocalStorage | JSON.parse/stringify, storage event, SSR window guard | easy | must | both |
| hooks | usePrevious | useRef stores last render value — classic 1-liner | easy | must | live |
| hooks | useToggle | useState bool + toggle callback, optional forced value param | easy | must | both |
| hooks | useClickOutside | mousedown on document, ref.contains() check | easy | must | both |
| hooks | useFetch | loading / error / refetch, AbortController on cleanup | med | must | both |
| hooks | useDebounce | clearTimeout + setTimeout in useEffect, useRef for timer | med | must | both |
| hooks | useThrottle | Date.now timestamp diff or inThrottle ref flag | med | must | live |
| hooks | useAsync / useMutation | idle → loading → success → error state machine | hard | must | live |
| hooks | useWindowSize | resize event listener, throttle, SSR window guard | easy | imp | live |
| hooks | useScrollPosition | scroll event, throttle, track scroll direction | easy | imp | both |
| hooks | useIntersectionObserver | ref callback, threshold / rootMargin options, cleanup | med | imp | both |
| hooks | useCountdown | target Date diff, setInterval tick, pause/resume | med | imp | machine |
| hooks | useInterval | useRef for callback pointer — avoids stale closure trap | med | imp | live |
| hooks | useEventListener | generic typed hook, ref + addEventListener + cleanup | med | imp | live |
| hooks | useMediaQuery | matchMedia API, addListener + cleanup on unmount | med | imp | live |
| hooks | useLongPress | touchstart + setTimeout, cancel on touchmove / end | med | nice | live |
| hooks | useWhyDidYouUpdate | useRef prev props, JSON compare, console.log diffs | hard | nice | live |
| ui | Toggle switch | Checkbox underneath, CSS pill track, animated sliding thumb | easy | must | machine |
| ui | Like / heart button | Toggle state, CSS scale animation, optimistic count update | easy | must | machine |
| ui | Copy-to-clipboard button | navigator.clipboard.writeText, transient "Copied!" feedback | easy | must | machine |
| ui | Back-to-top button | Show after scroll threshold, smooth scroll, keyboard a11y | easy | must | machine |
| ui | Read more / show less | Clamp text to N lines, toggle expanded, accessible label | easy | must | machine |
| ui | Accordion | controlled vs uncontrolled, single vs multi-expand | easy | must | machine |
| ui | Pagination | client-side slice OR server page+limit, ellipsis logic | easy | must | — |
| ui | Star rating | hover preview, half-stars, keyboard accessible | easy | must | — |
| ui | Progress bar | aria-valuenow / min / max, animated fill, indeterminate | easy | must | machine |
| ui | Sortable table | Click header to sort asc/desc, indicator arrow, stable sort | easy | must | machine |
| ui | Infinite scroll | IntersectionObserver on sentinel div, page cursor | med | must | — |
| ui | Tabs component | compound component, ARIA tablist / tab / tabpanel roles | med | must | — |
| ui | OTP input | auto-focus next, paste split across inputs, backspace nav | med | must | — |
| ui | Multi-select dropdown | search filter, chip tags, keyboard nav, ARIA listbox | med | must | — |
| ui | Autocomplete / Typeahead | debounced API call, keyboard nav, ARIA combobox pattern | hard | must | — |
| ui | Modal / Dialog | portal, focus trap, Escape to close, aria-modal role | hard | must | — |
| ui | Toast / notification system | Context + portal + queue + auto-dismiss timer | hard | must | — |
| ui | Recursive comments / file tree | recursive render, collapse state per node id | hard | must | — |
| ui | Drag & drop list | HTML5 DnD or pointer events, swap index on drop | hard | must | — |
| ui | Tooltip component | position calc above/below/left/right, delay, portal | easy | imp | — |
| ui | Breadcrumb nav | ARIA breadcrumb landmark, overflow ellipsis, current page | easy | imp | machine |
| ui | Badge / chip component | Dismissible X, color variants, icon slot, max count badge | easy | imp | machine |
| ui | Table with sort + filter | Controlled column sort, column filters, pagination combo | med | imp | machine |
| ui | Search with highlight | mark matched substring in results, debounced input | med | imp | — |
| ui | Stepper / wizard | step state machine, per-step validation, back/next flow | med | imp | — |
| ui | Carousel / slider | touch swipe, auto-play, dots nav, ARIA live region | med | imp | — |
| ui | Virtualized list (windowing) | render visible rows only, offset + placeholder height | hard | imp | — |
| ui | Date picker | calendar grid, month navigation, range selection mode | hard | imp | — |
| ui | Resizable panels | pointer events, mousemove delta, clamp to min/max | hard | imp | — |
| ui | Command palette (⌘K) | global shortcut, fuzzy search, grouped keyboard nav | hard | imp | — |
| ui | Form builder | dynamic field config, validation schema, nested errors | hard | imp | — |
| ui | Color picker | hue/saturation sliders, hex/rgb sync, EyeDropper API | hard | nice | — |
| ui | Canvas signature pad | pointerdown/move/up, getContext 2d, toDataURL export | hard | nice | machine |
| js | Flatten nested array | reduce + recursion or Array.flat(Infinity) | easy | must | — |
| js | Group array by key | reduce to object, Array.prototype.groupBy shim | easy | must | — |
| js | once(fn) utility | called flag in closure, null out fn after first call | easy | must | — |
| js | chunk(array, size) | for loop, array.slice(i, i + size) per iteration | easy | must | — |
| js | Implement debounce | clearTimeout + setTimeout in closure, leading option | med | must | — |
| js | Implement throttle | Date.now diff or inThrottle boolean flag approach | med | must | — |
| js | Deep clone object | structuredClone vs recursive + typeof + Array.isArray | med | must | — |
| js | Event emitter / pub-sub | Map of listener arrays, on / off / emit / once | med | must | — |
| js | Memoize function | Map or WeakMap cache, JSON.stringify as cache key | med | must | — |
| js | Array.map / filter / reduce polyfill | Array.prototype extension, this = array, callback(el, i, arr) | med | must | — |
| js | Promise.all from scratch | counter resolve, reject immediately on first failure | hard | must | — |
| js | Promise.race from scratch | first settled promise — resolve or reject — wins | hard | must | — |
| js | Function.prototype.bind polyfill | closure + apply, handle new keyword edge case | hard | must | — |
| js | Implement curry | check fn.length vs accumulated args length, recurse | hard | must | — |
| js | LRU cache class | Map preserves insertion order — delete then re-set trick | hard | must | — |
| js | Array intersection / difference | Set for O(1) lookup, filter + has() | easy | imp | — |
| js | Deep merge objects | recursive Object.assign, handle arrays by strategy | med | imp | — |
| js | Event delegation pattern | single listener on parent, event.target.closest(sel) | med | imp | — |
| js | retry(fn, n) with backoff | recursive promise, catch → retry, delay * attempt | med | imp | — |
| js | Flatten nested object (dot keys) | recursion, join keys with ".", base case = primitive | med | imp | — |
| js | Implement pipe / compose | reduce left-to-right (pipe) or right-to-left (compose) | med | imp | — |
| js | Promise.allSettled from scratch | always resolves, wraps each in { status, value/reason } | hard | imp | — |
| js | Implement Promise.any | reject only if ALL reject, AggregateError on fail | med | nice | — |
| js | Virtual DOM diff (basic) | key reconciliation, return patch descriptor object | hard | nice | — |
| css | CSS position deep dive | static/relative/absolute/fixed/sticky — interview classic | easy | must | live |
| css | Box model (content-box vs border-box) | Padding/border included in width with border-box | easy | must | live |
| css | Specificity + cascade rules | ID > class > tag, !important, layers, inline order | easy | must | live |
| css | Flexbox layout fundamentals | justify-content, align-items, flex-wrap, gap, order | easy | must | machine |
| css | Responsive CSS grid | auto-fit + minmax() — no media queries needed | easy | must | machine |
| css | CSS variables (custom props) | --var declaration, var() usage, :root scope, JS setProperty | easy | must | both |
| css | CSS loading spinner | border + border-top-color trick + @keyframes rotate | easy | must | — |
| css | Custom checkbox / radio | appearance:none, :checked selector, label click trick | easy | must | — |
| css | CSS-only tooltip | ::before content, position absolute, :hover opacity | easy | must | — |
| css | Text truncation (1 + multi-line) | overflow:hidden + text-overflow; -webkit-line-clamp | easy | must | machine |
| css | Button hover effects | Transition on background, transform scale, box-shadow | easy | must | machine |
| css | Skeleton screen animation | shimmer: linear-gradient + @keyframes background-position | med | must | — |
| css | CSS dark mode strategy | prefers-color-scheme media query + CSS custom properties | med | must | — |
| css | CSS scroll snap | scroll-snap-type on parent, scroll-snap-align on child | easy | imp | — |
| css | CSS keyframe animation | @keyframes, animation shorthand, fill-mode, delay | easy | imp | — |
| css | CSS aspect ratio box | aspect-ratio: 16/9 modern or padding-top % legacy trick | easy | imp | — |
| css | Sticky + shrinking header | position:sticky + scroll listener toggles a class | med | imp | — |
| css | Container queries | container-type:inline-size, @container (width > Npx) | med | imp | — |
| css | Scroll-driven animation | animation-timeline: scroll() or view(), @keyframes | hard | nice | — |
| css | CSS masonry layout | CSS columns trick or experimental grid: masonry value | hard | nice | — |
| perf | Image lazy loading + optimization | loading="lazy", srcset, WebP, LCP + CLS impact | easy | must | — |
| perf | React.memo + useMemo + useCallback | referential equality — know when NOT to use each | med | must | — |
| perf | Code splitting with React.lazy | dynamic import(), Suspense fallback, route-level split | med | must | — |
| perf | Core Web Vitals (LCP / CLS / INP) | measure with DevTools, root causes, and fixes | med | must | — |
| perf | requestAnimationFrame loop | rAF id, cancelAnimationFrame on unmount, delta time | med | imp | — |
| perf | Bundle size optimization | tree shaking, dynamic import, webpack-bundle-analyzer | med | imp | — |
| perf | React rendering optimization | React Profiler, key prop, transitions, Concurrent Mode | med | imp | — |
| perf | Web Worker for heavy computation | postMessage, Comlink wrapper, transferable objects | hard | imp | — |
| perf | Service Worker + caching strategies | cache-first, stale-while-revalidate, Workbox | hard | imp | — |
| state | useReducer from scratch | pure reducer fn, action type switch, return new state | med | must | — |
| state | Context API + Provider pattern | createContext, useContext, prevent unnecessary re-renders | med | must | — |
| state | HOC (Higher-Order Component) | wraps component, injects props, set displayName prop | med | must | — |
| state | useState from scratch | closure array + index counter, dispatcher queue | hard | must | — |
| state | Redux / Flux from scratch | store, dispatch, subscribe, combineReducers | hard | must | — |
| state | Render props pattern | function as child or render prop, inversion of control | med | imp | — |
| state | Optimistic UI update | update state first, store rollback, revert on error | med | imp | — |
| state | Observer / pub-sub pattern | subject.subscribe(fn), notify all, unsubscribe cleanup | med | imp | — |
| state | Compound components pattern | Context inside parent, children share implicit state | hard | imp | — |
| state | Zustand-style store from scratch | closure, getState, setState, subscribe + selector | hard | imp | — |
| state | Finite state machine (lite) | state map, transition fn, guards + side effects | hard | nice | — |
| sys | Component library architecture | tokens, polymorphic `as` prop, peer deps, a11y first | hard | must | — |
| sys | Real-time chat / activity feed | WebSocket vs SSE, cursor pagination, read receipts | hard | must | — |
| sys | Chunked file uploader | File.slice + FormData chunks, progress, retry, abort | hard | must | — |
| sys | Frontend search system | debounce, cache results, highlight, facets, sort | med | imp | — |
| sys | Analytics / tracking SDK | batch events, flush queue, visibilitychange, beacon API | hard | imp | — |
| sys | Offline-first web app | IndexedDB queue, background sync, conflict resolution | hard | imp | — |
| sys | Collaborative editing (basic) | operational transform or CRDT concept, merge conflicts | hard | nice | — |
| ds | Two sum / three sum | hash map O(n) or sorted + two-pointer O(n log n) | easy | must | — |
| ds | Flatten nested object / array | DFS recursion or iterative stack approach | easy | must | — |
| ds | Group by + frequency map | reduce to Map, sort by count, top-K elements | easy | must | — |
| ds | BFS + DFS on tree and DOM | queue for BFS, call stack for DFS, NodeList walk | med | must | — |
| ds | Trie for autocomplete | TrieNode class, insert O(L), prefix search + DFS collect | hard | imp | — |
| ds | Sliding window (max, sum) | monotonic deque or expand/shrink two-pointer | hard | imp | — |
| ds | Serialize / deserialize binary tree | BFS with null markers, split string + queue restore | hard | imp | — |
| ds | Longest common subsequence | 2D DP table dp[i][j], trace back diagonally | hard | nice | — |

---

## Coaching Rules

1. **Always ask "what have you tried?" before helping.** Never jump straight to a hint or explanation. If the user hasn't described their approach, ask first.
2. **Give hints progressively: vague → specific → near-solution.** Never skip levels. Never volunteer the next level without being asked.
3. **Never write a full solution unprompted.** If the user pastes their own attempt, give feedback on that attempt rather than replacing it.
4. **Treat mistakes as learning opportunities.** Point to the specific line or concept that's off, then ask a question that leads the user to the fix.
5. **Reference the problem's edge cases** when reviewing code — the edge case list in README.md is the checklist.

---

## Slash Command Behaviours

**/hint** — Progressive three-level hint system for a specific question. Level 1 gives only a directional nudge (no code, no pseudocode). Claude stops and waits for the user to attempt the problem before going further. Level 2 is given only if asked again and covers approach plus pseudocode but no working code. Level 3 is given only on a third explicit request and shows the key lines or pattern needed. If the user pastes their own attempt at any point, Claude switches to reviewing that attempt instead of advancing hint levels.

**/review** — Code review across five dimensions: correctness, edge case coverage, TypeScript quality, performance, and interviewer impression. Claude infers the current question from context (or asks if unclear), reads the user's `questions/<cat>/<slug>/index.ts`, and gives a pass/borderline/fail verdict for each dimension with line-level citations. The review ends with one overall verdict and the single most important improvement to make.

**/mock** — Simulated interview session. `/mock live` runs a 45-minute live coding interview using one of the sets in mock-interviews/live-sets/ — Claude plays a professional interviewer, asks warm-up clarifying questions, enforces time pressure out loud, and follows up after coding. `/mock machine` runs a 90-minute take-home round using mock-interviews/machine-sets/ — Claude shares the full spec and checks in at 45 and 80 minutes. Claude stays in character until the user types exactly `stop mock`.

**/explain** — Concept explanation in a fixed five-part structure: what it is (plain English), why it matters in frontend interviews, a minimal working code example (5–15 lines), common misconceptions, and when not to use it. If the concept maps to a question in questions/, Claude mentions the path. Total response stays under 400 words.

**/progress** — Progress report derived from PROGRESS.md. Claude counts unchecked must-know items by category, identifies the single biggest gap, and recommends exactly 3 specific questions to work on today — each with a one-sentence reason why it's the right next step. Total output stays under 150 words.

**/quiz** — Verbal quiz on 3 unchecked must-know questions drawn at random from PROGRESS.md (preferring different categories). For each question Claude asks the user to explain their approach in words only — no coding. Claude waits for the response before moving on, then gives targeted feedback: what was correct, what was missing, and the key insight. After all 3, Claude gives an overall assessment (strong / needs work / significant gaps) and names one concept to review today.

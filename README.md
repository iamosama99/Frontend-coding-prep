# Frontend Interview Prep

Structured practice for frontend engineering interviews — 159 questions across 9 categories, with typed starters, tests, guides, cheatsheets, and mock interview sets.

---

## Quick Start

```bash
# 1. Install dependencies (one time)
npm install
cd playground && npm install && cd ..

# 2. Pick a question and read its spec
open questions/hooks/01-use-local-storage/README.md

# 3. Write your solution
code questions/hooks/01-use-local-storage/index.ts

# 4. Run the tests
npx ts-node questions/hooks/01-use-local-storage/tests.ts

# 5. For browser-based exercises (mini apps, UI, CSS) — start the dev server
npm run dev
```

---

## Folder Structure

```
.
├── questions/              # Every question lives here — one folder, everything together
│   ├── hooks/              # 17 React hooks questions
│   │   └── 01-use-local-storage/
│   │       ├── README.md       ← read the spec first
│   │       ├── index.ts        ← write your code here
│   │       ├── tests.ts        ← run to verify: npx ts-node tests.ts
│   │       └── solution.ts     ← reference answer — don't open until you're done
│   ├── js/                 # 24 JavaScript fundamentals questions
│   ├── mini/               # 30 mini app questions
│   ├── ui/                 # 33 UI component questions
│   ├── css/                # 20 CSS questions
│   ├── perf/               # 9 performance questions
│   ├── state/              # 11 state & patterns questions
│   ├── sys/                # 7 system design questions
│   └── ds/                 # 8 data structures questions
│
├── playground/             # Vite + React dev server — for browser exercises
│   └── src/App.tsx         ← paste your mini app / UI component here to see it live
│
├── guides/                 # Deep-dive study guide per category (read before starting a topic)
├── cheatsheets/            # Quick-reference sheets for patterns, ARIA, Big-O, etc.
├── mock-interviews/
│   ├── live-sets/          # 45-min live interview scenarios
│   ├── machine-sets/       # 90-min machine round specs
│   └── SCORING.md          # Self-evaluation rubric
│
├── CLAUDE.md               # Full question table + coaching rules + command docs
├── PROGRESS.md             # Checkbox tracker for all 159 questions
└── EXECUTION-PLAN.md       # Phase-by-phase setup instructions
```

---

## Day-to-Day Workflow

**For hooks and JS questions** (TypeScript functions, run in Node):

1. Run `/progress` — get your 3 recommended questions for today
2. Open `questions/<cat>/<slug>/README.md` — read the spec and edge cases fully
3. Code your solution in `index.ts` — try without hints first
4. Run `npx ts-node questions/<cat>/<slug>/tests.ts` — see PASS/FAIL
5. Use `/review` for a 5-dimension code review
6. Check off the question in `PROGRESS.md`
7. Optionally open `solution.ts` to compare approaches

**For mini apps, UI, and CSS** (browser-based):

1. Read `questions/<cat>/<slug>/README.md` as above
2. Build your component in `questions/<cat>/<slug>/index.tsx`
3. Paste it into `playground/src/App.tsx`
4. Run `npm run dev` — opens browser with live reload
5. `/review` when done, then check off in `PROGRESS.md`

---

## Slash Command Reference

| Command | What it does |
|---------|-------------|
| `/hint <slug>` | Progressive 3-level hints — vague → approach → near-solution |
| `/review` | 5-dimension code review: correctness, edge cases, TypeScript, performance, interviewer impression |
| `/mock live` | 45-min live interview simulation |
| `/mock machine` | 90-min machine round with check-ins at 45 and 80 minutes |
| `/explain <concept>` | 5-part structured explanation: what, why, example, misconceptions, when not to use |
| `/progress` | Gap analysis + 3 recommended questions to work on today |
| `/quiz` | Verbal quiz — explain 3 random must-know questions in words |

---

## Categories & Question Counts

| Category | Questions | Must-know | Focus |
|----------|-----------|-----------|-------|
| Mini Apps | 30 | 17 | Build real features end-to-end in machine rounds |
| JavaScript Fundamentals | 24 | 15 | Closures, event loop, promises, FP |
| React Hooks | 17 | 8 | Custom hooks, cleanup, stale closures |
| UI Components | 33 | 19 | ARIA, focus management, compound components |
| CSS | 20 | 13 | Layout, specificity, animation, modern features |
| Performance | 9 | 4 | Core Web Vitals, memoization, code splitting |
| State & Patterns | 11 | 5 | HOCs, Redux, context, state machines |
| System Design | 7 | 3 | Architecture, real-time, offline-first |
| Data Structures | 8 | 4 | Hash maps, trees, DP, tries |

---

## Difficulty Key

- **easy** — solvable in 10–15 min with clear thinking
- **med** — 20–30 min, requires knowing the right pattern
- **hard** — 30–45 min, often multiple interacting concepts

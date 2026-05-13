# Frontend Interview Prep

Structured practice for frontend engineering interviews — 159 questions across 9 categories, with typed starters, tests, guides, cheatsheets, and mock interview sets.

---

## Quick Start

1. Open a question folder: `exercises/<category>/<slug>/`
2. Read `problem.md` — understand the spec and edge cases before writing a line
3. Code your solution in `starter.ts`
4. Run `tests.ts` to verify: `npx ts-node exercises/<cat>/<slug>/tests.ts`
5. Use slash commands to get hints, review your code, or quiz yourself

---

## Folder Structure

```
.
├── exercises/          # One subfolder per question (problem.md + starter.ts + tests.ts)
│   ├── mini/           # 30 mini app questions
│   ├── js/             # 24 JavaScript fundamentals questions
│   ├── hooks/          # 17 React hooks questions
│   ├── ui/             # 33 UI component questions
│   ├── css/            # 20 CSS questions
│   ├── perf/           # 9 performance questions
│   ├── state/          # 11 state & patterns questions
│   ├── sys/            # 7 system design questions
│   └── ds/             # 8 data structures questions
├── solutions/          # Solution stubs (implement yourself first!)
│   └── <category>/     # Mirrors exercises/ — one solution.ts per question
├── guides/             # Deep-dive study guide per category (300+ words each)
├── cheatsheets/        # Quick-reference sheets for patterns, ARIA, Big-O, etc.
├── mock-interviews/
│   ├── live-sets/      # 5 × 45-min live interview scenarios
│   ├── machine-sets/   # 5 × 90-min machine round specs
│   └── SCORING.md      # Self-evaluation rubric
├── CLAUDE.md           # Full question table + coaching rules + command docs
├── PROGRESS.md         # Checkbox tracker for all 159 questions
└── EXECUTION-PLAN.md   # Phase-by-phase setup instructions
```

---

## Day-to-Day Workflow

1. Run `/progress` to see your biggest gap and get 3 recommended questions
2. Pick a question and open its `problem.md`
3. Code your solution in `starter.ts` — try without hints first
4. If stuck, use `/hint <slug>` for a progressive nudge
5. Run `tests.ts` to check your work
6. Use `/review` to get a structured 5-dimension code review
7. Tick off the question in `PROGRESS.md`
8. Periodically run `/quiz` for verbal practice without coding

---

## Slash Command Reference

| Command | What it does |
|---------|-------------|
| `/hint <slug>` | Progressive 3-level hints — vague → approach → near-solution. Waits for you to try at each level |
| `/review` | 5-dimension code review: correctness, edge cases, TypeScript, performance, interviewer impression |
| `/mock live` | 45-min live interview simulation with a realistic interviewer persona |
| `/mock machine` | 90-min machine round with check-ins at 45 and 80 minutes |
| `/explain <concept>` | 5-part structured explanation: what, why, example, misconceptions, when not to use |
| `/progress` | Gap analysis + 3 recommended questions to work on today (under 150 words) |
| `/quiz` | Verbal quiz — explain 3 random must-know questions in words, get targeted feedback |

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

## Importance Key

- **must** — appears in almost every interview loop at this level
- **imp** — important to know, commonly tested
- **nice** — senior/specialised questions, good to have

## Round Key (hooks category only)

- **live** — typically asked in live coding rounds
- **both** — asked in both live and machine rounds

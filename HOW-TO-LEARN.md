# How to Use This Project Effectively

This is a structured system for frontend interview prep — 115 questions, guided coaching, and mock interviews. Here's how to get the most out of it.

---

## The Core Loop (do this every session)

1. Run `/progress` — get your gap analysis and 3 recommended questions for today
2. Open the question's `questions/<category>/<slug>/README.md` — read it fully before touching code
3. Think through your approach out loud (or in writing) before coding
4. Code your solution in `questions/<category>/<slug>/index.ts`
5. Run the tests: `npx ts-node questions/<cat>/<slug>/tests.ts`
6. Run `/review` to get a 5-dimension code review
7. Check off the question in `PROGRESS.md`

Repeat. That's the whole loop.

---

## What Order to Work In

Work through categories in this order — each one builds on the previous:

| Order | Category | Why first |
|-------|----------|-----------|
| 1 | JavaScript Fundamentals (`js/`) | Closures and async are the mental model behind every hook and pattern |
| 2 | React Hooks (`hooks/`) | Directly applies JS fundamentals to React's lifecycle |
| 3 | UI Components (`ui/`) | Requires hooks + JS + accessibility thinking |
| 4 | CSS (`css/`) | Self-contained — do it when you need a break from logic |
| 5 | State & Patterns (`state/`) | HOCs, reducers, state machines — needs hooks first |
| 6 | Performance (`perf/`) | Memoization + code splitting make more sense after hooks + UI |
| 7 | Data Structures (`ds/`) | Standalone — do it alongside other categories or when prepping for algo rounds |
| 8 | System Design (`sys/`) | Architecture questions — do these last, they require broad context |

Within each category, do **must** questions before **imp**, and **imp** before **nice**.

---

## How to Use Each Slash Command

### `/progress`
Run this at the start of every session. It reads your `PROGRESS.md`, finds your biggest gap, and gives you exactly 3 questions to work on today with reasons. Under 150 words — fast to act on.

### `/hint <slug>`
Use this only after you've genuinely attempted the problem. The hint system has 3 levels:
- **Level 1** — a directional nudge, no code. Claude stops and waits for you to try.
- **Level 2** — approach + pseudocode. Only given if you ask again.
- **Level 3** — the key lines or pattern shown. Only on a third explicit request.

Never skip levels. The value is in the struggle between levels, not in the hint itself. If you paste your attempt at any point, Claude will review *that* instead of advancing to the next level.

### `/review`
Run this after you have a working (or partially working) solution in `index.ts`. Claude reads your file and evaluates it across 5 dimensions — correctness, edge cases, TypeScript quality, performance, and interviewer impression — with a pass/borderline/fail verdict for each. Ends with one overall verdict and the single most important fix.

### `/quiz`
Use this for verbal practice without coding — it simulates the "explain your approach" part of an interview. Claude picks 3 random must-know questions from your unchecked items and asks you to explain your approach in words only. It waits for your answer, gives targeted feedback, then moves on. Run it during commute, before bed, or as a warm-up.

### `/mock live`
Simulates a 45-minute live coding interview. Claude plays a realistic interviewer — warm-up questions, time pressure, follow-ups after you code. Run this after you've finished at least 30% of the must-know questions. Type `stop mock` to break character at any time.

### `/mock machine`
Simulates a 90-minute take-home round. Claude shares the full spec, then checks in at 45 and 80 minutes. Run this when you want to test your stamina and time management under real conditions.

### `/explain <concept>`
Use this when you're confused about a concept, not a question. Claude gives a fixed 5-part explanation: what it is, why it matters in interviews, a minimal code example, common misconceptions, and when NOT to use it. Stays under 400 words — focused and fast.

---

## How the File Structure Works

Every question lives in one folder — nothing is split across directories:

```
questions/<category>/<slug>/
  README.md      ← Read this first. Contains the spec, API, and edge cases.
  index.ts       ← Write your solution here. Has types and TODO scaffolding.
  tests.ts       ← Run this to verify: npx ts-node questions/<cat>/<slug>/tests.ts
  solution.ts    ← Reference answer. Don't open until you've done /review on your attempt.

playground/
  src/App.tsx    ← Paste your mini app or UI component here to see it live in the browser.
                   Run: npm run dev (from repo root)

guides/<category>.md     ← Deep-dive study guide. Read before starting a new category.
cheatsheets/             ← Quick-reference during active problem-solving.
mock-interviews/         ← Full interview scenarios for /mock live and /mock machine.
```

---

## Effective Study Habits

**Read `README.md` fully before writing a single line.** The edge cases at the bottom are the checklist your solution needs to pass — they tell you what the problem is actually testing.

**Attempt the problem before asking for any help.** Even a wrong attempt is worth more than jumping to hints. The coaching system is designed around you having tried first — Claude will ask "what have you tried?" if you skip this step.

**Use the guides before starting a new category.** Each `guides/<cat>.md` has the mental model, common patterns, and interview framing for that topic. 10 minutes reading it will save you 2 hours of confusion.

**Run `/quiz` separately from coding practice.** Verbal explanation is a different skill from writing code. Interviewers evaluate both — practice them separately.

**Track your progress in `PROGRESS.md`.** Checking a box after finishing a question makes the system work. `/progress` and `/quiz` both read this file to know what you've done and what to prioritize.

**Don't open `solution.ts` until after `/review`.** It lives in the same folder as your work for convenience, but use `/review` first — your code with feedback is more valuable than reading a clean answer.

---

## Session Templates

**30-minute session**
1. `/progress` to pick a question (2 min)
2. Read `README.md` (5 min)
3. Code in `index.ts` (20 min)
4. Run tests (3 min)

**60-minute session**
1. `/progress` (2 min)
2. Read guide for today's category if new (8 min)
3. Read `README.md` + code + run tests (40 min)
4. `/review` + read the feedback + fix one thing (10 min)

**Mock interview session (45–90 min)**
1. Warm up with `/quiz` (10 min)
2. Run `/mock live` or `/mock machine`
3. After the session: note what you struggled with and add those questions to tomorrow's list

---

## Difficulty Guide

Use these as time targets, not ceilings:

| Difficulty | Target time | What it tests |
|------------|-------------|---------------|
| easy | 10–15 min | Pattern recognition, clean implementation |
| med | 20–30 min | Knowing the right approach upfront |
| hard | 30–45 min | Multiple interacting concepts at once |

If you finish faster, check edge cases. If you go significantly over, note where you got stuck — that's the exact thing to review.

---

## When You're Stuck

1. Re-read `problem.md` — especially the edge cases section
2. Check the hint column in the CLAUDE.md question table for a directional clue
3. Read the relevant `guides/<cat>.md` section
4. Run `/hint <slug>` for Level 1
5. Try again — seriously try — before asking for Level 2

If you're still stuck after Level 2, paste your attempt and ask Claude to review *that*. Getting feedback on your broken attempt is more educational than seeing the right answer.

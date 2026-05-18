# Mock Interview Self-Evaluation Rubric

Use this after every `/mock` session to assess your performance honestly.
Score each dimension, then compute your overall rating.

---

## 6 Dimensions

### 1. Correctness

Does your implementation work for the happy path?

| Band | Description |
|------|-------------|
| **Pass** | Core feature works end-to-end with no bugs for the primary use case |
| **Borderline** | Works most of the time but has a logical error in one code path |
| **Fail** | Core feature doesn't run or produces wrong output |

---

### 2. Edge Case Handling

Does your code handle abnormal inputs, boundary conditions, and failure states?

| Band | Description |
|------|-------------|
| **Pass** | Handles at least 3 edge cases from the spec: empty input, null/undefined, boundary values, error states |
| **Borderline** | Handles 1–2 edge cases; crashes or produces wrong output on others |
| **Fail** | No edge case handling — only works for the exact example input |

**Expected time by difficulty:**

| Difficulty | Edge cases expected |
|------------|---------------------|
| Easy | 2+ edge cases |
| Medium | 3+ edge cases |
| Hard | 4+ edge cases |

---

### 3. TypeScript Quality

Are your types specific, correct, and non-redundant?

| Band | Description |
|------|-------------|
| **Pass** | Props/return types explicit, no `any`, generics used where appropriate |
| **Borderline** | Types present but some `any` usage or incorrect inference |
| **Fail** | No types, or heavy use of `any` throughout |

**Common TypeScript mistakes:**
- Using `any` for event handlers (use `React.MouseEvent<HTMLButtonElement>`)
- Not typing the ref array (`useRef<(HTMLInputElement | null)[]>`)
- Inferring return types when they're non-obvious (always explicit for public APIs)
- Using `object` instead of a named interface

---

### 4. Time Management

Did you finish within the expected time?

**Live interview (45 min):**

| Band | Description |
|------|-------------|
| **Pass** | 2–3 questions completed with working code; clearly communicated trade-offs on cuts |
| **Borderline** | 1–2 questions fully complete; ran out of time on last question but had the approach right |
| **Fail** | Only 1 question done or nothing working at time-up |

**Machine round (90 min):**

| Band | Description |
|------|-------------|
| **Pass** | Primary requirements complete; stretch goals attempted or explicitly deprioritized |
| **Borderline** | Core feature done but 1–2 required features missing |
| **Fail** | Less than 50% of primary requirements done at time-up |

**Expected times by difficulty:**

| Difficulty | Expected time |
|------------|---------------|
| Easy question (live) | 8–12 min |
| Medium question (live) | 12–18 min |
| Hard question (live) | 18–25 min |
| Easy machine round | 50–60 min |
| Medium machine round | 60–75 min |
| Hard machine round | 75–90 min |

---

### 5. Communication Clarity

Did you explain before coding? Did you narrate trade-offs?

| Band | Description |
|------|-------------|
| **Pass** | Clarified requirements, stated approach before coding, narrated key decisions, explained trade-offs |
| **Borderline** | Some narration but went silent for long periods; didn't ask clarifying questions |
| **Fail** | Started coding immediately without explanation, minimal narration, interviewer had to prompt repeatedly |

**Self-check questions:**
- Did you ask at least 1 clarifying question?
- Did you state your approach before opening the editor?
- Did you name the data structure/algorithm and say why?
- Did you say "trade-off" at least once?
- Did you stay silent for more than 60 seconds at any point?

---

### 6. Code Quality

Is the code clean, readable, and free of obvious smells?

| Band | Description |
|------|-------------|
| **Pass** | Clear naming, no magic numbers, appropriate abstraction level, no dead code |
| **Borderline** | Works but has confusing naming, magic numbers, or unnecessary complexity |
| **Fail** | Hard to read, deeply nested, misleading names, or copy-paste duplication |

**Common quality issues:**
- Magic numbers: `setTimeout(fn, 3000)` → extract to `const TOAST_DURATION_MS = 3000`
- Naming: `const x = items.filter(...)` → `const visibleItems = items.filter(...)`
- Over-engineering: adding abstractions for hypothetical future requirements
- Under-engineering: writing the same logic 3 times instead of a helper function

---

## Overall Score

### Scoring

Count your bands:
- Pass = 2 points
- Borderline = 1 point
- Fail = 0 points

| Total points | Overall verdict | Action |
|-------------|-----------------|--------|
| 10–12 | **Strong** | Ready for this difficulty level |
| 7–9 | **Needs work** | Review weakest dimensions, re-attempt similar session |
| 4–6 | **Significant gaps** | Study the underlying concepts before re-attempting |
| 0–3 | **Not ready** | Go back to guided practice before mock interviews |

---

## What to Do Based on Your Result

**Strong (10–12):** Move to a harder set. If you scored Strong on Set 5 (live) or Set 5 (machine), you're at a senior-level bar for this topic.

**Needs work (7–9):** Identify which 1–2 dimensions pulled you down. If it was Time Management — practice the same question until you can finish comfortably inside the limit. If it was Communication — do the session again but record yourself (voice memo) so you can hear the silences.

**Significant gaps (4–6):** Return to the question list. Find the specific concepts that were tested (e.g., LRU cache → `questions/01-js/15-lru-cache`), work through the guided exercise with `/hint`, then re-attempt the mock.

**Not ready (0–3):** Don't do mock sessions until you've completed at least 20–30 questions from the core question list. Mocks are review, not first exposure.

---

## Session Log Template

Copy this block after each mock session:

```
Date: ___________
Set: live/machine set-___
Overall score: ___ / 12

Dimensions:
  Correctness:      pass / borderline / fail
  Edge cases:       pass / borderline / fail
  TypeScript:       pass / borderline / fail
  Time management:  pass / borderline / fail
  Communication:    pass / borderline / fail
  Code quality:     pass / borderline / fail

Biggest win:
Biggest gap:
Next action:
```

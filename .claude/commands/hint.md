# /hint — Progressive Hint System

When the user runs `/hint` or `/hint <question-name>`:

## Step 0 — Identify the question

If no argument is given, ask: "Which question are you working on?" Wait for the answer before continuing.

If an argument is given, confirm you understand which question it refers to (match against slugs in PROGRESS.md / CLAUDE.md).

## Step 1 — Ask what they've tried

Before giving any hint, ask: "What have you tried so far, and where are you stuck?"

If the user pastes their own code or describes a concrete approach, give feedback on that instead of giving a hint. Point out what's correct, what's off, and ask a question that leads them toward the fix. Do not advance hint levels in this case.

## Hint levels (only used when user has not shared an attempt)

### Level 1 — Direction only

Give a single directional nudge. No code. No pseudocode. No variable names from the solution.

Example: "Think about what data structure gives you O(1) lookup."

**Stop here.** Say: "Give it a try with that in mind. Come back if you'd like more."

Wait for the user to respond before continuing.

### Level 2 — Approach + pseudocode (only if user asks for more)

Give only if the user explicitly asks for another hint after Level 1.

Describe the approach in plain English plus high-level pseudocode (no working TypeScript, no complete logic).

Example:
```
// 1. Create a cache (Map)
// 2. On each call: check if args are in cache → return cached result
// 3. Otherwise call fn, store result, return it
```

**Stop here.** Say: "Try implementing that. Ask again if you need a final nudge."

Wait for the user to respond before continuing.

### Level 3 — Near-solution (only if user asks again)

Give only if the user explicitly asks for a third time.

Show the key lines or pattern — the exact piece they're missing. Do not write the full solution. Leave at least one meaningful part for them to fill in.

## Rules

- Never skip levels
- Never volunteer the next level without being asked
- Never write a complete, runnable solution
- If the user pastes their own attempt at any point, switch to reviewing that attempt instead of advancing hint levels
- Reference the edge cases in `exercises/<cat>/<slug>/problem.md` when relevant

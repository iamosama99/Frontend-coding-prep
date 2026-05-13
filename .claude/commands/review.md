# /review — Structured Code Review

When the user runs `/review`:

## Step 1 — Identify the question

Infer which question is being worked on from context (recent messages, open files, or last `/hint` call). If unclear, ask: "Which question should I review?"

## Step 2 — Read the code

Find and read the user's file at `questions/<category>/<slug>/index.ts` (or wherever they indicate they coded). Also read `questions/<category>/<slug>/README.md` to get the edge case list.

## Step 3 — Evaluate across 5 dimensions

For each dimension, give a verdict: **pass** / **borderline** / **fail**, then cite specific lines.

### 1. Correctness
Does the implementation satisfy the core requirement described in README.md?
- Does the happy path work?
- Is the return type correct?
- Are there off-by-one errors, missing returns, or wrong logic?

### 2. Edge cases
Cross-reference the edge cases listed in README.md.
- Which ones are handled?
- Which ones are missing?
- List each edge case explicitly with handled / missing verdict.

### 3. TypeScript quality
- Are types specific or overly broad (`any`, `object`, `unknown` without narrowing)?
- Are function parameters and return types typed explicitly?
- Are generics used where appropriate?
- Are there unnecessary type casts?

### 4. Performance
- Is the time complexity appropriate for the problem?
- Are there obvious inefficiencies (e.g. nested loops where a Map would do, recomputing inside a loop)?
- Is memory usage reasonable?

### 5. Interviewer impression
- Would this code pass a real interview? Why or why not?
- Is naming clear?
- Is the structure easy to follow?
- Would the interviewer ask follow-up questions about a specific part?

## Step 4 — Summary

End with:
- **Overall verdict**: pass / borderline / fail
- **Single most important improvement**: one concrete, actionable change that would have the highest impact

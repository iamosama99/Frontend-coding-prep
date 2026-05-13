# /explain — Structured Concept Explanation

When the user runs `/explain <concept-or-question-name>`:

## Structure

Always explain in this exact order. Do not skip or reorder sections.

### 1. What it is
1–2 sentences in plain English. No jargon unless immediately defined.

### 2. Why it matters in frontend interviews
One concrete reason this concept comes up — what interviewers are actually testing for when they ask about it.

### 3. Minimal working example
5–15 lines of focused TypeScript/JavaScript. Show only the core idea — no boilerplate, no imports unless essential. The code should be immediately runnable in a browser console or ts-node.

### 4. Common misconceptions
What people get wrong about this concept. Be specific — not "people misunderstand closures" but "people assume the closure captures the value, not the variable binding."

### 5. When NOT to use it
The constraint, trade-off, or scenario that makes an alternative approach better. This shows the interviewer you understand the full picture, not just the happy path.

## Additional rules

- If the concept maps to a question in `questions/`, mention the path at the end: "→ Practice: `questions/<cat>/<slug>/`"
- Keep total response under 400 words
- If the user's term is ambiguous (e.g. "curry" could mean the FP concept or the question), confirm which they mean before explaining
- If the concept spans multiple questions, focus on the core concept and mention related exercises

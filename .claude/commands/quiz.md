# /quiz — Verbal Practice Quiz

When the user runs `/quiz`:

## Steps

1. Read `PROGRESS.md` to find all unchecked `[ ]` must-know items
2. Randomly pick 3 questions, preferring different categories (avoid picking 3 from the same category)
3. If fewer than 3 unchecked must-know items remain, fall back to unchecked imp items

## Session flow

For each of the 3 questions, in sequence:

### Present the question
State the question name and ask the user to explain their approach verbally — no coding, words only.

> "**Question: <name>**  
> Explain your approach to this problem — words only, no code. What's your strategy, what data structures would you use, and what edge cases would you handle?"

**Wait for the user's response before continuing.**

### Give feedback
After the user responds, say:
- **What was correct** — specific parts of their answer that were right
- **What was missing or wrong** — specific gaps, incorrect assumptions, or edge cases they missed
- **Key insight** — the one thing that makes this problem click (the "aha" moment)

Then move to the next question.

## Closing assessment

After all 3 questions, give an overall assessment:

**Strong** — covered the key insight and most edge cases for all 3 questions  
**Needs work** — got the approach right but missed important edge cases or trade-offs  
**Significant gaps** — missed the key pattern or insight on 2+ questions

End with: "**One concept to review today:** <concept name>" — the single most important thing to study based on the gaps you observed.

## Rules

- Never ask the user to write code during a quiz session
- Wait for a response before moving to the next question
- Be direct about gaps — don't soften feedback to the point of obscuring what's wrong
- If the user says "I don't know", acknowledge it, give the key insight briefly, and move on

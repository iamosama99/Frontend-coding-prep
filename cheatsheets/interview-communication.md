# Interview Communication Cheatsheet

## The Structure: Clarify → Approach → Code → Test

Every problem, every time. Make this automatic.

**1. Clarify (2–3 min)**
Before writing a single line, ask questions that show you think about real-world constraints.
Don't ask for hints — ask about scope.

**2. Approach (2–3 min)**
State your plan out loud before opening an editor. Name the data structure and algorithm you'll use and explain why.

**3. Code (bulk of time)**
Narrate key decisions as you write. Silence for more than 30 seconds signals you're stuck.

**4. Test (2–3 min)**
Walk through your code with a concrete example. Then check the edge cases you identified in step 1.

---

## Good Clarifying Questions to Ask Before Coding

**For data/input:**
- "What's the expected input shape — could this be null or empty?"
- "Should I handle duplicates?"
- "What's the size of the input? Does performance matter here?"

**For UI/component questions:**
- "Should this be controlled or uncontrolled?"
- "Do I need to support keyboard navigation?"
- "Should I worry about mobile / touch events?"
- "Is there an existing design system I should match, or should I write my own CSS?"

**For async questions:**
- "Should I handle cancellation (e.g., user navigates away)?"
- "What should happen on error — retry, surface to UI, or silent fail?"

---

## How to Handle Being Stuck

**If you're stuck on the approach:**
> "I know I need to [goal]. I'm deciding between [option A] and [option B]. Let me think through the trade-offs..."

Then actually think through them out loud. Interviewers want to see reasoning, not just answers.

**If you've hit a syntax blank:**
> "I know this API exists — let me sketch the structure and come back to the exact syntax."

Never go silent. A running monologue is always better.

**If you realize your approach is wrong mid-code:**
> "I think I've hit a problem with this approach — [describe it]. I'm going to step back and [pivot]. That might cost me some time but it's the right call."

Pivoting explicitly is professional. Quietly erasing without comment looks disorganized.

---

## How to Communicate Trade-offs

The pattern: *"I'm doing X because Y. The trade-off is Z, which I'd handle by W in production."*

Examples:
- "I'm using a Map here for O(1) lookup. The trade-off is memory, but for the expected input size that's fine."
- "I'm doing client-side pagination to keep this simple. In production you'd want server-side pagination for large datasets."
- "I'm skipping error boundary handling here to stay in scope — in a real app I'd add that."

Always name the trade-off before the interviewer has to ask.

---

## What Interviewers Actually Look For (Beyond Correctness)

| Signal | What it looks like |
|--------|--------------------|
| Problem decomposition | You break the problem into named sub-problems before coding |
| Communication under pressure | You keep narrating even when unsure |
| Awareness of edge cases | You catch them proactively, not reactively |
| Trade-off thinking | You name constraints unprompted |
| Code quality | Clean naming, no magic numbers, no unnecessary complexity |
| Time management | You ship a working core and deprioritize stretch features explicitly |

A candidate who gets 80% of the code right but explains every decision clearly often scores higher than one who finishes but goes silent while coding.

---

## Phrases to Use

- "Let me clarify before I start — [question]."
- "My approach is going to be [X] because [reason]."
- "I'm going to start with the happy path and handle edge cases after."
- "A trade-off here is [X], which I'd address in production by [Y]."
- "I'm going to skip [feature] for now to stay in time — I'll flag it at the end."
- "Does this match what you were expecting, or should I adjust?"
- "Let me trace through this with [example input] to verify."

---

## Phrases to Avoid

| Avoid | Why |
|-------|-----|
| "I think maybe..." | Signals uncertainty without showing reasoning |
| Long silences | Interviewer can't evaluate what they can't hear |
| "Is this right?" (fishing for confirmation) | Ask about requirements, not validation |
| "Sorry, I know this is wrong..." | Self-deprecation wastes time; just fix it |
| Over-engineering narration ("I could also use a red-black tree...") | Shows off breadth but buries the actual solution |

---

## Time Management in Live Coding (45 min session)

| Phase | Budget |
|-------|--------|
| Clarify | 3 min |
| Approach + outline | 3 min |
| Core implementation | 25 min |
| Edge cases + cleanup | 8 min |
| Walk-through + questions | 6 min |

If you hit 20 minutes and aren't close to a working solution, stop and ask: *"Should I simplify to get something running, or keep going?"*

## Time Management in Machine Rounds (90 min)

| Phase | Budget |
|-------|--------|
| Read spec + plan state shape | 10 min |
| Core feature implementation | 50 min |
| Edge cases + error states | 15 min |
| Polish + cleanup | 10 min |
| Final review | 5 min |

Write the hardest part first. Polish is worthless without correctness.

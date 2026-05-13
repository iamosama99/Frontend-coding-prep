# /progress — Progress Report

When the user runs `/progress`:

## Steps

1. Read `PROGRESS.md`
2. Count unchecked `[ ]` items by category, filtered to **must-know** importance only
3. Identify the single biggest gap: the category with the most unchecked must-know items
4. Recommend exactly 3 specific questions to work on today

## Output format

Keep total output under 150 words. Use this structure:

```
**Biggest gap:** <Category> — <N> must-know questions remaining

**Work on today:**
1. <question-name> — <one sentence: why this is the right next step>
2. <question-name> — <one sentence: why this is the right next step>
3. <question-name> — <one sentence: why this is the right next step>

<Category>: N remaining | <Category>: N remaining | ...
```

## Recommendation logic

- Prioritise must-know questions over imp/nice
- Within must-know, prefer easy/med over hard (build momentum)
- Pick from different categories when possible
- If a category has zero must-know remaining, note it as complete
- If all must-know questions are done across all categories, recommend the top imp questions instead

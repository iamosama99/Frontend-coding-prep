# Specificity + Cascade Rules

## Problem

Implement a `calculateSpecificity` function that parses a CSS selector string and returns its specificity as a tuple `[IDs, classes, elements]`. Also implement `compareSpecificity` to determine which of two selectors wins.

## TypeScript Signatures

```typescript
// Returns [ID count, class/attr/pseudo-class count, element/pseudo-element count]
function calculateSpecificity(selector: string): [number, number, number]

// Returns 1 if a wins, -1 if b wins, 0 if tied
function compareSpecificity(
  a: [number, number, number],
  b: [number, number, number]
): 1 | -1 | 0

// Returns the winning selector string, or 'tie'
function resolveWinner(selectorA: string, selectorB: string): string | 'tie'
```

## Usage Example

```typescript
calculateSpecificity('#header')           // → [1, 0, 0]
calculateSpecificity('.btn.primary')      // → [0, 2, 0]
calculateSpecificity('div p')             // → [0, 0, 2]
calculateSpecificity('#nav .item a:hover')// → [1, 2, 1]
calculateSpecificity('*')                 // → [0, 0, 0]
calculateSpecificity('::before')          // → [0, 0, 1]
calculateSpecificity('[data-value]')      // → [0, 1, 0]

compareSpecificity([1, 0, 0], [0, 5, 0]) // → 1  (ID beats 5 classes)
compareSpecificity([0, 1, 0], [0, 1, 0]) // → 0  (tied)

resolveWinner('#foo', '.bar')             // → '#foo'
```

## Constraints

- Count `#id` occurrences for IDs
- Count `.class`, `[attr]`, and `:pseudo-class` occurrences for the middle bucket
  - `:not()`, `:is()`, `:has()` take the specificity of their argument — for simplicity, count only the contents
  - `:where()` always contributes 0 specificity
- Count element names and `::pseudo-element` for the third bucket
- `*` (universal selector) contributes 0 to all buckets
- Combinators (`>`, `+`, `~`, space) contribute 0
- Inline styles are not handled by this function (they always win)

## Edge Cases

- `::before` and `::after` — pseudo-elements (third bucket), not pseudo-classes
- `:hover`, `:focus`, `:nth-child()` — pseudo-classes (second bucket)
- Chained selectors like `.a.b.c` — count each class separately (3 classes)
- Selector `*` — all three buckets are 0
- `:not(.foo)` — counts `.foo` (one class), not `:not` itself
- Identical specificity — later rule in source wins (not handled by this function)

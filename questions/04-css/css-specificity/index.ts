// CSS Specificity Calculator
// Specificity format: [IDs, Classes+Attrs+Pseudo-classes, Elements+Pseudo-elements]

// TODO 1: Implement calculateSpecificity.
//         Parse the selector string and count:
//         - '#' occurrences → IDs (first bucket)
//         - '.' (classes), '[' (attr selectors), ':' pseudo-classes → middle bucket
//           Exception: '::' pseudo-elements go to the third bucket
//           Exception: ':where()' contributes 0 specificity
//         - element names and '::' pseudo-elements → third bucket
//         - '*' (universal selector) and combinators (> + ~ space) → 0 for all
// TODO 2: Strip :not(), :is(), :has() wrappers and count their contents instead.
export function calculateSpecificity(selector: string): [number, number, number] {
  throw new Error('Not implemented')
}

// TODO 3: Implement compareSpecificity.
//         Compare left to right: first non-zero difference determines the winner.
//         Return 1 if a > b, -1 if b > a, 0 if tied.
export function compareSpecificity(
  a: [number, number, number],
  b: [number, number, number]
): 1 | -1 | 0 {
  throw new Error('Not implemented')
}

// TODO 4: Implement resolveWinner.
//         Use calculateSpecificity and compareSpecificity.
//         Return the winning selector string, or 'tie' if equal.
export function resolveWinner(selectorA: string, selectorB: string): string | 'tie' {
  throw new Error('Not implemented')
}

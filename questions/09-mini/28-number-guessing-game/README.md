# Number Guessing Game

## Problem

Build a number guessing game where the computer picks a secret random integer between 1 and 100. The player submits guesses and receives "Too high", "Too low", or "Correct!" feedback after each attempt.

## Requirements

- Computer picks a random integer 1–100 at game start
- Player types a guess into an input field and presses a "Guess" button or Enter
- Feedback shown after each guess: "Too high!", "Too low!", or "Correct!"
- Attempt counter displayed and incremented after each valid guess
- History list of all previous guesses, each labeled with ▲ (too high), ▼ (too low), or ✓ (correct)
- After a correct guess: show a victory message with attempt count; input is disabled; "New Game" button appears
- New Game button resets everything and picks a new secret number

## Edge Cases

- Reject non-integer input with an inline validation error
- Reject out-of-range guesses (not 1–100) with an inline error
- Input field is cleared after each valid guess submission
- A dynamic range hint updates after each guess: e.g. "Guess between 34 and 100" (the hint narrows the known range)
- Guess input is disabled after a correct guess until New Game is clicked

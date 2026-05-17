# Quiz / Survey App

## Problem

Build a multi-step quiz that walks users through one question at a time, remembers their answers, and shows a scored result screen with per-question review.

## Requirements

- At least **5 multiple-choice questions** (any topic you like)
- One question shown at a time with a **progress bar** reflecting current position
- **Next** button advances to the next question; **Prev** button goes back
- User's answers are **remembered** — navigating back shows the previously chosen option
- **Final screen** shows:
  - Score as X / Y correct
  - Per-question review: each question with the user's answer and the correct answer highlighted
- **Restart** button returns to question 1 and clears all answers

## Edge Cases

- Cannot advance without selecting an answer — Next is disabled (or shows a warning) until a choice is made
- Selected option is visually highlighted; correct/wrong highlighting appears **only** on the result screen, not during the quiz
- Progress bar accurately reflects the current question (e.g. 3/5 = 60 %)
- Prev is hidden/disabled on the first question
- Next label changes to **"Submit"** on the last question

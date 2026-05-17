# Rock Paper Scissors

## Problem

Build a Rock Paper Scissors game where the user picks a symbol and the computer picks randomly. Display the result of each round, maintain a score tracker, and keep a history of recent rounds.

## Requirements

- Three buttons: Rock / Paper / Scissors (with emoji icons)
- Computer picks randomly each round
- Display result of each round: Win / Lose / Draw with a descriptive message
- Score tracker showing Player wins, Computer wins, and Draws
- Round history list showing the last 5 rounds
- Reset Score button clears score and history
- Brief CSS animation/transition on the result area when a result appears
- Legend showing which symbol beats which

## Edge Cases

- Result area animates (e.g. fade or bounce) on each new result so it feels responsive
- Reset Score button resets scores to 0 and clears history but does not remove the current displayed result
- Legend is always visible so new users know the rules without guessing
- Computer choice should be uniformly random (not biased)
- Buttons should remain enabled at all times (no lock-out between rounds)

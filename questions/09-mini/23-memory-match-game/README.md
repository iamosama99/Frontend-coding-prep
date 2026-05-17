# Memory Match Card Game

## Problem

Build a classic memory card matching game. The player flips cards two at a time, looking for matching pairs. Track moves and elapsed time. When all 8 pairs are found, show a victory screen.

## Requirements

- 4×4 grid of 16 cards (8 matching pairs) using emoji symbols
- Clicking a card flips it over to reveal its symbol
- Two cards flipped: if they match, they stay face-up (mark as matched); otherwise flip back after 1 second
- Move counter increments each time two cards are compared (not on every single click)
- Timer counts up from 00:00 once the first card is flipped
- Victory screen overlay when all 8 pairs are matched, showing time taken and total moves
- "New Game" button shuffles the deck and resets everything

## Edge Cases

- Cannot flip more than 2 cards at once — board is locked during the 1-second check delay
- Cannot flip a card that is already matched (face-up and locked)
- Cannot flip the same card twice in one turn (clicking the same card again should be a no-op)
- Timer stops exactly when the last pair is matched
- Deck is shuffled with Fisher-Yates algorithm for uniform randomness

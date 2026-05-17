# Tic-Tac-Toe

## Problem

Build a fully functional two-player Tic-Tac-Toe game played in the browser with win detection, draw detection, score tracking, and a reset flow.

## Requirements

- 3×3 clickable grid; players **X** and **O** alternate turns
- Display whose turn it is above the board
- Detect a win across all rows, columns, and both diagonals — **highlight the winning cells**
- Detect a draw when all 9 cells are filled with no winner
- **Reset / New Game** button clears the board and starts the next game (keeps score)
- **Score tracker** shows X wins / O wins / Draws persistently across games
- A separate **Reset Score** button resets the scoreboard to 0/0/0

## Edge Cases

- Clicking an already-filled cell does nothing
- Clicking any cell after the game has ended (win or draw) does nothing
- Reset clears the board but keeps the current score intact
- Reset Score clears the score but does not interrupt the current game mid-play
- The winning-cell highlight is removed when a new game starts
- The status message clearly distinguishes between "X wins!", "O wins!", and "It's a draw!"

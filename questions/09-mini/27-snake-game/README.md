# Snake Game

## Problem

Build a classic Snake game on an HTML5 `<canvas>` element. The snake moves continuously, grows when it eats food, and dies on wall or self-collision.

## Requirements

- Canvas element 400×400px divided into a 20×20 cell grid (each cell = 20px)
- `requestAnimationFrame`-based game loop with ~150ms tick speed (use timestamp delta)
- Arrow keys control direction; no 180-degree reversal allowed
- Snake grows by one cell when it eats food
- Food spawns at a random empty cell (never on the snake body)
- Score increments by 1 for each food eaten; displayed above the canvas
- Game over on wall collision or self-collision — overlay shows final score and a Restart button

## Edge Cases

- Direction queue: buffer up to one pending key press so rapid key presses during a tick are not lost
- Food never spawns on a cell currently occupied by the snake
- Tab away pauses the game loop (use `visibilitychange` event); resume on tab return
- On restart, snake resets to start position and food is re-placed

# Countdown Timer

## Problem

Build a countdown timer where the user sets a duration and watches it tick to zero.

## Requirements

- User inputs **hours**, **minutes**, and **seconds** before starting
- **Start** begins the countdown
- **Pause** freezes the countdown
- **Resume** continues from the frozen point
- **Reset** stops and restores the display to the last entered values
- Display ticks down in real time in `hh:mm:ss` format
- When the timer reaches zero: show a **"Time's up!"** message and a **flash / pulse animation**

## Edge Cases

- **Prevent starting** if the entered time is `00:00:00`
- **Reset** restores the values the user originally typed, not zeros
- Timer cannot go below zero — stop exactly at `00:00:00`
- Input fields accept only non-negative integers; clamp seconds and minutes to 0–59, hours to 0–99
- Pause/Resume share the same button — label changes dynamically
- "Time's up!" message disappears when the user resets

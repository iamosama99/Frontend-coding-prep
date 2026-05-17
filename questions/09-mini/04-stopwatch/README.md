# Stopwatch / Timer

## Problem

Build a stopwatch with lap tracking and a centisecond-precision display.

## Requirements

- **Start** begins counting from 0 (or from the paused position)
- **Pause** freezes the display at the current time
- **Resume** continues from where it was paused
- **Reset** stops the timer and returns display to `00:00:00`, clears all laps
- **Lap** button records the current elapsed time as a new lap entry
- Display format: `mm:ss:cs` where `cs` = centiseconds (00–99)
- Lap list shows each lap's recorded time in order
- Timer updates approximately every 10 ms using `setInterval`

## Edge Cases

- The **Lap** button is disabled (or hidden) when the timer is not running
- **Reset** works whether the timer is running or paused — stops and resets either way
- Lap list scrolls vertically if more than ~5 laps are recorded
- Lap entries are numbered sequentially (Lap 1, Lap 2, …)
- Start/Pause share the same button position — label changes dynamically

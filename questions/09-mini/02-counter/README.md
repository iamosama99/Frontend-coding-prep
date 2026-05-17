# Counter App

## Problem

Build a counter app with configurable step size and min/max clamping.

## Requirements

- **Increment** button increases count by the current step
- **Decrement** button decreases count by the current step
- **Reset** button returns count to 0
- **Step size** input (number field, default 1) — controls how much each click changes the count
- **Min** and **Max** inputs clamp the counter (defaults: no limit)
- Display the current count prominently in the center
- Count turns **red** when it is at the minimum value
- Count turns **green** when it is at the maximum value

## Edge Cases

- Cannot go below min or above max — buttons should visually disable at the boundary
- Reset always returns to 0 regardless of min/max settings (0 must be within or outside the range — just reset)
- Step must be a positive integer; invalid step input falls back to 1
- If min > max after editing, ignore the conflicting constraint
- Changing min/max should immediately clamp the current count if it is now out of range

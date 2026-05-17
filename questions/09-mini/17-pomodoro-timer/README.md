# Pomodoro Timer

## Problem

Build a Pomodoro timer that cycles through work sessions, short breaks, and long breaks, with browser notifications and a colour-coded UI.

## Requirements

- **25-minute** work sessions, **5-minute** short breaks, **15-minute** long break after every 4th completed session
- Controls: **Start**, **Pause**, **Reset**
- Visual **countdown display** in `mm:ss` format
- **Session counter** showing how many pomodoros have been completed this cycle
- Request **Notification API permission** when Start is first clicked
- Show a **browser notification** when each session ends, even if the tab is in the background
- **Colour theme** shifts:
  - Work session → red / warm palette
  - Break → green / cool palette

## Edge Cases

- Reset returns the timer to the **current session's start time** (does not move to next session), does not reset the session counter
- A separate **Reset All** button clears the session counter and returns to session 1 / work mode
- Pausing and resuming continues from the exact remaining seconds — no drift
- The notification shows which session just ended and what comes next
- If notifications are denied, the app still works (just without notifications)

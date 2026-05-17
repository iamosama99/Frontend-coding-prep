# Character / Word Counter

## Problem

Build a textarea with live character and word counting, a character limit, and a copy button.

## Requirements

- A **textarea** with a live **character count** and **word count** displayed below
- **Max character limit** of 280 characters with a **remaining characters** counter
- Remaining counter turns **red** when fewer than 20 characters are left
- A **Copy** button that copies the textarea content to the clipboard
- Show brief **"Copied!"** feedback on the button after a successful copy
- Word count correctly ignores extra whitespace (multiple spaces, tabs, newlines)

## Edge Cases

- Word count of an empty string or whitespace-only string is **0**
- Do **not** hard-block typing past the max limit — instead show a warning style on the counter (red + bold). The native `maxlength` attribute is NOT used; allow overage to be visible
- Newlines count as word boundaries (same as spaces)
- Pasting a large block of text should update counts immediately
- "Copied!" feedback resets back to "Copy" after ~2 seconds
- The remaining counter shows negative numbers if the user somehow exceeds the limit (to make over-limit visible)

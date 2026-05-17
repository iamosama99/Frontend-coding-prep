# Password Strength Indicator

## Problem

Build a password input with a live strength meter and rule checklist.

## Requirements

- A **password input field** with a **show/hide toggle** (eye icon)
- Evaluate strength live against four rules:
  1. Minimum 8 characters
  2. At least one uppercase letter (A–Z)
  3. At least one digit (0–9)
  4. At least one special character from: `!@#$%^&*`
- **Visual strength bar** with 4 coloured segments that fill progressively
- **Checklist** below the bar showing each rule with a ✓ (pass) or ✗ (fail)
- Strength label: **Weak** / **Fair** / **Good** / **Strong** (1–4 rules passing)

## Edge Cases

- **Empty input** → bar is completely empty (no segments lit), no label shown
- Strength bar colours: 1 rule = red, 2 rules = orange, 3 rules = yellow, 4 rules = green
- The show/hide toggle only changes the input `type` attribute between `"password"` and `"text"`
- Strength updates on every keystroke (`input` event)
- A password that passes all 4 rules shows fully green bar and all ✓ marks

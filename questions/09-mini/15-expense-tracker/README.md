# Expense Tracker

## Problem

Build an expense tracker that lets users log spending, view a running total, and see per-category spending visualised as a pure-CSS bar chart.

## Requirements

- **Add expense** with:
  - Description (text)
  - Amount (positive number)
  - Category: Food / Transport / Entertainment / Other
- **Display** expenses in a list, newest first
- **Delete** individual expenses
- **Running total** updates immediately on every add/delete
- **Category bar chart** (pure CSS — no canvas, no SVG, no external libs):
  - One bar per category
  - Bars scale relative to the highest-spending category (which gets 100 % width)
  - Show the category name, total amount, and the bar itself

## Edge Cases

- Amount must be a positive number; reject zero or negative values with an inline error
- Amount accepts decimals (e.g. 4.50)
- Total and chart update immediately when an expense is added or deleted
- If all expenses in a category are deleted, its bar drops to 0 (or disappears)
- Description is required; do not add expenses with an empty description
- Expenses persist to `localStorage` across page reloads

# Shopping Cart

## Problem

Build a product listing with a shopping cart that calculates totals and persists across refreshes.

## Requirements

- Display a grid of at least 6 products, each with: name, price, and a placeholder image
- **Add to Cart** button on each product card
- Cart panel showing each cart item: name, quantity controls (−/+), remove button, and line total
- Cart footer displays: **subtotal**, **tax (8%)**, and **grand total**
- **Persist** the cart contents to `localStorage`

## Edge Cases

- Item quantity cannot go below 1 — use the **Remove** button to delete the item entirely
- When the cart is empty show a clear **"Your cart is empty"** message
- Totals (subtotal, tax, grand total) update immediately when quantity changes or items are removed
- Adding the same product multiple times increments its quantity rather than adding a duplicate entry
- Prices display with two decimal places (e.g. `$12.99`)
- Grand total also displays with two decimal places

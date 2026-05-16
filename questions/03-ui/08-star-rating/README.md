# Star Rating

## Problem

Build a `StarRating` component that lets users pick a rating from 1 to N stars. Stars highlight on hover (preview) and are filled permanently after selection. The component must support half-star ratings and be fully keyboard accessible as a radio group.

## TypeScript Signature

```ts
interface StarRatingProps {
  max?: number;                  // total stars, default: 5
  value?: number;                // controlled rating (can be a half: 2.5)
  defaultValue?: number;         // uncontrolled initial value
  onChange?: (rating: number) => void;
  halfStars?: boolean;           // enable 0.5 increments, default: false
  readOnly?: boolean;
  size?: number;                 // star size in px, default: 24
  label?: string;                // group label for screen readers
}

function StarRating(props: StarRatingProps): JSX.Element
```

## Usage Example

```tsx
// Basic 5-star, uncontrolled
<StarRating defaultValue={3} onChange={(r) => console.log(r)} />

// Half-star, controlled
const [rating, setRating] = useState(0);
<StarRating value={rating} onChange={setRating} halfStars max={10} />

// Read-only display
<StarRating value={4.5} readOnly label="Average rating" />
```

**Expected behaviour:** hovering a star highlights it and all stars to its left. Moving the mouse off the component reverts the preview. Clicking locks in the rating and calls `onChange`. In half-star mode, hovering the left half of a star previews a .5 rating.

## Constraints

- Implement as a `role="radiogroup"` with each star (or half-star) as a `role="radio"`.
- Only the selected (or closest to selected) radio is in the natural tab sequence; use arrow keys to navigate within the group.
- `aria-label` on each radio must describe the rating: "1 star", "2 stars", "2.5 stars".
- `readOnly` removes interactivity but keeps the filled display.
- The `value` of 0 means "no rating selected".

## Edge Cases

- `value` of 0 or undefined — no stars highlighted, display empty.
- Half-star mode with integer `defaultValue` — integer values are valid (e.g. 3 means 3.0).
- Hovering then pressing `Escape` — revert preview without changing selection.
- `max` of 1 — a single star toggle (click to rate 1, click again to clear).
- `readOnly` with no `value` — render empty stars with no interaction.
- Fractional values that are not on a valid half-star boundary (e.g. 2.3) — round to nearest valid increment.

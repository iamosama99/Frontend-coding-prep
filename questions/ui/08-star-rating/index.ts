import { useState } from 'react';

export interface StarRatingProps {
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (rating: number) => void;
  halfStars?: boolean;
  readOnly?: boolean;
  size?: number;
  label?: string;
}

// TODO 1: Set up state for:
//   - `rating`: the committed value (controlled from `value` prop or internal state from `defaultValue`).
//   - `hoverRating`: the preview value while mouse is over a star (null when not hovering).
//   The displayed fill = hoverRating ?? rating.

// TODO 2: Build the list of star values to render.
//   - Without halfStars: [1, 2, 3, ..., max].
//   - With halfStars: [0.5, 1, 1.5, 2, ..., max].
//   Each item represents the value that would be set if that position is clicked.

// TODO 3: Handle mouse events for hover preview.
//   - onMouseEnter on each star: set hoverRating to that star's value.
//   - onMouseLeave on the container: set hoverRating to null.
//   - In halfStars mode: detect which half of the star is hovered using the mouse
//     X position relative to the star's bounding rect (left half = x < width/2).

// TODO 4: Implement the selection handler.
//   - If readOnly, return early.
//   - Update internal state (uncontrolled) and call onChange?.
//   - If the same value is clicked again, toggle to 0 (clear rating) as a nice-to-have.

// TODO 5: Render as a radio group for accessibility.
//   - role="radiogroup" on the container with aria-label.
//   - Each star is a visually-styled <span> or <button> wrapping a visually-hidden
//     <input type="radio"> with appropriate aria-label ("X stars" or "X.5 stars").
//   - aria-checked reflects the current committed rating.

export function StarRating(_props: StarRatingProps): JSX.Element {
  throw new Error('Not implemented');
}

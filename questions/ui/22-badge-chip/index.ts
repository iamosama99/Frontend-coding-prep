import type { ReactNode } from 'react';

export type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  count?: number;
  label?: string;
  variant?: Variant;
  max?: number;
  dot?: boolean;
  children?: ReactNode;
  showZero?: boolean;
}

export interface ChipProps {
  label: string;
  variant?: Variant;
  onDismiss?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

// TODO 1: Implement Badge display logic.
//   - If dot=true: render a <span> with a circular dot shape, no text.
//   - If count is a number: clamp to 0 with Math.max(0, count).
//     If clampedCount === 0 and showZero is false: do not render (return null).
//     If clampedCount > (max ?? 99): display `{max}+`.
//     Otherwise display the count as text.
//   - If label is provided (and count is undefined): display the label text.
//   - Apply variant-based CSS class or inline style for color.

// TODO 2: Handle the Badge overlay mode.
//   - If children is provided: wrap children and the badge in a <div style={{position:'relative'}}>.
//   - The badge itself: position: 'absolute', top: '-4px', right: '-4px'.
//   - If no children: render the badge as an inline element.

// TODO 3: Implement Chip rendering.
//   - If onClick is provided: render as <button> with aria-pressed={selected}.
//   - Otherwise: render as <span> (or <div>).
//   - Add variant class and selected class.
//   - Render icon before label if provided.

// TODO 4: Render the Chip dismiss button.
//   - Only render when onDismiss is provided.
//   - Button: aria-label={`Remove ${label}`}, disabled={disabled},
//     onClick={(e) => { e.stopPropagation(); onDismiss?.(); }}.
//   - Stop propagation so clicking X does not also trigger the chip's onClick.

// TODO 5: Apply disabled styling and behaviour to Chip.
//   - If disabled: add a disabled CSS class.
//   - If onClick and disabled: set the button's disabled attribute.
//   - Chips rendered as <span> (no onClick): aria-disabled="true" when disabled.

export function Badge(_props: BadgeProps): JSX.Element | null {
  throw new Error('Not implemented');
}

export function Chip(_props: ChipProps): JSX.Element {
  throw new Error('Not implemented');
}

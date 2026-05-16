# Badge / Chip Component

## Problem

Build two related components: a `Badge` for displaying a small numeric count or status label, and a `Chip` for interactive tags that can be dismissed. Both support color variants. The `Badge` can overlap a child element (notification-style) or render inline. The `Chip` emits an `onDismiss` event when its X button is clicked.

## TypeScript Signature

```ts
type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  count?: number;
  label?: string;               // text label (used when count is not a number)
  variant?: Variant;            // default: 'default'
  max?: number;                 // show "{max}+" when count exceeds max, default: 99
  dot?: boolean;                // render a small dot with no text
  children?: React.ReactNode;   // if provided, badge overlays this element
  showZero?: boolean;           // show badge when count is 0, default: false
}

interface ChipProps {
  label: string;
  variant?: Variant;
  onDismiss?: () => void;       // if provided, renders an X dismiss button
  icon?: React.ReactNode;       // icon rendered before the label
  disabled?: boolean;
  onClick?: () => void;         // makes the chip interactive (selectable)
  selected?: boolean;
}

function Badge(props: BadgeProps): JSX.Element
function Chip(props: ChipProps): JSX.Element
```

## Usage Example

```tsx
// Notification badge overlay
<Badge count={5} variant="error">
  <BellIcon />
</Badge>

// Inline badge with max cap
<Badge count={120} max={99} variant="primary" />  // shows "99+"

// Dismissible chip
<Chip label="React" variant="primary" onDismiss={() => removeTag('react')} />

// Selectable chip with icon
<Chip label="Verified" icon={<CheckIcon />} onClick={toggle} selected={isSelected} />
```

## Constraints

- When `count` is 0 and `showZero` is false (default), the Badge is not rendered.
- When `count > max`: display `{max}+` (e.g. "99+").
- `dot` mode renders a small filled circle with no content; `count` and `label` are ignored.
- Chip's dismiss button must have `aria-label="Remove {label}"` and must be separately focusable from the chip label.
- If `onClick` is provided on Chip, the chip container becomes a `<button>`; otherwise it is a `<span>`.

## Edge Cases

- Badge `count` is negative — treat as 0 and apply showZero logic.
- Chip `disabled` + `onDismiss` — X button is `disabled` HTML attribute; cannot be clicked.
- Badge with `children` — the badge element is positioned absolutely over the child; child receives `position: relative`.
- `dot` combined with `count` — `dot` wins; no text is rendered.
- `label` and `count` both provided on Badge — `count` takes priority for display.
- Chip `selected` with no `onClick` — render as visually selected but not interactive.

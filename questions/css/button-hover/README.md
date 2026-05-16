# Button Hover Effects

## Problem

Implement a `Button` component with three visual variants and smooth CSS transitions on hover and active states. The transitions should cover background color, transform scale, and box-shadow changes.

## TypeScript Signatures

```typescript
type ButtonVariant = 'fill' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant     // default 'fill'
  size?: ButtonSize           // default 'md'
  color?: string              // primary color hex/hsl, default '#3b82f6'
  disabled?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

function Button(props: ButtonProps): React.ReactElement

// Returns the base styles for each variant
function getVariantStyles(variant: ButtonVariant, color: string): React.CSSProperties
```

## Usage Example

```tsx
<Button variant="fill" onClick={handleSave}>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost" loading>Processing...</Button>
```

Expected transitions:
- All variants: `transition: all 0.2s ease`
- `fill`: hover darkens background; active scales down to `scale(0.97)`
- `outline`: hover fills background with color; text color inverts
- `ghost`: hover adds a light background tint; no border

## Constraints

- All state changes (hover, active, focus) must use CSS transitions, not instant jumps
- `focus-visible` must show a clear focus ring (accessibility requirement)
- `disabled` must set `opacity: 0.5`, `cursor: not-allowed`, and `pointer-events: none`
- `loading` shows a spinner icon alongside the text and sets `pointer-events: none`
- Avoid using `!important`

## Edge Cases

- `disabled` + `onClick` — click must not fire (pointer-events: none covers this)
- `loading` state — button width should not change (use `opacity` on text, not removing it)
- Long text — button should not overflow; use `overflow: hidden` and `text-overflow: ellipsis`
- Touch devices — `:hover` may persist after tap; `:active` is the primary feedback on mobile
- `type="submit"` inside a `<form>` — must submit the form when clicked (do not call `e.preventDefault()` in the component)

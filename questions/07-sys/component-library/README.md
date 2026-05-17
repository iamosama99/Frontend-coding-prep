# Component Library Architecture

## Problem

Design and implement a production-grade `Button` component that demonstrates core component library patterns: design tokens, a polymorphic `as` prop, variant/size support, and full accessibility.

## TypeScript Signature

```ts
// Design tokens (CSS custom properties mirrored in TS)
interface DesignTokens {
  colorPrimary: string;
  colorSecondary: string;
  spacingSm: string;
  spacingMd: string;
  spacingLg: string;
  borderRadius: string;
}

// Polymorphic helper types
type AsProp<C extends React.ElementType> = { as?: C }
type PropsWithAs<C extends React.ElementType, P = {}> =
  P & AsProp<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof P | 'as'>

// Button own props
interface ButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

type ButtonProps<C extends React.ElementType = 'button'> =
  PropsWithAs<C, ButtonOwnProps>

function Button<C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
): JSX.Element
```

## Usage Example

```tsx
// Renders as <button>
<Button variant="primary" size="md" onClick={handleClick}>
  Save
</Button>

// Renders as <a> — all anchor props are available
<Button as="a" href="/dashboard" variant="ghost">
  Go to dashboard
</Button>

// Renders as a React Router Link
<Button as={RouterLink} to="/settings" variant="secondary">
  Settings
</Button>

// Loading state
<Button variant="primary" isLoading>
  Submitting…
</Button>
```

## Constraints

- The `as` prop determines which HTML element (or component) to render
- TypeScript must infer the correct prop set: `<Button as="a">` should accept `href`, reject `onClick` typed as button-only
- `isLoading` disables the button and shows a spinner in place of children
- `disabled` must be forwarded to the underlying element and also set `aria-disabled`
- Never use `!important` in styles — rely on specificity from design tokens
- Export `tokens` object alongside the component so consumers can theme it

## Edge Cases

- `as="a"` without `href` — should still render without crashing
- `isLoading={true}` and `disabled={true}` simultaneously — should be visually and semantically disabled
- Icon-only button (no children text) — must have an `aria-label`
- Very long label text — should not overflow the button boundary (use `overflow: hidden; text-overflow: ellipsis`)
- Nested interactive elements are forbidden: `<Button as="button"><button /></Button>` is invalid HTML
- TypeScript: passing `href` to `<Button>` (default `as="button"`) should be a compile error

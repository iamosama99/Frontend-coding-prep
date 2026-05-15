# Breadcrumb Nav

## Problem

Build a `Breadcrumb` navigation component that renders a list of links representing the current page's location in the site hierarchy. The last item is the current page and is not a link. When the path is too long, middle items collapse behind an ellipsis button that expands on click.

## TypeScript Signature

```ts
interface BreadcrumbItem {
  label: string;
  href?: string;               // omit for non-linkable items; omit on last item
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;  // default: "/"
  maxItems?: number;            // items to show before collapsing, default: show all
  className?: string;
}

function Breadcrumb(props: BreadcrumbProps): JSX.Element
```

## Usage Example

```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },   // current page — no href
  ]}
  separator="›"
  maxItems={3}
/>
// With maxItems=3: [Home] › ... › [Electronics] › Laptops
```

**Expected behaviour:** the first and last items are always visible. Middle items beyond `maxItems` are replaced by an ellipsis button (`...`). Clicking the ellipsis expands the full path. The current (last) item is rendered as a `<span>` with `aria-current="page"`.

## Constraints

- The outer element must be a `<nav aria-label="Breadcrumb">`.
- The inner list must be an `<ol>` (ordered list) with `<li>` items.
- Separator elements must have `aria-hidden="true"` so screen readers skip them.
- Links use `<a>` tags; the current item uses `<span aria-current="page">`.
- Ellipsis button must be accessible: `aria-label="Show full path"`.
- All items must be shown when `maxItems` is not provided or the item count does not exceed `maxItems`.

## Edge Cases

- Single item — render just the current page span with no separator and no nav if not meaningful; still wrap in `<nav>`.
- Two items — first is a link, second is current; no ellipsis even if maxItems is 1.
- `maxItems` larger than item count — show all items, no ellipsis.
- All items have no `href` — each is a span, not a link; current page still gets `aria-current`.
- `separator` is a React element (e.g. an SVG icon) — render it between each pair of items.
- Items change (navigation event) — the component re-renders with the new path; expanded state should reset.

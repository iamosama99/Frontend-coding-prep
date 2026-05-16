# Container Queries

## Problem

Implement a `ContainerQueryCard` component that adapts its layout based on its **container's** width (not the viewport). Use the `container-type` and `@container` CSS feature. Export a `getContainerCSS` utility that returns the needed CSS rules as a string.

## TypeScript Signatures

```typescript
interface ContainerQueryCardProps {
  title: string
  description: string
  imageUrl?: string
  actions?: React.ReactNode
  containerName?: string    // CSS container name, default 'card'
}

function ContainerQueryCard(props: ContainerQueryCardProps): React.ReactElement

// Returns the @container CSS rules as a string for injection
function getContainerCSS(containerName?: string): string
```

## Usage Example

```tsx
{/* Narrow container: card stacks vertically */}
<div style={{ width: 280 }}>
  <ContainerQueryCard title="Article" description="Short text" />
</div>

{/* Wide container: card shows horizontal layout with image on the side */}
<div style={{ width: 600 }}>
  <ContainerQueryCard title="Article" description="Short text" imageUrl="/photo.jpg" />
</div>
```

Expected CSS:
```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Default (narrow): vertical stack */
.card { display: flex; flex-direction: column; }

/* Wide container */
@container card (min-width: 400px) {
  .card { flex-direction: row; }
  .card-image { width: 200px; flex-shrink: 0; }
}
```

## Constraints

- The container element must have `container-type: inline-size` (measures width only, not height)
- Optionally set `container-name` for named container queries
- The `@container` rule queries the **container's** width, not `@media` (viewport)
- The card has two layout states: stacked (< 400px) and horizontal (≥ 400px)
- `getContainerCSS` must return valid CSS including the `@container` block

## Edge Cases

- Browser support: container queries require Chrome 105+, Firefox 110+, Safari 16+ — document this
- `container-type: size` vs `inline-size` — `size` measures both dimensions (more expensive); use `inline-size` for width-only queries
- Named containers — `@container card (...)` only responds to the nearest ancestor named `card`; unnamed `@container (...)` responds to the nearest container ancestor of any name
- Nested containers — each container establishes its own query context; the inner container's styles respond to the inner container, not the outer
- Layout shift — the container must have a defined width before children render to avoid layout jumps

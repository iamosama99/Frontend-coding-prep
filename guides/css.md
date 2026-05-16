# CSS — Interview Guide

## Core Mental Model

CSS is about **boxes, paint, and layout**. Every element is a rectangular box. The browser positions boxes using three systems: normal flow, floats, and positioning. Understanding which system is active at any moment is the key to debugging layouts.

Think of CSS in layers:
1. **The cascade** decides which rule wins (origin → specificity → order)
2. **The box model** defines how size is calculated
3. **Layout** (flow, flex, grid) positions boxes relative to each other
4. **Painting** (z-index, opacity, transform) controls what you see

## Key Concepts

### Box Model

Every element has four areas: content → padding → border → margin.

```css
/* content-box (default): width = content only */
.box { box-sizing: content-box; width: 200px; padding: 20px; border: 1px solid; }
/* Rendered width: 242px (200 + 20*2 + 1*2) */

/* border-box: width includes padding + border */
.box { box-sizing: border-box; width: 200px; padding: 20px; border: 1px solid; }
/* Rendered width: 200px */
```

**Interview insight:** Always set `* { box-sizing: border-box }` globally. Explain why: predictable sizing, no mental arithmetic when adding padding.

### Stacking Context

A new stacking context is formed by:
- `position` + `z-index` other than `auto`
- `opacity < 1`
- `transform`, `filter`, `clip-path`, `perspective`
- `isolation: isolate`
- `will-change` (when the property would create a stacking context)

**Gotcha:** z-index only works within the same stacking context. A child with `z-index: 9999` cannot escape its parent's stacking context.

### Block Formatting Context (BFC)

A BFC is an independent layout region — elements inside don't interact with outside elements. Created by:
- `overflow` other than `visible`
- `display: flow-root` (the modern way)
- `float`, `position: absolute/fixed`
- `display: flex/grid` (their children form a BFC)

**Why it matters:** BFC prevents margin collapse and contains floats.

```css
/* Contains floats — modern approach */
.container { display: flow-root; }
```

### Specificity

| Selector type | Points |
|--------------|--------|
| Inline style | 1,0,0,0 |
| ID (#foo) | 0,1,0,0 |
| Class (.foo), attribute ([type]), pseudo-class (:hover) | 0,0,1,0 |
| Element (div), pseudo-element (::before) | 0,0,0,1 |

**Gotcha:** `!important` beats everything. Using it signals broken architecture — prefer specificity or cascade order.

### Grid vs Flexbox

**Use Flexbox when:** items are one-dimensional, or sizing is content-driven.  
**Use Grid when:** layout is two-dimensional, or the container drives the sizing.

```css
/* Flexbox: navigation bar */
nav { display: flex; gap: 1rem; align-items: center; }

/* Grid: page layout */
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}

/* Responsive grid without media queries */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

### Custom Properties (CSS Variables)

```css
:root {
  --color-primary: #3b82f6;
  --spacing-md: 1rem;
}

.button {
  background: var(--color-primary, blue); /* blue = fallback */
  padding: var(--spacing-md);
}

/* Override in a scope */
.dark-theme { --color-primary: #60a5fa; }
```

**Key difference from preprocessor variables:** Custom properties cascade and inherit, making them available at runtime. JS can read/write them with `getPropertyValue` / `setProperty`.

### @keyframes & Animations

```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
```

Key `animation` sub-properties: `duration`, `timing-function`, `delay`, `iteration-count`, `direction`, `fill-mode`, `play-state`.

## Common Gotchas

1. **Margin collapse** — vertical margins between adjacent block siblings collapse to the larger value. Doesn't happen in flex/grid contexts.
2. **z-index on `position: static`** — has no effect. The element must be positioned (relative, absolute, fixed, sticky).
3. **`auto` margins in flex** — `margin-left: auto` pushes an item to the right end of a flex row. Extremely useful.
4. **Percentage heights** — require the parent to have a definite height. Use `vh`/`dvh` instead.
5. **`transform` creates a stacking context** — can cause z-index surprises with modals and tooltips inside transformed ancestors.
6. **`position: sticky` only works** when the parent is scrollable (has `overflow: auto/scroll`) and the sticky element has a `top`/`left` offset set.

## Interview Framing

When asked a CSS question:
1. **State the expected output first** — "This produces a two-column layout where..."
2. **Explain the why** — "I'm using `border-box` globally because..."
3. **Acknowledge trade-offs** — "CSS columns for masonry is simpler but loses source-order control"
4. **Mention browser support** — especially for container queries and scroll-driven animations

**Example framing for flexbox:** *"I'd reach for flexbox here because the items are one-dimensional. I'll set `flex-wrap: wrap` with a `min-width` on items to get a responsive layout without media queries — similar to grid's `auto-fit + minmax()` but content-driven rather than layout-driven."*

**Example framing for specificity:** *"I prefer to keep specificity flat — mostly single classes — so that utility classes can always win without `!important`. With `@layer`, you can encode this in the architecture itself."*

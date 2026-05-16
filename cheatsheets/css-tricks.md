# CSS Tricks Cheatsheet

## Box Model

| | `content-box` (default) | `border-box` |
|--|--|--|
| `width:` measures | content only | content + padding + border |
| Add `padding: 20px` | rendered width grows by 40px | rendered width stays the same |
| Best for | nothing (legacy default) | everything — always opt in |

**Global reset (always use):**
```css
*, *::before, *::after { box-sizing: border-box; }
```

**Width formula:**
- `content-box` rendered width = `width` + left/right `padding` + left/right `border`
- `border-box` rendered width = `width` (padding + border are subtracted from inside)

---

## Stacking Context

**What creates a new stacking context:**

| Property | Triggering value |
|----------|-----------------|
| `position` | any + `z-index ≠ auto` |
| `opacity` | `< 1` |
| `transform` | any value other than `none` |
| `filter` | any value other than `none` |
| `clip-path` | any value other than `none` |
| `isolation` | `isolate` |
| `will-change` | property that would form a stacking context |
| `mix-blend-mode` | any other than `normal` |
| `contain` | `layout`, `paint`, or `strict` |

**Rule:** z-index only competes within the same stacking context. A child cannot escape its parent's stacking context no matter how high its z-index.

---

## Block Formatting Context (BFC)

**What creates a BFC:**
- `overflow: hidden | scroll | auto` (not `visible`)
- `display: flow-root` ← the clean, modern way
- `float: left | right`
- `position: absolute | fixed`
- `display: flex | grid | inline-flex | inline-grid`
- `contain: layout | content | paint`

**Why BFC matters:**
1. Contains floated children (no clearfix hack)
2. Prevents margin collapse with adjacent blocks
3. Doesn't overlap adjacent floats

```css
/* Contain floats — old way */
.clearfix::after { content: ''; display: block; clear: both; }

/* Contain floats — modern way */
.parent { display: flow-root; }
```

---

## Specificity Calculation

**Format: (A, B, C)** — compare left to right, first difference wins.

| Type | A | B | C | Example |
|------|---|---|---|---------|
| ID | 1 | 0 | 0 | `#header` |
| Class, attr, pseudo-class | 0 | 1 | 0 | `.btn`, `[type="text"]`, `:hover` |
| Element, pseudo-element | 0 | 0 | 1 | `div`, `::before` |
| Universal, combinators | 0 | 0 | 0 | `*`, `>`, `+`, `~` |
| Inline style | always beats rules | | | `style="..."` |
| `!important` | beats inline styles | | | avoid |

**Examples:**
```
div p                    → (0, 0, 2)
.nav a                   → (0, 1, 1)
#header .nav a:hover     → (1, 2, 1)
```

**Modern specificity tools:**
- `:is()`, `:has()`, `:not()` — take specificity of their most specific argument
- `:where()` — always zero specificity; great for resets and base styles

---

## Grid vs Flexbox Decision Tree

```
Is layout two-dimensional (rows AND columns)?
  YES → Grid
  NO  →
    Is sizing driven by content or container?
      Content-driven → Flexbox
      Container-driven → Grid
    Must items align across multiple rows?
      YES → Grid
      NO  → Flexbox
```

**Quick rules:**
- Nav bar → Flexbox
- Card grid → Grid (`auto-fit + minmax`)
- Page skeleton (header/sidebar/main/footer) → Grid
- Button group → Flexbox
- "Equal columns regardless of content" → Grid

**Responsive without media queries:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

---

## CSS Custom Properties

```css
/* Declaration */
:root {
  --color-brand: #3b82f6;
  --space-4: 1rem;
  --radius: 0.375rem;
}

/* Usage with fallback */
.btn { background: var(--color-brand, blue); }

/* Scoped override */
.dark { --color-brand: #60a5fa; }

/* In calc() */
.spacing { padding: calc(var(--space-4) * 2); }

/* JavaScript */
const el = document.querySelector('.btn')
el.style.setProperty('--color-brand', '#ff0')
getComputedStyle(el).getPropertyValue('--color-brand') // '#ff0'
```

**Differences from Sass/Less variables:**
- Cascade and inherit (child scopes can override)
- Available at runtime — JS can read/write them
- Can't be used as media query values (use `env()` for that)
- Unset with `--my-var: initial` or `--my-var: ;`

---

## Logical Properties

| Physical | Logical equivalent |
|----------|--------------------|
| `margin-top` | `margin-block-start` |
| `margin-bottom` | `margin-block-end` |
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `width` | `inline-size` |
| `height` | `block-size` |
| `top / bottom` | `inset-block-start / end` |
| `left / right` | `inset-inline-start / end` |

Shorthand: `margin-block: 1rem 2rem` (start end), `margin-inline: auto` (both sides).

---

## @layer Cascade Order

```css
/* Declare layer order first */
@layer reset, base, components, utilities;

@layer reset     { * { margin: 0; padding: 0; } }
@layer base      { a { color: blue; } }
@layer components{ .btn { padding: 0.5rem 1rem; } }
@layer utilities { .mt-4 { margin-top: 1rem; } }
```

**Precedence (highest wins):**
1. `!important` unlayered
2. `!important` in earlier layers (reversed!)
3. Unlayered styles
4. Last declared layer
5. Earlier declared layers lose

**Use case:** Add utility classes to the last layer — they win over component styles without needing `!important`.

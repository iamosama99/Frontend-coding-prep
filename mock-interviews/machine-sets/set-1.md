# Machine Round Set 1 — Accordion + Pagination

**Difficulty:** Easy  
**Time limit:** 90 minutes  
**Components:** 2 (build both)

---

## Full Spec

Build two standalone React components. Each must be self-contained — no external state management libraries.

---

### Component 1: Accordion

Build an `Accordion` component that renders a list of collapsible panels.

**Requirements:**
- Accept an array of `{ title: string; content: string }` items
- Clicking a panel header toggles its content open/closed
- Only one panel can be open at a time (single-expand mode)
- Closed panels show only the title; open panels show title + content
- Animate the open/close (CSS transition, no JS animation library)

**Props interface:**
```ts
interface AccordionProps {
  items: { title: string; content: string }[]
  defaultOpenIndex?: number  // which panel starts open (optional)
}
```

**Stretch goals (if time allows):**
- Add a `multiExpand` prop that allows multiple panels open simultaneously
- Make it keyboard accessible: Enter/Space toggles, Arrow keys navigate between headers

**Evaluation criteria:**
- State: single `openIndex` (or `Set` for multi-expand stretch)
- Correct ARIA: `role="button"`, `aria-expanded`, `aria-controls`, `id` on content
- CSS transition on max-height or height (not display:none — that breaks transitions)
- Edge case: empty items array renders nothing (no crash)

---

### Component 2: Pagination

Build a `Pagination` component for client-side page navigation.

**Requirements:**
- Accept `totalItems`, `itemsPerPage`, and a `currentPage` prop with an `onPageChange` callback
- Render page number buttons + Prev / Next buttons
- Disable Prev on page 1, disable Next on last page
- Show ellipsis (`...`) for long page ranges (e.g. 1 ... 5 6 7 ... 20)
- Current page button is visually highlighted

**Props interface:**
```ts
interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  siblingCount?: number  // pages shown around current page (default: 1)
}
```

**Stretch goals:**
- Add a "Jump to page" input
- Show "Showing X–Y of Z results" alongside the controls

**Evaluation criteria:**
- Correctly computes `totalPages = Math.ceil(totalItems / itemsPerPage)`
- Ellipsis logic: always shows first, last, and `siblingCount` pages around current
- No off-by-one errors on page boundaries
- `aria-label` on each button, `aria-current="page"` on current
- Edge case: 0 items, 1 page, last page selected

---

## Check-in at 45 min

> "Quick check-in — where are you? Which component are you on, and what's left?"

Expected at 45 min: Accordion done and working, Pagination core logic started.

## Check-in at 80 min

> "10 minutes left — what's your priority? What would you cut to make sure the core is solid?"

Expected at 80 min: Both components working for happy path. Stretch goals or edge cases remaining.

---

## Reviewer Checklist

- [ ] Accordion: single-expand state correct
- [ ] Accordion: CSS transition (not just toggle)
- [ ] Accordion: ARIA attributes present
- [ ] Pagination: totalPages calculation correct
- [ ] Pagination: ellipsis logic works for edge pages
- [ ] Pagination: Prev/Next disabled correctly
- [ ] Both: TypeScript props typed (no `any`)
- [ ] Both: No console errors or warnings

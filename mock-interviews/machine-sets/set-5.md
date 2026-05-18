# Machine Round Set 5 — Virtualized List

**Difficulty:** Hard (the hardest machine question)  
**Time limit:** 90 minutes  
**Components:** 1

---

## Full Spec

Build a `VirtualizedList` component that renders only the visible rows of a large dataset —
a technique called "windowing" or "virtual scrolling."

**The problem:** Rendering 10,000 `<div>` elements causes catastrophic DOM performance.
Your component should render only the ~20 rows visible in the viewport, using absolute positioning
to simulate the full scroll height.

**Requirements:**
- Accept an array of items (can be 10,000+) and a fixed `rowHeight` (number, in pixels)
- The container has a fixed height (passed as prop) and `overflow-y: scroll`
- Only rows that are currently visible (plus a small overscan buffer) are rendered
- A spacer div sets the total scroll height so the scrollbar is correct
- As the user scrolls, the visible window updates
- Each visible row is absolutely positioned at its correct Y offset

**Props interface:**
```ts
interface VirtualizedListProps<T> {
  items: T[]
  rowHeight: number          // height of each row in px (fixed, uniform)
  containerHeight: number    // visible height of the scroll container in px
  renderRow: (item: T, index: number) => React.ReactNode
  overscan?: number          // extra rows to render above/below (default: 3)
}
```

**The windowing algorithm:**
```
scrollTop = current scroll position of the container

startIndex = Math.floor(scrollTop / rowHeight) - overscan
endIndex   = startIndex + Math.ceil(containerHeight / rowHeight) + overscan * 2

clamp both to [0, items.length - 1]

For each visible index i:
  position: absolute
  top: i * rowHeight
  height: rowHeight

Outer spacer height: items.length * rowHeight
```

**Stretch goals (if time allows):**
- Support variable row heights (requires pre-computed cumulative height array)
- Add scroll-to-index method via a ref
- Use `IntersectionObserver` instead of scroll listener (different windowing strategy)

**Evaluation criteria:**
- Scroll listener: `onScroll` on the container div, stored in state or ref
- Correct index calculation: no off-by-one, clamped at boundaries
- Absolute positioning: each row positioned correctly, not just displayed in order
- Total height spacer: prevents scrollbar from shrinking as items appear/disappear
- Overscan: renders a few extra rows above and below to prevent flicker
- Performance: the component only re-renders when the visible window changes, not on every scroll event (use `useCallback` for scroll handler or compare indices before setState)

---

## Edge Cases to Handle

| Scenario | Expected behavior |
|----------|-------------------|
| 0 items | Renders empty container, no errors |
| Fewer items than fit in viewport | Renders all items, no unnecessary absolute positioning issues |
| Very fast scroll (scroll jumps) | No blank gap — overscan prevents visual artifacts |
| `containerHeight` larger than `items.length * rowHeight` | Spacer height is still correct (total list height), container doesn't overflow |
| `rowHeight = 0` | Shouldn't crash (real production code would guard this) |

---

## Check-in at 45 min

> "Quick check-in — do you have the scroll listener and visible index calculation working?
> Are rows rendering at the correct positions?"

Expected at 45 min: Scroll listener + index calculation working. Rows positioned, spacer present.
Overscan may not be in yet.

## Check-in at 80 min

> "10 minutes left — what's left? Edge cases or overscan?"

Expected at 80 min: Core working for happy path. Overscan may be done. Edge cases remaining.

---

## Reviewer Checklist

- [ ] `onScroll` handler reads `e.currentTarget.scrollTop`
- [ ] `startIndex` and `endIndex` calculated correctly from scrollTop + rowHeight
- [ ] Overscan applied (±overscan from raw start/end)
- [ ] Both indices clamped to `[0, items.length - 1]`
- [ ] Visible rows rendered with `position: absolute; top: index * rowHeight`
- [ ] Spacer div height = `items.length * rowHeight`
- [ ] Container has `position: relative` (for absolute children)
- [ ] Container has fixed height + `overflow-y: scroll`
- [ ] Empty array case handled (no crash)
- [ ] `renderRow` prop used (not hard-coded content)
- [ ] TypeScript: generic `T` properly threaded through props

---

## What Separates Pass from Exceptional

**Pass:** Core windowing works. Spacer correct. Rows positioned. Overscan present.

**Exceptional:**
- Notes that re-render on every scroll event is costly and uses `useCallback` + only updates state when the visible range actually changes
- Discusses the trade-off between fixed-height (simple) and variable-height (needs cumulative height array) approaches
- Mentions `IntersectionObserver` as an alternative to scroll listeners
- Handles the ResizeObserver pattern to update `containerHeight` if the window resizes

# Pagination

## Problem

Build a `Pagination` component that renders a page-navigation control. It supports both **client-side** mode (total item count is known; slice locally) and **server-side** mode (caller controls the current page). Ellipsis (`...`) must appear when the page range is too large to display all buttons, always keeping first, last, and the pages around the current page visible.

## TypeScript Signature

```ts
interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;          // 1-indexed
  onPageChange: (page: number) => void;
  siblingCount?: number;        // pages shown on each side of current, default: 1
  showFirstLast?: boolean;      // show First/Last buttons, default: true
  showPrevNext?: boolean;       // show Prev/Next buttons, default: true
}

function Pagination(props: PaginationProps): JSX.Element
```

## Usage Example

```tsx
const [page, setPage] = useState(1);
<Pagination
  totalItems={150}
  pageSize={10}
  currentPage={page}
  onPageChange={setPage}
  siblingCount={1}
/>
// Renders: [First] [Prev] [1] ... [4] [5] [6] ... [15] [Next] [Last]
// when on page 5 of 15
```

**Expected behaviour:** the total page count is `Math.ceil(totalItems / pageSize)`. The page range array includes the current page's siblings, the first and last pages, and ellipsis markers (`'...'`) wherever there is a gap. Previous/First buttons are disabled on page 1; Next/Last buttons are disabled on the last page.

## Constraints

- The page range algorithm must produce a stable array; no recomputation unless `currentPage`, `totalItems`, `pageSize`, or `siblingCount` change.
- Ellipsis should only appear when there is an actual gap (i.e. the hidden range has at least 2 items; a single hidden page is shown as a number, not `...`).
- `onPageChange` is called only on valid page transitions.
- The active page button is `aria-current="page"` and all buttons have meaningful `aria-label` attributes.
- `currentPage` is 1-indexed throughout.

## Edge Cases

- `totalItems` of 0 — render nothing (null) or a single disabled page-1 button.
- `pageSize` larger than `totalItems` — only one page; no ellipsis, Prev/Next disabled.
- `currentPage` out of range (less than 1 or greater than total pages) — clamp to valid range.
- `siblingCount={0}` — only the current page is shown between the first/last anchors.
- All pages fit without ellipsis (e.g. 5 pages, siblingCount=2) — show all pages with no `...`.
- `totalItems` changes (e.g. after search) while `currentPage` exceeds new total — component should communicate via `onPageChange` to reset to last valid page.

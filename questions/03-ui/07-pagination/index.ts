import { useMemo } from 'react';

export interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
}

// TODO 1: Compute totalPages = Math.ceil(totalItems / pageSize).
//   Return null if totalItems is 0 or totalPages <= 1 (no pagination needed).

// TODO 2: Build the page range array using useMemo.
//   - Start with the range around currentPage: [currentPage - siblingCount, ..., currentPage + siblingCount].
//   - Always include page 1 and page totalPages.
//   - Insert '...' wherever there is a gap of more than 1 between shown pages.
//   - Clamp sibling range to [1, totalPages].
//   - If the gap between page 1 and the left sibling is exactly 2, show that middle page
//     instead of an ellipsis (ellipsis for a single hidden page is wasteful).

// TODO 3: Render the page buttons from the computed range.
//   - For '...' entries, render a <span> (not a button) with aria-hidden="true".
//   - For page numbers, render <button> with aria-label="Page N",
//     aria-current="page" on the active page, and disabled when it is current
//     (optional — some designs keep current clickable).

// TODO 4: Render Prev and Next buttons (if showPrevNext is true).
//   - Prev: disabled when currentPage === 1; calls onPageChange(currentPage - 1).
//   - Next: disabled when currentPage === totalPages; calls onPageChange(currentPage + 1).

// TODO 5: Render First and Last buttons (if showFirstLast is true).
//   - First: disabled when currentPage === 1; calls onPageChange(1).
//   - Last: disabled when currentPage === totalPages; calls onPageChange(totalPages).
//   - Wrap everything in a <nav> with aria-label="Pagination".

export function Pagination(_props: PaginationProps): JSX.Element | null {
  throw new Error('Not implemented');
}

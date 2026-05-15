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

// TODO: implement solution
export function Pagination(_props: PaginationProps): JSX.Element | null {
  throw new Error('Not implemented');
}

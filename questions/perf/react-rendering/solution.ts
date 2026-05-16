import React from 'react';

// TODO: implement solution
export function useRenderCount(): number {
  throw new Error('Not implemented');
}

export const DashboardRow = React.memo(function DashboardRow(_props: {
  item: any;
  onClick: (id: string) => void;
}): JSX.Element {
  throw new Error('Not implemented');
});

export function DataDashboard(_props: {
  data: any[];
  refreshInterval?: number;
  onRowClick: (id: string) => void;
}): JSX.Element {
  throw new Error('Not implemented');
}

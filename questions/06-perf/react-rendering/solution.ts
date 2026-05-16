import React, { useRef, useCallback, useEffect, useState, useTransition } from 'react';

// Incremented synchronously in the function body — does NOT trigger a re-render.
export function useRenderCount(): number {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}

interface DashboardData {
  id: string;
  label: string;
  value: number;
  trend: 'up' | 'down' | 'flat';
}

const TREND_ICON: Record<DashboardData['trend'], string> = {
  up: '↑',
  down: '↓',
  flat: '→',
};

// React.memo uses shallow prop equality by default.
// DashboardRow only re-renders when item or onClick reference changes.
export const DashboardRow = React.memo(function DashboardRow({
  item,
  onClick,
}: {
  item: DashboardData;
  onClick: (id: string) => void;
}): JSX.Element {
  return React.createElement(
    'tr',
    { onClick: () => onClick(item.id), style: { cursor: 'pointer' } },
    React.createElement('td', null, item.label),
    React.createElement('td', null, item.value),
    React.createElement('td', null, TREND_ICON[item.trend])
  );
});

export function DataDashboard({
  data,
  refreshInterval = 5000,
  onRowClick,
}: {
  data: DashboardData[];
  refreshInterval?: number;
  onRowClick: (id: string) => void;
}): JSX.Element {
  const [rows, setRows] = useState<DashboardData[]>(data);
  const [isPending, startTransition] = useTransition();

  // Keep rows in sync with prop changes via transition so large re-renders don't block input.
  useEffect(() => {
    startTransition(() => setRows(data));
  }, [data]);

  // Simulate periodic refresh — the interval is reset if refreshInterval changes.
  useEffect(() => {
    if (!refreshInterval) return;
    const id = setInterval(() => {
      startTransition(() => setRows((prev) => [...prev]));
    }, refreshInterval);
    return () => clearInterval(id);
  }, [refreshInterval]);

  // Stable callback — memoized so React.memo on DashboardRow actually prevents re-renders.
  const handleClick = useCallback((id: string) => onRowClick(id), [onRowClick]);

  return React.createElement(
    'div',
    null,
    isPending && React.createElement('span', { style: { color: '#888', fontSize: 12 } }, 'Refreshing…'),
    React.createElement(
      'table',
      null,
      React.createElement(
        'tbody',
        null,
        ...rows.map((item) =>
          React.createElement(DashboardRow, { key: item.id, item, onClick: handleClick })
        )
      )
    )
  );
}

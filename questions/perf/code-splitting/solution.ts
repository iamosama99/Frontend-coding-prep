import React from 'react';

// TODO: implement solution
export const DashboardPage = React.lazy(() => import('./pages/Dashboard' as any));
export const SettingsPage = React.lazy(() => import('./pages/Settings' as any));
export const ReportsPage = React.lazy(() => import('./pages/Reports' as any));

export function AsyncBoundary(_props: {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}): JSX.Element {
  throw new Error('Not implemented');
}

export function AppRouter(_props: { path: string }): JSX.Element {
  throw new Error('Not implemented');
}

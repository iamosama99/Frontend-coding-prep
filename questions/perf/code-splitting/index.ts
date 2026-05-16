import React, { Suspense, Component } from 'react';

// TODO 1: Use React.lazy to lazily import each page component.
//         The import path is relative — pretend the files exist at ./pages/Dashboard, etc.
//         React.lazy takes a function that returns a dynamic import().

export const DashboardPage = React.lazy(() => import('./pages/Dashboard' as any));
export const SettingsPage = React.lazy(() => import('./pages/Settings' as any));
export const ReportsPage = React.lazy(() => import('./pages/Reports' as any));

// TODO 2: Implement an ErrorBoundary class component with componentDidCatch.
//         It should catch chunk-load errors and render a fallback UI.
//         State: { hasError: boolean, error: Error | null }

// TODO 3: Implement AsyncBoundary — it wraps children in both the ErrorBoundary
//         above AND a Suspense with the provided fallback.
//         If no fallback is provided, render a default <div>Loading...</div>.

interface AsyncBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function AsyncBoundary({ fallback, children }: AsyncBoundaryProps): JSX.Element {
  throw new Error('Not implemented');
}

// TODO 4: Implement AppRouter — map path strings to the correct lazy component.
//         Paths: '/dashboard', '/settings', '/reports'.
//         Any other path renders a 404 message (no lazy load needed for 404).

interface AppRouterProps {
  path: string;
}

export function AppRouter({ path }: AppRouterProps): JSX.Element {
  throw new Error('Not implemented');
}

// TODO 5 (stretch): Add a preload helper — export a function preloadRoute(path: string)
//         that calls the dynamic import() for that route eagerly (e.g. on link hover).
//         This warms the module cache before the user clicks.

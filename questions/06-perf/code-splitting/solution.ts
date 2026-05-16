import React, { Suspense, Component } from 'react';

export const DashboardPage = React.lazy(() => import('./pages/Dashboard' as any));
export const SettingsPage = React.lazy(() => import('./pages/Settings' as any));
export const ReportsPage = React.lazy(() => import('./pages/Reports' as any));

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[AsyncBoundary]', error, info.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? React.createElement('div', null, 'Something went wrong.');
    }
    return this.props.children;
  }
}

interface AsyncBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function AsyncBoundary({ fallback, children }: AsyncBoundaryProps): JSX.Element {
  const loadingFallback = fallback ?? React.createElement('div', null, 'Loading...');
  return React.createElement(
    ErrorBoundary,
    { fallback: React.createElement('div', null, 'Something went wrong.') },
    React.createElement(Suspense, { fallback: loadingFallback }, children)
  );
}

const ROUTES: Record<string, React.LazyExoticComponent<any>> = {
  '/dashboard': DashboardPage,
  '/settings': SettingsPage,
  '/reports': ReportsPage,
};

export function AppRouter({ path }: { path: string }): JSX.Element {
  const Page = ROUTES[path];

  if (!Page) {
    return React.createElement(
      'div',
      null,
      React.createElement('h1', null, '404'),
      React.createElement('p', null, `No route found for "${path}"`)
    );
  }

  return React.createElement(
    AsyncBoundary,
    null,
    React.createElement(Page, null)
  );
}

export function preloadRoute(path: string): void {
  if (path === '/dashboard') import('./pages/Dashboard' as any);
  else if (path === '/settings') import('./pages/Settings' as any);
  else if (path === '/reports') import('./pages/Reports' as any);
}

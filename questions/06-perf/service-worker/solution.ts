// TODO: implement solution
export const PRECACHE_URLS: string[] = ['/', '/index.html', '/static/main.css', '/static/main.js'];

export function handleInstall(_event: ExtendableEvent): void {
  throw new Error('Not implemented');
}

export function handleActivate(_event: ExtendableEvent): void {
  throw new Error('Not implemented');
}

export function handleFetch(_event: FetchEvent): void {
  throw new Error('Not implemented');
}

export function useServiceWorker(_swPath: string): {
  status: 'unsupported' | 'registering' | 'active' | 'waiting' | 'error';
  updateAvailable: boolean;
  update: () => void;
} {
  throw new Error('Not implemented');
}

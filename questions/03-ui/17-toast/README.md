# Toast / Notification System

## Problem

Build a toast notification system consisting of a `ToastProvider` context, a `useToast` hook for dispatching toasts, and a `ToastContainer` that renders them via a portal. Toasts auto-dismiss after a configurable duration. Multiple toasts can be queued and shown simultaneously with stacking.

## TypeScript Signature

```ts
type ToastVariant = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: string;
  message: string;
  variant?: ToastVariant;        // default: 'info'
  duration?: number;             // ms before auto-dismiss, default: 4000; 0 = persistent
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;  // returns the toast id
  removeToast: (id: string) => void;
  clearAll: () => void;
}

function ToastProvider(props: { children: React.ReactNode; maxToasts?: number }): JSX.Element
function useToast(): ToastContextValue
function ToastContainer(props: { position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' }): JSX.Element
```

## Usage Example

```tsx
// Wrap your app
<ToastProvider maxToasts={5}>
  <App />
  <ToastContainer position="top-right" />
</ToastProvider>

// Inside any component
const { addToast } = useToast();

addToast({ message: 'File saved!', variant: 'success' });
addToast({ message: 'Session expiring soon', variant: 'warning', duration: 0 });
addToast({
  message: 'Item deleted',
  variant: 'info',
  action: { label: 'Undo', onClick: handleUndo },
});
```

**Expected behaviour:** `addToast` generates a unique id and appends the toast to the queue. Each toast schedules its own auto-dismiss timer. `removeToast` cancels the timer and removes the toast. `maxToasts` enforces a cap; the oldest toast is removed when the cap is exceeded.

## Constraints

- `ToastProvider` must hold all state; `useToast` must throw if used outside the provider.
- Each toast's dismiss timer must be cancelled if `removeToast` is called manually before it fires.
- `ToastContainer` renders into a portal on `document.body`.
- `duration: 0` means the toast is persistent (never auto-dismisses); it must be dismissed manually.
- Toasts should have `role="alert"` (or `role="status"` for non-critical) and `aria-live`.
- New toasts should animate in (CSS slide/fade); dismissed toasts should animate out.

## Edge Cases

- `maxToasts` reached — oldest toast removed automatically when a new one is added.
- `removeToast` called with an id that no longer exists — no-op, no error.
- `clearAll` called with no toasts — no-op, no error.
- `duration: 0` and `clearAll` — persistent toasts are cleared too.
- Timer fires after component unmount — guard with a ref or mounted flag.
- Two toasts added in the same tick — both should appear with distinct ids.

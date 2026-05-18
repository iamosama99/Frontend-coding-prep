# Machine Round Set 4 — Modal + Toast System

**Difficulty:** Hard  
**Time limit:** 90 minutes  
**Components:** 2 (build both — they share a portal pattern)

---

## Full Spec

Build two components that both use React portals to render outside the normal DOM tree.

---

### Component 1: Modal / Dialog

Build a `Modal` component that renders content in a portal overlay.

**Requirements:**
- Renders its children inside a `ReactDOM.createPortal` targeting `document.body`
- Clicking the backdrop (outside the dialog) closes the modal
- Pressing Escape closes the modal
- Focus is trapped inside the modal while open (Tab cycles only through focusable elements inside)
- When the modal closes, focus returns to the element that triggered it
- The modal is not rendered to the DOM at all when `isOpen` is false (conditional portal)

**Props interface:**
```ts
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}
```

**Stretch goals:**
- Prevent body scroll while modal is open (`document.body.style.overflow = 'hidden'`)
- Add `initialFocusRef` prop to control which element gets focus on open

**Evaluation criteria:**
- Portal: `ReactDOM.createPortal(content, document.body)`
- Focus trap: `Tab` + `Shift+Tab` stay inside modal, wrapping correctly
- Escape key: event listener cleaned up on unmount
- Backdrop click: closes only when clicking the backdrop div itself (not its children)
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` on the dialog element
- Focus returns to trigger element on close

---

### Component 2: Toast / Notification System

Build a toast notification system with a Context-based API.

**Requirements:**
- `ToastProvider` wraps the app and manages the toast queue
- `useToast()` hook returns `{ show, dismiss }` functions
- `show({ message, type, duration? })` adds a toast to the queue
- Each toast auto-dismisses after `duration` ms (default: 3000)
- Multiple toasts stack (LIFO or FIFO — state your choice)
- Clicking the X on a toast dismisses it immediately
- Toasts render in a portal (top-right corner of viewport)

**API:**
```ts
interface ToastOptions {
  message: string
  type?: 'info' | 'success' | 'error' | 'warning'
  duration?: number
}

// useToast returns:
const { show, dismiss } = useToast()
show({ message: 'Saved!', type: 'success', duration: 2000 })
dismiss(toastId)
```

**Stretch goals:**
- Pause auto-dismiss on hover
- ARIA live region (`aria-live="polite"`) so screen readers announce toasts

**Evaluation criteria:**
- Context: `ToastContext` with `show` and `dismiss` methods
- State: array of `{ id, message, type, duration }` objects (id from `crypto.randomUUID()` or counter)
- Auto-dismiss: `setTimeout` in `useEffect`, cleaned up if component unmounts early
- Portal: renders in `document.body`, fixed position top-right
- Multiple toasts visible simultaneously
- `aria-live="polite"` on the container

---

## Check-in at 45 min

> "Quick check-in — do you have the Modal rendering and closing working? Have you started the toast system?"

Expected at 45 min: Modal open/close + Escape working. Portal in place. Toast Context scaffolded.

## Check-in at 80 min

> "10 minutes left — focus trap or ARIA — what are you prioritizing?"

Expected at 80 min: Modal functional (maybe no focus trap), Toast show/dismiss/auto-dismiss working.

---

## Reviewer Checklist

**Modal:**
- [ ] Portal renders in document.body
- [ ] Backdrop click closes (not child click)
- [ ] Escape closes
- [ ] ARIA: role="dialog", aria-modal, aria-labelledby
- [ ] Focus trap working (Tab stays inside)
- [ ] Focus returns to trigger on close

**Toast:**
- [ ] ToastProvider + useToast hook
- [ ] show() adds to queue, dismiss() removes
- [ ] Auto-dismiss with setTimeout cleanup
- [ ] Multiple toasts visible at once
- [ ] Portal fixed top-right
- [ ] aria-live="polite" present
- [ ] TypeScript: no implicit `any`

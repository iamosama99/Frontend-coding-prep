# Modal / Dialog

## Problem

Build a `Modal` component that renders a dialog overlay using a React portal. The modal traps focus within itself while open, closes on Escape or backdrop click, and restores focus to the trigger element when closed. It follows the WAI-ARIA dialog pattern.

## TypeScript Signature

```ts
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;     // default: true
  closeOnEscape?: boolean;       // default: true
  initialFocusRef?: React.RefObject<HTMLElement>; // element to focus on open
  returnFocusRef?: React.RefObject<HTMLElement>;  // element to focus on close
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  className?: string;
}

function Modal(props: ModalProps): JSX.Element | null
```

## Usage Example

```tsx
const [isOpen, setIsOpen] = useState(false);
const triggerRef = useRef<HTMLButtonElement>(null);

<button ref={triggerRef} onClick={() => setIsOpen(true)}>Open modal</button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm deletion"
  returnFocusRef={triggerRef}
>
  <p>Are you sure you want to delete this item?</p>
  <button onClick={() => setIsOpen(false)}>Cancel</button>
  <button onClick={handleDelete}>Delete</button>
</Modal>
```

**Expected behaviour:** when `isOpen` is true, the modal appears centred over a semi-transparent backdrop. Focus moves inside. Tab/Shift+Tab cycle through focusable elements inside the modal only. Escape or clicking the backdrop calls `onClose`. When closed, focus returns to `returnFocusRef` or the previously focused element.

## Constraints

- Use `createPortal(content, document.body)` to render outside the component tree.
- The dialog container must have `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the title element's id.
- The backdrop `<div>` is not focusable (`tabIndex={-1}`) and calls `onClose` when clicked directly (not when clicks bubble from inside the modal).
- Focus trap: intercept `Tab` and `Shift+Tab` to cycle within all focusable elements inside the dialog.
- Return `null` (or keep the portal detached) when `isOpen` is false — do not render a hidden modal.

## Edge Cases

- No focusable elements inside the modal — focus the dialog container itself (tabIndex={-1}).
- `initialFocusRef` points to an element not currently in the DOM — fall back to first focusable element.
- Modal opened inside another modal — each must maintain its own focus trap (nested dialogs).
- `isOpen` toggles rapidly — the focus trap setup/cleanup must be idempotent.
- `returnFocusRef` not provided — save `document.activeElement` before opening and restore it on close.
- Page scroll must be locked (`overflow: hidden` on body) while the modal is open; restored on close.

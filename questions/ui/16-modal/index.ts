import { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode, RefObject } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  initialFocusRef?: RefObject<HTMLElement>;
  returnFocusRef?: RefObject<HTMLElement>;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  className?: string;
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

// TODO 1: Return null when isOpen is false.
//   Alternatively: use a CSS class to hide the modal, but unmounting on close
//   is simpler and ensures no stale state persists between open/close cycles.

// TODO 2: Set up focus trap in a useEffect that runs when isOpen changes.
//   - Save document.activeElement as previousFocus before opening.
//   - Query all focusable elements inside the dialogRef.
//   - On keydown: intercept Tab/Shift+Tab to cycle within the focusable elements.
//   - On close (cleanup): restore focus to returnFocusRef.current ?? previousFocus.
//   - Also intercept Escape key when closeOnEscape is true.
//   - Remove the event listener in the cleanup function.

// TODO 3: Move focus to the correct element on open.
//   - If initialFocusRef is provided and its current is inside the dialog: focus it.
//   - Otherwise focus the first focusable element inside the dialog.
//   - Fallback: focus the dialog container itself (it needs tabIndex={-1}).

// TODO 4: Lock body scroll while open.
//   - Set document.body.style.overflow = 'hidden' on open.
//   - Restore it to '' on close (in the useEffect cleanup).

// TODO 5: Render the portal structure.
//   - Backdrop div: onClick calls onClose if closeOnBackdrop; stopPropagation on the dialog click.
//   - Dialog div: role="dialog", aria-modal="true", aria-labelledby="{titleId}", ref={dialogRef}.
//   - Title element (h2) with id="{titleId}".
//   - Close button with aria-label="Close dialog".
//   - {children}.
//   - Return createPortal(content, document.body).

export function Modal(_props: ModalProps): JSX.Element | null {
  throw new Error('Not implemented');
}

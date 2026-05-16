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

// TODO: implement solution
export function Modal(_props: ModalProps): JSX.Element | null {
  throw new Error('Not implemented');
}

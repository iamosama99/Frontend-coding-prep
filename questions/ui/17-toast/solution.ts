import { createContext, useContext, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

// TODO: implement solution
export function ToastProvider(_props: { children: ReactNode; maxToasts?: number }): JSX.Element {
  throw new Error('Not implemented');
}

export function useToast(): ToastContextValue {
  throw new Error('Not implemented');
}

export function ToastContainer(_props: {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}): JSX.Element {
  throw new Error('Not implemented');
}

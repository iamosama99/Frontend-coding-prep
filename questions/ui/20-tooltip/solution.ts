import { useState, useRef, useEffect, useId, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode, ReactElement } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
  maxWidth?: number;
}

// TODO: implement solution
export function Tooltip(_props: TooltipProps): JSX.Element {
  throw new Error('Not implemented');
}

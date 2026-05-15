import type { ReactNode } from 'react';

export type Variant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  count?: number;
  label?: string;
  variant?: Variant;
  max?: number;
  dot?: boolean;
  children?: ReactNode;
  showZero?: boolean;
}

export interface ChipProps {
  label: string;
  variant?: Variant;
  onDismiss?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

// TODO: implement solution
export function Badge(_props: BadgeProps): JSX.Element | null {
  throw new Error('Not implemented');
}

export function Chip(_props: ChipProps): JSX.Element {
  throw new Error('Not implemented');
}

import { useState } from 'react';
import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  className?: string;
}

// TODO: implement solution
export function Breadcrumb(_props: BreadcrumbProps): JSX.Element {
  throw new Error('Not implemented');
}

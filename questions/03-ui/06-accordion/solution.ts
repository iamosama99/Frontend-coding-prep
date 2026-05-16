import { useState } from 'react';
import type { ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  openIds?: string[];
  onOpenChange?: (openIds: string[]) => void;
  defaultOpenIds?: string[];
}

// TODO: implement solution
export function Accordion(_props: AccordionProps): JSX.Element {
  throw new Error('Not implemented');
}

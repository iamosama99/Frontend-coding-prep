import { createContext, useContext, useState, useId } from 'react';
import type { ReactNode } from 'react';

export interface TabsProps {
  children: ReactNode;
  defaultIndex?: number;
  index?: number;
  onChange?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
}

export interface TabProps {
  children: ReactNode;
  disabled?: boolean;
  index: number;
}

export interface TabPanelProps {
  children: ReactNode;
  index: number;
}

// TODO: implement solution
export function Tabs(_props: TabsProps): JSX.Element {
  throw new Error('Not implemented');
}

export function TabList(_props: { children: ReactNode }): JSX.Element {
  throw new Error('Not implemented');
}

export function Tab(_props: TabProps): JSX.Element {
  throw new Error('Not implemented');
}

export function TabPanel(_props: TabPanelProps): JSX.Element {
  throw new Error('Not implemented');
}

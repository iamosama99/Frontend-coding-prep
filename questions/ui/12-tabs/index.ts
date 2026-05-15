import { createContext, useContext, useState, useId } from 'react';
import type { ReactNode } from 'react';

export interface TabsContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  orientation: 'horizontal' | 'vertical';
  uid: string;
}

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

// TODO 1: Create a TabsContext using React.createContext.
//   Export it so child components can consume it. The context value should
//   include: activeIndex, setActiveIndex, orientation, and a uid for generating
//   unique ARIA ids (use useId() to generate the uid).

// TODO 2: Implement the Tabs root component.
//   - Determine controlled vs uncontrolled from the `index` prop.
//   - Manage internal state with useState(defaultIndex ?? 0) for uncontrolled.
//   - The setActiveIndex wrapper should call onChange if provided, and update
//     internal state only in uncontrolled mode.
//   - Provide the context to all children.

// TODO 3: Implement TabList.
//   - Render a <div role="tablist"> with aria-orientation set to the context's orientation.
//   - Attach a keydown handler for arrow key navigation.
//   - Left/Right (or Up/Down for vertical): move activeIndex by +1/-1, skipping disabled tabs.
//   - Home/End: jump to first/last non-disabled tab.
//   - After changing index via keyboard, call setActiveIndex and focus the new tab button.

// TODO 4: Implement Tab.
//   - Render a <button role="tab"> with aria-selected, aria-controls, tabIndex, id, disabled.
//   - id format: `tab-${uid}-${index}` and aria-controls: `panel-${uid}-${index}`.
//   - tabIndex: 0 for active, -1 for inactive.
//   - onClick: call setActiveIndex(index) unless disabled.

// TODO 5: Implement TabPanel.
//   - Render a <div role="tabpanel"> with id, aria-labelledby, and hidden attribute.
//   - id format: `panel-${uid}-${index}`.
//   - aria-labelledby: `tab-${uid}-${index}`.
//   - hidden: true when this panel's index !== activeIndex.

const TabsContext = createContext<TabsContextValue | null>(null);

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

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

// TODO 1: Determine controlled vs uncontrolled mode.
//   - Controlled: `openIds` prop is provided (not undefined). Use it directly.
//   - Uncontrolled: manage internal state with useState, initialised from
//     `defaultOpenIds`. In single-expand mode, only keep the first id if multiple
//     ids are provided in defaultOpenIds.

// TODO 2: Implement the toggle function.
//   - If the item is disabled, return immediately.
//   - Single-expand mode (multiple=false): if item is already open, close it;
//     otherwise close any current open item and open this one.
//   - Multi-expand mode (multiple=true): add id if not present, remove if present.
//   - In uncontrolled mode: update internal state.
//   - In controlled mode: call onOpenChange with the new array of open ids.

// TODO 3: Render the accordion structure.
//   - Map over `items` and render a <div> per item containing a <button> and a panel.
//   - The button triggers toggle, has aria-expanded and aria-controls set.
//   - The panel has id matching the button's aria-controls value, role="region",
//     and aria-labelledby pointing to the button's id.

// TODO 4: Handle the hidden state of panels.
//   - When a panel is closed, either set hidden attribute or use display:none via
//     inline style. Do NOT render null — the DOM node should remain for accessibility.

// TODO 5: Apply disabled styling and behaviour.
//   - Disabled buttons should have the `disabled` HTML attribute.
//   - Consider aria-disabled if you want the button to still receive focus
//     (helpful for communicating to screen reader users that the item exists).

export function Accordion(_props: AccordionProps): JSX.Element {
  throw new Error('Not implemented');
}

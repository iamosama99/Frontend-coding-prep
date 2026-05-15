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

// TODO 1: Compute the visible items list.
//   - If maxItems is undefined or items.length <= maxItems: show all items.
//   - Otherwise (and if not expanded): show the first item, an ellipsis placeholder,
//     and the last (maxItems - 2) items. Always show the last item (current page).
//   - Use a boolean `expanded` state to toggle between collapsed and full view.

// TODO 2: Render the ellipsis button.
//   - Only render when items are collapsed (not expanded and maxItems < items.length).
//   - On click: setExpanded(true).
//   - aria-label="Show full path", aria-expanded={expanded}.

// TODO 3: Render each breadcrumb item.
//   - If item.href is provided AND it is not the last item: render an <a href={item.href}>.
//   - If it is the last item: render a <span aria-current="page">.
//   - If no href on a non-last item: render a <span>.
//   - Include item.icon before the label if provided.

// TODO 4: Render separators between items.
//   - Wrap the separator in <li aria-hidden="true"> or <span aria-hidden="true">.
//   - Do not render a separator after the last item.
//   - Default separator is "/" (string).

// TODO 5: Wrap everything in <nav aria-label="Breadcrumb"> with an inner <ol>.
//   - Each item and separator go in <li> elements.
//   - Pass className to the <nav> element.

export function Breadcrumb(_props: BreadcrumbProps): JSX.Element {
  throw new Error('Not implemented');
}

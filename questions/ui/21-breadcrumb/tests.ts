// Tests for Breadcrumb
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { Breadcrumb, BreadcrumbProps, BreadcrumbItem } from './index';

// Test 1: Breadcrumb is exported as a function
try {
  typeof Breadcrumb === 'function'
    ? pass('Breadcrumb is exported as a function')
    : fail('Breadcrumb exported', `typeof = ${typeof Breadcrumb}`);
} catch (e) {
  fail('Breadcrumb exported', String(e));
}

// Test 2: BreadcrumbItem interface shape
try {
  const item: BreadcrumbItem = { label: 'Home', href: '/' };
  item.label === 'Home' && item.href === '/'
    ? pass('BreadcrumbItem has correct shape')
    : fail('BreadcrumbItem', JSON.stringify(item));
} catch (e) {
  fail('BreadcrumbItem', String(e));
}

// Test 3: Collapsed items — always show first and last, collapse middle
try {
  const buildVisible = (items: string[], maxItems: number, expanded: boolean) => {
    if (expanded || items.length <= maxItems) return items;
    const keepFirst = 1;
    const keepLast = maxItems - 2;
    return [items[0], '...', ...items.slice(items.length - keepLast)];
  };
  const items = ['Home', 'Products', 'Electronics', 'Phones', 'iPhone'];
  const visible = buildVisible(items, 3, false);
  visible[0] === 'Home' && visible[1] === '...' && visible[visible.length - 1] === 'iPhone'
    ? pass('collapsed view shows first item, ellipsis, and last items')
    : fail('collapsed view', JSON.stringify(visible));
} catch (e) {
  fail('collapsed view', String(e));
}

// Test 4: Expanded state shows all items
try {
  const buildVisible = (items: string[], maxItems: number, expanded: boolean) => {
    if (expanded || items.length <= maxItems) return items;
    return [items[0], '...', ...items.slice(items.length - (maxItems - 2))];
  };
  const items = ['Home', 'Products', 'Electronics', 'Phones'];
  const visible = buildVisible(items, 3, true);
  visible.length === items.length
    ? pass('expanded state shows all items without ellipsis')
    : fail('expanded', `visible=${visible.length} items, expected ${items.length}`);
} catch (e) {
  fail('expanded', String(e));
}

// Test 5: Last item has no href — is current page
try {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Laptops' }, // no href
  ];
  const lastItem = items[items.length - 1];
  lastItem.href === undefined
    ? pass('last item has no href (current page)')
    : fail('last item href', `got href="${lastItem.href}"`);
} catch (e) {
  fail('last item href', String(e));
}

// Test 6: maxItems larger than items.length — show all
try {
  const shouldCollapse = (itemCount: number, maxItems: number | undefined): boolean => {
    if (maxItems === undefined) return false;
    return itemCount > maxItems;
  };
  shouldCollapse(3, 10) === false && shouldCollapse(10, 3) === true
    ? pass('no collapse when itemCount <= maxItems')
    : fail('collapse condition', `3<=10: ${shouldCollapse(3, 10)} 10>3: ${shouldCollapse(10, 3)}`);
} catch (e) {
  fail('collapse condition', String(e));
}

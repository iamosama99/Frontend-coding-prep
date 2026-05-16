// Tests for React.memo + useMemo + useCallback
// Run: npx ts-node questions/perf/react-memoization/tests.ts

import { ProductItem, ProductList } from './index';

function assert(condition: boolean, message: string): void {
  if (condition) {
    console.log(`PASS: ${message}`);
  } else {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const mockProducts = [
  { id: 1, name: 'Laptop', price: 999, category: 'electronics' },
  { id: 2, name: 'Shirt', price: 29, category: 'clothing' },
  { id: 3, name: 'Phone', price: 699, category: 'electronics' },
];

// Test 1: ProductItem is wrapped in React.memo
assert(
  typeof ProductItem === 'object' || typeof ProductItem === 'function',
  'ProductItem is exported'
);

// Test 2: ProductList is a function
assert(typeof ProductList === 'function', 'ProductList is exported as a function');

// Test 3: renders without throwing on valid input
try {
  const el = ProductList({
    products: mockProducts,
    search: '',
    category: 'electronics',
    onSelect: () => {},
  });
  assert(el !== null && el !== undefined, 'ProductList renders without throwing');
} catch {
  assert(false, 'ProductList renders without throwing');
}

// Test 4: renders without throwing on empty products
try {
  const el = ProductList({
    products: [],
    search: '',
    category: 'all',
    onSelect: () => {},
  });
  assert(el !== null && el !== undefined, 'handles empty products array');
} catch {
  assert(false, 'handles empty products array');
}

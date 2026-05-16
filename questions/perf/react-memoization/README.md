# React.memo + useMemo + useCallback

## Problem

Build a `ProductList` component that demonstrates correct usage of React.memo, useMemo, and useCallback. The list receives a large array of products and a set of filters. You must prevent unnecessary re-renders without over-memoizing.

## API Signature

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface ProductListProps {
  products: Product[];
  search: string;
  category: string;
  onSelect: (id: number) => void;
}

// Memoized child — only re-renders when its own props change
export const ProductItem = React.memo(function ProductItem({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (id: number) => void;
}): JSX.Element

export function ProductList({ products, search, category, onSelect }: ProductListProps): JSX.Element
```

## Usage Example

```tsx
function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <ProductList
        products={LARGE_PRODUCT_ARRAY}
        search={search}
        category="electronics"
        onSelect={setSelected}
      />
    </>
  );
}
```

Expected: typing in the search input filters the list but does NOT cause every `ProductItem` to re-render — only items that actually changed.

## Constraints

- `ProductItem` must be wrapped in `React.memo`
- Filtered list must be derived with `useMemo`, not computed inline
- The `onSelect` callback passed to `ProductItem` must be stable with `useCallback`
- Do NOT memoize the `ProductList` itself (it always re-renders when its parent does)
- Use React DevTools Profiler comment in the code to explain what you'd look for

## Edge Cases

- `onSelect` is recreated each render by the parent — `useCallback` dependency array must be empty or correctly specified
- `search` changes on every keystroke — filter should only recompute when `search` or `products` changes, not on unrelated state changes
- `products` array is passed as a new reference each render — identify when this defeats `useMemo`
- Empty `products` — renders empty list without error
- All products filtered out — shows "No results" message
- When NOT to memoize: cheap computations (< 1ms), components that always receive new props anyway

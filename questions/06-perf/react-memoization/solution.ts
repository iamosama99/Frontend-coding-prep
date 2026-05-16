import React, { useMemo, useCallback } from 'react';

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

// React.memo does shallow prop comparison. onSelect must be stable (useCallback in parent)
// for memo to prevent re-renders — if the parent passes a new fn ref every render, memo is defeated.
export const ProductItem = React.memo(function ProductItem({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (id: number) => void;
}): JSX.Element {
  return React.createElement(
    'div',
    { onClick: () => onSelect(product.id), style: { cursor: 'pointer', padding: 8 } },
    React.createElement('strong', null, product.name),
    React.createElement('span', { style: { marginLeft: 8 } }, `$${product.price}`),
    React.createElement('span', { style: { marginLeft: 8, color: '#888' } }, product.category)
  );
});

export function ProductList({ products, search, category, onSelect }: ProductListProps): JSX.Element {
  // useMemo recomputes only when products, search, or category change —
  // not on unrelated parent state updates. If products is a new array reference
  // every render (even with the same items), useMemo still helps because the filter
  // logic itself is skipped; but memo on ProductItem is defeated because each item
  // reference is new. The fix is to stabilize the products array in the parent.
  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(lower);
      const matchesCategory = category === 'all' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  // Stable callback so ProductItem's React.memo comparison holds between renders.
  const handleSelect = useCallback((id: number) => {
    onSelect(id);
  }, [onSelect]);

  if (filtered.length === 0) {
    return React.createElement('p', null, 'No results');
  }

  return React.createElement(
    'ul',
    { style: { listStyle: 'none', padding: 0 } },
    ...filtered.map((p) =>
      React.createElement(
        'li',
        { key: p.id },
        React.createElement(ProductItem, { product: p, onSelect: handleSelect })
      )
    )
  );
}

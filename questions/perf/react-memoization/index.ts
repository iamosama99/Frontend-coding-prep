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

// TODO 1: Wrap ProductItem in React.memo. Think about what "same props" means
//         for the onSelect function — is it the same reference between renders?

export const ProductItem = React.memo(function ProductItem({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (id: number) => void;
}): JSX.Element {
  throw new Error('Not implemented');
});

// TODO 2: Use useMemo to derive the filtered list. The dependency array should
//         include only the values that, when changed, require a new filter pass.

// TODO 3: Use useCallback for the handler you pass to ProductItem so that
//         React.memo on ProductItem actually prevents re-renders.
//         What should the dependency array contain?

// TODO 4: Consider: if products is a new array reference every render (even with
//         the same items), does useMemo still help? Add a comment explaining.

// TODO 5: Render a "No results" message when the filtered list is empty.

export function ProductList({ products, search, category, onSelect }: ProductListProps): JSX.Element {
  throw new Error('Not implemented');
}

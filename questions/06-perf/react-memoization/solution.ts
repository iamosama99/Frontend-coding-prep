import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// TODO: implement solution
export const ProductItem = React.memo(function ProductItem(_props: {
  product: Product;
  onSelect: (id: number) => void;
}): JSX.Element {
  throw new Error('Not implemented');
});

export function ProductList(_props: {
  products: Product[];
  search: string;
  category: string;
  onSelect: (id: number) => void;
}): JSX.Element {
  throw new Error('Not implemented');
}

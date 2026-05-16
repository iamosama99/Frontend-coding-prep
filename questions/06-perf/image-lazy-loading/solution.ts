import React from 'react';

interface ImageItem {
  src: string;
  srcWebP?: string;
  alt: string;
  width: number;
  height: number;
}

interface LazyImageGridProps {
  images: ImageItem[];
  columns?: number;
}

// TODO: implement solution
export function LazyImageGrid({ images, columns = 3 }: LazyImageGridProps): JSX.Element {
  throw new Error('Not implemented');
}

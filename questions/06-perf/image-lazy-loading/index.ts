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

// TODO 1: Build a LazyImage component that uses <picture> when srcWebP is provided,
//         falling back to a plain <img>. Always include loading="lazy", width, and height.

// TODO 2: Handle the image error case — onError should swap in a placeholder div
//         that has the same aspect ratio as the original image so layout doesn't shift.

// TODO 3: Wire up the CSS Grid container. Use `grid-template-columns: repeat(N, 1fr)`
//         where N is the `columns` prop (clamp to at least 1).

// TODO 4: Add a srcset attribute to cover 400w, 800w, and 1200w breakpoints.
//         The base `src` can be used for all sizes in this stub — a real implementation
//         would have separate URLs per size.

// TODO 5: Ensure the grid works server-side (no window references at module level).

export function LazyImageGrid({ images, columns = 3 }: LazyImageGridProps): JSX.Element {
  throw new Error('Not implemented');
}

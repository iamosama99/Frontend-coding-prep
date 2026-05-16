import React, { useState } from 'react';

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

function LazyImage({ src, srcWebP, alt, width, height }: ImageItem): JSX.Element {
  const [errored, setErrored] = useState(false);

  const aspectRatio = height / width;
  const srcset = `${src} 400w, ${src} 800w, ${src} 1200w`;

  if (errored) {
    return (
      React.createElement('div', {
        style: {
          width: '100%',
          paddingTop: `${aspectRatio * 100}%`,
          backgroundColor: '#e5e7eb',
          borderRadius: 4,
          position: 'relative',
        },
        role: 'img',
        'aria-label': `Failed to load: ${alt}`,
      })
    );
  }

  const imgProps = {
    src,
    srcSet: srcset,
    alt,
    width,
    height,
    loading: 'lazy' as const,
    onError: () => setErrored(true),
    style: { width: '100%', height: 'auto', display: 'block' },
  };

  if (srcWebP) {
    return (
      React.createElement('picture', null,
        React.createElement('source', { type: 'image/webp', srcSet: srcWebP }),
        React.createElement('img', imgProps)
      )
    );
  }

  return React.createElement('img', imgProps);
}

export function LazyImageGrid({ images, columns = 3 }: LazyImageGridProps): JSX.Element {
  const cols = Math.max(1, columns);

  return React.createElement(
    'div',
    {
      style: {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1rem',
      },
    },
    ...images.map((image) =>
      React.createElement(
        'div',
        { key: image.src },
        React.createElement(LazyImage, { ...image, key: image.src })
      )
    )
  );
}

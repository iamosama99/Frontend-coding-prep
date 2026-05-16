# Image Lazy Loading + Optimization

## Problem

Build a React component that renders an image grid where images load lazily as they scroll into view. Apply modern image optimization techniques so the browser only downloads what the user can see.

## API Signature

```tsx
interface ImageItem {
  src: string;       // base URL (e.g. "https://example.com/photo.jpg")
  srcWebP?: string;  // WebP version URL
  alt: string;
  width: number;     // intrinsic width in px
  height: number;    // intrinsic height in px
}

interface LazyImageGridProps {
  images: ImageItem[];
  columns?: number;  // default 3
}

export function LazyImageGrid({ images, columns }: LazyImageGridProps): JSX.Element
```

## Usage Example

```tsx
<LazyImageGrid
  images={[
    { src: '/img/hero.jpg', srcWebP: '/img/hero.webp', alt: 'Hero', width: 800, height: 600 },
    { src: '/img/card.jpg', alt: 'Card', width: 400, height: 300 },
    // ...
  ]}
  columns={3}
/>
```

Expected behavior:
- Images below the fold don't download until scrolled near the viewport
- Layout doesn't shift when images load (no CLS)
- WebP is preferred when available with JPEG fallback
- `srcset` is used for responsive sizes (400w, 800w, 1200w)

## Constraints

- Use native `loading="lazy"` — do not reimplement with IntersectionObserver
- Always include explicit `width` and `height` attributes to prevent CLS
- Use `<picture>` element with `<source>` for WebP + fallback
- Grid layout uses CSS Grid (not flexbox)

## Edge Cases

- Image fails to load — show a placeholder with the same dimensions
- `srcWebP` is not provided — fall back to `<img>` without `<picture>`
- `columns` is 0 or negative — default to 1
- All images are above the fold on page load — they should still load (browser ignores `loading="lazy"` near the viewport)
- Very tall images in a fixed-width column — aspect ratio must be preserved

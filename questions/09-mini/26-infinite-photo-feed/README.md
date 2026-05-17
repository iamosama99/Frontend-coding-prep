# Infinite Photo Feed

## Problem

Build an infinite scroll photo feed that loads photos in batches using an IntersectionObserver sentinel element. Use picsum.photos for placeholder images and display them in a masonry-style grid.

## Requirements

- Use `https://picsum.photos/400/300?random={n}` for placeholder images (n is an incrementing seed)
- Load 12 photos on initial page load
- An IntersectionObserver watches a sentinel `<div>` at the bottom of the feed — when it enters the viewport, load 12 more photos
- Masonry-style grid using CSS `columns` property
- While loading, show a spinner at the bottom; hide it once photos are rendered
- Simulate network delay with an 800ms `setTimeout`
- Each photo shows a "Photo #n" caption overlay on hover

## Edge Cases

- Stop loading after 120 photos total — hide the sentinel and spinner permanently
- No duplicate images: use a strictly incrementing seed counter
- Spinner is shown during the simulated load and hidden after each batch renders
- Images are loaded with `loading="lazy"` for better performance

# Image Gallery + Lightbox

## Problem

Build a responsive image grid where clicking a thumbnail opens a full-screen lightbox overlay with prev/next navigation, keyboard support, and a close button.

## Requirements

- Grid of at least **12 thumbnail images** using `picsum.photos` placeholder URLs
- Clicking a thumbnail opens a **lightbox overlay** showing the full-size image
- Lightbox has:
  - A **close button** (×)
  - **Prev** and **Next** arrows to navigate between images
  - A **caption** showing the current image index (e.g. "3 / 12")
- **Keyboard navigation**: `ArrowLeft` / `ArrowRight` to navigate, `Escape` to close
- Smooth **fade transition** when the lightbox opens and closes
- **Body scroll is locked** while the lightbox is open

## Edge Cases

- Next from the **last** image wraps to the first image (and vice versa for Prev)
- Clicking the **backdrop** (the dark area outside the image) closes the lightbox
- Clicking directly on the image does **not** close the lightbox
- Keyboard events only fire when the lightbox is open
- Transition is smooth on both open and close

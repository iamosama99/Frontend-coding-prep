# Paint / Drawing Canvas

## Problem

Build a freehand drawing application using an HTML5 `<canvas>` element. Support mouse and touch input, a color picker, brush size slider, eraser tool, canvas clear, and PNG download.

## Requirements

- Full-width canvas that fills the viewport (width and height fixed to window dimensions on load)
- Freehand drawing: mouse events `mousedown`, `mousemove`, `mouseup` (and `mouseleave` to stop drawing)
- Touch support: `touchstart`, `touchmove`, `touchend`
- Color picker (`<input type="color">`) for brush color
- Brush size slider (range 2–40px) with live size preview
- Eraser tool: draws in the canvas background color (white) rather than using `globalCompositeOperation`
- Clear canvas button with a `window.confirm()` confirmation dialog
- Download button saves the canvas as `drawing.png` using `toDataURL`

## Edge Cases

- Drawing only active while mouse button is held down (mousedown sets flag; mouseup/mouseleave clears it)
- Smooth lines via `ctx.lineTo` / `ctx.stroke` on each `mousemove` — not individual dots per event
- Canvas size is fixed on page load; it does NOT resize on window resize (avoids clearing the drawing)
- Eraser simply sets `strokeStyle` to white — no `globalCompositeOperation` needed
- Touch events must call `e.preventDefault()` to stop page scroll while drawing

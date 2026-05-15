import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';

export interface SignaturePadProps {
  width?: number;
  height?: number;
  penColor?: string;
  penWidth?: number;
  backgroundColor?: string;
  onBegin?: () => void;
  onEnd?: (dataUrl: string) => void;
  onClear?: () => void;
  disabled?: boolean;
}

export interface SignaturePadRef {
  clear: () => void;
  toDataURL: (type?: string) => string;
  isEmpty: () => boolean;
}

// TODO 1: Set up refs: canvasRef (the <canvas> element), ctxRef (the 2D context),
//   pointsRef (array of {x, y} for current stroke), isDrawing (boolean), empty (boolean).
//   Initialise the canvas in a useEffect: set canvas width/height × devicePixelRatio,
//   scale the context, fill with backgroundColor.

// TODO 2: Implement pointer event handlers.
//   - onPointerDown: call e.currentTarget.setPointerCapture(e.pointerId).
//     Record start point, set isDrawing = true, call onBegin?.().
//   - onPointerMove: if not drawing, return.
//     Push current point to pointsRef. Render the stroke using the midpoint technique:
//     for each pair of consecutive points, draw a quadraticCurveTo to the midpoint.
//   - onPointerUp / onPointerCancel: set isDrawing = false, empty = false.
//     Call onEnd?.(canvas.toDataURL()).

// TODO 3: Implement the smooth drawing (midpoint technique).
//   - ctx.beginPath(); ctx.moveTo(first point).
//   - For each pair: midpoint = ((p1.x + p2.x) / 2, (p1.y + p2.y) / 2).
//     ctx.quadraticCurveTo(p1.x, p1.y, midpoint.x, midpoint.y).
//   - ctx.stroke().
//   - Set ctx.strokeStyle = penColor, ctx.lineWidth = penWidth, ctx.lineCap = 'round'.

// TODO 4: Implement useImperativeHandle to expose the ref API.
//   - clear: fill the canvas with backgroundColor, reset pointsRef and empty = true, call onClear?.().
//   - toDataURL(type): return canvasRef.current.toDataURL(type ?? 'image/png').
//   - isEmpty: return the empty boolean.

// TODO 5: Handle disabled prop.
//   - When disabled, do not attach the pointer event handlers (or check disabled in handlers and return).
//   - Set css cursor: 'not-allowed' on the canvas when disabled.
//   - The canvas still shows existing content when disabled.

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  function SignaturePad(_props, _ref) {
    throw new Error('Not implemented');
  }
);

# Canvas Signature Pad

## Problem

Build a `SignaturePad` component that lets users draw a signature on an HTML5 canvas element using mouse or touch. The component provides controls to clear the signature and export it as a PNG data URL. Drawing must feel natural with smooth Bezier curves rather than straight line segments.

## TypeScript Signature

```ts
interface SignaturePadProps {
  width?: number;              // canvas width in px, default: 400
  height?: number;             // canvas height in px, default: 200
  penColor?: string;           // default: "#000000"
  penWidth?: number;           // line width in px, default: 2
  backgroundColor?: string;   // canvas fill, default: "#ffffff"
  onBegin?: () => void;        // called when drawing starts
  onEnd?: (dataUrl: string) => void;  // called when pen is lifted
  onClear?: () => void;
  disabled?: boolean;
}

interface SignaturePadRef {
  clear: () => void;
  toDataURL: (type?: string) => string;  // default type: "image/png"
  isEmpty: () => boolean;
}

function SignaturePad(
  props: SignaturePadProps,
  ref: React.ForwardedRef<SignaturePadRef>
): JSX.Element
```

## Usage Example

```tsx
const padRef = useRef<SignaturePadRef>(null);

<SignaturePad
  ref={padRef}
  penColor="#1a1a1a"
  onEnd={(dataUrl) => setSavedSignature(dataUrl)}
/>
<button onClick={() => padRef.current?.clear()}>Clear</button>
<button onClick={() => {
  const url = padRef.current?.toDataURL();
  downloadFile(url, 'signature.png');
}}>Download</button>
```

**Expected behaviour:** the user draws on the canvas with mouse/touch. Lines are rendered as smooth curves using `quadraticCurveTo` (or `bezierCurveTo`) between recorded points. `onEnd` fires when the pointer is lifted with the current data URL. Clearing fills the canvas with `backgroundColor` and resets the drawn state.

## Constraints

- Use `useImperativeHandle` + `forwardRef` to expose the `SignaturePadRef` API.
- Attach `pointerdown`, `pointermove`, `pointerup`, `pointercancel` events on the canvas.
- `setPointerCapture` on the canvas element so pointer events continue even if the cursor leaves the canvas.
- Smooth rendering: record points, and use the midpoint technique — draw a quadratic curve to the midpoint of consecutive points.
- Track `isEmpty` state — set to false on first stroke, true after clear.
- Scale the canvas for high-DPI screens: multiply canvas width/height by `devicePixelRatio`, scale the context, then set CSS width/height normally.

## Edge Cases

- High-DPI display (retina) — canvas must not appear blurry; use `devicePixelRatio`.
- `disabled` — pointer events are suppressed; the canvas shows the existing content (not cleared).
- Component resizes (parent container changes) — canvas dimensions update; existing drawing is lost (document the behaviour).
- Very fast drawing — point buffer should not drop points; all registered events are rendered.
- Empty signature exported — `toDataURL()` returns the blank canvas image (still a valid data URL).
- `backgroundColor` is transparent — set `backgroundColor: 'transparent'` and skip the fill, so the exported PNG has a transparent background.

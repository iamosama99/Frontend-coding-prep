# Color Picker

## Problem

Build a `ColorPicker` component with hue and saturation/lightness sliders, a hex input field, and an optional EyeDropper API button for sampling screen colors. The component outputs a color in both hex and HSL formats.

## TypeScript Signature

```ts
interface ColorValue {
  hex: string;      // e.g. "#ff6600"
  hsl: { h: number; s: number; l: number };
  rgb: { r: number; g: number; b: number };
}

interface ColorPickerProps {
  value?: ColorValue;
  defaultValue?: ColorValue;
  onChange?: (color: ColorValue) => void;
  showHexInput?: boolean;    // default: true
  showEyeDropper?: boolean;  // default: true (only if API is available)
  presets?: string[];        // preset hex colors to show as swatches
  disabled?: boolean;
}

function ColorPicker(props: ColorPickerProps): JSX.Element
```

## Usage Example

```tsx
const [color, setColor] = useState<ColorValue>({ hex: '#3b82f6', hsl: {h:217,s:91,l:60}, rgb: {r:59,g:130,b:246} });

<ColorPicker
  value={color}
  onChange={setColor}
  presets={['#ef4444', '#3b82f6', '#22c55e', '#f59e0b']}
/>
```

**Expected behaviour:** the hue slider (0–360°) changes the hue. The saturation/lightness 2D picker changes S and L simultaneously via mouse position. The hex input accepts typed hex values and updates the sliders. The EyeDropper button (if `showEyeDropper` and API available) lets the user pick from the screen.

## Constraints

- Implement HSL ↔ Hex ↔ RGB conversion utilities.
- The 2D gradient picker uses two CSS gradients layered: `linear-gradient(to right, #fff, transparent)` and `linear-gradient(to top, #000, transparent)` over a solid hue background.
- Mouse drag on the 2D picker uses document mousemove/mouseup (same pattern as ResizablePanels).
- The hue slider is a standard `<input type="range" min="0" max="360">`.
- Hex input validation: only 6-digit hex accepted; prefix '#' automatically if missing.
- EyeDropper: use `new (window as any).EyeDropper()` with `sRGBHex` result; guard with feature detection.

## Edge Cases

- Hex input with invalid value — revert to last valid color; do not crash.
- `value` prop changes externally — sync all sliders and the hex input.
- EyeDropper cancelled by user (Escape) — no color change; the promise rejects with AbortError.
- Preset swatch click — immediately applies that color and calls onChange.
- `disabled` — all inputs and sliders are disabled; EyeDropper button hidden.
- Colors near white (lightness > 95%) — the picker thumb may be invisible against the white background; add a dark border to the thumb.

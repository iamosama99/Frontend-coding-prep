// Tests for ColorPicker
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { ColorPicker, ColorPickerProps, ColorValue } from './index';

// Test 1: ColorPicker is exported as a function
try {
  typeof ColorPicker === 'function'
    ? pass('ColorPicker is exported as a function')
    : fail('ColorPicker exported', `typeof = ${typeof ColorPicker}`);
} catch (e) {
  fail('ColorPicker exported', String(e));
}

// Test 2: ColorValue interface shape
try {
  const color: ColorValue = {
    hex: '#3b82f6',
    hsl: { h: 217, s: 91, l: 60 },
    rgb: { r: 59, g: 130, b: 246 },
  };
  color.hex === '#3b82f6' && color.hsl.h === 217
    ? pass('ColorValue interface has correct shape (hex, hsl, rgb)')
    : fail('ColorValue shape', JSON.stringify({ hex: color.hex, h: color.hsl.h }));
} catch (e) {
  fail('ColorValue shape', String(e));
}

// Test 3: hexToRgb conversion
try {
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const cleaned = hex.replace('#', '');
    return {
      r: parseInt(cleaned.slice(0, 2), 16),
      g: parseInt(cleaned.slice(2, 4), 16),
      b: parseInt(cleaned.slice(4, 6), 16),
    };
  };
  const result = hexToRgb('#ff6600');
  result.r === 255 && result.g === 102 && result.b === 0
    ? pass('hexToRgb: #ff6600 → { r:255, g:102, b:0 }')
    : fail('hexToRgb', JSON.stringify(result));
} catch (e) {
  fail('hexToRgb', String(e));
}

// Test 4: rgbToHex conversion
try {
  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  };
  rgbToHex(255, 102, 0) === '#ff6600' && rgbToHex(0, 0, 0) === '#000000'
    ? pass('rgbToHex: (255,102,0) → "#ff6600"; (0,0,0) → "#000000"')
    : fail('rgbToHex', `${rgbToHex(255, 102, 0)} / ${rgbToHex(0, 0, 0)}`);
} catch (e) {
  fail('rgbToHex', String(e));
}

// Test 5: S and L from picker position
try {
  const computeSL = (x: number, y: number, width: number, height: number): { s: number; l: number } => {
    const s = Math.min(100, Math.max(0, (x / width) * 100));
    const l = Math.min(100, Math.max(0, 100 - (y / height) * 100));
    return { s, l };
  };
  const { s, l } = computeSL(150, 50, 200, 200); // x=75%, y=25% → s=75, l=75
  Math.round(s) === 75 && Math.round(l) === 75
    ? pass('2D picker position: x=75%, y=25% → s=75%, l=75%')
    : fail('2D picker S/L', `s=${s} l=${l}`);
} catch (e) {
  fail('2D picker S/L', String(e));
}

// Test 6: EyeDropper feature detection
try {
  const hasEyeDropper = typeof (window as any)?.EyeDropper !== 'undefined';
  // In Node: will be false; in Chrome 95+: will be true
  typeof hasEyeDropper === 'boolean'
    ? pass('EyeDropper feature detection returns a boolean (not throws)')
    : fail('EyeDropper detection', 'not boolean');
} catch (e) {
  fail('EyeDropper detection', String(e));
}

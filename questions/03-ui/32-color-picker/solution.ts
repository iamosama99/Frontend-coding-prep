import { useState, useRef, useEffect, useCallback } from 'react';

export interface ColorValue {
  hex: string;
  hsl: { h: number; s: number; l: number };
  rgb: { r: number; g: number; b: number };
}

export interface ColorPickerProps {
  value?: ColorValue;
  defaultValue?: ColorValue;
  onChange?: (color: ColorValue) => void;
  showHexInput?: boolean;
  showEyeDropper?: boolean;
  presets?: string[];
  disabled?: boolean;
}

// TODO: implement solution
export function ColorPicker(_props: ColorPickerProps): JSX.Element {
  throw new Error('Not implemented');
}

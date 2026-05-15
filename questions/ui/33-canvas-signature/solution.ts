import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

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

// TODO: implement solution
export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  function SignaturePad(_props, _ref) {
    throw new Error('Not implemented');
  }
);

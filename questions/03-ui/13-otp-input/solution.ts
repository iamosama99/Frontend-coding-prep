import { useState, useRef, useEffect } from 'react';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  inputMode?: 'numeric' | 'text';
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

// TODO: implement solution
export function OTPInput(_props: OTPInputProps): JSX.Element {
  throw new Error('Not implemented');
}

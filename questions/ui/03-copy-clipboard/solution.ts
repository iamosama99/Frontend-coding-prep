import { useState, useEffect, useRef } from 'react';

export interface CopyButtonProps {
  text: string;
  label?: string;
  successLabel?: string;
  successDuration?: number;
  onCopy?: (text: string) => void;
  onError?: (err: unknown) => void;
}

// TODO: implement solution
export function CopyButton(_props: CopyButtonProps): JSX.Element {
  throw new Error('Not implemented');
}

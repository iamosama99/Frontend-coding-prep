import { useRef, useCallback, useEffect } from 'react';

interface LongPressOptions {
  duration?: number;
  onStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
}

// TODO: implement solution
export function useLongPress(
  callback: () => void,
  options: LongPressOptions = {}
) {
  throw new Error('Not implemented');
}

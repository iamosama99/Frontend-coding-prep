import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export interface Command {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  icon?: ReactNode;
  onExecute: () => void;
  keywords?: string[];
}

export interface CommandPaletteProps {
  commands: Command[];
  placeholder?: string;
  emptyMessage?: string;
  maxResults?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

// TODO: implement solution
export function CommandPalette(_props: CommandPaletteProps): JSX.Element {
  throw new Error('Not implemented');
}

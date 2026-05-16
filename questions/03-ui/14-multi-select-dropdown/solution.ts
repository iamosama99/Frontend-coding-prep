import { useState, useRef, useEffect, useMemo } from 'react';

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: Option[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  maxSelected?: number;
  disabled?: boolean;
  label?: string;
}

// TODO: implement solution
export function MultiSelect(_props: MultiSelectProps): JSX.Element {
  throw new Error('Not implemented');
}

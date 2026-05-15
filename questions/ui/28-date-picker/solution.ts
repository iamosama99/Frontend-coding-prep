import { useState, useRef, useEffect, useMemo } from 'react';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  rangeValue?: [Date | null, Date | null];
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  mode?: 'single' | 'range';
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  dateFormat?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

// TODO: implement solution
export function DatePicker(_props: DatePickerProps): JSX.Element {
  throw new Error('Not implemented');
}

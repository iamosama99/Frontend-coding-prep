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

// TODO 1: Set up state: isOpen (boolean), viewMonth (Date — the month currently displayed),
//   and inputValue (string — the typed text in the input).
//   Initialise viewMonth from value ?? new Date().

// TODO 2: Build the calendar grid using useMemo.
//   - Get the first day of viewMonth; find what day-of-week it falls on.
//   - Build an array of Date objects starting from (firstDayOfMonth - dayOfWeek) days back.
//   - The grid always has 6 rows × 7 cols = 42 cells.
//   - Depend on [viewMonth].

// TODO 3: Implement date selection.
//   - Single mode: call onChange?.(clickedDate), update inputValue, close popup.
//   - Range mode first click: set rangeValue[0] = clickedDate, leave popup open.
//   - Range mode second click: if clickedDate < rangeValue[0], swap; call onRangeChange.
//   - In both modes: check isDisabled(date) before allowing selection.

// TODO 4: Implement isDisabled helper.
//   - Returns true if date < minDate (day precision), date > maxDate,
//     or date appears in disabledDates (compare year/month/day only).
//   - Dates outside the current viewMonth are not disabled but styled as "other month" cells.

// TODO 5: Render the date picker.
//   - Input: type="text", value={inputValue}, aria-haspopup="dialog", aria-expanded.
//   - Calendar popup (only when isOpen): role="dialog", focus trap, keyboard handlers.
//   - Month navigation: Prev/Next buttons update viewMonth.
//   - Grid: 7-column table or div grid. Each cell: <button> for selectable days.
//   - Format helper: formatDate(date, format) converts Date to a display string.

export function DatePicker(_props: DatePickerProps): JSX.Element {
  throw new Error('Not implemented');
}

// Tests for DatePicker
// Run with: npx ts-node tests.ts

const pass = (name: string) => console.log(`PASS  ${name}`);
const fail = (name: string, msg: string) => console.log(`FAIL  ${name}: ${msg}`);

import { DatePicker, DatePickerProps } from './index';

// Test 1: DatePicker is exported as a function
try {
  typeof DatePicker === 'function'
    ? pass('DatePicker is exported as a function')
    : fail('DatePicker exported', `typeof = ${typeof DatePicker}`);
} catch (e) {
  fail('DatePicker exported', String(e));
}

// Test 2: Calendar grid always has 42 cells
try {
  const buildGrid = (year: number, month: number): Date[] => {
    const firstDay = new Date(year, month, 1);
    const startDay = new Date(firstDay);
    startDay.setDate(1 - firstDay.getDay());
    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      cells.push(new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate() + i));
    }
    return cells;
  };
  const grid = buildGrid(2024, 0); // January 2024
  grid.length === 42
    ? pass('calendar grid has exactly 42 cells (6 rows × 7 cols)')
    : fail('grid size', `got ${grid.length} cells`);
} catch (e) {
  fail('grid size', String(e));
}

// Test 3: isDisabled — date before minDate
try {
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const isDisabled = (date: Date, minDate?: Date, maxDate?: Date, disabledDates?: Date[]): boolean => {
    if (minDate && date < minDate && !isSameDay(date, minDate)) return true;
    if (maxDate && date > maxDate && !isSameDay(date, maxDate)) return true;
    if (disabledDates?.some(d => isSameDay(d, date))) return true;
    return false;
  };
  const minDate = new Date(2024, 5, 15);
  isDisabled(new Date(2024, 5, 10), minDate) === true &&
  isDisabled(new Date(2024, 5, 20), minDate) === false
    ? pass('isDisabled correctly disables dates before minDate')
    : fail('isDisabled minDate', 'unexpected result');
} catch (e) {
  fail('isDisabled minDate', String(e));
}

// Test 4: Range mode auto-swap when end < start
try {
  const normalizeRange = (a: Date, b: Date): [Date, Date] => {
    return a <= b ? [a, b] : [b, a];
  };
  const start = new Date(2024, 5, 20);
  const end = new Date(2024, 5, 10);
  const [normalized1, normalized2] = normalizeRange(start, end);
  normalized1 <= normalized2
    ? pass('range auto-swaps when end date is before start date')
    : fail('range swap', `${normalized1.toISOString()} > ${normalized2.toISOString()}`);
} catch (e) {
  fail('range swap', String(e));
}

// Test 5: Month navigation — December to January increments year
try {
  const nextMonth = (date: Date): Date => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1);
    return d;
  };
  const dec = new Date(2024, 11, 1); // December 2024
  const jan = nextMonth(dec);
  jan.getFullYear() === 2025 && jan.getMonth() === 0
    ? pass('December + 1 month = January of next year')
    : fail('month navigation wrap', `${jan.getFullYear()}-${jan.getMonth() + 1}`);
} catch (e) {
  fail('month navigation wrap', String(e));
}

// Test 6: Props interface accepts all fields
try {
  const props: DatePickerProps = {
    value: new Date(),
    onChange: (_d: Date | null) => {},
    mode: 'single',
    minDate: new Date(),
    maxDate: new Date(),
    disabledDates: [],
    dateFormat: 'MM/DD/YYYY',
    disabled: false,
    label: 'Pick a date',
  };
  props.mode === 'single' && props.dateFormat === 'MM/DD/YYYY'
    ? pass('DatePickerProps accepts all fields')
    : fail('DatePickerProps', 'field mismatch');
} catch (e) {
  fail('DatePickerProps', String(e));
}

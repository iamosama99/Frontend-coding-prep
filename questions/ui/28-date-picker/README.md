# Date Picker

## Problem

Build a `DatePicker` component that renders a text input and a calendar popup. Users can select a date by clicking a day cell or typing in the input. The component supports both single-date and date-range selection modes.

## TypeScript Signature

```ts
interface DatePickerProps {
  value?: Date | null;                  // single date, controlled
  onChange?: (date: Date | null) => void;
  rangeValue?: [Date | null, Date | null]; // range mode [start, end]
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  mode?: 'single' | 'range';           // default: 'single'
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  dateFormat?: string;                  // display format, default: 'MM/DD/YYYY'
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

function DatePicker(props: DatePickerProps): JSX.Element
```

## Usage Example

```tsx
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
  label="Select a date"
  placeholder="MM/DD/YYYY"
/>

// Range mode
const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
<DatePicker mode="range" rangeValue={range} onRangeChange={setRange} />
```

**Expected behaviour:** clicking the input opens the calendar popup. The calendar shows the current month with prev/next month navigation. Clicking a date selects it and closes the popup (single mode). In range mode, the first click sets the start, second click sets the end. Dates outside min/max or in `disabledDates` are greyed out and unclickable.

## Constraints

- Calendar grid: 7 columns (Sun–Sat), rows covering the full month including leading/trailing days from adjacent months.
- The trigger input must have `aria-haspopup="dialog"` and `aria-expanded`.
- The calendar popup has `role="dialog"` with a focus trap.
- Each day button: `aria-label="Day Month Year"`, `aria-selected` for selected dates, `aria-disabled` for unavailable.
- Today's date has `aria-current="date"`.
- Keyboard: Arrow keys navigate days; Page Up/Down change months; Escape closes.

## Edge Cases

- `minDate` in the middle of the displayed month — only days from minDate onward are selectable.
- Range selection where end date is before start date — swap them automatically.
- User types a date in the input — parse and validate; update if valid.
- `disabledDates` falls on a weekday — the cell is rendered but cannot be selected.
- December → January navigation — month wraps to next year.
- `value` prop changes externally — the calendar navigates to that month automatically.

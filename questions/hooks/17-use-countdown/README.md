# useCountdown

## Problem

Implement a `useCountdown` hook that counts down from a target `Date` to the present, ticking every second. It must expose the remaining time broken into days, hours, minutes, and seconds, plus `pause` and `resume` controls.

## TypeScript Signature

```ts
interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPaused: boolean;
  isExpired: boolean;
  pause: () => void;
  resume: () => void;
}

function useCountdown(targetDate: Date): CountdownResult
```

## Usage Example

```tsx
function EventBanner() {
  const launchDate = new Date('2025-12-31T00:00:00Z');
  const { days, hours, minutes, seconds, isPaused, pause, resume } = useCountdown(launchDate);

  return (
    <div>
      <p>{days}d {hours}h {minutes}m {seconds}s</p>
      <button onClick={isPaused ? resume : pause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
}
```

While counting, the display updates once per second. Clicking "Pause" freezes the display. Clicking "Resume" continues from where it left off. When the target date passes, `isExpired` becomes `true` and all time units are `0`.

## Constraints

- Use `setInterval` with a 1000 ms interval for ticking.
- Clear the interval on unmount to avoid memory leaks.
- Clearing the interval must also happen when `isPaused` is `true`.
- The breakdown calculation: subtract `Date.now()` from `targetDate.getTime()`, then extract days/hours/minutes/seconds using modulo arithmetic.
- `days`, `hours`, `minutes`, `seconds` must all be non-negative integers — never negative.

## Edge Cases

- Target date is in the past on mount — `isExpired` should be `true` immediately.
- `targetDate` prop changes after mount — the countdown should restart from the new target.
- The tab is backgrounded (throttled timers) — the diff is recomputed from the real clock each tick, so drift corrects itself.
- `pause` called multiple times in a row — must not stack multiple intervals on `resume`.
- Exactly at zero — when remaining ms hits 0, all units should be 0, not negative.

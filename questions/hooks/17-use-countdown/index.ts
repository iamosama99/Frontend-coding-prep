import { useState, useEffect, useCallback } from 'react';

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPaused: boolean;
  isExpired: boolean;
  pause: () => void;
  resume: () => void;
}

// TODO 1: Write a helper that takes a target Date and returns the time
//   breakdown { days, hours, minutes, seconds, isExpired }.
//   Clamp the remaining ms to 0 so units are never negative.
//   Hint: remainingMs = targetDate.getTime() - Date.now()
//   Extract each unit with Math.floor and the right divisors / modulo values.

// TODO 2: Initialise state with two pieces: the breakdown (from TODO 1)
//   and isPaused (boolean, starts false).

// TODO 3: Set up a useEffect that runs a setInterval every 1000 ms.
//   Each tick: recompute the breakdown from the current time and update state.
//   The interval must be cleared on cleanup (return a cleanup function).
//   The interval must NOT run when isPaused is true — how do you handle that?

// TODO 4: When isExpired becomes true, stop the interval so it doesn't
//   keep ticking after the countdown finishes.

// TODO 5: Implement stable `pause` and `resume` callbacks with useCallback.
//   They just flip the isPaused flag.

// TODO 6: The `targetDate` prop can change — add it to the effect's
//   dependency array (or handle it so the countdown restarts on change).

export function useCountdown(targetDate: Date): CountdownResult {
  throw new Error('Not implemented');
}

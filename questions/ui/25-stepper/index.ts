import { useState } from 'react';
import type { ReactNode } from 'react';

export interface Step {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  validate?: () => boolean | Promise<boolean>;
  optional?: boolean;
}

export interface StepperProps {
  steps: Step[];
  onComplete?: (completedSteps: string[]) => void;
  allowSkipOptional?: boolean;
  linear?: boolean;
}

// TODO 1: Set up state.
//   - currentIndex: number (0-indexed current step).
//   - validating: boolean (async validation in progress).
//   - error: string | null (validation error message).
//   - completedIds: Set<string> (steps that have passed validation and been advanced from).
//   - visitedIds: Set<string> (steps that have been shown at least once).

// TODO 2: Implement the "Next" / "Finish" handler.
//   - If currently on the last step: call onComplete(Array.from(completedIds)) and stop.
//   - Get the current step's `validate` function.
//   - If no validate: mark step as completed, advance index.
//   - If validate exists: set validating=true, await the result.
//   - If result is false: set an error message, stay on current step.
//   - If result is true: add id to completedIds, clear error, advance index.
//   - Always clear validating in a finally block.

// TODO 3: Implement "Back" handler.
//   - Decrement currentIndex, clear any validation error.
//   - Back is disabled (not just visually) when currentIndex === 0.

// TODO 4: Render the step indicator.
//   - Map over steps: render a clickable indicator for each.
//   - In linear mode (default): future steps are not clickable.
//   - Completed steps show a checkmark; current step gets aria-current="step".
//   - Apply different visual states: completed / current / upcoming / visited.

// TODO 5: Render the step content area.
//   - Show steps[currentIndex].content.
//   - Show the validation error below the content when present.
//   - Render Back, Next (or Finish on last step), and optionally Skip buttons.
//   - Show a loading spinner or disabled state on Next during async validation.

export function Stepper(_props: StepperProps): JSX.Element {
  throw new Error('Not implemented');
}

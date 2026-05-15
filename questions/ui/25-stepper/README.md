# Stepper / Wizard

## Problem

Build a `Stepper` component that guides a user through a multi-step flow. Each step has optional per-step validation that must pass before advancing. The stepper tracks which steps have been visited and completed, and the step indicator visually communicates progress.

## TypeScript Signature

```ts
interface Step {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  validate?: () => boolean | Promise<boolean>;  // return false to block Next
  optional?: boolean;
}

interface StepperProps {
  steps: Step[];
  onComplete?: (completedSteps: string[]) => void;
  allowSkipOptional?: boolean;  // allow skipping steps marked optional
  linear?: boolean;             // if true, must complete steps in order, default: true
}

function Stepper(props: StepperProps): JSX.Element
```

## Usage Example

```tsx
<Stepper
  steps={[
    {
      id: 'account',
      title: 'Create account',
      content: <AccountForm />,
      validate: () => accountForm.isValid(),
    },
    { id: 'profile', title: 'Set up profile', content: <ProfileForm /> },
    { id: 'review', title: 'Review & submit', content: <ReviewStep /> },
  ]}
  onComplete={(ids) => submitForm()}
/>
```

**Expected behaviour:** the user sees a step indicator at the top showing all steps. The current step's content is displayed. "Next" advances if validation passes; "Back" always works. On the last step, "Next" becomes "Finish" and triggers `onComplete`. Completed steps show a checkmark in the indicator.

## Constraints

- Current step index, visited steps Set, and completed steps Set are all managed internally.
- Async `validate` must show a loading state while running; do not allow double-clicks.
- `linear={true}` (default): clicking on a future step in the indicator is disabled.
- `linear={false}`: clicking any step in the indicator navigates to it directly.
- Step indicator items: `aria-current="step"` on the current step.
- Back/Next buttons must be `aria-disabled` when at the first/last boundaries.

## Edge Cases

- `validate` returns false — stay on current step; optionally show an inline error message.
- Async `validate` throws — treat as false; show a generic validation error.
- `allowSkipOptional=true` — a "Skip" button appears on optional steps.
- Steps array changes while on step 2 — clamp current index to new steps.length - 1.
- `onComplete` is not provided — Finish button still appears, nothing happens on click.
- Single step — both Back and Next/Finish buttons: Back is disabled on step 1; Finish is the only forward action.

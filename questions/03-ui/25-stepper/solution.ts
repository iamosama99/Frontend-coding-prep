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

// TODO: implement solution
export function Stepper(_props: StepperProps): JSX.Element {
  throw new Error('Not implemented');
}

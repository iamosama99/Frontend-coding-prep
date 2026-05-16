import { useState } from 'react';

export interface StarRatingProps {
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (rating: number) => void;
  halfStars?: boolean;
  readOnly?: boolean;
  size?: number;
  label?: string;
}

// TODO: implement solution
export function StarRating(_props: StarRatingProps): JSX.Element {
  throw new Error('Not implemented');
}

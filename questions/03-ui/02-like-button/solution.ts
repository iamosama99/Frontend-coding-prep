import { useState } from 'react';

export interface LikeButtonProps {
  initialCount?: number;
  initialLiked?: boolean;
  onLike?: (liked: boolean) => Promise<void>;
  disabled?: boolean;
}

// TODO: implement solution
export function LikeButton(_props: LikeButtonProps): JSX.Element {
  throw new Error('Not implemented');
}

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface CarouselSlide {
  id: string;
  content: ReactNode;
  label?: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  onChange?: (index: number) => void;
}

// TODO: implement solution
export function Carousel(_props: CarouselProps): JSX.Element {
  throw new Error('Not implemented');
}
